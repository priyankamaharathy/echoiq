"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type RecordingStatus = "idle" | "requesting" | "recording" | "stopped";

type UseMeetingRecorderReturn = {
  status: RecordingStatus;
  duration: number;
  audioUrl: string | null;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  resetRecording: () => void;
};

function getSupportedMimeType() {
  const types = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
  ];

  return types.find((type) => MediaRecorder.isTypeSupported(type)) ?? "";
}

export function useMeetingRecorder(): UseMeetingRecorderReturn {
  const [status, setStatus] = useState<RecordingStatus>("idle");
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanupStream = useCallback(() => {
    mediaStreamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });

    mediaStreamRef.current = null;
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      setStatus("requesting");
      setDuration(0);

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Your browser does not support microphone recording.",
        );
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      mediaStreamRef.current = stream;
      chunksRef.current = [];

      const mimeType = getSupportedMimeType();

      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        const url = URL.createObjectURL(blob);

        setAudioUrl((previousUrl) => {
          if (previousUrl) {
            URL.revokeObjectURL(previousUrl);
          }

          return url;
        });

        cleanupStream();
        clearTimer();
        setStatus("stopped");
      };

      recorder.onerror = () => {
        setError("Something went wrong while recording.");
        cleanupStream();
        clearTimer();
        setStatus("idle");
      };

      recorder.start(1000);

      setStatus("recording");

      timerRef.current = setInterval(() => {
        setDuration((current) => current + 1);
      }, 1000);
    } catch (err) {
      cleanupStream();
      clearTimer();

      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setError(
          "Microphone access was denied. Please allow microphone access and try again.",
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to start recording.",
        );
      }

      setStatus("idle");
    }
  }, [cleanupStream, clearTimer]);

  const stopRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;

    if (!recorder || recorder.state === "inactive") {
      return;
    }

    recorder.stop();
    mediaRecorderRef.current = null;
  }, []);

  const resetRecording = useCallback(() => {
    cleanupStream();
    clearTimer();

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    chunksRef.current = [];
    mediaRecorderRef.current = null;

    setAudioUrl(null);
    setDuration(0);
    setError(null);
    setStatus("idle");
  }, [audioUrl, cleanupStream, clearTimer]);

  useEffect(() => {
    return () => {
      cleanupStream();
      clearTimer();

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl, cleanupStream, clearTimer]);

  return {
    status,
    duration,
    audioUrl,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  };
}
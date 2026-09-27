"use client";

import { Mic, RotateCcw, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMeetingRecorder } from "@/hooks/meetings/use-meeting-recorder";

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export function MeetingRecorder() {
  const {
    status,
    duration,
    audioUrl,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  } = useMeetingRecorder();

  const isRecording = status === "recording";
  const isRequesting = status === "requesting";
  const isStopped = status === "stopped";

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-2xl border bg-background">
        <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-12 text-center sm:px-10">
          {isRecording ? (
            <>
              <div className="relative flex size-24 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-red-500/10" />

                <div className="relative flex size-16 items-center justify-center rounded-full border bg-background">
                  <span className="size-3 rounded-full bg-red-500" />
                </div>
              </div>

              <p className="mt-8 text-sm font-medium text-red-500">
                Recording
              </p>

              <p className="mt-2 font-mono text-4xl font-medium tracking-tight">
                {formatDuration(duration)}
              </p>

              <div className="mt-8 flex h-12 items-center gap-1">
                {Array.from({ length: 28 }).map((_, index) => (
                  <span
                    key={index}
                    className="w-1 rounded-full bg-foreground/30 animate-pulse"
                    style={{
                      height: `${12 + ((index * 17) % 28)}px`,
                      animationDelay: `${index * 45}ms`,
                    }}
                  />
                ))}
              </div>

              <Button
                size="lg"
                variant="outline"
                className="mt-10 rounded-full px-6"
                onClick={stopRecording}
              >
                <Square className="mr-2 size-4 fill-current" />
                Stop recording
              </Button>
            </>
          ) : isStopped ? (
            <>
              <div className="flex size-16 items-center justify-center rounded-full border bg-muted/40">
                <Mic className="size-6" />
              </div>

              <h2 className="mt-6 text-xl font-medium tracking-tight">
                Recording complete
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Your recording is ready to process.
              </p>

              {audioUrl && (
                <audio
                  className="mt-8 w-full max-w-md"
                  controls
                  src={audioUrl}
                />
              )}

              <Button
                variant="outline"
                className="mt-6"
                onClick={resetRecording}
              >
                <RotateCcw className="mr-2 size-4" />
                Record again
              </Button>
            </>
          ) : (
            <>
              <div className="flex size-20 items-center justify-center rounded-full border bg-muted/40">
                <Mic className="size-7" />
              </div>

              <h2 className="mt-6 text-xl font-medium tracking-tight">
                Ready to record
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                EchoIQ will use your microphone to capture this meeting.
              </p>

              <Button
                size="lg"
                className="mt-8 rounded-full px-6"
                onClick={startRecording}
                disabled={isRequesting}
              >
                <Mic className="mr-2 size-4" />
                {isRequesting ? "Requesting microphone..." : "Start recording"}
              </Button>
            </>
          )}
        </div>

        {error && (
          <div
            role="alert"
            className="border-t bg-destructive/5 px-6 py-4 text-sm text-destructive"
          >
            {error}
          </div>
        )}
      </div>
    </section>
  );
}
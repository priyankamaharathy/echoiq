"use client";

import { useRef } from "react";

import { NewMeetingCard } from "./new-meeting-card";

type NewMeetingOptionsProps = {
  onStartRecording: () => void;
};

export function NewMeetingOptions({
  onStartRecording,
}: NewMeetingOptionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadRecording = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    console.log("Selected recording:", file.name);
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <NewMeetingCard
          type="record"
          title="Start recording"
          description="Record a meeting live and generate a transcript as the conversation happens."
          onClick={onStartRecording}
        />

        <NewMeetingCard
          type="upload"
          title="Upload recording"
          description="Upload an existing meeting recording and turn it into searchable meeting intelligence."
          onClick={handleUploadRecording}
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
}
"use client";

import { useRef } from "react";

import { NewMeetingCard } from "./new-meeting-card";

export function NewMeetingOptions() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartRecording = () => {
    // Recording flow will be implemented next.
    console.log("Start recording");
  };

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
          onClick={handleStartRecording}
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
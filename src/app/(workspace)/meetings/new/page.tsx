"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { MeetingRecorder } from "@/components/meetings/meeting-recorder";
import { NewMeetingOptions } from "@/components/meetings/new-meeting-options";

export default function NewMeetingPage() {
  const [mode, setMode] = useState<"options" | "recording">("options");

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link
        href="/meetings"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to meetings
      </Link>

      <div className="mt-10">
        <p className="text-sm font-medium text-muted-foreground">
          New meeting
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {mode === "recording"
            ? "Record your meeting"
            : "How would you like to start?"}
        </h1>

        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {mode === "recording"
            ? "Keep this window open while EchoIQ captures your conversation."
            : "Start a live recording or upload an existing meeting to turn it into searchable, actionable intelligence."}
        </p>
      </div>

      <section className="mt-10" aria-label="Meeting options">
        {mode === "recording" ? (
          <MeetingRecorder />
        ) : (
          <NewMeetingOptions onStartRecording={() => setMode("recording")} />
        )}
      </section>
    </main>
  );
}
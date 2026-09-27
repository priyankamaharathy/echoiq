import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { NewMeetingOptions } from "@/components/meetings/new-meeting-options";

export default function NewMeetingPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link
        href="/meetings"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to meetings
      </Link>

      <div className="mt-10 max-w-2xl">
        <p className="text-sm font-medium text-muted-foreground">
          New meeting
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          How would you like to start?
        </h1>

        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Start a live recording or upload an existing meeting to turn it into
          searchable, actionable intelligence.
        </p>
      </div>

      <section className="mt-10" aria-label="Meeting options">
        <NewMeetingOptions />
      </section>
    </main>
  );
}
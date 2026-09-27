import {
  ArrowUpRight,
  Mic,
  Upload,
  Clock3,
  MoreHorizontal,
} from "lucide-react";

import { WorkspaceHeader } from "@/components/layout/workspace-header";

const recentMeetings = [
  {
    title: "Product Planning",
    date: "Today",
    duration: "42 min",
    initials: "PP",
  },
  {
    title: "Design Review",
    date: "Yesterday",
    duration: "31 min",
    initials: "DR",
  },
  {
    title: "Engineering Sync",
    date: "Sep 24",
    duration: "48 min",
    initials: "ES",
  },
];

export default function MeetingsPage() {
  return (
    <>
      <WorkspaceHeader />

     <main className="mx-auto max-w-6xl px-5 py-10 pb-28 sm:px-8 sm:pb-32 lg:py-14 lg:pb-14">
        {/* Welcome */}
        <section>
          <p className="text-sm text-muted-foreground">Good morning</p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Your meetings, understood.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Capture conversations, surface decisions, and find exactly what
            was said without replaying an entire meeting.
          </p>
        </section>

        {/* Primary actions */}
       <section className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4">
          <button className="group flex min-h-36 flex-col justify-between rounded-xl border bg-foreground p-5 text-left text-background transition-transform hover:-translate-y-0.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-background/10">
              <Mic className="size-4" />
            </div>

            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-sm font-medium">Start recording</h2>
                <p className="mt-1 text-xs text-background/60">
                  Capture a live meeting
                </p>
              </div>

              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </button>

          <button className="group flex min-h-40 flex-col justify-between rounded-xl border bg-background p-5 text-left transition-transform hover:-translate-y-0.5 hover:bg-muted/30">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <Upload className="size-4" />
            </div>

            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-sm font-medium">Upload recording</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Analyze an existing audio file
                </p>
              </div>

              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </button>
        </section>

        {/* Recent meetings */}
        <section className="mt-14">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium">Recent meetings</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Continue where you left off.
              </p>
            </div>

            <button className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              View all
            </button>
          </div>

          <div className="mt-5 divide-y rounded-xl border">
            {recentMeetings.map((meeting) => (
              <button
                key={meeting.title}
                className="group flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-muted/30 sm:px-5"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-[10px] font-medium">
                  {meeting.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {meeting.title}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{meeting.date}</span>

                    <span className="text-border">·</span>

                    <span className="flex items-center gap-1">
                      <Clock3 className="size-3" />
                      {meeting.duration}
                    </span>
                  </div>
                </div>

                <MoreHorizontal className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
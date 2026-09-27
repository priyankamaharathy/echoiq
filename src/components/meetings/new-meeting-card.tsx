"use client";

import { ArrowUp, Mic } from "lucide-react";

import { Card } from "@/components/ui/card";

type NewMeetingCardProps = {
  type: "record" | "upload";
  title: string;
  description: string;
  onClick: () => void;
};

export function NewMeetingCard({
  type,
  title,
  description,
  onClick,
}: NewMeetingCardProps) {
  const isRecording = type === "record";

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      className="group cursor-pointer rounded-2xl border-border/70 bg-background p-8 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="flex min-h-56 flex-col">
        <div className="flex size-12 items-center justify-center rounded-xl border bg-muted/40 transition-colors group-hover:bg-muted">
          {isRecording ? (
            <Mic className="size-5" />
          ) : (
            <ArrowUp className="size-5" />
          )}
        </div>

        <div className="mt-auto">
          <h2 className="text-lg font-medium tracking-tight">{title}</h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
import React from "react";

interface EventsStateProps {
  events: any;
}

export function Events({ events }: EventsStateProps) {
  return (
    <ul>
      {events.map((event: string, index: number) => (
        <li key={index}>{event}</li>
      ))}
    </ul>
  );
}

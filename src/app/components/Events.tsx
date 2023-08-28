import React from "react";
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Avatar,
} from "@chakra-ui/react";

interface EventsStateProps {
  events: any;
}
interface Events {
  author_email: string;
  text: string;
}

export function Events({ events }: EventsStateProps) {
  return (
    <div>
      {events.map((event: Events, index: number) => (
        <Tag key={index} size="lg" colorScheme="red" borderRadius="full">
          <Avatar src="/next.svg" size="xs" name={event.author_email} mr={2} />
          <TagLabel>{event.text}</TagLabel>
        </Tag>
      ))}
    </div>
  );
}

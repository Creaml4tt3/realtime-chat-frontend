import React from "react";

interface ConnectionStateProps {
  isConnected: boolean;
}

export function ConnectionState({ isConnected }: ConnectionStateProps) {
  return <div>State: {isConnected.toString()}</div>;
}

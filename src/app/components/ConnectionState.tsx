"use client";
import React from "react";

interface ConnectionStateProps {
  isConnected: boolean;
}

export function ConnectionState({ isConnected }: ConnectionStateProps) {
  return <span>State: {isConnected ? "connected" : "not connected"}</span>;
}

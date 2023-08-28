"use client";
import React, { useState, useEffect } from "react";
import { socket } from "@uti/socket";
import { ConnectionState } from "@comp/ConnectionState";
import { ConnectionManager } from "@comp/ConnectionManager";
import { Events } from "@comp/Events";
import { Form } from "@comp/Form";

export default function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [messageRecieves, setMessagesRecieves] = useState([]);

  async function getMessage() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/chat`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    return response.json();
  }

  useEffect(() => {
    console.log(messages);
  }, [messages]);
  useEffect(() => {
    console.log(isConnected);
  }, [isConnected]);

  useEffect(() => {
    getMessage().then((data) => setMessages(data));

    function onConnect() {
      // socket.emit("user:connected", "user:");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(data: any) {
      setMessagesRecieves((previous): any => [...previous, data]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message:recieve", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message:recieve", onMessage);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <Events events={[...messages, ...messageRecieves]} />
      <ConnectionManager />
      <Form />
    </div>
  );
}

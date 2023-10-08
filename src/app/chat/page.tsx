"use client";
import React, { useState, useEffect } from "react";
import { socket } from "@/app/lib/socket";
import { ConnectionState } from "@comp/ConnectionState";
import { ConnectionManager } from "@comp/ConnectionManager";
import { Events } from "@comp/Events";
import { Form } from "@comp/Form";

import { FetchMessage } from "@comp/data/FetchMessage";
import { useSession } from "next-auth/react";

export default function Chat() {
  const { data: session, status } = useSession({
    required: true,
  });
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [messageRecieves, setMessagesRecieves] = useState([]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);
  useEffect(() => {
    console.log(isConnected);
  }, [isConnected]);

  useEffect(() => {
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

    if (session && status === "authenticated") {
      console.log(session);
      FetchMessage().then((data) => setMessages(data));

      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on("message:recieve", onMessage);

      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("message:recieve", onMessage);
      };
    }
  }, [session, status]);

  return (
    <>
      {session && status === "authenticated" && (
        <div className="App">
          <ConnectionState isConnected={isConnected} />
          <Events events={[...messages, ...messageRecieves]} />
          <ConnectionManager />
          <Form />
        </div>
      )}
    </>
  );
}

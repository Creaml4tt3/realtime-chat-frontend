import React, { useState } from "react";
import { socket } from "@uti/socket";

export function Form() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setValue("");

    const data = { author_email: "creaml4tt3@gmail.com", text: value };

    socket.timeout(500).emit("message:create", data, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setValue(e.target.value)} value={value} />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}

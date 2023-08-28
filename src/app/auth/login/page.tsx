"use client";
import { useState, SyntheticEvent } from "react";
import { useSession, signIn } from "next-auth/react";

export default function Login() {
  const { data: session, status, update } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(session);

  async function login(loginData: CredentialPassport) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
      <button onClick={() => signIn()}>Login</button>
    </>
  );
}

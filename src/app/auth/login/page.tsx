"use client";
import { useEffect, useState, SyntheticEvent } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();

  const { register, handleSubmit } = useForm<LoginFormInput>();

  useEffect(() => {
    if (session && status === "authenticated") {
      if (params.get("callbackUrl")) {
        router.replace(params.get("callbackUrl") || "");
      } else {
        router.replace("/");
      }
    }
  }, [session, status, params, router]);

  const onSubmit: SubmitHandler<LoginFormInput> = ({ email, password }) => {
    signIn("credentials", { email, password });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", { required: true })} placeholder="Email" />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

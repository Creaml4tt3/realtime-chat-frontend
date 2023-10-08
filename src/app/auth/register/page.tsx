"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface RegisterFormInput {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
}

export default function Register() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormInput>();

  async function registerData({ email, password, name }: userData) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_ENDPOINT}/api/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to register");
    }
    return response.json();
  }

  const onSubmit: SubmitHandler<RegisterFormInput> = ({
    email,
    password,
    confirm_password,
    name,
  }) => {
    if (password !== confirm_password) {
      return setError("confirm_password", {
        type: "manual",
        message: "Password & Confirm Password is not matched.",
      });
    }

    registerData({ email, password, name }).then((res) => console.log(res));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          autoComplete="email"
        />
        {(errors && errors.email?.message) || errors.email?.type}
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          autoComplete="current-password"
        />
        {(errors && errors.password?.message) || errors.password?.type}
        <input
          type="password"
          {...register("confirm_password", { required: true })}
          placeholder="Confirm Password"
          autoComplete="current-password"
        />
        {(errors && errors.confirm_password?.message) ||
          errors.confirm_password?.type}
        <input {...register("name", { required: true })} placeholder="name" />
        {(errors && errors.name?.message) || errors.name?.type}
        <button type="submit">Register</button>
      </form>
    </>
  );
}

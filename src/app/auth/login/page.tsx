"use client";
import { useEffect, useState, SyntheticEvent } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import GoogleSignin from "@/app/components/Google.component";

interface LoginFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();

  const { register, handleSubmit } = useForm<LoginFormInput>();

  const [isGoogle, setIsGoogle] = useState(false);
  const handleGoogleOpen = () => {
    setIsGoogle(true);
  };
  const handleGoogleClose = () => {
    setIsGoogle(false);
  };

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
      <button onClick={() => handleGoogleOpen()}>Google</button>
      {isGoogle && <GoogleSignin close={handleGoogleClose} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          autoComplete="email"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

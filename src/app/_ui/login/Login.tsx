"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSignIn, useUser } from "@clerk/nextjs";
import { hasErrorType } from "~/_utils/typeCheckers";
import { useState } from "react";

const FormFieldsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type FormFields = z.infer<typeof FormFieldsSchema>;

const Login = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [clerkError, setClerkError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(FormFieldsSchema) });
  const { isLoaded, signIn, setActive } = useSignIn();

  const loginWithEmail = async ({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }) => {
    if (!isLoaded) {
      return;
    }
    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        throw new Error("Failed to login");
      }
    } catch (err) {
      if (hasErrorType(err)) {
        const message = err.errors[0]?.message ?? null;
        setClerkError(message);
      }
    }
  };

  if (isSignedIn) {
    router.replace("/");
  }

  return (
    <div className="mt-12 grid justify-center justify-items-center md:mt-20">
      <Image
        className="mb-14 md:mb-20"
        src="/logo.svg"
        alt="icon"
        width={32}
        height={25.6}
      />
      <div className="h-auto w-80 rounded-xl bg-entertainment-semi-dark-blue md:w-96 md:rounded-3xl">
        <div className="p-6 md:p-8">
          <h1 className="mb-6 text-3xl font-light text-entertainment-pure-white">
            Login
          </h1>
          <form
            onSubmit={handleSubmit((d: FormFields) =>
              loginWithEmail({ emailAddress: d.email, password: d.password }),
            )}
          >
            <input
              className="h-37 mb-3 block w-full border-0 border-b-2 border-entertainment-greyish-blue bg-transparent pb-4 pl-4 text-sm font-light text-entertainment-pure-white caret-entertainment-red focus:border-entertainment-pure-white"
              type="email"
              {...register("email")}
              placeholder="Email address"
              required
            />
            <input
              className="h-37 mb-3 block w-full border-0 border-b-2 border-entertainment-greyish-blue bg-transparent pb-4 pl-4 text-sm font-light text-entertainment-pure-white caret-entertainment-red focus:border-entertainment-pure-white"
              type="password"
              placeholder="Password"
              {...register("password")}
              required
            />
            <h2 className="mb-8 text-entertainment-red">
              {errors.email && <p>{errors.email.message}</p>}
              {errors.password && <p>{errors.password.message}</p>}
              {clerkError && <p>{clerkError}</p>}
            </h2>
            <button
              className="mb-6 h-12 w-full rounded-md bg-entertainment-red text-sm font-light text-entertainment-pure-white hover:bg-entertainment-pure-white hover:text-entertainment-dark-blue"
              type="submit"
            >
              Login to your account
            </button>
          </form>
          <p className="text-center text-sm font-light text-entertainment-pure-white">
            Don&apos;t have an acccount?
            <Link className="ml-2 text-entertainment-red" href="/sign-up">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

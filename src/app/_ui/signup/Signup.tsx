/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignUp, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { hasErrorType } from "~/_utils/typeCheckers";

const FormFieldsSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string().email(),
    password1: z
      .string()
      .min(8, { message: "Must be at least 8 characters long" })
      .max(32, {
        message: "Password must be between 8 and 32 characters long",
      }),
    password2: z.string(),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

type FormFields = z.infer<typeof FormFieldsSchema>;

const Signup = () => {
  const { isSignedIn } = useUser();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [clerkError, setClerkError] = useState<string | null>(null);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(FormFieldsSchema) });

  const { mutate } = api.users.createUser.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setEmail("");
    },
  });

  const signUpWithEmail = async ({
    emailAddress,
    password,
    name,
  }: {
    emailAddress: string;
    password: string;
    name: string;
  }) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setName(name);
      setEmail(emailAddress);
      setVerifying(true);
    } catch (err) {
      if (hasErrorType(err)) {
        const message = err.errors[0]?.message ?? null;
        setClerkError(message);
      }
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        console.log(JSON.stringify(completeSignUp, null, 2));
        // ADD USERS NAME, EMAIL, AND USER ID TO OUR DATABASE
        const clerkId: string = completeSignUp.createdUserId ?? "";
        mutate({ name, email, clerkId });

        router.push("/");
      }
    } catch (err) {
      console.log("Error:", JSON.stringify(err, null, 2));
    }
  };

  if (verifying) {
    return (
      <div className="mt-12 flex grid justify-center justify-items-center md:mt-20">
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
              Verification Code
            </h1>
            <form onSubmit={handleVerify}>
              <input
                value={code}
                className="h-37 mb-3 block w-full border-0 border-b-2 border-entertainment-greyish-blue bg-transparent pb-4 pl-4 text-sm font-light text-entertainment-pure-white caret-entertainment-red focus:border-entertainment-pure-white"
                id="code"
                name="code"
                onChange={(e) => setCode(e.target.value)}
              />

              <button
                className="mb-6 h-12 w-full rounded-md bg-entertainment-red text-sm font-light text-entertainment-pure-white hover:bg-entertainment-pure-white hover:text-entertainment-dark-blue"
                type="submit"
              >
                Complete sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  if (isSignedIn) {
    return router.replace("/");
  } else {
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
              Sign Up
            </h1>
            <form
              onSubmit={handleSubmit((d) =>
                signUpWithEmail({
                  name: d.name,
                  emailAddress: d.email,
                  password: d.password1,
                }),
              )}
            >
              <input
                {...register("name")}
                className="h-37 mb-3 block w-full border-0 border-b-2 border-entertainment-greyish-blue bg-transparent pb-4 pl-4 text-sm font-light text-entertainment-pure-white caret-entertainment-red focus:border-entertainment-pure-white"
                placeholder="Name"
                type="text"
                required
              />
              <input
                {...register("email")}
                className="h-37 mb-3 block w-full border-0 border-b-2 border-entertainment-greyish-blue bg-transparent pb-4 pl-4 text-sm font-light text-entertainment-pure-white caret-entertainment-red focus:border-entertainment-pure-white"
                placeholder="Email address"
                type="email"
                required
              />
              <input
                {...register("password1")}
                className="h-37 mb-3 block w-full border-0 border-b-2 border-entertainment-greyish-blue bg-transparent pb-4 pl-4 text-sm font-light text-entertainment-pure-white caret-entertainment-red focus:border-entertainment-pure-white"
                placeholder="Password"
                type="password"
                required
              />
              <input
                {...register("password2")}
                className="h-37 mb-10 block w-full border-0 border-b-2 border-entertainment-greyish-blue bg-transparent pb-4 pl-4 text-sm font-light text-entertainment-pure-white caret-entertainment-red focus:border-entertainment-pure-white"
                placeholder="Repeat Password"
                type="password"
                required
              />
              <h2 className="mb-8 text-entertainment-red">
                {errors.email && <p>{errors.email.message}</p>}
                {errors.password1 && <p>{errors.password1.message}</p>}
                {errors.password2 && <p>{errors.password2.message}</p>}
                {clerkError && <p>{clerkError}</p>}
              </h2>
              <button
                className="mb-6 h-12 w-full rounded-md bg-entertainment-red text-sm font-light text-entertainment-pure-white hover:bg-entertainment-pure-white hover:text-entertainment-dark-blue"
                type="submit"
              >
                Create an account
              </button>
            </form>
            <p className="text-center text-sm font-light text-entertainment-pure-white">
              Already have an acccount?
              <Link className="ml-2 text-entertainment-red" href="/sign-in">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
};
export default Signup;

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { cn } from "../../components/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandFacebook,
} from "@tabler/icons-react";
import axiosInstance from "../../components/lib/axios";

export const SigninForm = ({ onSwitchToSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login submitted", data);
    try {
      const response = await axiosInstance.post("/signin", data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
        Login to Confession Corner
      </h2>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </LabelInputContainer>

        <div className="text-right mb-6">
          <a
            href="#"
            className="text-sm text-indigo-500 hover:underline dark:text-indigo-400"
          >
            Forgot password?
          </a>
        </div>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow dark:bg-zinc-800"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="mt-6 flex items-center justify-center space-x-6">
          <OAuthButton Icon={IconBrandGithub} />
          <OAuthButton Icon={IconBrandGoogle} />
          <OAuthButton Icon={IconBrandFacebook} />
        </div>
      </form>

      <p className="mt-4 text-sm text-center text-neutral-600 dark:text-neutral-400">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          className="text-indigo-500 hover:underline"
          onClick={onSwitchToSignup}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);

const OAuthButton = ({ Icon }) => (
  <button
    type="button"
    aria-label="OAuth"
    className="hover:scale-110 transition-transform text-neutral-800 dark:text-neutral-300"
  >
    <Icon className="h-6 w-6" />
  </button>
);

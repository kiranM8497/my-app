import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { cn } from "../../components/lib/utils";

import axiosInstance from "../../components/lib/axios";
import OAuthSection from "./OAuthSection";
import { useAuth } from "../../context/AuthContext"; // Updated import path
import { useNavigate } from "react-router-dom";

const SigninForm = ({ onSwitchToSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth(); // Use checkAuthStatus instead of setUser

  const onSubmit = async (data) => {
    console.log("Login submitted", data);
    setIsLoading(true);
    setApiError("");

    try {
      const response = await axiosInstance.post("/signin", data);

      // Store token if your API returns one
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Now check auth status to get user data and update context
      await checkAuthStatus();

      // Navigate to home (or profile) after successful login
      navigate("/", { replace: true }); // Changed from "/profile" to "/" to match your router
    } catch (error) {
      console.error("Login failed:", error);
      setApiError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Password or email incorrect"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className=" shadow-input mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md rounded-none sm:rounded-md md:rounded-xl
 bg-white p-4 sm:p-6 md:p-7 lg:p-10   dark:bg-black"
    >
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
        Login to Confession Corner
      </h2>

      <form
        className="my-6 sm:my-12 md:my-14 "
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* API Error Message */}
        {apiError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900/20 dark:border-red-500 dark:text-red-400">
            {apiError}
          </div>
        )}

        <LabelInputContainer className="mb-4 sm:mb-5 md:mb-6">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            autoComplete="current-username"
            disabled={isLoading}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs sm:text-sm md:text-base">
              {errors.email.message}
            </p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            disabled={isLoading}
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </LabelInputContainer>

        <div className="text-right text-sm sm:text-base">
          <a
            href="#"
            className="text-sm text-black-500 hover:underline dark:text-indigo-400"
          >
            Forgot password?
          </a>
        </div>

        <button
          className="group/btn relative block h-10 sm:h-12 md:h-14 w-full text-sm sm:text-base md:text-lg rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow dark:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"} &rarr;
          <BottomGradient />
        </button>

        <div className="my-2 sm:my-6 md:my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <OAuthSection />
      </form>

      <p className="mt-2  text-sm text-center text-neutral-600 dark:text-neutral-400">
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

export default SigninForm;

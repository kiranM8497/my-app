import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { cn } from "../../components/lib/utils";

import axiosInstance from "../../components/lib/axios";
import OAuthSection from "./OAuthSection";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupFormDemo = ({ onSwitchToLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();

  // Watch password for confirmation validation
  const password = watch("password");

  const onSubmit = async (data) => {
    console.log("Signup submitted", data);
    setIsLoading(true);
    setApiError("");

    try {
      // Remove confirmPassword from data before sending to API
      const { confirmPassword, ...signupData } = data;

      const response = await axiosInstance.post("/signup", signupData);

      // Store token if your API returns one after signup
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);

        // Check auth status to get user data and update context
        await checkAuthStatus();

        // Navigate to home after successful signup
        navigate("/", { replace: true });
      } else {
        // If no token returned, might need email verification
        // Show success message and switch to login
        alert("Account created successfully! Please sign in.");
        onSwitchToLogin();
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setApiError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md rounded-none sm:rounded-md md:rounded-xl bg-white p-4 sm:p-6 md:p-7 lg:p-10 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
        Sign up for Confession Corner
      </h2>

      <form
        className="my-6 sm:my-12 md:my-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* API Error Message */}
        {apiError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900/20 dark:border-red-500 dark:text-red-400">
            {apiError}
          </div>
        )}

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              type="text"
              disabled={isLoading}
              {...register("firstname", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              })}
            />
            {errors.firstname && (
              <p className="text-red-500 text-xs">{errors.firstname.message}</p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              type="text"
              disabled={isLoading}
              {...register("lastname", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              })}
            />
            {errors.lastname && (
              <p className="text-red-500 text-xs">{errors.lastname.message}</p>
            )}
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
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
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            disabled={isLoading}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            disabled={isLoading}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 sm:h-12 md:h-14 w-full text-sm sm:text-base md:text-lg rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow dark:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Sign up"} &rarr;
          <BottomGradient />
        </button>

        <div className="my-2 sm:my-6 md:my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <OAuthSection />
      </form>

      <p className="mt-2 text-sm text-center text-neutral-600 dark:text-neutral-400">
        Already have an account?{" "}
        <button
          type="button"
          className="text-indigo-500 hover:underline"
          onClick={onSwitchToLogin}
        >
          Sign in
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

export default SignupFormDemo;

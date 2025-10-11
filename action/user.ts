"use server";

import connectDB from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate input
    if (!email || !password) {
      return { error: "All fields are required" };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { error: "Please enter a valid email address" };
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      return { error: "Invalid credentials" };
    }

    redirect("/");
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: "Something went wrong during login" };
  }
}

export async function register(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return { error: "All fields are required" };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { error: "Please enter a valid email address" };
    }

    // Password validation (at least 6 characters)
    if (password.length < 6) {
      return { error: "Password must be at least 6 characters long" };
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "Email is already registered" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return { error: "Error creating user" };
    }

    redirect("/login?registered=true");
  } catch (error: any) {
    console.error("Registration error:", error);
    return { error: "Something went wrong during registration" };
  }
}
export const fetchAllUsers = async () => {
  await connectDB();
  const user = await User.find({});
  return user;
};

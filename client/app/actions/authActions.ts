// app/actions/authActions.ts
"use server";

import { authResponse } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RegisterData, LoginData } from "@/types";
import { revalidatePath } from "next/cache";
import { verifyToken } from "@/lib/token";
export async function registerAction(data: RegisterData) {
  try {
    const response = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.name,
        email: data.email,
        password: data.password,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }
    const result: authResponse = await response.json();
    // Save the token in cookies with expiration time and redirect to profile page
    const userExp = verifyToken(result.token);
    cookies().set("l-t-k", result.token, {
      expires: new Date(userExp.exp * 1000),
    });
    redirect("/profile");
  } catch (error) {
    throw error;
  }
}

export async function loginAction(data: LoginData) {
  try {
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const result = await response.json();
    const userExp = verifyToken(result.token);
    cookies().set("l-t-k", result.token, {
      expires: new Date(userExp.exp * 1000),
    });
    redirect("/profile");
  } catch (error) {
    throw error;
  }
}

export async function logoutAction() {
  try {
    const response = await fetch("http://localhost:4000/api/auth/logout", {
      method: "DELETE",
      headers: {
        authorization: `${cookies().get("l-t-k")?.value}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed");
    }

    const result: authResponse = await response.json();
    cookies().delete("l-t-k");
    // revalidate and redirect to home page
    revalidatePath("/profile");
    redirect("/");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

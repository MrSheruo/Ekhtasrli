"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function handleCreateLink(formData: FormData) {
  const original_url = formData.get("url-input") as string;

  const res = await fetch("http://localhost:4000/api/links/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `${cookies().get("l-t-k")?.value}`,
    },
    body: JSON.stringify({ original_url }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Link creation failed");
  }
  const data = await res.json();
  console.log(data);
  revalidatePath("/profile");
}

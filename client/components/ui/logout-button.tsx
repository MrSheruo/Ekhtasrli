"use client";

import React from "react";
import { Button } from "./button";
import { logoutAction } from "@/app/actions/authActions";

export default function Logout() {
  const handleLogout = async () => {
    await logoutAction();
  };
  return (
    <Button variant="destructive" className="text-2xl" onClick={handleLogout}>
      Logout
    </Button>
  );
}

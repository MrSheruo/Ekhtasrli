"use client";
import { Button } from "../ui/button";
import { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export default function authForm() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex flex-col gap-6">
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <Button
        variant="link"
        onClick={() => setIsLogin(!isLogin)}
        className="text-2xl w-fit"
      >
        {isLogin ? "ليس لديك حساب؟" : "لديك حساب؟"}
      </Button>
    </div>
  );
}

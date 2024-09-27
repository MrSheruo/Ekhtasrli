import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthForm from "@/components/layouts/authForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default function authPage() {
  // /api/users/:id
  const cookieStore = cookies();
  const token = cookieStore.get("l-t-k");
  if (token) {
    redirect("/profile");
  }
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          تسجيل الدخول او إنشاء حساب
        </CardTitle>
        <CardDescription className="text-xl">
          تسجيل الدخول او إنشاء حساب جديد للوصول إلى جميع مميزات إختصرلي
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <AuthForm />
      </CardContent>
    </Card>
  );
}

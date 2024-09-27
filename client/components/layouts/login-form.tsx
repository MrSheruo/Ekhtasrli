import z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { loginAction, registerAction } from "@/app/actions/authActions";

export const loginSchema = z.object({
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  password: z
    .string()
    .min(8, { message: "كلمة المرور يجب أن تكون أكثر من 8 أحرف" }),
});

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    setServerError(null);
    try {
      await loginAction(data);
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">ألبريد الإلكتروني</FormLabel>
              <FormControl>
                <Input {...field} className="text-xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">كلمة المرور</FormLabel>
              <FormControl>
                <Input {...field} className="text-xl" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit" className="text-2xl">
          {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </Button>
        {serverError && <FormMessage>{serverError}</FormMessage>}
      </form>
    </Form>
  );
};

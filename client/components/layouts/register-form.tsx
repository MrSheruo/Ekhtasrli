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
import { registerAction } from "@/app/actions/authActions";
import { loginSchema } from "./login-form";

const registerSchema = loginSchema.extend({
  name: z.string().min(3, { message: "الإسم يجب أن يكون أكثر من 3 أحرف" }),
  confirmPassword: z
    .string()
    .min(8, { message: "كلمة المرور يجب أن تكون أكثر من 8 أحرف" }),
  agree: z.boolean().refine((data) => data, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
});

export const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    setServerError(null);
    try {
      // Ensure passwords match
      if (data.password !== data.confirmPassword) {
        form.setError("confirmPassword", {
          type: "manual",
          message: "كلمات المرور غير متطابقة",
        });
        return;
      }

      await registerAction(data);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">الإسم</FormLabel>
              <FormControl>
                <Input {...field} className="text-xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">البريد الإلكتروني</FormLabel>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">تأكيد كلمة المرور</FormLabel>
              <FormControl>
                <Input {...field} className="text-xl" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="space-y-0 flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  ref={field.ref}
                />
              </FormControl>
              <FormLabel className="text-xl">
                الموافقة على الشروط والأحكام
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit" className="text-2xl">
          {isLoading ? "جاري التسجيل..." : "تسجيل حساب جديد"}
        </Button>
        {serverError && <FormMessage>{serverError}</FormMessage>}
      </form>
    </Form>
  );
};

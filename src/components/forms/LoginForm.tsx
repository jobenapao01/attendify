"use client";

import { Login, loginSchema } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import PasswordInput from "../inputs/PasswordInput";
import { useUser } from "@/hooks/stores/useUserStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      matrixNumber: "",
      password: "",
    },
  });

  const onSubmit = (values: Login) => {
    const parsedUser = JSON.parse(sessionStorage.getItem("users") || "[]");

    const isUserExists = parsedUser.some(
      (user: Login) =>
        user.matrixNumber === values.matrixNumber &&
        user.password === values.password
    );

    if (isUserExists && typeof window !== "undefined") {
      sessionStorage.setItem("user", JSON.stringify(values.matrixNumber));

      Cookies.set("user", values.matrixNumber, { expires: 7 });
      router.push("/dashboard");
      toast.success("Logged in");
    } else {
      toast.error(
        "User does not exists. Please make sure that you have registered."
      );
    }
  };

  const isFormValid = form.formState.isValid;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="matrixNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matrix Number</FormLabel>
              <FormControl>
                <Input placeholder="Matrix Number" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"custom"} disabled={!isFormValid}>
          Sign In
        </Button>
      </form>
      <div className="flex flex-col justify-center gap-y-4">
        <Link className="text-muted-foreground text-xs" href="#">
          Forgot Password?
        </Link>

        <p>
          Don&apos;t have an account?{" "}
          <Link className="text-[#4054f0]" href="/register">
            Register here
          </Link>
        </p>
      </div>
    </Form>
  );
};

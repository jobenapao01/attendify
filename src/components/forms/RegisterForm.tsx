"use client";

import { Register, registerSchema } from "@/schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

export const RegisterForm = () => {
  const { onSave } = useUser();
  const router = useRouter();

  const form = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      matrixNumber: "",
      password: "",
    },
  });

  const onSubmit = (values: Register) => {
    if (typeof window !== "undefined") {
      const existingUsers = JSON.parse(sessionStorage.getItem("users") || "[]");

      existingUsers.push(values);

      sessionStorage.setItem("users", JSON.stringify(existingUsers));
    }
    onSave(values);
    form.reset();
    toast.success("User created");

    router.push("/login");
  };

  const isFormValid = form.formState.isValid;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Input Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="matrixNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matrix Number</FormLabel>
              <FormControl>
                <Input placeholder="Input Matrix Number" {...field} />
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
          Register
        </Button>
      </form>
      <div className="flex flex-col justify-center gap-y-4">
        <p>
          Already have an account?{" "}
          <Link className="text-[#4054f0]" href="/login">
            Login
          </Link>
        </p>
      </div>
    </Form>
  );
};

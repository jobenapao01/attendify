import { RegisterForm } from "@/components/forms/RegisterForm";

export default function Register() {
  return (
    <main className="flex h-dvh items-center p-5 flex-col">
      <div className="flex size-full max-h-[40rem] max-w-5xl overflow-y-hidden rounded-2xl shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10">
          <h1 className="text-center text-3xl font-bold">
            Welcome to Attendify
          </h1>
          <div className="space-y-5">
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}

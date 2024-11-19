import { LoginForm } from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <main className="flex h-dvh items-center p-5 flex-col">
      <div className="flex size-full max-h-[40rem] max-w-5xl overflow-y-hidden rounded-2xl shadow-2xl">
        <div className="hidden w-1/2 items-center justify-center shadow-2xl md:flex px-6">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-5xl font-semibold tracking-tighter">
                Attendance
              </h1>
              <span className="mt-2 block text-5xl font-semibold text-[#4054f0]">
                for your business
              </span>
            </div>

            <p className="text-muted-foreground">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur est corrupti, debitis sit esse magni aut quaerat alias
              quos ipsa.
            </p>
          </div>
        </div>
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">Welcome Back</h1>
          <div className="space-y-5">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col h-dvh justify-center items-center">
      <div className="container flex items-center justify-between gap-8 px-4 py-4">
        <Link href="/" className="text-xl font-bold text-[#002971]">
          Attendify
        </Link>
      </div>
      {children}
    </main>
  );
}

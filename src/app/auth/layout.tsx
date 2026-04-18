export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md space-y-6">{children}</div>
    </main>
  );
}

import { Navigation } from "./Navigation";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
}

export function AppShell({ children, title }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation />
      <main className="lg:ml-64 pb-20 lg:pb-8 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          {title && (
            <h1 className="text-2xl font-bold text-[#0F172A] mb-6">{title}</h1>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}

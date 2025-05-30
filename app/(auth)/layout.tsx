import Header from "@/components/Header";

type AuthLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen my-10">
      <Header />
      {children}
    </div>
  );
}

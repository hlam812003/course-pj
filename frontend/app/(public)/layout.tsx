import MainNavbar from "@/components/main-navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen min-h-screen relative">
      <MainNavbar />
      {children}
    </div>
  );
}

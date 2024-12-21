import MainNavbar from "@/components/main-navbar";
import MainFooter from "@/components/main-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen min-h-screen relative">
      <MainNavbar />
      {children}
      <MainFooter />
    </div>
  );
}

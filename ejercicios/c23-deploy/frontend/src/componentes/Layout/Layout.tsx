import { ReactNode } from "react";
import MyNavbar from "./Navbar";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" }}>
      <div className="page-background" />
      <div className="page-overlay" />
      <MyNavbar />
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
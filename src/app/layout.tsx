import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";

export const metadata: Metadata = {
  title: "re.build | Zero-Risk Web Development for Sydney SMBs",
  description:
    "Custom websites built before you pay. Review it, test it, approve it—or walk away free. Founding client spots now open.",
  openGraph: {
    title: "re.build | Zero-Risk Web Development",
    description:
      "Custom websites built before you pay. Review it, test it, approve it—or walk away free.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
        <FloatingNav />
      </body>
    </html>
  );
}

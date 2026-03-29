import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Vaccine Elite",
  description: "Digital vaccination and child health tracking platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
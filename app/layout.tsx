import "./globals.css";

export const metadata = {
  title: "Vaccine Elite",
  description: "Smart Child Immunization Tracking System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
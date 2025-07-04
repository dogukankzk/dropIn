import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight:["100", "200", "300", "400", "500", '600', '700', "800", "900"]
});


export const metadata: Metadata = {
  title: "DropIn",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="fr" suppressHydrationWarning={true}>
      <body
        className={`${poppins.variable} font-poppins antialiased`} suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}

import { Menu } from "@/common/components/Menu";
import { Roboto } from "next/font/google";
import "@/styles/reset.scss";
import "@/styles/global.scss";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

const roboto = Roboto({
  weight: ["100", "300", "500"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Menu />
        <main className="main-container">{children}</main>
      </body>
    </html>
  );
}

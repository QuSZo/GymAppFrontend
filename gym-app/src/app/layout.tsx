import { Roboto } from "next/font/google";
import "@/styles/reset.scss";
import "@/styles/global.scss";
import { AppWrapper } from "@/common/contexts/authContext";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

const roboto = Roboto({
  weight: ["100", "300", "500"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div id="dialog" />
        <div id="popover" />
        <AppWrapper>
          <main className="main-container">{children}</main>
        </AppWrapper>
      </body>
    </html>
  );
}

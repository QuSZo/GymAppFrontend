import { Roboto } from "next/font/google";
import "@/styles/reset.scss";
import "@/styles/global.scss";
import { AppWrapper } from "@/common/contexts/authContext";
import LoaderContextProvider from "@/common/contexts/loaderContext";
import { commonMetadata } from "@/common/shared-metadata";

export const metadata = {
  title: commonMetadata.title,
  description: commonMetadata.description,
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
        <AppWrapper>
          <LoaderContextProvider>
            <div id="dialog" />
            <div id="popover" />
            <main className="main-container">{children}</main>
          </LoaderContextProvider>
        </AppWrapper>
      </body>
    </html>
  );
}

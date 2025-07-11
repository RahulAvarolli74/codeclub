import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/provider";
import { Toaster } from "sonner";

const fontSans = Inter({
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "Codeclub",
  description: "Grow your coding skills with Codeclub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${fontSans.className} antialiased`}
      >
        <Provider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}

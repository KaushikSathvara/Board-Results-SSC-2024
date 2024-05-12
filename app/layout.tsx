import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Flex } from "antd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GSEB SSC 2024 Result - Name Wise",
  description:
    "GSEB SSC 2024 Result name wise, find your result by name, seat number, or grade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Flex gap={8} vertical className="p-6">
          {children}
        </Flex>
      </body>
    </html>
  );
}

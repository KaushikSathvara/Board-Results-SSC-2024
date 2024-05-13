import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Flex } from "antd";
import Script from "next/script";

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
      <Script id="clarity">{`
      <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "maxin74jir");
      </script>
      `}</Script>
      <body>
        <Flex gap={8} vertical className="p-6">
          {children}
        </Flex>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// Use Inter for body text and Poppins for headings
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: "GSEB HSC 2025 Result - Check by Name, Seat Number | Results",
  description:
    "Get instant GSEB HSC 2025 Results by name, seat number or school. Fast and official Gujarat Board HSC Science, Commerce & GUJ-CET results with subject-wise marks and percentile.",
  keywords:
    "GSEB HSC result 2025, Gujarat board result, HSC result name wise, GSEB 12th result, HSC science result, HSC commerce result, HSC arts result, GSEB result by seat number, Gujarat board 12th result",
  openGraph: {
    title: "GSEB HSC 2025 Results - Check by Name or Seat Number",
    description:
      "Access official Gujarat Board HSC 2025 results instantly. Find results by name, seat number or school with complete mark details.",
    type: "website",
    url: "https://board-results.vercel.app/",
    images: [
      {
        url: "https://via.placeholder.com/1200x630/f0f5ff/1890ff?text=GSEB+HSC+Results+2025",
        width: 1200,
        height: 630,
        alt: "GSEB HSC Results 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GSEB HSC 2025 Results - Official Results Portal",
    description:
      "Check Gujarat Board HSC 2025 results by name or seat number. Instant access to all streams.",
    images: [
      "https://via.placeholder.com/1200x630/f0f5ff/1890ff?text=GSEB+HSC+Results+2025",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "google507d30766b219532",
  },
  alternates: {
    canonical: "https://board-results.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#1890ff" />
        <link rel="icon" href="/favicon.ico" />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://board-results.vercel.app/",
              name: "GSEB HSC 2025 Results - Official Portal",
              description:
                "Official Gujarat Board HSC 2025 results with name-wise and seat number search",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://board-results.vercel.app/?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              provider: {
                "@type": "Organization",
                name: "Gujarat Secondary and Higher Secondary Education Board",
                alternateName: "GSEB",
              },
            }),
          }}
        />
      </head>
      <body className="bg-gray-50 min-h-screen">
        <div className="min-h-screen">{children}</div>

        <Script
          id="microsoft-clarity-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "maxin74jir");
            `,
          }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/space-grotesk";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "ZERO TO SIGNAL — Dheepak Karan",
    description:
      "From a 210 MW generator to an 8-billion-parameter language model: the cinematic engineering portfolio of Dheepak Karan.",
    authors: [{ name: "Dheepak Karan" }],
    keywords: [
      "Dheepak Karan",
      "software engineer",
      "machine learning",
      "electrical engineering",
      "Northeastern University",
      "portfolio",
    ],
    icons: {
      icon: "/icon.png",
      apple: "/icon.png",
    },
    openGraph: {
      type: "website",
      title: "ZERO TO SIGNAL",
      description: "From 210 MW to 8B parameters — Dheepak Karan’s engineering journey.",
      images: [
        {
          url: new URL("/og.png", metadataBase).toString(),
          width: 1200,
          height: 630,
          alt: "Zero to Signal — From 210 MW to 8B Parameters — Dheepak Karan",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "ZERO TO SIGNAL",
      description: "From 210 MW to 8B parameters — Dheepak Karan’s engineering journey.",
      images: [new URL("/og.png", metadataBase).toString()],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

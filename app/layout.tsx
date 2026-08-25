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
    title: "Dheepak Karan — Software & Machine Learning Engineer",
    description:
      "Dheepak Karan builds reliable software and machine-learning systems across backend engineering, intelligent systems and industrial automation.",
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
      title: "Dheepak Karan — Engineering Portfolio",
      description: "Software engineering, machine learning and intelligent systems—from 210 MW to 8B parameters.",
      images: [
        {
          url: new URL("/og.png", metadataBase).toString(),
          width: 1200,
          height: 630,
          alt: "Dheepak Karan — Software and Machine Learning Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Dheepak Karan — Engineering Portfolio",
      description: "Software engineering, machine learning and intelligent systems—from 210 MW to 8B parameters.",
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

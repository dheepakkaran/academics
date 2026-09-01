import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Dheepak Karan — ECE Academic Portfolio",
    description:
      "The academic portfolio of Dheepak Karan—graduate coursework, academic service and projects across machine learning, computer vision, algorithms and engineering systems.",
    authors: [{ name: "Dheepak Karan" }],
    keywords: [
      "Dheepak Karan",
      "ECE graduate student",
      "machine learning",
      "electrical engineering",
      "Northeastern University",
      "engineering research",
    ],
    icons: {
      icon: "/husky-favicon.png",
      shortcut: "/husky-favicon.png",
      apple: "/husky-favicon.png",
    },
    openGraph: {
      type: "website",
      title: "Dheepak Karan — ECE Academic Portfolio",
      description: "Graduate coursework, academic service, algorithm practice and selected projects across machine learning, computer vision, algorithms and engineering systems.",
      images: [
        {
          url: new URL("/og.png?v=20260901", metadataBase).toString(),
          width: 1200,
          height: 630,
          alt: "Dheepak Karan — ECE academic portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Dheepak Karan — ECE Academic Portfolio",
      description: "Graduate coursework, academic service and selected projects across machine learning, computer vision, algorithms and engineering systems.",
      images: [new URL("/og.png?v=20260901", metadataBase).toString()],
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

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
    title: "Dheepak Karan — Academic & Engineering Profile",
    description:
      "The academic and engineering profile of Dheepak Karan—applied machine learning, software systems and intelligent infrastructure.",
    authors: [{ name: "Dheepak Karan" }],
    keywords: [
      "Dheepak Karan",
      "software engineer",
      "machine learning",
      "electrical engineering",
      "Northeastern University",
      "engineering portfolio",
    ],
    icons: {
      icon: "/icon.png",
      apple: "/icon.png",
    },
    openGraph: {
      type: "website",
      title: "Dheepak Karan — Academic & Engineering Profile",
      description: "Selected work and technical notes across software, machine learning and intelligent infrastructure.",
      images: [
        {
          url: new URL("/og-academic.png", metadataBase).toString(),
          width: 1200,
          height: 630,
          alt: "Dheepak Karan — Academic and Engineering Profile",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Dheepak Karan — Academic & Engineering Profile",
      description: "Selected work and technical notes across software, machine learning and intelligent infrastructure.",
      images: [new URL("/og-academic.png", metadataBase).toString()],
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

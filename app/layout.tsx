import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL("https://filthyprincess.com"),
  title: {
    default: "Filthy Princess | You found something",
    template: "%s | Filthy Princess",
  },
  description:
    "A private world of beautiful disorder, intimate experiences, and invitations worth keeping.",
  openGraph: {
    title: "Filthy Princess",
    description: "You found something.",
    type: "website",
    siteName: "Filthy Princess",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={cn("font-sans", geist.variable)}><body>{children}</body></html>;
}

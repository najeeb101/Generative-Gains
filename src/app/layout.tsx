import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Generative Gains | Enterprise AI for Qatar and the GCC",
  description:
    "Generative Gains designs, deploys and runs enterprise AI: models, agents and integrations that plug into your existing systems, hosted where your data has to stay.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

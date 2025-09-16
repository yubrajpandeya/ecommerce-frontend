import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnnouncementPopup } from "@/components/announcement-popup";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Choose Your Cart",
  description: "Ecommerce",
  openGraph: {
    title: "Choose Your Cart",
    description: "Ecommerce",
    url: "https://chooseyourcart.com", 
    siteName: "Choose Your Cart",
    images: [
      {
        url: "https://chooseyourcart.com/logo.png",
        width: 800,
        height: 600,
        alt: "Choose Your Cart",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Choose Your Cart",
    description: "Ecommerce",
    images: ["https://chooseyourcart.com/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="min-h-screen bg-background">
                <Header />
                <main>{children}</main>
                <Footer />
                <AnnouncementPopup />
                <Toaster />
              </div>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

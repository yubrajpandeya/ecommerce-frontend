import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-accent transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-accent transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-accent transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-accent transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* About Authentic Choice */}
          <div>
            <h3 className="font-semibold mb-4">Choose Your Cart</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-accent transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-accent transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-accent transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold mb-4">Payment Methods</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="bg-white text-primary px-2 py-1 rounded text-xs font-medium">
                Bank Transfer
              </div>
              <div className="bg-white text-primary px-2 py-1 rounded text-xs font-medium">
                eSewa Khalti
              </div>
            </div>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} ChooseYourCart. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

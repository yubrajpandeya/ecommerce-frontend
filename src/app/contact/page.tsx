"use client";

import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Get in touch with us for any questions or support
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Location */}
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Location</h3>
              <p className="text-muted-foreground">
                Kathmandu
                <br />
                Nepal
              </p>
            </CardContent>
          </Card>

          {/* Phone */}
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone Number</h3>
              <p className="text-muted-foreground">
                Customer Support:
                <br />
                <span className="font-medium text-foreground">
                  +977 9803861618
                </span>
              </p>
              <p className="text-muted-foreground mt-2">
                Business Hours:
                <br />
                Sun - Fri: 9:00 AM - 9:00 PM
              </p>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="text-center md:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">
                support@chooseyourcart.com
                <br />
                business@chooseyourcart.com
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Business Hours */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Business Hours</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Customer Support</h4>
                <div className="space-y-1 text-muted-foreground">
                  <p>Sunday - Friday: 9:00 AM - 9:00 PM</p>
                  <p>Saturday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Order Processing</h4>
                <div className="space-y-1 text-muted-foreground">
                  <p>Sunday - Friday: 8:00 AM - 8:00 PM</p>
                  <p>Saturday: Closed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              Additional Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Shipping & Delivery</h4>
                <p className="text-muted-foreground text-sm">
                  We offer fast and reliable shipping across Nepal. Orders are
                  typically processed within 1-2 business days.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Returns & Exchanges</h4>
                <p className="text-muted-foreground text-sm">
                  Easy returns within 30 days of purchase. Items must be in
                  original condition with tags attached.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

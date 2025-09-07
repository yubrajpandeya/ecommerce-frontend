"use client";

import { Truck, Clock, MapPin, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shipping Policy</h1>
          <p className="text-lg text-muted-foreground">
            Learn about our shipping options, delivery times, and policies
          </p>
        </div>

        {/* Shipping Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Standard Shipping */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Truck className="h-6 w-6 text-primary" />
                Standard Shipping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Delivery Time</span>
                  <Badge variant="secondary">3-5 Business Days</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Cost</span>
                  <span className="font-medium">Rs. 99 - Rs. 199</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Free Shipping</span>
                  <span className="font-medium">Rs. 999+</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Perfect for non-urgent orders. Track your package in
                  real-time.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Express Shipping */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Package className="h-6 w-6 text-primary" />
                Express Shipping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Delivery Time</span>
                  <Badge variant="default">1-2 Business Days</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Cost</span>
                  <span className="font-medium">Rs. 199 - Rs. 399</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Free Shipping</span>
                  <span className="font-medium">Rs. 2499+</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Fast delivery for urgent orders. Priority handling and
                  tracking.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipping Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-primary" />
              Shipping Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Service Areas</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Major Cities</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Kathmandu Valley (Kathmandu, Lalitpur, Bhaktapur)</li>
                    <li>• Pokhara</li>
                    <li>• Chitwan</li>
                    <li>• Butwal</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Other Locations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• All major cities across Nepal</li>
                    <li>• Rural areas (additional charges may apply)</li>
                    <li>• Remote locations (express only)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Processing Time</h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">Order Processing</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Orders are typically processed within 1-2 business days.
                  During peak seasons or holidays, processing may take up to 3
                  business days.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">International Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Currently, we only ship within Nepal. We&apos;re working on
                expanding our shipping options to include international
                destinations in the future.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Policies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Shipping Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-medium mb-2">Order Tracking</h4>
              <p className="text-sm text-muted-foreground">
                Once your order ships, you&apos;ll receive a tracking number via
                SMS and email. You can track your package in real-time using our
                tracking system.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-medium mb-2">Shipping Delays</h4>
              <p className="text-sm text-muted-foreground">
                While we strive for timely delivery, shipping delays can occur
                due to weather conditions, carrier issues, or high demand.
                We&apos;ll keep you updated on any delays.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-medium mb-2">Shipping Insurance</h4>
              <p className="text-sm text-muted-foreground">
                All shipments are automatically insured against loss or damage.
                If your package arrives damaged, contact us within 48 hours for
                assistance.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-medium mb-2">Address Changes</h4>
              <p className="text-sm text-muted-foreground">
                Address changes are accepted within 2 hours of order placement.
                Once the order ships, address changes may incur additional
                charges.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need Help with Shipping?
            </h3>
            <p className="text-muted-foreground mb-4">
              Have questions about your shipment or need to update delivery
              details?
            </p>
            <div className="space-y-2">
              <p className="font-medium">Phone: +977 9803861618</p>
              <p className="font-medium">Email: support@chooseyourcart.com</p>
              <p className="text-sm text-muted-foreground">
                Business Hours: Sunday - Friday, 9:00 AM - 9:00 PM
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import {
  RefreshCw,
  Shield,
  Clock,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ReturnsRefundsPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Returns & Refunds</h1>
          <p className="text-lg text-muted-foreground">
            Learn about our hassle-free return policy and refund process
          </p>
        </div>

        {/* Return Policy Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Return Window */}
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">30-Day Returns</h3>
              <p className="text-muted-foreground">
                Return most items within 30 days of delivery for a full refund
                or exchange.
              </p>
            </CardContent>
          </Card>

          {/* Free Returns */}
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Returns</h3>
              <p className="text-muted-foreground">
                Free return shipping on defective items or our shipping errors.
              </p>
            </CardContent>
          </Card>

          {/* Quick Refunds */}
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Refunds</h3>
              <p className="text-muted-foreground">
                Refunds processed within 5-7 business days after receiving your
                return.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Return Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <RefreshCw className="h-6 w-6 text-primary" />
              How to Return an Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                    1
                  </div>
                  <h4 className="font-medium mb-2">Contact Us</h4>
                  <p className="text-sm text-muted-foreground">
                    Reach out to our customer support team to initiate your
                    return request.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                    2
                  </div>
                  <h4 className="font-medium mb-2">Get Approval</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive return authorization and shipping label (if
                    applicable).
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                    3
                  </div>
                  <h4 className="font-medium mb-2">Pack & Ship</h4>
                  <p className="text-sm text-muted-foreground">
                    Pack the item securely in its original packaging and ship it
                    back.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                    4
                  </div>
                  <h4 className="font-medium mb-2">Get Refund</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive your refund once we process your returned item.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Return Conditions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Return Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 text-green-600">
                  Items We Accept for Return
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Items in original condition and packaging
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    All original tags and labels attached
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Unused items without signs of wear
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Items damaged during shipping
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Wrong or defective items
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3 text-red-600">
                  Items We Cannot Accept
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Items worn, used, or damaged by customer
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Missing original tags or packaging
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Items returned after 30 days
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Final sale or clearance items
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Personalized or custom items
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Refund Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-primary" />
              Refund Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Processing Time</span>
                <Badge variant="secondary">5-7 Business Days</Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Refund Method</span>
                <span className="text-muted-foreground">
                  Original Payment Method
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Shipping Costs</span>
                <span className="text-muted-foreground">
                  Deducted if not our error
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">Restocking Fee</span>
                <span className="text-muted-foreground">
                  None for defective items
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> All returns must be authorized before
            shipping. Unauthorized returns may be refused or returned to sender
            at your expense. Please include your order number and reason for
            return when contacting us.
          </AlertDescription>
        </Alert>

        {/* Exchange Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Exchange Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Size/Color Exchange</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Available within 30 days of delivery</li>
                  <li>• Item must be unworn and in original condition</li>
                  <li>• Exchange shipping costs may apply</li>
                  <li>• Stock availability may affect exchanges</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Different Item Exchange</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Price difference will be charged/refunded</li>
                  <li>• Follows same return conditions</li>
                  <li>• Subject to item availability</li>
                  <li>• Contact support for assistance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Ready to Return an Item?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our customer support team is here to help you with your return or
              exchange.
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

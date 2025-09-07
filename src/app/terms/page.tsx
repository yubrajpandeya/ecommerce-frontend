"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Info } from "lucide-react";

export default function TermsConditionsPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-lg text-muted-foreground">
            Please read these terms and conditions carefully before using our
            services
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: January 2024
          </p>
        </div>

        {/* Overview Alert */}
        <Alert className="mb-8">
          <Info className="h-4 w-4" />
          <AlertDescription>
            By accessing and using Choose Your Cart, you accept and agree to be
            bound by the terms and provision of this agreement. If you do not
            agree to abide by the above, please do not use this service.
          </AlertDescription>
        </Alert>

        {/* Terms Sections */}
        <div className="space-y-8">
          {/* 1. Definitions */}
          <Card>
            <CardHeader>
              <CardTitle>1. Definitions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">
                  &quot;Choose Your Cart&quot;
                </h4>
                <p className="text-muted-foreground text-sm">
                  Refers to Choose Your Cart Pvt. Ltd., the owner and operator
                  of this e-commerce platform.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">
                  &quot;Customer&quot; or &quot;User&quot;
                </h4>
                <p className="text-muted-foreground text-sm">
                  Refers to any individual or entity who accesses or uses our
                  website and services.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">&quot;Products&quot;</h4>
                <p className="text-muted-foreground text-sm">
                  Refers to all goods and services available for purchase
                  through our platform.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">&quot;Services&quot;</h4>
                <p className="text-muted-foreground text-sm">
                  Refers to all services provided by Choose Your Cart including
                  but not limited to online shopping, delivery, and customer
                  support.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 2. Use License */}
          <Card>
            <CardHeader>
              <CardTitle>2. Use License</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Permission is granted to temporarily access and use the
                  materials (information or software) on Choose Your Cart&apos;s
                  website for personal, non-commercial transitory viewing only.
                </p>
                <p className="text-muted-foreground">
                  This is the grant of a license, not a transfer of title, and
                  under this license you may not:
                </p>
                <ul className="text-muted-foreground text-sm space-y-2 ml-6">
                  <li>• Modify or copy the materials</li>
                  <li>
                    • Use the materials for any commercial purpose or for any
                    public display
                  </li>
                  <li>
                    • Attempt to decompile or reverse engineer any software
                    contained on our website
                  </li>
                  <li>
                    • Remove any copyright or other proprietary notations from
                    the materials
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 3. User Account */}
          <Card>
            <CardHeader>
              <CardTitle>3. User Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                When you create an account with us, you must provide information
                that is accurate, complete, and current at all times. You are
                responsible for safeguarding the password and for all activities
                that occur under your account.
              </p>
              <p className="text-muted-foreground">
                You agree not to disclose your password to any third party. You
                must notify us immediately upon becoming aware of any breach of
                security or unauthorized use of your account.
              </p>
            </CardContent>
          </Card>

          {/* 4. Orders and Payment */}
          <Card>
            <CardHeader>
              <CardTitle>4. Orders and Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Order Acceptance</h4>
                <p className="text-muted-foreground text-sm">
                  All orders are subject to acceptance and availability. We
                  reserve the right to refuse or cancel any order for any
                  reason, including but not limited to product availability,
                  errors in product information, or payment issues.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Pricing</h4>
                <p className="text-muted-foreground text-sm">
                  All prices are subject to change without notice. The price
                  charged will be the price displayed on our website at the time
                  of order placement.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Payment Methods</h4>
                <p className="text-muted-foreground text-sm">
                  We accept various payment methods including credit/debit
                  cards, eSewa, Khalti, and cash on delivery. All payments are
                  processed securely.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 5. Shipping and Delivery */}
          <Card>
            <CardHeader>
              <CardTitle>5. Shipping and Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We strive to deliver products within the estimated delivery
                times specified on our website. However, delivery dates are
                estimates only and we are not liable for delays caused by
                factors beyond our control.
              </p>
              <p className="text-muted-foreground">
                Risk of loss and title for items purchased pass to the buyer
                upon delivery to the carrier. You must inspect your order upon
                receipt and notify us immediately if there are any issues.
              </p>
            </CardContent>
          </Card>

          {/* 6. Returns and Refunds */}
          <Card>
            <CardHeader>
              <CardTitle>6. Returns and Refunds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We offer a 30-day return policy for most items. Items must be in
                their original condition and packaging. Return shipping costs
                may apply unless the item is defective or incorrect.
              </p>
              <p className="text-muted-foreground">
                Refunds will be processed to the original payment method within
                5-7 business days after receiving and inspecting the returned
                item.
              </p>
            </CardContent>
          </Card>

          {/* 7. User Conduct */}
          <Card>
            <CardHeader>
              <CardTitle>7. User Conduct</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  You agree not to use our website or services to:
                </p>
                <ul className="text-muted-foreground text-sm space-y-2 ml-6">
                  <li>• Violate any applicable laws or regulations</li>
                  <li>• Transmit any harmful or malicious code</li>
                  <li>
                    • Interfere with the proper functioning of our website
                  </li>
                  <li>• Attempt to gain unauthorized access to our systems</li>
                  <li>
                    • Use our services for any fraudulent or illegal purpose
                  </li>
                  <li>
                    • Post or transmit any offensive, inappropriate, or illegal
                    content
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 8. Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>8. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The service and its original content, features, and
                functionality are and will remain the exclusive property of
                Choose Your Cart and its licensors. The service is protected by
                copyright, trademark, and other laws.
              </p>
              <p className="text-muted-foreground">
                Our trademarks and trade dress may not be used in connection
                with any product or service without our prior written consent.
              </p>
            </CardContent>
          </Card>

          {/* 9. Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>9. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                In no event shall Choose Your Cart, nor its directors,
                employees, partners, agents, suppliers, or affiliates, be liable
                for any indirect, incidental, special, consequential, or
                punitive damages, including without limitation, loss of profits,
                data, use, goodwill, or other intangible losses.
              </p>
              <p className="text-muted-foreground">
                Our total liability shall not exceed the amount paid by you for
                the products or services purchased.
              </p>
            </CardContent>
          </Card>

          {/* 10. Termination */}
          <Card>
            <CardHeader>
              <CardTitle>10. Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We may terminate or suspend your account immediately, without
                prior notice or liability, for any reason whatsoever, including
                without limitation if you breach the Terms.
              </p>
              <p className="text-muted-foreground">
                Upon termination, your right to use the service will cease
                immediately. If you wish to terminate your account, you may
                simply discontinue using the service.
              </p>
            </CardContent>
          </Card>

          {/* 11. Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle>11. Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                These Terms shall be interpreted and governed by the laws of
                Nepal, without regard to its conflict of law provisions. Our
                failure to enforce any right or provision of these Terms will
                not be considered a waiver of those rights.
              </p>
            </CardContent>
          </Card>

          {/* 12. Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>12. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will try to provide at least 30 days notice prior to any new
                terms taking effect.
              </p>
              <p className="text-muted-foreground">
                What constitutes a material change will be determined at our
                sole discretion. By continuing to access or use our service
                after those revisions become effective, you agree to be bound by
                the revised terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms & Conditions, please
                contact us:
              </p>
              <div className="space-y-2">
                <p className="font-medium">Email: legal@chooseyourcart.com</p>
                <p className="font-medium">Phone: +977 9803861618</p>
                <p className="text-sm text-muted-foreground">
                  Business Hours: Sunday - Friday, 9:00 AM - 9:00 PM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Notice */}
        <Alert className="mt-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important Notice:</strong> These terms and conditions are
            subject to change. Please check this page regularly for updates.
            Your continued use of our services constitutes acceptance of any
            changes.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

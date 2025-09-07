"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Eye, Lock, Database } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: January 2024
          </p>
        </div>

        {/* Overview Alert */}
        <Alert className="mb-8">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Choose Your Cart is committed to protecting your privacy and
            personal information. This privacy policy explains how we collect,
            use, disclose, and safeguard your information when you use our
            website and services.
          </AlertDescription>
        </Alert>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {/* 1. Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Database className="h-6 w-6 text-primary" />
                1. Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Personal Information</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  We may collect the following personal information:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-6">
                  <li>• Name, email address, and phone number</li>
                  <li>• Shipping and billing addresses</li>
                  <li>
                    • Payment information (processed securely by third parties)
                  </li>
                  <li>• Order history and preferences</li>
                  <li>• Account login credentials</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">Non-Personal Information</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  We automatically collect certain non-personal information:
                </p>
                <ul className="text-muted-foreground text-sm space-y-1 ml-6">
                  <li>• IP address and location data</li>
                  <li>• Browser type and version</li>
                  <li>• Device information</li>
                  <li>• Website usage patterns</li>
                  <li>• Cookies and tracking data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 2. How We Use Your Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary" />
                2. How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="text-muted-foreground text-sm space-y-2 ml-6">
                  <li>• To process and fulfill your orders</li>
                  <li>• To provide customer service and support</li>
                  <li>• To send you important updates about your orders</li>
                  <li>• To improve our products and services</li>
                  <li>
                    • To send you marketing communications (with your consent)
                  </li>
                  <li>• To comply with legal obligations</li>
                  <li>• To prevent fraud and ensure security</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 3. Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>3. Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information only in the
                following circumstances:
              </p>

              <div>
                <h4 className="font-medium mb-2">Service Providers</h4>
                <p className="text-muted-foreground text-sm">
                  We may share information with trusted third-party service
                  providers who assist us in operating our website, processing
                  payments, delivering products, or providing customer service.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Legal Requirements</h4>
                <p className="text-muted-foreground text-sm">
                  We may disclose information if required by law, court order,
                  or government regulation, or to protect our rights and the
                  rights of others.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Business Transfers</h4>
                <p className="text-muted-foreground text-sm">
                  In the event of a merger, acquisition, or sale of our
                  business, your information may be transferred as part of that
                  transaction.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 4. Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-primary" />
                4. Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
              </p>

              <div>
                <h4 className="font-medium mb-2">Security Measures</h4>
                <ul className="text-muted-foreground text-sm space-y-1 ml-6">
                  <li>• SSL/TLS encryption for data transmission</li>
                  <li>• Secure payment processing by certified providers</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Restricted access to personal information</li>
                  <li>• Secure data storage with backup systems</li>
                </ul>
              </div>

              <p className="text-muted-foreground text-sm">
                While we strive to protect your information, no method of
                transmission over the internet or electronic storage is 100%
                secure. We cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          {/* 5. Cookies and Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>5. Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your
                browsing experience, analyze site traffic, and personalize
                content.
              </p>

              <div>
                <h4 className="font-medium mb-2">Types of Cookies We Use</h4>
                <ul className="text-muted-foreground text-sm space-y-2 ml-6">
                  <li>
                    <strong>Essential Cookies:</strong> Required for website
                    functionality
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand how
                    visitors use our site
                  </li>
                  <li>
                    <strong>Marketing Cookies:</strong> Used to deliver relevant
                    advertisements
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> Remember your settings
                    and preferences
                  </li>
                </ul>
              </div>

              <p className="text-muted-foreground text-sm">
                You can control cookie settings through your browser
                preferences. However, disabling certain cookies may affect
                website functionality.
              </p>
            </CardContent>
          </Card>

          {/* 6. Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>6. Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You have the following rights regarding your personal
                information:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Access and Update</h4>
                  <p className="text-muted-foreground text-sm">
                    You can access and update your account information at any
                    time through your account settings.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Data Portability</h4>
                  <p className="text-muted-foreground text-sm">
                    You can request a copy of your personal data in a
                    structured, machine-readable format.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Deletion</h4>
                  <p className="text-muted-foreground text-sm">
                    You can request deletion of your personal information,
                    subject to legal requirements.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Marketing Opt-out</h4>
                  <p className="text-muted-foreground text-sm">
                    You can unsubscribe from marketing communications at any
                    time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 7. Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>7. Children&apos;s Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our services are not intended for children under 13 years of
                age. We do not knowingly collect personal information from
                children under 13. If we become aware that we have collected
                personal information from a child under 13, we will take steps
                to delete such information.
              </p>
              <p className="text-muted-foreground">
                If you are a parent or guardian and believe your child has
                provided us with personal information, please contact us
                immediately.
              </p>
            </CardContent>
          </Card>

          {/* 8. Third-Party Links */}
          <Card>
            <CardHeader>
              <CardTitle>8. Third-Party Links and Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our website may contain links to third-party websites or
                services that are not owned or controlled by us. We are not
                responsible for the privacy practices or content of these
                third-party sites.
              </p>
              <p className="text-muted-foreground">
                We encourage you to read the privacy policies of any third-party
                websites you visit.
              </p>
            </CardContent>
          </Card>

          {/* 9. International Data Transfers */}
          <Card>
            <CardHeader>
              <CardTitle>9. International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your information may be transferred to and processed in
                countries other than Nepal. We ensure that such transfers comply
                with applicable data protection laws and implement appropriate
                safeguards to protect your information.
              </p>
            </CardContent>
          </Card>

          {/* 10. Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle>10. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We retain your personal information for as long as necessary to
                provide our services, comply with legal obligations, resolve
                disputes, and enforce our agreements.
              </p>
              <p className="text-muted-foreground">
                When we no longer need your information, we will securely delete
                or anonymize it.
              </p>
            </CardContent>
          </Card>

          {/* 11. Changes to Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle>11. Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new privacy policy on
                this page and updating the &quot;Last updated&quot; date.
              </p>
              <p className="text-muted-foreground">
                We recommend that you review this privacy policy periodically to
                stay informed about how we are protecting your information.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="space-y-2">
                <p className="font-medium">Email: privacy@chooseyourcart.com</p>
                <p className="font-medium">Phone: +977 9803861618</p>
                <p className="text-sm text-muted-foreground">
                  Business Hours: Sunday - Friday, 9:00 AM - 9:00 PM
                </p>
              </div>
              <div className="mt-4">
                <p className="text-muted-foreground text-sm">
                  You can also update your privacy preferences or request access
                  to your data through your account settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Notice */}
        <Alert className="mt-8">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Your Privacy Matters:</strong> We are committed to
            protecting your personal information and being transparent about our
            data practices. If you have any concerns about your privacy, please
            don&apos;t hesitate to contact us.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

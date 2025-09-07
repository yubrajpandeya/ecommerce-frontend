"use client";

import { Users, Target, Award, Heart, TrendingUp, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutUsPage() {
  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: Users },
    { label: "Products Available", value: "5,000+", icon: Target },
    { label: "Years of Service", value: "5+", icon: Award },
    { label: "Cities Covered", value: "50+", icon: Globe },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We put our customers at the heart of everything we do, ensuring exceptional service and satisfaction.",
    },
    {
      icon: TrendingUp,
      title: "Quality Excellence",
      description:
        "We maintain the highest standards in product quality and service delivery across all our operations.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description:
        "We actively contribute to our local communities and support initiatives that make a positive impact.",
    },
    {
      icon: Target,
      title: "Innovation",
      description:
        "We continuously innovate to provide the latest products and best shopping experience to our customers.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About Choose Your Cart</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted online shopping destination in Nepal, bringing you the
            best products with exceptional service and unbeatable value since
            2019.
          </p>
        </div>

        {/* Our Story */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  From Humble Beginnings
                </h3>
                <p className="text-muted-foreground mb-4">
                  Choose Your Cart was founded with a simple mission: to make
                  quality products accessible to everyone in Nepal. What started
                  as a small online store has grown into one of Nepal&apos;s
                  most trusted e-commerce platforms.
                </p>
                <p className="text-muted-foreground mb-4">
                  We recognized the challenges Nepali consumers faced in
                  accessing quality products and reliable shopping experiences.
                  Our founders, with their deep understanding of the local
                  market, set out to bridge this gap.
                </p>
                <p className="text-muted-foreground">
                  Today, we serve thousands of customers across Nepal, offering
                  a wide range of products from electronics to fashion, all with
                  our commitment to quality, affordability, and exceptional
                  customer service.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-lg">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">
                    2019
                  </div>
                  <div className="text-lg font-medium mb-4">Founded</div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    50K+
                  </div>
                  <div className="text-lg font-medium">Orders Delivered</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Our Values */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">
                        {value.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide Nepali consumers with access to quality products at
                competitive prices, backed by exceptional customer service and a
                seamless online shopping experience. We strive to be the most
                trusted and preferred e-commerce platform in Nepal.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Award className="h-6 w-6 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become Nepal&apos;s leading e-commerce platform, setting the
                standard for online shopping excellence while contributing
                positively to the economic development of our nation and the
                well-being of our communities.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              Why Choose Choose Your Cart?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="text-lg">✓</Badge>
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  Quality Assurance
                </h4>
                <p className="text-muted-foreground text-sm">
                  Every product undergoes rigorous quality checks before
                  reaching our customers.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="text-lg">🚚</Badge>
                </div>
                <h4 className="text-lg font-semibold mb-2">Fast Delivery</h4>
                <p className="text-muted-foreground text-sm">
                  Quick and reliable delivery across Nepal with real-time
                  tracking updates.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="text-lg">💬</Badge>
                </div>
                <h4 className="text-lg font-semibold mb-2">24/7 Support</h4>
                <p className="text-muted-foreground text-sm">
                  Round-the-clock customer support to assist you with any
                  queries or concerns.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-muted-foreground mb-6">
              Have questions about our company or want to learn more about our
              services? We&apos;d love to hear from you.
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

"use client";

import {
  Briefcase,
  Users,
  Heart,
  TrendingUp,
  MapPin,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Comprehensive health coverage for you and your family",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Work-life balance with flexible working arrangements",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Opportunities for professional development and advancement",
  },
  {
    icon: Users,
    title: "Team Events",
    description: "Regular team building activities and company events",
  },
  {
    icon: Briefcase,
    title: "Learning Budget",
    description: "Annual budget for training and skill development",
  },
  {
    icon: MapPin,
    title: "Modern Office",
    description: "Contemporary workspace in the heart of Kathmandu",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Be part of Nepal&apos;s growing e-commerce revolution. We&apos;re
            looking for passionate, talented individuals who want to make a
            difference in the world of online shopping.
          </p>
        </div>

        {/* Why Join Us */}
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
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  Growth Opportunity
                </h4>
                <p className="text-muted-foreground">
                  Join a rapidly growing company with endless opportunities for
                  career advancement and professional development.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  Great Team Culture
                </h4>
                <p className="text-muted-foreground">
                  Work with a diverse and talented team in a collaborative
                  environment that values innovation and creativity.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  Work-Life Balance
                </h4>
                <p className="text-muted-foreground">
                  Enjoy flexible working hours, competitive benefits, and a
                  supportive work environment that prioritizes employee
                  well-being.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              What We Offer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Open Positions */}
        {/* <div className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-8">
            Open Positions
          </h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        {position.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary">{position.department}</Badge>
                        <Badge variant="outline">{position.type}</Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <MapPin className="h-3 w-3" />
                          {position.location}
                        </Badge>
                        <Badge variant="outline">{position.experience}</Badge>
                      </div>
                    </div>
                    <Button size="lg">Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {position.description}
                  </p>
                  <div>
                    <h5 className="font-medium mb-2">Requirements:</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

        {/* Application Process */}
        {/* <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl text-center">How to Apply</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h4 className="font-medium mb-2">Review Positions</h4>
                <p className="text-sm text-muted-foreground">
                  Browse our open positions and find the role that matches your
                  skills and interests.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h4 className="font-medium mb-2">Submit Application</h4>
                <p className="text-sm text-muted-foreground">
                  Send us your resume and cover letter through our application
                  portal.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h4 className="font-medium mb-2">Initial Screening</h4>
                <p className="text-sm text-muted-foreground">
                  Our HR team will review your application and schedule an
                  initial interview.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h4 className="font-medium mb-2">Join Our Team</h4>
                <p className="text-sm text-muted-foreground">
                  Successful candidates will receive an offer and begin their
                  journey with us.
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Contact CTA */}
        {/* <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Don&apos;t See the Perfect Role?
            </h3>
            <p className="text-muted-foreground mb-6">
              We&apos;re always looking for talented individuals. Send us your
              resume for future opportunities, or reach out if you have
              questions about our company culture.
            </p>
            <div className="space-y-2">
              <p className="font-medium">Email: careers@chooseyourcart.com</p>
              <p className="font-medium">Phone: +977 9803861618</p>
              <p className="text-sm text-muted-foreground">
                Business Hours: Sunday - Friday, 9:00 AM - 9:00 PM
              </p>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}

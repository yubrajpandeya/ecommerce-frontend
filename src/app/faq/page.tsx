"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqData = [
  {
    id: "shipping",
    question: "How long does shipping take?",
    answer:
      "We offer fast and reliable shipping across Nepal. Standard delivery typically takes 3-5 business days within metro cities and 5-7 business days for other locations. Express delivery options are available for urgent orders.",
  },
  {
    id: "returns",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. Items must be in their original condition with tags attached. Return shipping costs may apply unless the item is defective or incorrect. Contact our customer support to initiate a return.",
  },
  {
    id: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards, eSewa, Khalti, net banking, and cash on delivery. All payments are processed securely through our encrypted payment gateway.",
  },
  {
    id: "tracking",
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking number via SMS and email. You can track your order status in real-time using the tracking link provided or by logging into your account.",
  },
  {
    id: "damaged",
    question: "What if my order arrives damaged?",
    answer:
      "If your order arrives damaged, please contact us within 48 hours of delivery with photos of the damaged item and packaging. We'll arrange for a replacement or full refund at no extra cost to you.",
  },
  {
    id: "exchange",
    question: "Can I exchange an item for a different size/color?",
    answer:
      "Yes, we offer size and color exchanges within 30 days of purchase. Exchange shipping costs may apply. Please ensure the item is unworn and has all original tags attached.",
  },
  {
    id: "cancel",
    question: "Can I cancel my order?",
    answer:
      "Orders can be cancelled within 2 hours of placement before they enter processing. Contact our customer support immediately if you need to cancel an order.",
  },
  {
    id: "refund",
    question: "How long do refunds take?",
    answer:
      "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be credited to your original payment method.",
  },
  {
    id: "international",
    question: "Do you ship internationally?",
    answer:
      "Currently, we only ship within Nepal. We're working on expanding our shipping options to include international destinations in the future.",
  },
  {
    id: "bulk",
    question: "Do you offer bulk/wholesale pricing?",
    answer:
      "Yes, we offer special pricing for bulk orders. Please contact our business team at business@chooseyourcart.com for wholesale inquiries and pricing.",
  },
  {
    id: "account",
    question: "Do I need an account to place an order?",
    answer:
      "Yes, creating an account allows you to track orders, save shipping addresses, and enjoy a faster checkout experience.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our products and services
          </p>
        </div>

        {/* FAQ Accordion */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">General Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              Can&apos;t find the answer you&apos;re looking for? Our customer
              support team is here to help.
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

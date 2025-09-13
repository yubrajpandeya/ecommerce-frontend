"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ShoppingCart,
  ArrowLeft,
  CreditCard,
  MapPin,
  Phone,
  User,
  Mail,
  CheckCircle,
  Loader2,
  Lock,
  QrCode,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useCart, getEffectivePrice, isProductOnSale } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { api, CreateOrderRequest } from "@/lib/api";
import { cn, fixImageUrl } from "@/lib/utils";

type CheckoutStep = "billing" | "payment" | "confirmation";

interface BillingFormData {
  full_name: string;
  email: string;
  phone_number: string;
  shipping_address: string;
  city: string;
  postal_code: string;
  notes: string;
}

function CheckoutPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  
  const { items, clearCart, getItemTotal } = useCart();
  const { token, isAuthenticated, user } = useAuth();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("billing");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState<string>("");
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Check if this is a single product checkout
  const checkoutItems = productId 
    ? items.filter(item => item.product.id === parseInt(productId))
    : items;

  const checkoutTotal = checkoutItems.reduce((total, item) => total + getItemTotal(item), 0);

  const [billingData, setBillingData] = useState<BillingFormData>({
    full_name: user?.name || "",
    email: user?.email || "",
    phone_number: "",
    shipping_address: "",
    city: "",
    postal_code: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/checkout");
      return;
    }

    if (checkoutItems.length === 0) {
      router.push("/cart");
      return;
    }
  }, [isAuthenticated, checkoutItems.length, router]);

    // Phone number formatting function
  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');
    
    // If it starts with 977, remove country code to fit 10 char limit
    if (digits.startsWith('977') && digits.length > 10) {
      return digits.substring(3); // Remove country code
    }
    
    // If it's longer than 10 digits, take last 10
    if (digits.length > 10) {
      return digits.substring(digits.length - 10);
    }
    
    return digits;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setBillingData({...billingData, phone_number: formatted});
  };

  const handleBillingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    const requiredFields = ["full_name", "email", "phone_number", "shipping_address", "city"];
    const missingFields = requiredFields.filter(field => !billingData[field as keyof BillingFormData]);

    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    // Validate phone number length
    if (billingData.phone_number.length !== 10) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    // Validate phone number format (should be only digits)
    if (!/^\d{10}$/.test(billingData.phone_number)) {
      setError("Phone number should contain only digits");
      return;
    }

    setCurrentStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");

    try {
      // For now, handle single product orders (as per current API)
      // Note: Multiple item checkout requires API enhancement
      if (checkoutItems.length > 1) {
        setError("Multiple item checkout is not supported yet. Please checkout items individually.");
        setIsProcessing(false);
        return;
      }

      const item = checkoutItems[0];

      // Handle payment screenshot requirement
      let screenshot = paymentScreenshot;
      if (!screenshot && paymentMethod !== "cod") {
        setError("Please upload payment screenshot for QR payments.");
        setIsProcessing(false);
        return;
      }

      // For COD orders, create a proper dummy image file that looks more legitimate
      if (!screenshot && paymentMethod === "cod") {
        // Create a 1x1 transparent PNG as a proper image file
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        
        // Wait for blob creation and ensure we have a file
        await new Promise<void>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              screenshot = new File([blob], "cod_placeholder.png", { type: "image/png" });
            } else {
              // Fallback if canvas.toBlob fails
              const emptyBlob = new Blob([new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10])], { type: "image/png" });
              screenshot = new File([emptyBlob], "cod_placeholder.png", { type: "image/png" });
            }
            resolve();
          }, 'image/png');
        });
      }

      // Ensure we have a screenshot file at this point
      if (!screenshot) {
        setError("Unable to process payment. Please try again.");
        setIsProcessing(false);
        return;
      }

      const orderData: CreateOrderRequest = {
        product_id: item.product.id,
        quantity: item.quantity,
        shipping_address: billingData.shipping_address,
        phone_number: billingData.phone_number,
        payment_method: paymentMethod,
        full_name: billingData.full_name,
        email: billingData.email,
        city: billingData.city,
        postal_code: billingData.postal_code,
        notes: billingData.notes,
        payment_screenshot: screenshot,
      };

      console.log("Order data being sent:", {
        ...orderData,
        payment_screenshot: orderData.payment_screenshot.name,
        payment_screenshot_size: orderData.payment_screenshot.size,
        payment_screenshot_type: orderData.payment_screenshot.type
      });

      try {
        const response = await api.createOrder(token!, orderData);
        console.log("Order created successfully:", response);
        setOrderId(response.order.id.toString());
        setOrderCompleted(true);

        // Clear cart items that were ordered (but after setting order completed)
        if (!productId) {
          clearCart();
        }

        setCurrentStep("confirmation");
      } catch (apiError: unknown) {
        // Try to show detailed backend validation errors if present
        if (apiError instanceof Error) {
          setError(apiError.message);
        } else if (typeof apiError === 'string') {
          setError(apiError);
        } else {
          setError("Failed to create order (unknown error)");
        }
        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === 'string') {
        setError(error);
      } else {
        setError("Failed to create order");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    { id: "billing", title: "Billing Information", icon: User },
    { id: "payment", title: "Payment Method", icon: CreditCard },
    { id: "confirmation", title: "Order Confirmation", icon: CheckCircle },
  ];

  if (!isAuthenticated || (checkoutItems.length === 0 && !orderCompleted)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
                Secure Checkout
              </h1>
              <p className="text-muted-foreground">Complete your purchase safely and securely</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = 
                (currentStep === "payment" && step.id === "billing") ||
                (currentStep === "confirmation" && (step.id === "billing" || step.id === "payment"));

              return (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                    isCompleted 
                      ? "bg-green-500 border-green-500 text-white"
                      : isActive 
                        ? "bg-primary border-primary text-white"
                        : "border-muted-foreground/30 text-muted-foreground"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={cn(
                    "ml-2 text-sm font-medium hidden sm:block",
                    isCompleted ? "text-green-600" : isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-12 h-0.5 mx-4 transition-all",
                      isCompleted ? "bg-green-500" : "bg-muted-foreground/30"
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Billing Information Step */}
            {currentStep === "billing" && (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-background/90 to-muted/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Billing Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBillingSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="full_name" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name *
                        </Label>
                        <Input
                          id="full_name"
                          type="text"
                          value={billingData.full_name}
                          onChange={(e) => setBillingData({...billingData, full_name: e.target.value})}
                          placeholder="Enter your full name"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={billingData.email}
                          onChange={(e) => setBillingData({...billingData, email: e.target.value})}
                          placeholder="Enter your email"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone_number" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone_number"
                        type="tel"
                        value={billingData.phone_number}
                        onChange={handlePhoneChange}
                        placeholder="98XXXXXXXX (10 digits only)"
                        required
                        maxLength={10}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter 10 digits only (without country code +977)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="shipping_address" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Shipping Address *
                      </Label>
                      <Textarea
                        id="shipping_address"
                        value={billingData.shipping_address}
                        onChange={(e) => setBillingData({...billingData, shipping_address: e.target.value})}
                        placeholder="Enter your complete shipping address"
                        required
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          City *
                        </Label>
                        <Input
                          id="city"
                          type="text"
                          value={billingData.city}
                          onChange={(e) => setBillingData({...billingData, city: e.target.value})}
                          placeholder="Enter your city"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postal_code">Postal Code</Label>
                        <Input
                          id="postal_code"
                          type="text"
                          value={billingData.postal_code}
                          onChange={(e) => setBillingData({...billingData, postal_code: e.target.value})}
                          placeholder="Enter postal code"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        value={billingData.notes}
                        onChange={(e) => setBillingData({...billingData, notes: e.target.value})}
                        placeholder="Any special instructions for your order..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    >
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Payment Method Step */}
            {currentStep === "payment" && (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-background/90 to-muted/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">Cash on Delivery</div>
                                <div className="text-sm text-muted-foreground">Pay when you receive your order</div>
                              </div>
                              <div className="text-green-600 font-medium">Available</div>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="qr_payment" id="qr_payment" />
                          <Label htmlFor="qr_payment" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium flex items-center gap-2">
                                  <QrCode className="h-4 w-4" />
                                  QR Payment
                                </div>
                                <div className="text-sm text-muted-foreground">Scan QR code to pay instantly</div>
                              </div>
                              <div className="text-blue-600 font-medium">Instant</div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "qr_payment" && (
                      <div className="space-y-4">
                        <Alert>
                          <QrCode className="h-4 w-4" />
                          <AlertDescription>
                            Scan the QR code below with your mobile banking app or digital wallet to complete the payment.
                          </AlertDescription>
                        </Alert>
                        
                        {/* QR Code Display */}
                        <div className="flex justify-center p-6 bg-muted/30 rounded-lg border-2 border-dashed">
                          <div className="text-center">
                            <div className="w-48 h-48 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center mb-4">
                              <Image 
                                src="/qr.jpg" 
                                alt="Payment QR Code"
                                width={180}
                                height={180}
                                className="rounded"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Scan this QR code to pay Rs. {checkoutTotal.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              After payment, upload the screenshot below
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "qr_payment" && (
                      <div>
                        <Label htmlFor="payment_screenshot" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Payment Screenshot *
                        </Label>
                        <Input
                          id="payment_screenshot"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setPaymentScreenshot(file);
                              console.log("File selected:", file.name, "Size:", file.size, "Type:", file.type);
                            }
                          }}
                          className="mt-1"
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Upload a screenshot or photo of your payment confirmation
                        </p>
                        {paymentScreenshot && (
                          <div className="mt-2 p-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                            <p className="text-sm text-green-700 dark:text-green-300">
                              ✓ File selected: {paymentScreenshot.name} ({(paymentScreenshot.size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setCurrentStep("billing")}
                        className="flex-1"
                      >
                        Back to Billing
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isProcessing}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      >
                        {isProcessing ? (
                          <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</>
                        ) : (
                          <><Lock className="h-4 w-4 mr-2" /> Place Order</>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Confirmation Step */}
            {currentStep === "confirmation" && (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
                    Order Placed Successfully!
                  </h2>
                  <p className="text-green-600 dark:text-green-400 mb-6">
                    Thank you for your purchase. Your order #{orderId} has been received.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button asChild variant="outline">
                      <Link href="/orders">View Orders</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/">Continue Shopping</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-background/90 to-muted/20 backdrop-blur-sm sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {checkoutItems.map((item) => {
                  const price = parseFloat(item.product.price);
                  const isOnSale = isProductOnSale(item.product);
                  const effectivePrice = getEffectivePrice(item.product);

                  return (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={fixImageUrl(item.product.image_url)}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <Badge className="absolute -top-1 -right-1 w-6 h-6 p-0 flex items-center justify-center text-xs">
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {isOnSale ? (
                            <>
                              <span className="text-sm font-semibold text-black">
                                Rs. {effectivePrice.toLocaleString()}
                              </span>
                              <span className="text-xs text-muted-foreground line-through">
                                Rs. {price.toLocaleString()}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm font-semibold text-black">
                              Rs. {effectivePrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-black">
                          Rs. {getItemTotal(item).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-black">Rs. {checkoutTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span className="text-black">Rs. {checkoutTotal.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPageInner />
    </Suspense>
  );
}

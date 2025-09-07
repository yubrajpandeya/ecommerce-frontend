"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Package,
  MapPin,
  CreditCard,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import { api, OrderDetail } from "@/lib/api";

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-500";
    case "processing":
      return "bg-blue-500";
    case "shipped":
      return "bg-purple-500";
    case "delivered":
      return "bg-green-600";
    case "cancelled":
      return "bg-red-500";
    case "payment_verification":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

const formatStatus = (status: string) => {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { token, isAuthenticated, isLoading } = useAuth();

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchOrderDetail = useCallback(async () => {
    if (!token || !params.id) return;

    try {
      setLoading(true);
      const orderData = await api.getOrderDetail(
        token,
        parseInt(params.id as string)
      );
      setOrder(orderData);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load order details"
      );
    } finally {
      setLoading(false);
    }
  }, [token, params.id]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (isAuthenticated && !params.id) {
      setError("Invalid order ID");
      setLoading(false);
      return;
    }

    if (isAuthenticated && params.id) {
      fetchOrderDetail();
    }
  }, [isAuthenticated, isLoading, params.id, token, router, fetchOrderDetail]);

  const handleCancelOrder = async () => {
    if (!token || !order) return;

    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      await api.cancelOrder(token, order.id);
      // Refresh order details
      await fetchOrderDetail();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to cancel order");
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin mr-4" />
            <p className="text-muted-foreground">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[calc(100vh-200px)] py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Button variant="outline" onClick={() => router.push("/orders")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </div>
          <Alert variant="destructive">
            <AlertDescription>{error || "Order not found"}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" onClick={() => router.push("/orders")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Order Details</h1>
              <p className="text-muted-foreground">
                Order #{order.order_number}
              </p>
            </div>
            <Badge
              className={`${getStatusColor(
                order.status
              )} text-white text-lg px-4 py-2`}
            >
              {formatStatus(order.status)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={order.product_image}
                      alt={order.product_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {order.product_name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {order.category_name}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span>Quantity: {order.quantity}</span>
                      <span>
                        Unit Price: Rs. {parseFloat(order.unit_price).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-lg font-bold mt-2">
                      Total: Rs. {parseFloat(order.total_amount).toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Shipping Address</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.shipping_address}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Phone Number</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.phone_number}
                  </p>
                </div>
                {order.notes && (
                  <div>
                    <h4 className="font-medium mb-1">Notes</h4>
                    <p className="text-sm text-muted-foreground">
                      {order.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Order Placed</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {order.payment_verified_at && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Payment Verified</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.payment_verified_at).toLocaleString()}
                        </p>
                        {order.verifier && (
                          <p className="text-xs text-muted-foreground">
                            Verified by: {order.verifier.name}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {order.status === "confirmed" && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Order Confirmed</p>
                        <p className="text-sm text-muted-foreground">
                          Ready for processing
                        </p>
                      </div>
                    </div>
                  )}

                  {order.status === "processing" && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Processing</p>
                        <p className="text-sm text-muted-foreground">
                          Your order is being prepared
                        </p>
                      </div>
                    </div>
                  )}

                  {order.status === "shipped" && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Shipped</p>
                        <p className="text-sm text-muted-foreground">
                          Your order has been shipped
                        </p>
                      </div>
                    </div>
                  )}

                  {order.status === "delivered" && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Delivered</p>
                        <p className="text-sm text-muted-foreground">
                          Your order has been delivered
                        </p>
                      </div>
                    </div>
                  )}

                  {order.status === "cancelled" && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Cancelled</p>
                        <p className="text-sm text-muted-foreground">
                          Order has been cancelled
                        </p>
                        {order.admin_notes && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Reason: {order.admin_notes}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Actions */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Order Number:</span>
                  <span className="font-medium">{order.order_number}</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Date:</span>
                  <span className="font-medium">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>
                    Rs. {parseFloat(order.total_amount).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Screenshot */}
            {order.payment_screenshot_url && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Screenshot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={order.payment_screenshot_url}
                      alt="Payment Screenshot"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Submitted payment proof
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(order.status === "pending" ||
                  order.status === "payment_verification") && (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleCancelOrder}
                  >
                    Cancel Order
                  </Button>
                )}

                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/product/${order.product_slug}`}>Buy Again</Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/orders")}
                >
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

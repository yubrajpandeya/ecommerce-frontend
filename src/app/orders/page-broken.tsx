"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Package, Eye, Loader2, MapPin, Phone, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { api, Order, PaginatedResponse } from "@/lib/api";

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

export default function OrdersPage() {
  const router = useRouter();
  const { token, isAuthenticated, isLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [pagination, setPagination] = useState<PaginatedResponse<Order> | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchOrders = useCallback(
    async (page: number = 1) => {
      if (!token) return;

      try {
        setLoading(true);
        const response: PaginatedResponse<Order> = await api.getUserOrders(
          token,
          {
            per_page: 10,
            page,
          }
        );
        setOrders(response.data);
        setPagination(response);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (isAuthenticated && token) {
      fetchOrders();
    }
  }, [isAuthenticated, isLoading, token, router, fetchOrders]);

  const handleCancelOrder = async (orderId: number) => {
    if (!token) return;

    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      await api.cancelOrder(token, orderId);
      // Refresh orders
      await fetchOrders();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to cancel order");
    }
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === "" || 
      order.id.toString().includes(searchTerm) ||
      order.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] py-12 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground text-lg">Loading your orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] py-8 lg:py-12 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-2xl lg:text-3xl font-bold gradient-text-primary mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track and manage your orders</p>
          <div className="h-1 w-20 gradient-primary rounded-full mt-4"></div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders by product name or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-foreground min-w-[150px]"
            >
              <option value="all">All Orders</option>
              <option value="payment_verification">Payment Verification</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Content */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {orders.length === 0 ? "No orders yet" : "No matching orders"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {orders.length === 0 
                  ? "When you place your first order, it will appear here."
                  : "Try adjusting your search or filter criteria."
                }
              </p>
              {orders.length === 0 && (
                <Button asChild className="gradient-primary">
                  <Link href="/">Start Shopping</Link>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Orders Count */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredOrders.length} of {orders.length} orders
              </p>
            </div>

            {/* Orders List */}
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background/90 to-muted/20 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4 bg-gradient-to-r from-muted/30 to-muted/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg mb-1">Order #{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Placed on {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      className={`${getStatusColor(order.status)} text-white px-3 py-1`}
                    >
                      {formatStatus(order.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                        <Image
                          src={order.product_image}
                          alt={order.product_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="font-semibold text-lg">
                          {order.product_name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {order.quantity} × Rs. {parseFloat(order.unit_price).toLocaleString()}
                        </p>
                        <p className="text-lg font-bold text-accent mt-1">
                          Total: Rs. {parseFloat(order.total_amount).toLocaleString()}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Shipping Address</p>
                            <p className="text-muted-foreground">
                              {order.shipping_address}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-muted-foreground">
                              {order.phone_number}
                            </p>
                          </div>
                        </div>
                      </div>

                      {order.notes && (
                        <div>
                          <p className="font-medium text-sm">Notes</p>
                          <p className="text-sm text-muted-foreground">
                            {order.notes}
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/orders/${order.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                        
                        {/* Status-specific buttons */}
                        {(order.status === "payment_verification") && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            Cancel Order
                          </Button>
                        )}
                        {order.status === "confirmed" && (
                          <Button variant="outline" size="sm" disabled>
                            Order Confirmed
                          </Button>
                        )}
                        {order.status === "processing" && (
                          <Button variant="outline" size="sm" disabled>
                            Processing
                          </Button>
                        )}
                        {order.status === "shipped" && (
                          <Button variant="outline" size="sm" disabled>
                            On the Way
                          </Button>
                        )}
                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm" disabled>
                            Delivered
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  disabled={pagination.current_page === 1}
                  onClick={() => fetchOrders(pagination.current_page - 1)}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4 py-2 text-sm">
                  Page {pagination.current_page} of {pagination.last_page}
                </span>
                <Button
                  variant="outline"
                  disabled={pagination.current_page === pagination.last_page}
                  onClick={() => fetchOrders(pagination.current_page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
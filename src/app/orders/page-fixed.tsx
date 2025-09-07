"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { api, Order, PaginatedResponse } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { 
  Calendar, 
  Package, 
  Eye, 
  Search,
  ArrowLeft 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function OrdersPage() {
  const { isAuthenticated, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Order> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchOrders();
    }
  }, [isAuthenticated, token]);

  const fetchOrders = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await api.getUserOrders(token!);
      setOrders(response.data || []);
      setPagination(response);
      setError("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-gradient-to-r from-yellow-500 to-yellow-600";
      case "confirmed": return "bg-gradient-to-r from-blue-500 to-blue-600";
      case "shipped": return "bg-gradient-to-r from-purple-500 to-purple-600";
      case "delivered": return "bg-gradient-to-r from-green-500 to-green-600";
      case "cancelled": return "bg-gradient-to-r from-red-500 to-red-600";
      default: return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = !searchTerm || 
      order.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-muted-foreground mb-6">You need to login to view your orders</p>
          <Button asChild>
            <Link href="/login">Login Now</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] py-8 lg:py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex gap-4">
                  <Skeleton className="w-24 h-24 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-200px)] py-8 lg:py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
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
        </div>

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
              className="px-3 py-2 border rounded-md bg-background text-foreground"
            >
              <option value="">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
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
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/orders/${order.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                        {order.status === "confirmed" && (
                          <Button variant="outline" size="sm" disabled>
                            Preparing Order
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

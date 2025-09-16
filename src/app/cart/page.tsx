"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useCart, getEffectivePrice, isProductOnSale } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { fixImageUrl } from "@/lib/utils";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { isAuthenticated } = useAuth();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = (productId?: number) => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/checkout");
      return;
    }
    
    // Redirect to dedicated checkout page
    if (productId) {
      router.push(`/checkout?product=${productId}`);
    } else {
      router.push("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Link href="/">
                <Store className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/orders">My Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
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
                Shopping Cart
              </h1>
              <p className="text-muted-foreground">
                {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const price = parseFloat(item.product.price);
              const salePrice = item.product.sale_price ? parseFloat(item.product.sale_price) : null;
              const isOnSale = isProductOnSale(item.product);
              const effectivePrice = getEffectivePrice(item.product);
              const itemTotal = effectivePrice * item.quantity;

              return (
                <Card key={item.product.id} className="border-0 shadow-lg bg-gradient-to-br from-background/90 to-muted/20 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={fixImageUrl(item.product.image_url)}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                        {isOnSale && (
                          <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded">
                            -{Math.round(((price - salePrice!) / price) * 100)}%
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground line-clamp-2">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Category: {item.product.category.name}
                          </p>
                        </div>
                        
                        {/* Price Display */}
                        <div className="flex items-center gap-2">
                          {isOnSale ? (
                            <>
                              <span className="text-lg font-bold text-black">
                                Rs. {effectivePrice.toLocaleString()}
                              </span>
                              <span className="text-sm text-muted-foreground line-through">
                                Rs. {price.toLocaleString()}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-black">
                              Rs. {effectivePrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-sm text-muted-foreground">per item</span>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="text-xl font-bold text-black">
                            Rs. {itemTotal.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:items-end">
                        <Button
                          size="sm"
                          onClick={() => handleCheckout(item.product.id)}
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 whitespace-nowrap"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Checkout Item
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
                <div className="space-y-2">
                  {items.map((item) => {
                    const effectivePrice = getEffectivePrice(item.product);
                    const itemTotal = effectivePrice * item.quantity;
                    
                    return (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="line-clamp-1">{item.product.name} × {item.quantity}</span>
                        <span className="font-medium text-black">Rs. {itemTotal.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>

                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items):</span>
                    <span className="text-black">Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span className="text-black">Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    onClick={() => handleCheckout()}
                    disabled={items.length === 0}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Checkout All Items
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Clear Cart
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link href="/">Continue Shopping</Link>
                    </Button>
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

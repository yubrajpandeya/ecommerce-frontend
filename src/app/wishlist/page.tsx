"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import Image from "next/image";
import { 
  Heart, 
  ShoppingCart, 
  Eye, 
  Trash2,
  ArrowLeft 
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart, getEffectivePrice, isProductOnSale } from "@/lib/cart-context";
import { Product } from "@/lib/api";
import { cn, fixImageUrl } from "@/lib/utils";

// Mock wishlist data - in a real app, this would come from an API
const mockWishlistItems: Product[] = [
  {
    id: 1,
    category_id: 1,
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: "4999",
    sale_price: "3999",
    stock: 10,
    is_featured: true,
    is_upcoming: false,
    available_from: null,
    image_url: "/wireless-bluetooth-headphones-yellow-background.png",
    rating: 4.5,
    reviews_count: 128,
    category: { id: 1, name: "Electronics", slug: "electronics" }
  },
  {
    id: 2,
    category_id: 2,
    name: "Elegant Brown Leather Handbag",
    slug: "elegant-brown-leather-handbag",
    description: "Premium quality leather handbag perfect for any occasion",
    price: "7999",
    stock: 5,
    is_featured: false,
    is_upcoming: false,
    available_from: null,
    image_url: "/womens-leather-handbag-brown-elegant.png",
    rating: 4.8,
    reviews_count: 95,
    category: { id: 2, name: "Fashion", slug: "fashion" }
  },
  {
    id: 3,
    category_id: 3,
    name: "Smart Fitness Tracker Watch",
    slug: "smart-fitness-tracker-watch",
    description: "Advanced fitness tracking with heart rate monitoring",
    price: "12999",
    sale_price: "9999",
    stock: 0,
    is_featured: true,
    is_upcoming: false,
    available_from: null,
    image_url: "/smart-watch-fitness-tracker-white-background.png",
    rating: 4.3,
    reviews_count: 76,
    category: { id: 3, name: "Fitness", slug: "fitness" }
  }
];

export default function WishlistPage() {
  const { isAuthenticated } = useAuth();
  const { addToCart, isInCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and fetching wishlist data
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        setWishlistItems(mockWishlistItems);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(items => items.filter(item => item.id !== productId));
  };

  const addToCartFromWishlist = (product: Product) => {
    addToCart(product, 1);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-muted-foreground mb-6">You need to login to view your wishlist</p>
          <div className="flex gap-3 justify-center">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            <Button asChild className="gradient-primary">
              <Link href="/login">Login Now</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] py-8 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 lg:mb-12">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="group overflow-hidden border-0 shadow-lg">
                <CardContent className="p-3 lg:p-4">
                  <Skeleton className="aspect-square w-full mb-3 lg:mb-4 rounded-xl" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-3 w-3/4 mb-3" />
                  <Skeleton className="h-5 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] py-8 lg:py-16 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5 text-white fill-white" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold gradient-text-primary">My Wishlist</h1>
          </div>
          <p className="text-muted-foreground">
            {wishlistItems.length === 0 
              ? "Your wishlist is empty. Start adding items you love!" 
              : `You have ${wishlistItems.length} item${wishlistItems.length !== 1 ? 's' : ''} in your wishlist`
            }
          </p>
        </div>

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6">
                Discover amazing products and add them to your wishlist to save for later!
              </p>
              <Button asChild className="gradient-primary">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Start Shopping
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {wishlistItems.map((product) => {
              const price = parseFloat(product.price);
              const salePrice = product.sale_price ? parseFloat(product.sale_price) : null;
              const isOnSale = isProductOnSale(product);
              const effectivePrice = getEffectivePrice(product);
              const discountPercentage = isOnSale ? Math.round(((price - salePrice!) / price) * 100) : 0;
              const isOutOfStock = product.stock === 0;

              return (
                <Card
                  key={product.id}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background/90 to-muted/20 backdrop-blur-sm hover:scale-[1.02]"
                >
                  {/* Remove from Wishlist Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 z-20 w-8 h-8 p-0 bg-background/80 hover:bg-red-50 dark:hover:bg-red-950 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                  </Button>

                  <CardContent className="p-3 lg:p-4">
                    <Link href={`/product/${product.slug}`} className="block">
                      <div className="aspect-square relative mb-3 lg:mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-muted/20 to-muted/5">
                        {/* Status Badges */}
                        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                          {isOutOfStock && (
                            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2 py-1 rounded-full">
                              Out of Stock
                            </Badge>
                          )}
                          {isOnSale && (
                            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                              -{discountPercentage}%
                            </Badge>
                          )}
                          {product.is_featured && (
                            <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full">
                              Featured
                            </Badge>
                          )}
                        </div>

                        {/* Product Image */}
                        <Image
                          src={fixImageUrl(product.image_url)}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />

                        {/* Quick View Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button size="sm" className="bg-white/90 text-black hover:bg-white">
                            <Eye className="h-4 w-4 mr-2" />
                            Quick View
                          </Button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-2">
                        {/* Category */}
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                          {product.category.name}
                        </p>

                        {/* Product Name */}
                        <h3 className="font-semibold text-sm lg:text-base line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>

                        {/* Pricing */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {isOnSale ? (
                            <>
                              <span className="text-lg lg:text-xl font-bold text-green-600 dark:text-green-400">
                                Rs. {salePrice!.toLocaleString()}
                              </span>
                              <span className="text-sm text-muted-foreground line-through">
                                Rs. {price.toLocaleString()}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg lg:text-xl font-bold gradient-text-primary">
                              Rs. {price.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            isOutOfStock ? "bg-red-500" : 
                            product.stock < 10 ? "bg-yellow-500" : "bg-green-500"
                          )}></div>
                          <span className="text-xs text-muted-foreground">
                            {isOutOfStock ? "Out of Stock" : 
                             product.stock < 10 ? `Only ${product.stock} left` : "In Stock"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </CardContent>

                  <CardFooter className="p-3 lg:p-4 pt-0">
                    <div className="flex gap-2 w-full">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-background/50 hover:bg-background border-primary/20 hover:border-primary"
                      >
                        <Link href={`/product/${product.slug}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant={isInCart(product.id) ? "default" : "secondary"}
                        disabled={isOutOfStock}
                        onClick={(e) => {
                          e.preventDefault();
                          if (!isOutOfStock) {
                            addToCartFromWishlist(product);
                          }
                        }}
                        className={cn(
                          "px-3 transition-all duration-300",
                          isInCart(product.id) 
                            ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" 
                            : "gradient-primary"
                        )}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {isInCart(product.id) && <span className="ml-1 text-xs hidden sm:inline">✓</span>}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

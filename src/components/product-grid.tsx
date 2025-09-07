"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Eye, Heart, Star, Zap } from "lucide-react";
import { api, Product } from "@/lib/api";
import { useCart } from "@/lib/cart-context";
import { cn, fixImageUrl } from "@/lib/utils";

type ProductType = "featured" | "upcoming" | "all";

interface ProductGridProps {
  title: string;
  type?: ProductType;
  perPage?: number;
}

export function ProductGrid({
  title,
  type = "all",
  perPage = 8,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data;
        if (type === "featured") {
          const response = await api.getFeaturedProducts({ per_page: perPage });
          data = response.data;
        } else if (type === "upcoming") {
          const response = await api.getUpcomingProducts({ per_page: perPage });
          data = response.data;
        } else {
          const response = await api.getProducts({ per_page: perPage });
          data = response.data;
        }
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [type, perPage]);

  if (loading) {
    return (
      <section className="py-8 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gradient-teal">
              {title}
            </h2>
            <div className="h-1 w-20 gradient-teal-primary rounded-full mt-2"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="group overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background/80 to-muted/20 backdrop-blur-sm">
                <CardContent className="p-3 lg:p-4">
                  <Skeleton className="aspect-square w-full mb-3 lg:mb-4 rounded-xl" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-3 w-3/4 mb-3" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                  <Skeleton className="h-8 w-full mt-3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-8 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gradient-teal">
              {title}
            </h2>
            <div className="h-1 w-20 gradient-teal-primary rounded-full mt-2"></div>
          </div>
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Products Found</h3>
              <p className="text-muted-foreground">We're working on adding amazing products for you!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gradient-teal">
            {title}
          </h2>
          <div className="h-1 w-20 gradient-teal-primary rounded-full mt-2"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => {
            const price = parseFloat(product.price);
            const salePrice = product.sale_price ? parseFloat(product.sale_price) : null;
            const isOnSale = salePrice !== null && salePrice < price;
            const discountPercentage = isOnSale ? Math.round(((price - salePrice!) / price) * 100) : 0;
            const isUpcoming = product.is_upcoming;
            const isOutOfStock = product.stock === 0;
            const rating = product.rating || 0;
            const reviewsCount = product.reviews_count || 0;

            return (
              <Card
                key={product.id}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background/90 to-muted/20 backdrop-blur-sm hover:scale-[1.02]"
              >
                {/* Wishlist Button */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 z-20 w-8 h-8 p-0 bg-background/80 hover:bg-background backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500 transition-colors" />
                </Button>

                <CardContent className="p-3 lg:p-4">
                  <Link href={`/product/${product.slug}`} className="block">
                    <div className="aspect-square relative mb-3 lg:mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-muted/20 to-muted/5">
                      {/* Status Badges */}
                      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                        {isUpcoming && (
                          <Badge className="gradient-teal-light text-white text-xs px-2 py-1 rounded-full">
                            <Zap className="h-3 w-3 mr-1" />
                            Coming Soon
                          </Badge>
                        )}
                        {isOutOfStock && !isUpcoming && (
                          <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2 py-1 rounded-full">
                            Out of Stock
                          </Badge>
                        )}
                        {isOnSale && !isUpcoming && (
                          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                            -{discountPercentage}%
                          </Badge>
                        )}
                        {product.is_featured && (
                          <Badge className="gradient-teal-primary text-white text-xs px-2 py-1 rounded-full">
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

                      {/* Rating */}
                      {rating > 0 && (
                        <div className="flex items-center gap-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-3 w-3",
                                  i < Math.floor(rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-muted-foreground"
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({reviewsCount})
                          </span>
                        </div>
                      )}

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
                          <span className="text-lg lg:text-xl font-bold text-gradient-teal">
                            Rs. {price.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Stock Status */}
                      {!isUpcoming && (
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
                      )}
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
                      disabled={isOutOfStock || isUpcoming}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!isUpcoming && !isOutOfStock) {
                          addToCart(product, 1);
                        }
                      }}
                      className={cn(
                        "px-3 transition-all duration-300",
                        isInCart(product.id) 
                          ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" 
                          : "gradient-teal-primary hover:gradient-teal-dark"
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
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Loader2, ShoppingCart, Eye, Heart, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api, Product, PaginatedResponse } from "@/lib/api";
import { useCart, isProductOnSale } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { fixImageUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [pagination, setPagination] =
    useState<PaginatedResponse<Product> | null>(null);

  useEffect(() => {
    const searchQuery = searchParams.get("q");
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery: string, page: number = 1) => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError("");
      const response = await api.searchProducts({
        q: searchQuery,
        per_page: 20,
        page,
      });
      setProducts(response.data);
      setPagination(response);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to search products"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    addToCart(product, 1);
  };

  const handlePageChange = (page: number) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}&page=${page}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <h1 className="text-3xl font-bold mb-4">Search Results</h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
            <Input
              type="search"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Search"
              )}
            </Button>
          </form>

          {query && (
            <p className="text-muted-foreground mt-2">
              Showing results for &ldquo;{query}&rdquo;
              {pagination && ` (${pagination.total} products found)`}
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin mr-4" />
            <p className="text-muted-foreground">Searching products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            {products.length > 0 ? (
              <>
                {/* Enhanced Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
                  {products.map((product) => {
                    const price = parseFloat(product.price);
                    const salePrice = product.sale_price ? parseFloat(product.sale_price) : null;
                    const isOnSale = isProductOnSale(product);
                    const discountPercentage = isOnSale ? Math.round(((price - salePrice!) / price) * 100) : 0;
                    const isUpcoming = product.is_upcoming;
                    const isOutOfStock = product.stock === 0;
                    const rating = product.rating || 0;
                    const reviewsCount = product.reviews_count || 0;
                    const inCart = isInCart(product.id);

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
                                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 py-1 rounded-full">
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

                              {/* Description */}
                              {product.description && (
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {product.description}
                                </p>
                              )}

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
                                  <span className="text-lg lg:text-xl font-bold gradient-text-primary">
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
                              variant={inCart ? "default" : "secondary"}
                              disabled={isOutOfStock || isUpcoming}
                              onClick={(e) => {
                                e.preventDefault();
                                if (!isUpcoming && !isOutOfStock) {
                                  handleAddToCart(product);
                                }
                              }}
                              className={cn(
                                "px-3 transition-all duration-300",
                                inCart 
                                  ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" 
                                  : "gradient-primary hover:gradient-primary-hover"
                              )}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              {inCart && <span className="ml-1 text-xs hidden sm:inline">✓</span>}
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>

                {/* Pagination */}
                {pagination && pagination.last_page > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      disabled={pagination.current_page === 1}
                      onClick={() =>
                        handlePageChange(pagination.current_page - 1)
                      }
                    >
                      Previous
                    </Button>

                    {Array.from(
                      { length: pagination.last_page },
                      (_, i) => i + 1
                    )
                      .filter((page) => {
                        const current = pagination.current_page;
                        return (
                          page === 1 ||
                          page === pagination.last_page ||
                          (page >= current - 1 && page <= current + 1)
                        );
                      })
                      .map((page, index, array) => (
                        <div key={page} className="flex items-center">
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span className="px-2">...</span>
                          )}
                          <Button
                            variant={
                              page === pagination.current_page
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Button>
                        </div>
                      ))}

                    <Button
                      variant="outline"
                      disabled={
                        pagination.current_page === pagination.last_page
                      }
                      onClick={() =>
                        handlePageChange(pagination.current_page + 1)
                      }
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              query &&
              !loading && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg mb-4">
                    No products found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or browse our categories.
                  </p>
                  <Button asChild>
                    <Link href="/">Browse All Products</Link>
                  </Button>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}

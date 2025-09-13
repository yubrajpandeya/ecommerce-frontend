"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, ArrowLeft, Zap, Star, Heart, Share2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { api, ProductDetail } from "@/lib/api";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { cn, fixImageUrl } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Handle product sharing
  const handleShare = async () => {
    if (!product) return;

    const shareData = {
      title: product.name,
      text: `Check out this amazing product: ${product.name}`,
      url: window.location.href,
    };

    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully!",
          description: "Product has been shared.",
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Product link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Product link has been copied to your clipboard.",
        });
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
        toast({
          title: "Share failed",
          description: "Unable to share. Please copy the URL manually.",
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.slug) return;

      try {
        setLoading(true);
        const productData = await api.getProductDetail(params.slug as string);
        setProduct(productData);
        setSelectedImage(
          fixImageUrl(productData.image_url) ||
            fixImageUrl(productData.images?.[0]?.url) ||
            "/placeholder.svg"
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load product details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] py-8 lg:py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-4 w-64" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Section Skeleton */}
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-20 h-20 rounded-lg" />
                ))}
              </div>
            </div>
            
            {/* Product Info Skeleton */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-10 w-48" />
              </div>
              
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[calc(100vh-200px)] py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Alert variant="destructive">
            <AlertDescription>{error || "Product not found"}</AlertDescription>
          </Alert>
          <div className="mt-6">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const price = parseFloat(product.price);
  const salePrice = product.sale_price ? parseFloat(product.sale_price) : null;
  const isOnSale = salePrice !== null && salePrice < price;
  const discountPercentage = isOnSale ? Math.round(((price - salePrice!) / price) * 100) : 0;
  const isUpcoming = product.is_upcoming;
  const isOutOfStock = product.stock === 0;
  const rating = product.rating || 0;
  const reviewsCount = product.reviews_count || 0;

  return (
    <div className="min-h-[calc(100vh-200px)] py-8 lg:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Enhanced Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-muted-foreground">/</li>
            <li>
              <Link
                href={`/category/${product.category.slug}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {product.category.name}
              </Link>
            </li>
            <li className="text-muted-foreground">/</li>
            <li className="text-foreground font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square relative overflow-hidden rounded-xl border bg-gradient-to-br from-muted/20 to-muted/5 shadow-lg">
              {/* Sale Badge */}
              {isOnSale && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-sm px-3 py-1">
                    -{discountPercentage}% OFF
                  </Badge>
                </div>
              )}
              
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    className={cn(
                      "relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-200",
                      selectedImage === image.url
                        ? "border-primary shadow-md scale-105"
                        : "border-muted hover:border-primary/50"
                    )}
                  >
                    <Image
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-3 text-foreground">{product.name}</h1>
              
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {isUpcoming && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    Coming Soon
                  </Badge>
                )}
                {isOutOfStock && !isUpcoming && (
                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                    Out of Stock
                  </Badge>
                )}
                {isOnSale && !isUpcoming && (
                  <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold">
                    Save {discountPercentage}%
                  </Badge>
                )}
                {product.is_featured && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    Featured
                  </Badge>
                )}
                <Badge variant="outline" className="border-primary/20">{product.category.name}</Badge>
              </div>

              {/* Rating */}
              {rating > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {rating.toFixed(1)} ({reviewsCount} {reviewsCount === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}

              {/* Enhanced Pricing */}
              <div className="mb-6">
                {isOnSale ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-3xl lg:text-4xl font-bold text-black">
                        Rs. {salePrice!.toLocaleString()}
                      </span>
                      <span className="text-xl text-muted-foreground line-through decoration-red-500 decoration-2">
                        Rs. {price.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                      You save Rs. {(price - salePrice!).toLocaleString()} ({discountPercentage}% off)
                    </div>
                  </div>
                ) : (
                  <div className="text-3xl lg:text-4xl font-bold text-black">
                    Rs. {price.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-foreground">Product Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description ||
                  "This is a high-quality product carefully selected for our customers. We ensure all our products meet the highest standards of quality and value."}
              </p>
            </div>

            {/* Product Details */}
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-foreground">Product Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between border-b border-muted pb-2">
                  <span className="font-medium">Availability:</span>
                  <span className={cn(
                    "font-medium",
                    isOutOfStock ? "text-red-500" : "text-green-600"
                  )}>
                    {isOutOfStock ? "Out of Stock" : `${product.stock} available`}
                  </span>
                </div>
                <div className="flex justify-between border-b border-muted pb-2">
                  <span className="font-medium">Category:</span>
                  <Link
                    href={`/category/${product.category.slug}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {product.category.name}
                  </Link>
                </div>
                <div className="flex justify-between border-b border-muted pb-2">
                  <span className="font-medium">Product ID:</span>
                  <span className="font-mono text-xs">{product.id}</span>
                </div>
                {product.created_at && (
                  <div className="flex justify-between border-b border-muted pb-2">
                    <span className="font-medium">Added Date:</span>
                    <span>{new Date(product.created_at).toLocaleDateString()}</span>
                  </div>
                )}
                {isOnSale && (
                  <div className="flex justify-between border-b border-muted pb-2">
                    <span className="font-medium">Discount:</span>
                    <span className="font-medium text-green-600">{discountPercentage}% OFF</span>
                  </div>
                )}
                {product.available_from && (
                  <div className="flex justify-between border-b border-muted pb-2">
                    <span className="font-medium">Available From:</span>
                    <span>{new Date(product.available_from).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Primary Action Buttons */}
              <div className="flex gap-3 flex-col sm:flex-row">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold"
                  disabled={isOutOfStock || isUpcoming}
                  onClick={() => {
                    if (!isUpcoming && !isOutOfStock) {
                      addToCart(product, 1);
                      // Navigate to cart or show success message
                      window.location.href = '/cart';
                    }
                  }}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  {isUpcoming
                    ? "Coming Soon"
                    : isOutOfStock
                    ? "Out of Stock"
                    : "Buy Now"}
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-primary/20 hover:bg-primary/5"
                  disabled={isOutOfStock || isUpcoming}
                  onClick={() => {
                    if (!isUpcoming && !isOutOfStock) {
                      addToCart(product, 1);
                    }
                  }}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {isInCart(product.id) ? "Added to Cart ✓" : "Add to Cart"}
                </Button>
              </div>

              {/* Secondary Action Buttons */}
              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 border border-muted hover:bg-muted/50"
                  onClick={() => product && addToWishlist(product)}
                >
                  <Heart className={`h-4 w-4 mr-2 ${product && isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  {product && isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 border border-muted hover:bg-muted/50"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Product
                </Button>
              </div>

              {/* Stock Status */}
              {!isUpcoming && (
                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    isOutOfStock ? "bg-red-500" : 
                    product.stock < 10 ? "bg-yellow-500" : "bg-green-500"
                  )}></div>
                  <span className="text-sm font-medium">
                    {isOutOfStock ? "Currently out of stock" : 
                     product.stock < 10 ? `Only ${product.stock} left in stock - order soon!` : 
                     `${product.stock} items available`}
                  </span>
                </div>
              )}
            </div>

            {/* Back Button */}
            <div className="pt-4 border-t border-muted">
              <Button variant="ghost" asChild className="w-full hover:bg-muted/50">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

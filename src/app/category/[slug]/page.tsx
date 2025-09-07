"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Loader2, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api, CategoryProductsResponse, Product } from "@/lib/api";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { fixImageUrl } from "@/lib/utils";

const getStockStatus = (stock: number) => {
  if (stock === 0) return { text: "Out of Stock", color: "bg-red-500" };
  if (stock <= 5) return { text: "Low Stock", color: "bg-yellow-500" };
  return { text: "In Stock", color: "bg-green-500" };
};

const formatPrice = (price: string) => {
  return `Rs. ${parseFloat(price).toLocaleString()}`;
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [categoryData, setCategoryData] =
    useState<CategoryProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    addToCart(product, 1);
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!params.slug) return;

      try {
        setLoading(true);
        const data = await api.getCategoryProducts(params.slug as string, {
          per_page: 20,
        });
        setCategoryData(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load category products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin mr-4" />
            <p className="text-muted-foreground">Loading category...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !categoryData) {
    return (
      <div className="min-h-[calc(100vh-200px)] py-12">
        <div className="container mx-auto px-4">
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error || "Category not found"}</AlertDescription>
          </Alert>
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const { data: products, category } = categoryData;

  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">{category.name}</li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
          {/* <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-muted-foreground text-lg">
              {category.description}
            </p>
          )} */}
          <p className="text-sm text-muted-foreground mt-2">
            {products.total} product{products.total !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Products Grid */}
        {products.data.length > 0 ? (
          <div>
            {/* <h2 className="text-2xl font-semibold mb-6">
              {category.name} Products
            </h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.data.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                const inCart = isInCart(product.id);

                return (
                  <Card
                    key={product.id}
                    className="group hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="relative mb-3">
                        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={fixImageUrl(product.image_url)}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {product.is_featured && (
                            <Badge className="bg-blue-500 text-white text-xs">
                              Featured
                            </Badge>
                          )}
                          {product.is_upcoming && (
                            <Badge className="bg-purple-500 text-white text-xs">
                              Coming Soon
                            </Badge>
                          )}
                        </div>

                        {/* Stock Status */}
                        <div className="absolute top-2 right-2">
                          <Badge
                            className={`${stockStatus.color} text-white text-xs`}
                          >
                            {stockStatus.text}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {category.name}
                          </span>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            asChild
                          >
                            <Link href={`/product/${product.slug}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>

                          <Button
                            size="sm"
                            className="flex-1"
                            disabled={product.stock === 0 || inCart}
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            {inCart ? "In Cart" : "Add"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">
              No products found in this category.
            </p>
            <Button asChild>
              <Link href="/">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

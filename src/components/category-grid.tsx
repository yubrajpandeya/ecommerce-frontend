"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Sparkles } from "lucide-react";
import { api, Category } from "@/lib/api";

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-8 lg:py-16 bg-gradient-to-br from-muted/20 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
                Shop by Category
              </h2>
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              Discover amazing products across all our categories
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="group overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background/80 to-muted/20 backdrop-blur-sm">
                <CardContent className="p-4">
                  <Skeleton className="aspect-square w-full mb-4 rounded-xl" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-8 lg:py-16 bg-gradient-to-br from-muted/20 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
                Shop by Category
              </h2>
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
          </div>
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Categories Coming Soon</h3>
              <p className="text-muted-foreground">We're organizing amazing categories for you!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 lg:py-16 bg-gradient-to-br from-muted/20 via-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 lg:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Discover amazing products across all our categories
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background/90 to-muted/20 backdrop-blur-sm hover:scale-105 cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-muted/20 to-muted/5">
                    <Image
                      src="/placeholder.svg"
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2">
                      <div className="text-white text-sm font-medium flex items-center gap-1">
                        Explore <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-center font-semibold text-sm lg:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {category.name}
                  </h3>
                  
                  {category.description && (
                    <p className="text-center text-xs text-muted-foreground mt-1 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

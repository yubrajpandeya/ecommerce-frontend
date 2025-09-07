"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api, Slider } from "@/lib/api";

export function HeroSlider() {
  const [slides, setSlides] = useState<Slider[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const data = await api.getSliders();
        // Sort by position as mentioned in API docs
        const sortedSlides = data.sort((a, b) => a.position - b.position);
        setSlides(sortedSlides);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch sliders:", error);
        setLoading(false);
      }
    };
    fetchSliders();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (loading) {
    return (
      <section className="relative h-[400px] overflow-hidden bg-muted">
        <Skeleton className="w-full h-full" />
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative h-[400px] overflow-hidden bg-muted flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>No sliders available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[400px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide
              ? "translate-x-0"
              : index < currentSlide
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
        >
          <Link href={slide.link_url || "/"}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image_url || "/placeholder.svg"}
                alt={slide.title || "Slider image"}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  {slide.title || "Shop Now"}
                </h2>
                <Button variant="secondary">Shop Now</Button>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}

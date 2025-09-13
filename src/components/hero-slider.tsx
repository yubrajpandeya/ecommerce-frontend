"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api, Slider } from "@/lib/api";
import { cn } from "@/lib/utils";

export function HeroSlider() {
  const [slides, setSlides] = useState<Slider[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const data = await api.getSliders();
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
    if (slides.length === 0 || !isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length, isPlaying]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (loading) {
    return (
      <section className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden bg-slate-200">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600"></div>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image 
              src="/placeholder.svg" 
              alt="No content" 
              width={32} 
              height={32} 
              className="opacity-50"
            />
          </div>
          <p className="text-slate-600 font-medium">No promotional content available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden group">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-all duration-1000 ease-in-out",
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            )}
          >
            <Link href={slide.link_url || "/"} className="block relative w-full h-full">
              {/* Background Image */}
              <div className="relative w-full h-full">
                <Image
                  src={slide.image_url || "/placeholder.svg"}
                  alt={slide.title || "Promotional banner"}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  priority={index === 0}
                  sizes="100vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== '/placeholder.svg') {
                      target.src = '/placeholder.svg';
                    }
                  }}
                />
                
                {/* Simple Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
                      {slide.title || "Discover Premium Products"}
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 font-light leading-relaxed drop-shadow-md">
                      Experience quality like never before
                    </p>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 sm:px-12 py-4 text-lg sm:text-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 border-0 rounded-full"
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 sm:px-6 pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          className="pointer-events-auto h-10 w-10 sm:h-12 sm:w-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/20 hover:border-white/40 transition-all duration-300 opacity-0 group-hover:opacity-100"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="pointer-events-auto h-10 w-10 sm:h-12 sm:w-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/20 hover:border-white/40 transition-all duration-300 opacity-0 group-hover:opacity-100"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between">
        {/* Dots Indicator */}
        <div className="flex gap-2 sm:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={cn(
                "transition-all duration-300 rounded-full",
                index === currentSlide
                  ? "w-8 sm:w-10 h-2 bg-white shadow-lg"
                  : "w-2 h-2 bg-white/50 hover:bg-white/70"
              )}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Control */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 sm:h-10 sm:w-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/20 hover:border-white/40 transition-all duration-300"
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Play className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </Button>
      </div>

      {/* Progress Bar */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`
            }}
          />
        </div>
      )}
    </section>
  );
}

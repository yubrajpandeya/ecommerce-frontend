"use client";

import { useState, useEffect } from "react";
import { X, Truck, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AnnouncementPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen the popup recently (within 24 hours)
    const lastSeen = localStorage.getItem("announcement-popup-seen");
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;

    if (!lastSeen || now - parseInt(lastSeen) > dayInMs) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Remember that user has seen the popup
    localStorage.setItem("announcement-popup-seen", Date.now().toString());
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <Card 
        className="relative max-w-md w-full mx-auto bg-gradient-to-br from-slate-900 via-[#087998] to-cyan-900 border border-slate-600 shadow-xl"
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="p-6 text-white">
          {/* Main Content */}
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold text-white">
              🎉 Free Shipping Offer!
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                <Truck className="h-5 w-5 text-cyan-300" />
                <span>FREE SHIPPING</span>
              </div>
              
              <p className="text-white/90">
                On orders over <span className="font-bold text-cyan-300">Rs. 5,000</span>
              </p>
              
              <div className="flex items-center justify-center gap-2 bg-white/10 rounded-lg px-4 py-2 border border-white/20">
                <Tag className="h-4 w-4 text-cyan-300" />
                <span className="font-mono font-bold text-cyan-300">
                  FREESHIP50
                </span>
              </div>
              
              <p className="text-xs text-white/70">
                Use this code at checkout
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleClose}
                variant="outline"
                className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  // Copy code to clipboard
                  navigator.clipboard.writeText('FREESHIP50');
                  handleClose();
                }}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                Copy Code
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
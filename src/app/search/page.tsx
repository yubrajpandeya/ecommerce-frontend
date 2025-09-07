"use client";

import { Suspense } from "react";
import SearchContent from "./search-content";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-200px)] py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading search...</p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}

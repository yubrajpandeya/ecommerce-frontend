import { HeroSlider } from "@/components/hero-slider";
// import { CategoryGrid } from "@/components/category-grid";
import { ProductGrid } from "@/components/product-grid";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      {/* <CategoryGrid /> */}
      <ProductGrid title="Featured Products" type="featured" />
      <ProductGrid title="Upcoming Products" type="upcoming" />
    </>
  );
}

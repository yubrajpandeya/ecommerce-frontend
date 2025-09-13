"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  LogOut,
  Settings,
  Package,
  User2Icon,
  X,
  Heart,
  Bell,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { api, Category } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false); // Close mobile search
    }
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-[#087998] to-cyan-900 text-white sticky top-0 z-50 shadow-2xl backdrop-blur-sm border-b border-cyan-800/50 hover-glow-teal">
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-[#087998] to-cyan-600 text-white py-2 px-4 text-center text-sm font-medium">
        <div className="container mx-auto">
          🎉 Free shipping on orders over Rs. 5000 | Use code: FREESHIP50
        </div>
      </div>

      {/* Top utility bar */}
      <div className="border-b border-slate-700/30 hidden lg:block bg-slate-800/50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <div className="flex items-center gap-6">
              <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Track Order
              </span>
              <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-1">
                <Phone className="h-3 w-3" />
                Customer Service
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">Store Locator</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-400">Need help? Call +977 9803861618 </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile menu button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:bg-white/10 border border-slate-600 rounded-xl"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-slate-900 border-slate-700">
              <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile user section */}
                <div className="flex flex-col gap-3 pb-6 border-b border-slate-700">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl">
                        <Avatar className="h-10 w-10 border-2 border-blue-500">
                          <AvatarFallback className="gradient-teal-primary text-white font-semibold">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-white">{user?.name}</p>
                          <p className="text-xs text-slate-400">Premium Member</p>
                        </div>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl transition-colors group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="h-5 w-5 text-slate-400 group-hover:text-blue-400" />
                        <span className="text-white group-hover:text-blue-400">Profile Settings</span>
                      </Link>
                      <Link
                        href="/cart"
                        className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl transition-colors group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <ShoppingCart className="h-5 w-5 text-slate-400 group-hover:text-blue-400" />
                        <span className="text-white group-hover:text-blue-400">Shopping Cart</span>
                        {totalItems > 0 && (
                          <Badge className="ml-auto gradient-teal-primary">
                            {totalItems}
                          </Badge>
                        )}
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                          router.push("/");
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl transition-colors group w-full text-left"
                      >
                        <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-400" />
                        <span className="text-white group-hover:text-red-400">Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl transition-colors group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="h-5 w-5 text-slate-400 group-hover:text-blue-400" />
                        <span className="text-white group-hover:text-blue-400">Sign In</span>
                      </Link>
                      <Link
                        href="/register"
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="h-5 w-5 text-white" />
                        <span className="text-white font-medium">Create Account</span>
                      </Link>
                    </>
                  )}
                </div>

                {/* Mobile navigation */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-sm text-slate-400 mb-3 uppercase tracking-wider">Navigation</h3>
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="p-3 hover:bg-slate-800 rounded-xl font-medium text-white hover:text-blue-400 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile categories */}
                <div className="flex flex-col gap-2 pt-4 border-t border-slate-700">
                  <h3 className="font-semibold text-sm text-slate-400 mb-3 uppercase tracking-wider">Categories</h3>
                  {categories.slice(0, 6).map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="p-3 hover:bg-slate-800 rounded-xl text-white hover:text-blue-400 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Image
                src="/logo.png"
                width={40}
                height={40}
                alt="Choose Your Cart Logo"
                className="relative h-10 w-10 md:h-12 md:w-12 object-contain rounded-xl"
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient-teal-bright">
                Choose Your Cart
              </h1>
              <p className="text-xs text-slate-400 hidden md:block">Premium Shopping Experience</p>
            </div>
          </Link>

          {/* Search bar - Desktop and tablet */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search for products, brands, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-6 pr-14 py-3 bg-white/10 backdrop-blur-sm border-slate-600 rounded-2xl text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 gradient-teal-primary hover:gradient-teal-dark rounded-xl px-4"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Wishlist */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 border border-slate-600 rounded-xl px-4 relative"
            >
              <Heart className="h-4 w-4 mr-2" />
              <span className="hidden xl:inline">Wishlist</span>
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                3
              </Badge>
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 border border-slate-600 rounded-xl px-4 relative"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span className="hidden xl:inline">Cart</span>
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 gradient-teal-primary text-white text-xs px-1.5 py-0.5">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 border border-slate-600 rounded-xl px-4"
                  >
                    <Avatar className="h-6 w-6 mr-2 border-2 border-blue-500">
                      <AvatarFallback className="gradient-teal-primary text-white text-xs font-semibold">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden xl:inline max-w-24 truncate">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-700">
                  <DropdownMenuItem 
                    onClick={() => router.push("/profile")}
                    className="text-white hover:bg-slate-800 focus:bg-slate-800"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => router.push("/orders")}
                    className="text-white hover:bg-slate-800 focus:bg-slate-800"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-white hover:bg-slate-800 focus:bg-slate-800"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                    className="text-red-400 hover:bg-red-950 focus:bg-red-950"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 border border-slate-600 rounded-xl"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="gradient-teal-primary hover:gradient-teal-dark text-white border-0 rounded-xl px-6"
                  >
                    Join Now
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile search toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 border border-slate-600 rounded-xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Mobile cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 border border-slate-600 rounded-xl relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 gradient-teal-primary text-white text-xs px-1.5 py-0.5">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile search bar */}
        {isOpen && (
          <div className="md:hidden mt-4 animate-in slide-in-from-top-2 duration-200">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20"></div>
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-6 pr-14 py-3 bg-white/10 backdrop-blur-sm border-slate-600 rounded-2xl text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  autoFocus
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <nav className="border-t border-slate-700/30 hidden lg:block bg-slate-800/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 py-4 overflow-x-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
            ))}
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap relative group"
              >
                {category.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
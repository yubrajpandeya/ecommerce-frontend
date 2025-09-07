"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "./api";

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

// Helper function to get the effective price (sale price if available, otherwise regular price)
export const getEffectivePrice = (product: Product): number => {
  const price = parseFloat(product.price);
  const salePrice = product.sale_price ? parseFloat(product.sale_price) : null;
  return salePrice && salePrice < price ? salePrice : price;
};

// Helper function to check if product is on sale
export const isProductOnSale = (product: Product): boolean => {
  const price = parseFloat(product.price);
  const salePrice = product.sale_price ? parseFloat(product.sale_price) : null;
  return salePrice !== null && salePrice < price;
};

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  getItemQuantity: (productId: number) => number;
  getItemTotal: (item: CartItem) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Convert addedAt strings back to Date objects
        const cartWithDates = parsedCart.map((item: CartItem) => ({
          ...item,
          addedAt: new Date(item.addedAt),
        }));
        setItems(cartWithDates);
      } catch (error) {
        console.error("Failed to parse saved cart:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            product,
            quantity,
            addedAt: new Date(),
          },
        ];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (productId: number): boolean => {
    return items.some((item) => item.product.id === productId);
  };

  const getItemQuantity = (productId: number): number => {
    const item = items.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const getItemTotal = (item: CartItem): number => {
    return getEffectivePrice(item.product) * item.quantity;
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce((total, item) => {
    return total + getItemTotal(item);
  }, 0);

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    getItemTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

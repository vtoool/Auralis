import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { Product, CartItem } from '../types';
import { useNotification } from './NotificationContext';
import { useLanguage } from './LanguageContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addNotification } = useNotification();
  const { t } = useLanguage();

  const addToCart = (product: Product, quantityToAdd: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
        );
      }
      return [...prevItems, { ...product, quantity: quantityToAdd }];
    });
    
    // Trigger notification with product details
    addNotification(t('oasis.shop.addToCart'), { 
        productName: product.name,
        productImage: product.imageUrl,
        type: 'success',
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    // FIX: The type of `setIsCartOpen` is `React.Dispatch<React.SetStateAction<boolean>>`, which is not directly assignable
    // to the `(isOpen: boolean) => void` type defined in `CartContextType`.
    // This wrapper ensures the provided function matches the required signature.
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount, cartTotal, isCartOpen, toggleCart, setCartOpen: (isOpen) => setIsCartOpen(isOpen) }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
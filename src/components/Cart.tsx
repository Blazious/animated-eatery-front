
import React from 'react';
import CartItem from './CartItem';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItemType[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onCheckout: () => void;
}

const Cart = ({ items, onIncrease, onDecrease, onCheckout }: CartProps) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sticky top-4">
      <div className="flex items-center gap-2 mb-4 text-school-red">
        <ShoppingCart className="h-5 w-5" />
        <h2 className="font-bold text-lg">Your Order</h2>
      </div>
      
      {items.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          Your cart is empty
        </div>
      ) : (
        <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
          {items.map(item => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          ))}
        </div>
      )}
      
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex justify-between font-medium">
          <span>Items</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
        
        <Button 
          onClick={onCheckout}
          className="w-full mt-4 bg-school-red hover:bg-school-dark-red"
          disabled={items.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;

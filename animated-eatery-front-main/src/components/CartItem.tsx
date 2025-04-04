
import React from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

const CartItem = ({ id, name, price, quantity, onIncrease, onDecrease }: CartItemProps) => {
  return (
    <div className="cart-item animate-slide-right">
      <div>
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-muted-foreground">₹{price.toFixed(2)} each</p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => onDecrease(id)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-4 text-center">{quantity}</span>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => onIncrease(id)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;

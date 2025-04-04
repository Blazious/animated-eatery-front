
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FoodItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onAddToCart: (id: string) => void;
}

const FoodItem = ({ id, name, description, price, image, onAddToCart }: FoodItemProps) => {
  return (
    <div className="food-card animate-slide-up">
      <div className="relative overflow-hidden h-48">
        <img 
          src={image} 
          alt={name} 
          className="food-image"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{name}</h3>
          <span className="font-bold text-school-red">₹{price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        <Button 
          onClick={() => onAddToCart(id)} 
          className="w-full mt-4 bg-school-green hover:bg-school-green/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default FoodItem;

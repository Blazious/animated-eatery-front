
import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  return (
    <header className="py-4 px-4 md:px-0 sticky top-0 bg-background/80 backdrop-blur-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-school-red">School Canteen</h1>
        </div>
        
        <div className="hidden md:flex gap-6">
          <Button variant="ghost" className="font-medium">Home</Button>
          <Button variant="ghost" className="font-medium">Menu</Button>
          <Button variant="ghost" className="font-medium">Deals</Button>
          <Button variant="ghost" className="font-medium">Contact</Button>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="relative"
          onClick={onCartClick}
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-school-red text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItemCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;

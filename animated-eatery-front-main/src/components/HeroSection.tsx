
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden py-10 md:py-16 mb-8">
      <div className="container mx-auto px-4 md:px-0">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
            <span className="text-canteen-orange">Delicious Food</span>
            <span className="block mt-1">at Your Fingertips</span>
          </h1>
          <p className="text-muted-foreground mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Order your favorite meals from our canteen and have them ready for pickup. 
            No waiting in lines, just tasty food when you want it.
          </p>
          <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button className="bg-canteen-orange hover:bg-canteen-red">Order Now</Button>
            <Button variant="outline">View Menu</Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-0 opacity-60 animate-float">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/5141/5141534.png" 
          alt="Burger illustration" 
          className="w-28 h-28 object-contain"
          style={{ transform: 'rotate(15deg)' }}
        />
      </div>
      <div className="absolute bottom-5 right-16 opacity-60 animate-float-reverse">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/4467/4467384.png" 
          alt="Salad illustration" 
          className="w-24 h-24 object-contain"
          style={{ transform: 'rotate(-10deg)' }}
        />
      </div>
      <div className="absolute top-32 right-48 opacity-40 animate-pulse-soft">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/1147/1147803.png" 
          alt="Coffee illustration" 
          className="w-16 h-16 object-contain"
        />
      </div>
    </div>
  );
};

export default HeroSection;

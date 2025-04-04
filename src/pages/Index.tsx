
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryFilter from '@/components/CategoryFilter';
import FoodItem from '@/components/FoodItem';
import Cart, { CartItemType } from '@/components/Cart';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { useToast } from "@/hooks/use-toast";

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

const Index = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [showMobileCart, setShowMobileCart] = useState(false);

  // Mock data for food items
  const foodItems: FoodItem[] = [
    {
      id: '1',
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice cooked with tender chicken pieces, herbs, and spices.',
      price: 180,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      categoryId: 'main'
    },
    {
      id: '2',
      name: 'Veg Pulao',
      description: 'Fragrant rice dish cooked with mixed vegetables and aromatic spices.',
      price: 120,
      image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
      categoryId: 'main'
    },
    {
      id: '3',
      name: 'Masala Dosa',
      description: 'Crispy South Indian crepe made from fermented rice batter, stuffed with spiced potatoes.',
      price: 90,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      categoryId: 'breakfast'
    },
    {
      id: '4',
      name: 'Veg Sandwich',
      description: 'Fresh vegetables with cheese and special sauce between toasted bread slices.',
      price: 80,
      image: 'https://images.unsplash.com/photo-1559466273-d95e72debaf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      categoryId: 'snacks'
    },
    {
      id: '5',
      name: 'Chicken Noodles',
      description: 'Stir-fried noodles with chicken pieces, vegetables, and Asian sauces.',
      price: 120,
      image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      categoryId: 'main'
    },
    {
      id: '6',
      name: 'Samosa',
      description: 'Crispy pastry filled with spiced potatoes and peas, deep-fried to perfection.',
      price: 25,
      image: 'https://images.unsplash.com/photo-1601050879965-2c22353a9640?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      categoryId: 'snacks'
    },
    {
      id: '7',
      name: 'Masala Chai',
      description: 'Traditional Indian spiced tea brewed with milk and aromatic spices.',
      price: 30,
      image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      categoryId: 'beverages'
    },
    {
      id: '8',
      name: 'Gulab Jamun',
      description: 'Deep-fried milk solids soaked in sugar syrup, a classic Indian dessert.',
      price: 60,
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      categoryId: 'desserts'
    }
  ];

  const categories: Category[] = [
    { id: 'all', name: 'All Items' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'main', name: 'Main Course' },
    { id: 'snacks', name: 'Snacks' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'desserts', name: 'Desserts' }
  ];

  // Filter food items based on active category
  const filteredFoodItems = activeCategory === 'all' 
    ? foodItems 
    : foodItems.filter(item => item.categoryId === activeCategory);

  const handleAddToCart = (id: string) => {
    const foodItem = foodItems.find(item => item.id === id);
    if (!foodItem) return;
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === id);
      
      if (existingItem) {
        return prev.map(item => 
          item.id === id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, { 
          id: foodItem.id, 
          name: foodItem.name, 
          price: foodItem.price, 
          quantity: 1 
        }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${foodItem.name} has been added to your order.`,
      duration: 2000,
    });
  };

  const handleIncreaseQuantity = (id: string) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  const handleDecreaseQuantity = (id: string) => {
    setCartItems(prev => {
      const newItems = prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity - 1) } 
          : item
      );
      return newItems.filter(item => item.quantity > 0);
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Order Placed!",
      description: "Your order has been placed successfully.",
      duration: 3000,
    });
    setCartItems([]);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <BackgroundAnimation />
      
      <Header 
        cartItemCount={totalCartItems} 
        onCartClick={() => setShowMobileCart(!showMobileCart)} 
      />
      
      <main className="container mx-auto px-4 md:px-0 pb-12">
        <HeroSection />
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="md:col-span-2 lg:col-span-3">
            <h2 className="text-2xl font-bold mb-4">Today's Menu</h2>
            
            <CategoryFilter 
              categories={categories} 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredFoodItems.map((item, index) => (
                <FoodItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
          
          <div className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity ${
            showMobileCart ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`} onClick={() => setShowMobileCart(false)} />
          
          <div className={`fixed bottom-0 left-0 right-0 bg-background p-4 z-30 rounded-t-xl transform transition-transform md:static md:transform-none ${
            showMobileCart ? 'translate-y-0' : 'translate-y-full'
          } md:block`}>
            <div className="md:sticky md:top-20">
              <Cart 
                items={cartItems} 
                onIncrease={handleIncreaseQuantity} 
                onDecrease={handleDecreaseQuantity} 
                onCheckout={handleCheckout} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

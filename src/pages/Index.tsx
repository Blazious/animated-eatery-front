import React, { useState, useEffect } from 'react';
import Header, { Notification } from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryFilter from '@/components/CategoryFilter';
import FoodItem from '@/components/FoodItem';
import Cart, { CartItemType } from '@/components/Cart';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import FeedbackDialog from '@/components/FeedbackDialog';
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface FeedbackData {
  rating: number;
  comment: string;
  timestamp: string;
}

const Index = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackPrompt, setFeedbackPrompt] = useState(false);
  const [previousFeedbacks, setPreviousFeedbacks] = useState<FeedbackData[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
    
    const orderId = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    addNotification(`Your order #${orderId} has been received and is being prepared.`);
    
    setTimeout(() => {
      addNotification(`Your order #${orderId} will be ready in approximately 15 minutes.`);
    }, 5000);
    
    setCartItems([]);
    
    setTimeout(() => {
      setFeedbackPrompt(true);
    }, 2000);
  };

  const handleFeedbackSubmit = (rating: number, comment: string) => {
    const newFeedback: FeedbackData = {
      rating,
      comment,
      timestamp: new Date().toISOString(),
    };
    
    setPreviousFeedbacks(prev => [...prev, newFeedback]);
    setFeedbackPrompt(false);
    
    console.log('Feedback submitted:', newFeedback);
  };

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
    
    toast({
      title: "New Notification",
      description: message,
      duration: 4000,
    });
  };

  const handleNotificationRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setTimeout(() => {
      addNotification("Welcome to JKUAT School Canteen! Today's special: Chicken Biryani.");
    }, 2000);
  }, []);

  useEffect(() => {
    if (feedbackPrompt) {
      const { dismiss } = toast({
        title: "How was your experience?",
        description: "We'd love to hear your feedback about our service.",
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setFeedbackOpen(true);
              dismiss();
            }}
            className="bg-school-green hover:bg-school-green/90 text-white"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Give Feedback
          </Button>
        ),
        duration: 10000,
      });
    }
  }, [feedbackPrompt, toast]);

  return (
    <div className="min-h-screen">
      <BackgroundAnimation />
      
      <Header 
        cartItemCount={totalCartItems} 
        onCartClick={() => setShowMobileCart(!showMobileCart)} 
        notifications={notifications}
        onNotificationRead={handleNotificationRead}
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
              {filteredFoodItems.map((item) => (
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
            
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={() => setFeedbackOpen(true)}
                className="bg-school-red hover:bg-school-red/90 text-white"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Share Your Feedback
              </Button>
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

      <FeedbackDialog 
        open={feedbackOpen} 
        onOpenChange={setFeedbackOpen} 
        onSubmit={handleFeedbackSubmit} 
      />
    </div>
  );
};

export default Index;

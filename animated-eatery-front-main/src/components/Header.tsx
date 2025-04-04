
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, GraduationCap, Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  notifications: Notification[];
  onNotificationRead: (id: string) => void;
}

export interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const Header = ({ cartItemCount, onCartClick, notifications, onNotificationRead }: HeaderProps) => {
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  return (
    <header className="py-4 px-4 md:px-0 sticky top-0 bg-background/80 backdrop-blur-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-school-red" />
            <h1 className="text-xl font-bold text-school-red">JKUAT School Canteen</h1>
          </div>
        </div>
        
        <div className="hidden md:flex gap-6">
          <Button variant="ghost" className="font-medium">Home</Button>
          <Button variant="ghost" className="font-medium">Menu</Button>
          <Button variant="ghost" className="font-medium">Deals</Button>
          <Button variant="ghost" className="font-medium">Contact</Button>
        </div>
        
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-school-green text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 max-h-[400px] overflow-y-auto">
              <div className="py-2 px-3 bg-school-red text-white font-semibold">
                Notifications
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No notifications yet
                </div>
              ) : (
                <div>
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 border-b hover:bg-gray-50 cursor-pointer transition-colors ${notification.read ? '' : 'bg-gray-50'}`}
                      onClick={() => onNotificationRead(notification.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium">{notification.message}</p>
                        {!notification.read && (
                          <Badge variant="secondary" className="bg-school-green text-white">New</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </PopoverContent>
          </Popover>
          
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
      </div>
    </header>
  );
};

export default Header;

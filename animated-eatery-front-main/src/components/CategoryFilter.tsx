
import React from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 pb-4 overflow-x-auto scrollbar-none">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-button whitespace-nowrap ${
            activeCategory === category.id ? 'active' : ''
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

"use client";
import React, { useState } from 'react';
import { Star } from 'lucide-react'; // or use any star icon library

export default function Rating({ value = 0, onChange, readOnly = false }) {
  const [hovered, setHovered] = useState(null);

  const handleClick = (rating) => {
    if (!readOnly && onChange) onChange(rating);
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = hovered !== null ? star <= hovered : star <= value;

        return (
          <Star
            key={star}
            onMouseEnter={() => !readOnly && setHovered(star)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            onClick={() => handleClick(star)}
            className={`w-5 h-5 cursor-pointer transition-colors ${
              filled ? 'text-yellow-500' : 'text-gray-300'
            } ${readOnly ? 'cursor-default' : ''}`}
            strokeWidth={1.8}
            fill={filled ? 'currentColor' : 'none'}
          />
        );
      })}
    </div>
  );
}

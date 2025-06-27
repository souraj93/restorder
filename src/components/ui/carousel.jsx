"use client";
import React from 'react';

export function Carousel({ children, className }) {
  return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
}

export function CarouselItem({ children, active }) {
  return (
    <div
      className={`transition-opacity duration-700 ease-in-out absolute inset-0 ${
        active ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
    >
      {children}
    </div>
  );
}
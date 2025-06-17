"use client";

export default function PlusMinus({ menuItem, handleAddToCard, inCartCount }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        className="bg-gray-200 text-xl rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
        onClick={() => {
          // Remove one item from cart
          handleAddToCard(menuItem, -1);
        }}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="text-lg font-bold w-8 text-center">{inCartCount}</span>
      <button
        className="bg-gray-200 text-xl rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
        onClick={() => {
          // Add one more item to cart
          handleAddToCard(menuItem, 1);
        }}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
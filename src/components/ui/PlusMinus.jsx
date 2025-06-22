"use client";

export default function PlusMinus({ menuItem, handleAddToCard, inCartCount, isVertical = false }) {
  return (
    !isVertical ?
    <div className="flex items-center justify-center gap-2">
      <button
        className="bg-red-500 text-xl rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700"
        onClick={() => {
          // Remove one item from cart
          handleAddToCard(menuItem, -1);
        }}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="text-md font-bold w-4 text-center">{inCartCount}</span>
      <button
        className="bg-red-500 text-xl rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700"
        onClick={() => {
          // Add one more item to cart
          handleAddToCard(menuItem, 1);
        }}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div> : 
    <div className="absolute right-0 bg-black/50 text-center p-2" 
        style={{
          top: '-45px'
        }}
    >
      <button
        className="bg-red-500 text-sm rounded-full flex items-center justify-center hover:bg-red-700"
        style={{
          padding: "0 8px"
        }}
        onClick={() => {
          // Remove one item from cart
          handleAddToCard(menuItem, -1);
        }}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="text-sm font-bold w-4 text-center">{inCartCount}</span>
      <button
        className="bg-red-500 text-sm rounded-full flex items-center justify-center hover:bg-red-700"
        style={{
          padding: "0 6px"
        }}
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
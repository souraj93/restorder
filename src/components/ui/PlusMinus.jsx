"use client";

export default function PlusMinus({ menuItem, handleAddToCard, inCartCount, isVertical = false, classes, buttonClasses }) {
  return (
    !isVertical ?
    <div className="flex items-center justify-center gap-2">
      <button
        className="bg-red-500 text-xl rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700"
        onClick={(e) => {
          e.stopPropagation();
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
        onClick={(e) => {
          e.stopPropagation();
          // Add one more item to cart
          handleAddToCard(menuItem, 1);
        }}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div> : 
    <div className={`absolute right-0 bg-black/50 text-center rounded-lg ${classes && classes.includes('p-') ? classes : `p-2 ${classes}`}`} 
        style={{
          top: `${classes && classes.includes('top') ? '' : '-45px'}`
        }}
    >
      <button
        className={`bg-red-500 text-sm rounded-full flex items-center justify-center hover:bg-red-700 ${buttonClasses}`}
        style={{
          padding: `0 ${buttonClasses && !buttonClasses.includes('text-sm') ? '11px' : '8px'}`
        }}
        onClick={(e) => {
          e.stopPropagation();
          // Remove one item from cart
          handleAddToCard(menuItem, -1);
        }}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className={`text-sm font-bold w-4 text-center ${buttonClasses}`}>{inCartCount}</span>
      <button
        className={`bg-red-500 text-sm rounded-full flex items-center justify-center hover:bg-red-700 ${buttonClasses}`}
        style={{
          padding: `0 ${buttonClasses && !buttonClasses.includes('text-sm') ? '8px' : '6px'}`
        }}
        onClick={(e) => {
          e.stopPropagation();
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
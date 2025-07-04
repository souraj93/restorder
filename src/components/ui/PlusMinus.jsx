"use client";

export default function PlusMinus({ menuItem, handleAddToCard, inCartCount, isVertical = false, classes, buttonClasses }) {
  return (
    !isVertical ?
    <div className="flex items-center justify-center gap-2 absolute right-0 bg-black/50 text-center rounded-lg text-white p-2">
      <button
        className={`bg-primary text-sm rounded-full px-2 flex items-center justify-center ${buttonClasses}`}
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
        className={`bg-primary text-sm rounded-full py-0 flex items-center justify-center ${buttonClasses}`}
        style={{
          paddingRight: "6px",
          paddingLeft: "6px"
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
    </div> : 
    <div className={`absolute right-0 bg-black/70 text-center rounded-lg text-white ${classes && classes.includes('p-') ? classes : `p-2 ${classes}`}`} 
        style={{
          top: `${classes ? 
            classes.includes('top-[250px]') ? 
            '250px' :  
            classes.includes('-top-[18px]') ? 
            '-18px' :
            classes.includes('top') ? 
            '' : 
            '-45px' : 
            '-45px'}`
        }}
    >
      <button
        className={`bg-primary text-sm rounded-full flex items-center justify-center ${buttonClasses}`}
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
        className={`bg-primary text-sm rounded-full flex items-center justify-center ${buttonClasses}`}
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
export const mockMenuItems = [
  {
    _id: "1",
    name: "Veg Spring Rolls",
    description: "Deep-fried rolls stuffed with spicy vegetables, served with sweet chili sauce.",
    basePrice: 120,
    category: { _id: "1", name: "Starters" },
    isVeg: true,
    image: "https://i.pinimg.com/736x/74/55/86/7455861056a201b44b68a5ef65e36583.jpg",
  },
  {
    _id: "2",
    name: "Chicken Tikka",
    description: "Tender chicken chunks marinated in yogurt and spices, grilled to perfection.",
    basePrice: 220,
    isNonVeg: true,
    category: { _id: "1", name: "Starters" },
    image: "https://i.pinimg.com/736x/17/0d/3e/170d3e18d9f5a67d1fd12d0726277787.jpg",
  },
  {
    _id: "3",
    name: "Paneer Tikka",
    description: "Spicy grilled paneer cubes marinated in Indian masalas and herbs.",
    basePrice: 200,
    isVeg: true,
    category: { _id: "1", name: "Starters" },
    image: "https://i.pinimg.com/736x/e1/a5/91/e1a59105bff129316df8c082826939c9.jpg",
  },
  {
    _id: "4",
    name: "Chicken Drumstick",
    description: "Tender chicken chunks marinated in yogurt and spices, grilled to perfection.",
    basePrice: 260,
    isNonVeg: true,
    category: { _id: "1", name: "Starters" },
    image: "https://i.pinimg.com/736x/73/8b/ba/738bba8a9bcd6b866d94ad882c62963e.jpg",
  },
  {
    _id: 5,
    name: "Paneer Butter Masala",
    image: "https://i.pinimg.com/736x/fb/8d/29/fb8d2917108cf0560655376246d9e8c8.jpg",
    basePrice: 220,
    isVeg: true,
    category: { _id: "2", name: "Main Course" },
    description: "Rich, creamy tomato-based curry with soft paneer cubes and aromatic spices."
  },
  {
    _id: 6,
    name: "Chicken Masala",
    image: "https://i.pinimg.com/736x/c6/65/c7/c665c758a0b5d5a6a93db951d11124d1.jpg",
    basePrice: 260,
    isNonVeg: true,
    category: { _id: "2", name: "Main Course" },
    description: "Juicy chicken in a buttery, mildly spiced tomato gravy with cream."
  },
  {
    _id: 7,
    name: "Dal Makhani",
    image: "https://i.pinimg.com/736x/11/fa/e7/11fae74d7ce2956d8f24023cc6a95835.jpg",
    basePrice: 180,
    isVeg: true,
    category: { _id: "2", name: "Main Course" },
    description: "Slow-cooked black lentils and kidney beans in buttery, creamy sauce."
  },
  {
    _id: 8,
    name: "Kadai Mushroom",
    image: "https://i.pinimg.com/736x/b3/a4/8a/b3a48ae7dc673d3e446e5a3155520860.jpg",
    basePrice: 200,
    isVeg: true,
    category: { _id: "2", name: "Main Course" },
    description: "Button mushrooms tossed in onion-tomato gravy with bell peppers and spices."
  },
  {
    _id: 9,
    isVeg: true,
    name: "Veg Biryani",
    image: "https://i.pinimg.com/736x/42/8c/68/428c68beb709830c29f7a80591f94de4.jpg",
    basePrice: 190,
    category: { _id: "3", name: "Biryani" },
    description: "Fragrant basmati rice layered with spiced vegetables and saffron."
  },
  {
    _id: 10,
    isNonVeg: true,
    name: "Chicken Biryani",
    image: "https://i.pinimg.com/736x/95/86/56/95865613eed291d8807a6b402e277b16.jpg",
    basePrice: 240,
    category: { _id: "3", name: "Biryani" },
    description: "Classic Hyderabadi chicken biryani cooked with rich spices and herbs."
  },
  {
    _id: 11,
    isNonVeg: true,
    name: "Mutton Biryani",
    image: "https://i.pinimg.com/736x/e1/e9/a9/e1e9a9bb4458f6cd0f0aba5fe4994f2a.jpg",
    basePrice: 280,
    category: { _id: "3", name: "Biryani" },
    description: "Tender mutton pieces layered with flavorful rice and fried onions."
  },
  {
    _id: 12,
    isNonVeg: true,
    name: "Egg Biryani",
    image: "https://i.pinimg.com/736x/b5/0c/3f/b50c3f24a363bd73d06d702088cdaba7.jpg",
    basePrice: 210,
    category: { _id: "3", name: "Biryani" },
    description: "Hard-boiled eggs nestled in spicy rice biryani, garnished with coriander."
  },
];

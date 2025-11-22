export const mockRestaurants = [
  {
    id: 1,
    name: "Pasta Palace",
    category: "Italian",
    latitude: 13.7563,
    longitude: 100.5018,
    address: "123 Sukhumvit Rd, Bangkok",
    phone: "02-123-4567",
    rating: 4.5,
    image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
    menu: [
      { name: "Carbonara", price: 250 },
      { name: "Margherita Pizza", price: 320 },
      { name: "Lasagna", price: 280 }
    ],
    reviews: [
      { id: 1, user_name: "John", rating: 5, comment: "Amazing pasta!", date: "2024-01-15" },
      { id: 2, user_name: "Sarah", rating: 4, comment: "Great atmosphere", date: "2024-01-10" }
    ]
  },
  {
    id: 2,
    name: "Sushi Express",
    category: "Japanese",
    latitude: 13.7465,
    longitude: 100.5351,
    address: "456 Silom Rd, Bangkok",
    phone: "02-234-5678",
    rating: 4.8,
    image_url: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
    menu: [
      { name: "Salmon Sushi Set", price: 350 },
      { name: "Ramen", price: 180 },
      { name: "Tempura", price: 220 }
    ],
    reviews: [
      { id: 3, user_name: "Mike", rating: 5, comment: "Best sushi in town!", date: "2024-01-20" }
    ]
  },
  {
    id: 3,
    name: "Thai Spice",
    category: "Thai",
    latitude: 13.7278,
    longitude: 100.5241,
    address: "789 Sathorn Rd, Bangkok",
    phone: "02-345-6789",
    rating: 4.3,
    image_url: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
    menu: [
      { name: "Pad Thai", price: 120 },
      { name: "Green Curry", price: 150 },
      { name: "Tom Yum Soup", price: 180 }
    ],
    reviews: [
      { id: 4, user_name: "Lisa", rating: 4, comment: "Authentic Thai food", date: "2024-01-18" }
    ]
  },
  {
    id: 4,
    name: "Dragon Palace",
    category: "Chinese",
    latitude: 13.7400,
    longitude: 100.5200,
    address: "321 Yaowarat Rd, Bangkok",
    phone: "02-456-7890",
    rating: 4.2,
    image_url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400",
    menu: [
      { name: "Dim Sum", price: 200 },
      { name: "Peking Duck", price: 450 },
      { name: "Fried Rice", price: 120 }
    ],
    reviews: []
  },
  {
    id: 5,
    name: "Green Garden",
    category: "Vegan",
    latitude: 13.7350,
    longitude: 100.5300,
    address: "555 Thonglor Rd, Bangkok",
    phone: "02-567-8901",
    rating: 4.6,
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    menu: [
      { name: "Buddha Bowl", price: 180 },
      { name: "Vegan Burger", price: 220 },
      { name: "Smoothie Bowl", price: 150 }
    ],
    reviews: [
      { id: 5, user_name: "Emma", rating: 5, comment: "Love the healthy options!", date: "2024-01-22" }
    ]
  },
  {
    id: 6,
    name: "Steak House",
    category: "Western",
    latitude: 13.7450,
    longitude: 100.5400,
    address: "999 Rama 4 Rd, Bangkok",
    phone: "02-678-9012",
    rating: 4.4,
    image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
    menu: [
      { name: "Ribeye Steak", price: 650 },
      { name: "BBQ Ribs", price: 450 },
      { name: "Caesar Salad", price: 180 }
    ],
    reviews: [
      { id: 6, user_name: "Tom", rating: 4, comment: "Great steaks!", date: "2024-01-25" }
    ]
  }
];
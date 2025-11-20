//rafce
import React from 'react'

export const mockRestaurants = [
  {
    id: 1,
    name: "Pasta Palace",
    category: "Italian",
    location: { lat: 13.7563, lng: 100.5018 },
    address: "123 Sukhumvit Rd, Bangkok",
    phone: "02-123-4567",
    rating: 4.5,
    image: "https://placeholder.image/pasta_palace",
    menu: ["Spaghetti Carbonara", "Margherita Pizza", "Tiramisu"],
    reviews: [
      { id: 101, userId: 1, rating: 5, comment: "Amazing pasta, felt like Italy!" },
      { id: 102, userId: 2, rating: 4, comment: "Great service, slightly pricey." }
    ]
  },
  {
    id: 2,
    name: "Spicy Wok",
    category: "Thai",
    location: { lat: 13.7377, lng: 100.5283 },
    address: "45/A Silom Rd, Bangkok",
    phone: "02-987-6543",
    rating: 4.8,
    image: "https://placeholder.image/spicy_wok",
    menu: ["Pad Thai", "Green Curry", "Mango Sticky Rice"],
    reviews: [
      { id: 201, userId: 3, rating: 5, comment: "Authentic and spicy Thai food. Loved the Pad Thai." }
    ]
  },
  {
    id: 3,
    name: "Burger Haven",
    category: "American",
    location: { lat: 13.7250, lng: 100.5230 },
    address: "99 Rama IV Rd, Lumpini, Bangkok",
    phone: "02-111-2222",
    rating: 3.9,
    image: "https://placeholder.image/burger_haven",
    menu: ["Classic Cheeseburger", "Fries", "Milkshake"],
    reviews: [
      { id: 301, userId: 4, rating: 4, comment: "Good, solid burgers. Fast service." },
      { id: 302, userId: 5, rating: 3, comment: "Fries were cold, burger was okay." }
    ]
  },
  {
    id: 4,
    name: "Sakura Sushi",
    category: "Japanese",
    location: { lat: 13.7844, lng: 100.5700 },
    address: "7 Soi Thong Lo, Wattana, Bangkok",
    phone: "02-555-8888",
    rating: 4.6,
    image: "https://placeholder.image/sakura_sushi",
    menu: ["Salmon Sashimi", "California Roll", "Miso Soup"],
    reviews: [
      { id: 401, userId: 6, rating: 5, comment: "The freshest sushi I've had in Bangkok!" }
    ]
  },
  {
    id: 5,
    name: "The Healthy Bowl",
    category: "Vegan",
    location: { lat: 13.7420, lng: 100.5350 },
    address: "21 Ekkamai Rd, Khlong Tan Nuea, Bangkok",
    phone: "02-333-7777",
    rating: 4.2,
    image: "https://placeholder.image/healthy_bowl",
    menu: ["Acai Bowl", "Falafel Wrap", "Smoothie"],
    reviews: []
  }
];
# Create project
```base
npm create vite@latest client -- --template react
```

# Navigate to project
```base
cd client
```

# Install dependencies
```base
npm install
```

# Install additional packages
```base
npm install react-router-dom lucide-react
```

# Start development server
```base
npm run dev
```

## Project Structure
```
restaurant-finder/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── RestaurantCard.jsx
│   │   │   ├── RestaurantMap.jsx
│   │   │   ├── ReviewForm.jsx
│   │   │   └── ReviewList.jsx
│   │   ├── pages/         # Main page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── SearchPage.jsx
│   │   │   ├── RestaurantDetail.jsx
│   │   │   └── FavoritesPage.jsx
│   │   ├── context/       # Context API for state
│   │   │   └── FavoritesContext.jsx
│   │   ├── services/      # API calls
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
└── server/                # Backend (Node.js + Express)
    ├── controllers/       # Route handlers
    ├── models/           # Database models
    ├── routes/           # API routes
    ├── config/           # Database config
    ├── server.js
    └── package.json
```
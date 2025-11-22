# 🍽️ Restaurant Finder - Complete Guide

## Overview
We will build this project in this order:
1. **Phase 1**: Create React Frontend (with mock data)
2. **Phase 2**: Create Backend API (Node.js + Express + MySQL)
3. **Phase 3**: Connect Frontend to Backend

---

# 📁 PHASE 1: FRONTEND (React + Vite)

## Step 1.1: Create Project

Open your terminal and run:

```bash
npm create vite@latest restaurant-finder -- --template react
cd restaurant-finder
npm install
```

## Step 1.2: Install Dependencies

```bash
npm install react-router-dom lucide-react
```

## Step 1.3: Create Folder Structure

Inside `src/` folder, create these folders:
- `pages`
- `components`
- `context`
- `data`

Your structure should look like:
```
restaurant-finder/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
└── index.html
```

---

## Step 1.4: Create Files (in order)

### File 1: src/data/mockRestaurants.js
### File 2: src/context/FavoritesContext.jsx
### File 3: src/pages/LandingPage.jsx
### File 4: src/pages/LandingPage.css
### File 5: src/pages/SearchPage.jsx
### File 6: src/pages/SearchPage.css
### File 7: src/pages/RestaurantDetail.jsx
### File 8: src/pages/RestaurantDetail.css
### File 9: src/pages/FavoritesPage.jsx
### File 10: src/pages/FavoritesPage.css
### File 11: src/App.jsx
### File 12: src/App.css

---

## Step 1.5: Test Frontend

```bash
npm run dev
```

Open browser: http://localhost:5173

---

# 📁 PHASE 2: BACKEND (After frontend works)

## Step 2.1: Create Server Folder
## Step 2.2: Setup MySQL Database
## Step 2.3: Create API Endpoints
## Step 2.4: Test with Postman

---

# 📁 PHASE 3: CONNECT FRONTEND TO BACKEND

## Step 3.1: Create API Service
## Step 3.2: Replace Mock Data with API Calls
## Step 3.3: Test Full Application

---

# Let's Start! 🚀

I will provide the code for each file one by one.
Follow the order above and copy each file exactly.

🗺️ Now Let's Add React-Leaflet Map!
### Step 1: Install packages
```bash
npm install react-leaflet leaflet
```

### Step 2: Create map componentsrc/components/RestaurantMap.jsx

### Step 3: Step 3: Update SearchPage.jsx to include the map

### Step 4: Add CSS for the map view toggle

# 📋 Summary - Add Map Feature
Here's what you need to do:

### Step 1: Install packages
```bash
npm install react-leaflet leaflet
```
### Step 2: Create new file
Create: src/components/RestaurantMap.jsx
(Copy code from artifact above)
### Step 3: Update SearchPage.jsx
Replace your current SearchPage.jsx with the updated version
### Step 4: Update SearchPage.css
Add the new CSS to the bottom of your existing SearchPage.css
### Step 5: Test it!
```bash
npm run dev
```

---

## 🎯 What You'll See

After adding the map:

1. **Go to Search Page** → You'll see **List** and **Map** toggle buttons
2. **Click "Map"** → Shows all restaurants on a map
3. **Click a marker** → Shows popup with restaurant info
4. **Click "View Details"** → Goes to restaurant detail page
5. **Click "View on MAP"** from Landing Page → Goes directly to map view

---

## 📁 Your Updated Folder Structure
```
src/
├── components/
│   └── RestaurantMap.jsx    ← NEW FILE
├── context/
│   └── FavoritesContext.jsx
├── data/
│   └── mockRestaurants.js
├── pages/
│   ├── FavoritesPage.jsx
│   ├── FavoritesPage.css
│   ├── LandingPage.jsx
│   ├── LandingPage.css
│   ├── RestaurantDetail.jsx
│   ├── RestaurantDetail.css
│   ├── SearchPage.jsx       ← UPDATED
│   └── SearchPage.css       ← UPDATED
├── App.jsx
├── App.css
└── main.jsx

# React Podcast App: Search, Sort, Filter, and Pagination

## Project Overview

This project is an advanced podcast browsing experience built with React. Users can dynamically search, sort, filter, and paginate a list of podcast shows. The app provides a responsive interface that updates in real time and maintains a consistent state across all UI interactions.

---

## Features
- Fully functional React app with:
  - Fetching and displaying podcast data.
  - Live searching, sorting, filtering, and pagination.
  - Consistent state across all UI interactions.
- Clean and modular codebase.
- JSDoc-documented functions and components.


## Core Features

### Search Functionality
- Implement flexible search that matches any part of the podcast title.
- Search results update dynamically as the user types or submits.
- Results integrate with current filters, sorts, and pagination without resetting them.

### Sorting Options
- Sort podcasts by:
  - Newest first (based on last updated date)
  - Title A–Z
  - Title Z–A
- Sorting works together with current search and filter criteria.

### Filtering
- Enable genre-based filtering using a dropdown or multi-select input.
- Filters combine with search and sort, updating the displayed list.
- Filter selections persist when navigating between pages or updating the app state.

### Pagination
- Display podcasts in manageable chunks.
- Supports numbered pagination, load-more, or infinite scroll.
- Pagination respects active search, filter, and sort state.
- Current search, filter, and sort selections remain intact when changing pages.

### State Synchronization
- Centralized state using React state, context, or a state management library.
- All controls (search, sort, filter, pagination) remain in sync.

---

## Code Quality & Maintainability
- Reusable, modular React components.
- Clear and consistent formatting across JavaScript, HTML/JSX, and CSS.
- JSDoc comments for all major functions and modules.

---

## Technologies Used 
- React
- JavaScript
- JSX/HTML
- CSS
- Fetch API for dynamic podcast data

---

## API Endpoints
- **Podcast Data:** `https://podcast-api.netlify.app` (returns an array of previews)

---

## How To Use  

- Browse the podcast grid on the landing page.  
- Use the **search bar** to find podcasts by typing any part of the title; results update dynamically.
- Click on a podcast card to open the modal and see more details.  
- Use the **sort dropdown** to order podcasts by:
  - Newest first  
  - Title A–Z  
  - Title Z–A
- Use the **filter dropdown** to select genres or categories and narrow down the list of podcasts.  
- Pagination controls allow navigating through pages without losing search, sort, or filter selections.  
- Hover over elements for interactive effects.  

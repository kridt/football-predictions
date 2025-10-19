# SportMonks Predictions - Setup Guide

## Installation Steps

### 1. Install Dependencies

Run the following command to install all required dependencies including Tailwind CSS v3:

```bash
npm install
```

This will install:
- tailwindcss ^3.4.1
- postcss ^8.4.35
- autoprefixer ^10.4.17
- react-router-dom (already installed)
- axios (already installed)

### 2. Verify Configuration Files

Make sure the following files are in place:

#### tailwind.config.js
Located at project root with custom theme configuration including:
- Custom color palette (primary, success, warning, danger, dark)
- Custom animations
- Font families
- Extended spacing and shadows

#### postcss.config.js
Located at project root with Tailwind and Autoprefixer plugins

#### src/index.css
Updated with Tailwind directives and custom component classes

### 3. Start Development Server

```bash
npm run dev
```

The app should now be running with Tailwind CSS fully configured!

## Project Structure

```
sportsmonk-prediction/
├── src/
│   ├── components/
│   │   ├── FixtureCard.jsx          # Main fixture card component
│   │   ├── PredictionDisplay.jsx    # Prediction display (SportMonks style)
│   │   ├── OddsDisplay.jsx          # Betting odds display
│   │   ├── LoadingSkeleton.jsx      # Loading state skeleton
│   │   ├── EmptyState.jsx           # Empty state component
│   │   ├── ErrorState.jsx           # Error state component
│   │   ├── DarkModeToggle.jsx       # Dark mode toggle button
│   │   ├── Navbar.jsx               # Navigation bar
│   │   └── index.js                 # Component exports
│   ├── pages/
│   │   ├── LandingPage.jsx          # Main fixtures listing page
│   │   ├── FixtureDetailPage.jsx    # Individual fixture details
│   │   └── index.js                 # Page exports
│   ├── index.css                    # Tailwind + custom styles
│   ├── App.jsx                      # Main app component
│   └── main.jsx                     # App entry point
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── DESIGN_SYSTEM.md                 # Complete design system docs
└── package.json
```

## Quick Start Implementation

### Update App.jsx

Replace your `src/App.jsx` with:

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage, FixtureDetailPage } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/fixture/:id" element={<FixtureDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### Update main.jsx

Make sure your `src/main.jsx` imports the CSS:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';  // This imports Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

## Component Usage Examples

### Using FixtureCard

```jsx
import { FixtureCard } from './components';

const fixture = {
  id: 1,
  homeTeam: {
    name: 'Manchester United',
    shortName: 'MUN',
    logo: null
  },
  awayTeam: {
    name: 'Liverpool',
    shortName: 'LIV',
    logo: null
  },
  league: 'Premier League',
  matchTime: 'Today, 19:45',
  prediction: {
    homeWin: 65,
    draw: 20,
    awayWin: 15
  },
  status: 'upcoming'
};

<FixtureCard fixture={fixture} />
```

### Using PredictionDisplay

```jsx
import { PredictionDisplay } from './components';

const prediction = {
  homeWin: 65,
  draw: 20,
  awayWin: 15
};

<PredictionDisplay prediction={prediction} />
```

### Using Loading States

```jsx
import { LoadingSkeleton } from './components';

// While loading
{loading && <LoadingSkeleton count={6} />}
```

### Using Error States

```jsx
import { ErrorState } from './components';

{error && (
  <ErrorState
    title="Failed to load data"
    message={error}
    onRetry={handleRetry}
  />
)}
```

### Using Empty States

```jsx
import { EmptyState } from './components';

{fixtures.length === 0 && (
  <EmptyState
    title="No fixtures available"
    message="Check back later for upcoming matches"
  />
)}
```

## Integrating with SportMonks API

### Example API Integration

Create a service file `src/services/api.js`:

```jsx
import axios from 'axios';

const API_KEY = 'YOUR_SPORTMONKS_API_KEY';
const BASE_URL = 'https://api.sportmonks.com/v3/football';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_token: API_KEY
  }
});

export const fetchFixtures = async (date) => {
  try {
    const response = await api.get('/fixtures/date/' + date);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    throw error;
  }
};

export const fetchFixtureById = async (id) => {
  try {
    const response = await api.get(`/fixtures/${id}`, {
      params: {
        include: 'predictions,odds'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching fixture:', error);
    throw error;
  }
};

export default api;
```

### Using the API in Components

```jsx
import { fetchFixtures } from '../services/api';

useEffect(() => {
  const loadFixtures = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const data = await fetchFixtures(today);

      // Transform API data to match component structure
      const transformed = data.map(fixture => ({
        id: fixture.id,
        homeTeam: {
          name: fixture.localteam_id?.name || 'Unknown',
          shortName: fixture.localteam_id?.short_code || 'UNK',
          logo: fixture.localteam_id?.logo_path
        },
        awayTeam: {
          name: fixture.visitorteam_id?.name || 'Unknown',
          shortName: fixture.visitorteam_id?.short_code || 'UNK',
          logo: fixture.visitorteam_id?.logo_path
        },
        league: fixture.league?.name || 'Unknown League',
        matchTime: new Date(fixture.starting_at).toLocaleString(),
        prediction: fixture.predictions?.data?.[0] || null,
        status: fixture.time?.status || 'upcoming'
      }));

      setFixtures(transformed);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  loadFixtures();
}, []);
```

## Dark Mode Setup

Dark mode is built-in and works automatically. The `DarkModeToggle` component:
- Saves preference to localStorage
- Respects system preference on first load
- Applies `dark` class to `<html>` element

To use dark mode in your app:

```jsx
import { Navbar } from './components';

// Navbar includes DarkModeToggle
<Navbar />
```

## Customizing the Design

### Changing Colors

Edit `tailwind.config.js` to modify colors:

```javascript
colors: {
  primary: {
    // Your custom primary colors
    500: '#0ea5e9',
    600: '#0284c7',
    // ...
  }
}
```

### Adding Custom Animations

Add to `tailwind.config.js`:

```javascript
animation: {
  'your-animation': 'yourAnimation 1s ease-in-out',
},
keyframes: {
  yourAnimation: {
    '0%': { /* start state */ },
    '100%': { /* end state */ }
  }
}
```

### Custom Component Styles

Add to `src/index.css` in the `@layer components` section:

```css
@layer components {
  .your-component {
    @apply bg-white dark:bg-dark-900 rounded-lg;
    /* more styles */
  }
}
```

## Responsive Breakpoints

- **Mobile**: Default (< 640px)
- **Tablet**: `md:` (>= 768px)
- **Desktop**: `lg:` (>= 1024px)
- **Large Desktop**: `xl:` (>= 1280px)

Example responsive usage:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 col mobile, 2 tablet, 3 desktop */}
</div>
```

## Performance Tips

1. **Lazy Load Images**: Use lazy loading for team logos
2. **Code Splitting**: Use React.lazy() for page components
3. **Memoization**: Use React.memo() for expensive components
4. **Debounce Search**: Debounce search input for better performance
5. **Pagination**: Implement pagination for large fixture lists

## Accessibility

All components include:
- Proper semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast ratios meeting WCAG AA standards

## Browser Support

Supports all modern browsers:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Troubleshooting

### Tailwind styles not working

1. Make sure `index.css` is imported in `main.jsx`
2. Check that `tailwind.config.js` content paths are correct
3. Restart the dev server

### Dark mode not working

1. Check localStorage in browser DevTools
2. Verify `dark` class is being applied to `<html>`
3. Clear browser cache

### Animations not smooth

1. Check for JavaScript blocking the main thread
2. Use CSS transforms instead of animating position/size
3. Enable hardware acceleration: `transform: translateZ(0)`

## Next Steps

1. Replace mock data with real SportMonks API calls
2. Add user authentication if needed
3. Implement favorites/bookmarks functionality
4. Add more detailed statistics
5. Create admin panel for managing predictions
6. Add social sharing features
7. Implement push notifications for match updates

## Support

For issues or questions:
- Check DESIGN_SYSTEM.md for component documentation
- Review example implementations in pages/
- Consult Tailwind CSS documentation: https://tailwindcss.com

## License

This project uses Tailwind CSS v3 which is licensed under MIT.

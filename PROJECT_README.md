# SportMonks Predictions Web App

A modern React application for viewing football match predictions powered by the SportMonks API.

## Features

- **Landing Page**: Browse all leagues with upcoming fixtures
- **Match Details**: View detailed predictions with calculated fair odds
- **Responsive Design**: Mobile-first design that works on all devices
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Real-time Updates**: Live match indicators and status updates
- **Search Functionality**: Filter leagues by name or country

## Tech Stack

- **React 19** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with animations
- **Vite** - Fast build tool and dev server

## Project Structure

```
sportsmonk-prediction/
├── src/
│   ├── components/
│   │   ├── FixtureCard.jsx          # Reusable fixture display card
│   │   ├── FixtureCard.css
│   │   ├── PredictionBar.jsx        # Prediction percentage visualizer
│   │   └── PredictionBar.css
│   ├── pages/
│   │   ├── LandingPage.jsx          # Home page with leagues
│   │   ├── LandingPage.css
│   │   ├── MatchDetails.jsx         # Match detail page
│   │   └── MatchDetails.css
│   ├── services/
│   │   └── sportsmonksApi.js        # API integration layer
│   ├── utils/
│   │   └── oddsCalculator.js        # Odds calculation utilities
│   ├── App.jsx                      # Main app with routing
│   ├── App.css
│   ├── main.jsx                     # Entry point
│   └── index.css
├── public/
├── package.json
└── vite.config.js
```

## Installation

1. Clone the repository:
```bash
cd C:\Users\chrni\Desktop\projects\evbetting\sportsmonk-prediction
```

2. Install dependencies:
```bash
npm install
```

3. Configure your API token (see API_SETUP.md)

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

## Components Documentation

### FixtureCard Component

Displays a fixture in card format with click navigation.

**Props:**
- `fixture` (Object): Fixture data containing id, name, participants, etc.

**Features:**
- Click to navigate to match details
- Shows match status (Live, Upcoming, FT)
- Displays team names and scores
- Keyboard accessible
- Hover animations

### PredictionBar Component

Visualizes prediction percentages as progress bars.

**Props:**
- `label` (String): Prediction label (e.g., "Home Win")
- `percentage` (Number): Prediction percentage (0-100)
- `color` (String): Optional color override

**Features:**
- Automatic color coding based on percentage
- Displays calculated fair odds
- Animated progress bar
- ARIA attributes for accessibility

## Utility Functions

### oddsCalculator.js

**calculateFairOdds(percentage)**
- Converts prediction percentage to decimal odds
- Formula: `odds = 1 / (percentage / 100)`
- Returns: Decimal odds (e.g., 2.00 for 50%)

**formatPercentage(percentage)**
- Formats percentage for display
- Returns: String with % symbol (e.g., "65.5%")

**getPercentageColor(percentage)**
- Determines color based on probability
- Returns: 'high' (≥60%), 'medium' (40-59%), 'low' (<40%)

## API Service

### sportsmonksApi.js

**getLeaguesWithUpcoming()**
- Fetches leagues with upcoming fixtures
- Returns: Promise with leagues data

**getFixtureDetails(fixtureId)**
- Fetches detailed fixture information
- Parameters: fixtureId (String/Number)
- Returns: Promise with fixture details including predictions

## Routing

- `/` - Landing page with all leagues and fixtures
- `/match/:fixtureId` - Match details page with predictions

## Styling

The app uses a combination of:
- **Custom CSS**: Component-specific styles
- **CSS Variables**: For consistent theming
- **Responsive Design**: Mobile-first approach with breakpoints
- **Animations**: Smooth transitions and loading states

### Color Scheme
- Primary: Blue gradient (#667eea to #764ba2)
- Success: Green (#10b981 to #059669)
- Warning: Orange (#f59e0b to #d97706)
- Danger: Red (#ef4444 to #dc2626)

## Accessibility Checklist

- ✅ Semantic HTML elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Color contrast compliance
- ✅ Screen reader friendly
- ✅ Loading and error states

## Performance Optimizations

1. **Code Splitting**: Routes are lazy-loaded
2. **Memoization**: Calculated values cached where appropriate
3. **Smooth Animations**: CSS transforms for better performance
4. **Image Optimization**: Placeholder logos for fast loading
5. **Error Boundaries**: Graceful error handling

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android

## Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Future Enhancements

- [ ] Add team statistics comparison
- [ ] Historical match data
- [ ] Bookmaker odds comparison
- [ ] User favorites and notifications
- [ ] Dark mode toggle
- [ ] Multiple language support
- [ ] Progressive Web App (PWA) support
- [ ] Real-time live score updates

## Contributing

1. Follow the existing code style
2. Add comments for complex logic
3. Test on multiple devices
4. Ensure accessibility standards are met
5. Update documentation as needed

## License

This project is for educational purposes.

## Credits

- Powered by [SportMonks API](https://www.sportmonks.com/)
- Built with React and Vite

## Support

For issues or questions:
- Check API_SETUP.md for configuration help
- Review component documentation above
- Check browser console for error messages

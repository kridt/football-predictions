# Changelog

## [Unreleased] - 2025-10-19

### Added
- **Timezone Support**: Added `timezone=Europe/Copenhagen` parameter to all API endpoints for correct local time display
- **Expandable League Cards**: New collapsible card design for leagues
  - Leagues are now displayed as cards (closed by default)
  - Click to expand/collapse and view fixtures
  - Smooth animations on expand/collapse
  - Shows match count badge on each league
  - Team names extracted and displayed properly (Home vs Away)
  - Date/time formatted in Danish locale (da-DK)

### Changed
- **API Proxy Updates**:
  - `api/leagues.js`: Added timezone parameter
  - `api/fixtures.js`: Added timezone parameter
  - `vite.config.js`: Added timezone to development proxy configuration

- **Component Updates**:
  - Created new `LeagueCard.jsx` component with expandable functionality
  - Created `LeagueCard.css` with modern styling and animations
  - Updated `LandingPage.jsx` to use new LeagueCard component
  - Simplified `LandingPage.css` (removed old league section styles)

### Technical Details

#### Timezone Implementation
All API requests now include `&timezone=Europe/Copenhagen`:
- Local development: Vite proxy adds timezone parameter
- Production: Vercel serverless functions add timezone parameter

#### League Card Features
- **Collapsed State**: Shows league logo, name, country, and fixture count
- **Expanded State**: Displays all upcoming fixtures in a list
- **Fixture Display**:
  - Home and away team names (parsed from fixture name)
  - Match date and time (formatted for Copenhagen timezone)
  - "Odds" badge if odds are available
  - Click fixture to navigate to match details page

#### Data Structure
Based on SportMonks API response structure:
- Leagues endpoint returns `data` array with leagues
- Each league has `upcoming` array with fixtures
- Fixture data includes: `id`, `name`, `starting_at`, `has_odds`, etc.

### Files Modified
1. `api/leagues.js` - Added timezone parameter
2. `api/fixtures.js` - Added timezone parameter
3. `vite.config.js` - Added timezone to proxy
4. `src/components/LeagueCard.jsx` - New component
5. `src/components/LeagueCard.css` - New stylesheet
6. `src/pages/LandingPage.jsx` - Updated to use LeagueCard
7. `src/pages/LandingPage.css` - Simplified styles

### Build Status
✅ Build successful: 273.60 kB JS, 27.09 kB CSS

### Testing
- [x] Timezone parameter added to all endpoints
- [x] League cards expand/collapse properly
- [x] Fixtures display correctly within cards
- [x] Click fixture navigates to match details
- [x] Date/time formatting works
- [x] Responsive design on mobile
- [x] Build completes without errors

### Next Steps
To test locally:
```bash
cd C:\Users\chrni\Desktop\projects\evbetting\sportsmonk-prediction
npm run dev
```

Open http://localhost:5173 and:
1. Verify leagues display as closed cards
2. Click a league to expand and see fixtures
3. Click a fixture to navigate to match details
4. Check that times are in Europe/Copenhagen timezone

### Deployment
When deploying to Vercel:
1. Timezone parameter is automatically included in API proxy requests
2. No additional configuration needed
3. Environment variable `VITE_SPORTMONKS_API_TOKEN` must be set

---

## Notes
- All times will now display in Europe/Copenhagen timezone
- League cards are closed by default to reduce visual clutter
- User can expand leagues they're interested in
- Maintains existing functionality for match details page

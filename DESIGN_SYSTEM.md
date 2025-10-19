# SportMonks Predictions - Design System

## Installation

After creating the configuration files, run:

```bash
npm install
```

This will install tailwindcss, postcss, and autoprefixer.

## Color Palette

### Primary Colors (Blue - Main Brand)
- `primary-50` to `primary-950`: Main brand colors for CTAs and accents
- Use `primary-600` for primary buttons and `primary-500` for hover states

### Prediction Status Colors
- **Success (Green)**: Win predictions - `success-500` to `success-700`
- **Warning (Yellow/Orange)**: Draw predictions - `warning-500` to `warning-700`
- **Danger (Red)**: Loss predictions - `danger-500` to `danger-700`

### Dark Mode Colors
- `dark-50` to `dark-950`: Grayscale for dark mode backgrounds and surfaces
- Use `dark-900` for cards, `dark-950` for page background

## Typography

### Font Families
- **Sans Serif**: `font-sans` (Inter) - Body text
- **Display**: `font-display` (Poppins) - Headings
- **Monospace**: `font-mono` (Fira Code) - Odds/Stats

### Font Sizes
- Headings: `text-2xl`, `text-3xl`, `text-4xl`
- Body: `text-base` (16px)
- Small text: `text-sm` (14px)
- Meta info: `text-xs` (12px)

## Component Examples

### 1. Fixture Card (Landing Page)

```jsx
<div className="fixture-card">
  {/* League Info */}
  <div className="flex items-center justify-between mb-4">
    <span className="badge-info">Premier League</span>
    <span className="text-sm text-gray-500 dark:text-gray-400">
      Today, 19:45
    </span>
  </div>

  {/* Teams */}
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-3 flex-1">
      <div className="team-logo">
        <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
          MU
        </span>
      </div>
      <span className="font-semibold text-gray-900 dark:text-white">
        Manchester United
      </span>
    </div>

    <span className="text-2xl font-bold text-gray-400 dark:text-gray-500 px-4">
      VS
    </span>

    <div className="flex items-center space-x-3 flex-1 justify-end">
      <span className="font-semibold text-gray-900 dark:text-white text-right">
        Liverpool
      </span>
      <div className="team-logo">
        <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
          LIV
        </span>
      </div>
    </div>
  </div>

  {/* Prediction Preview */}
  <div className="flex items-center justify-between">
    <div className="flex-1">
      <div className="progress-bar">
        <div
          className="progress-fill-success"
          style={{ width: '65%' }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        65% Home Win
      </p>
    </div>
    <button className="btn-primary ml-4">
      View Details
    </button>
  </div>
</div>
```

### 2. Match Details Page - Prediction Display

```jsx
<div className="prediction-display">
  <div className="relative z-10">
    <h3 className="text-sm font-medium text-white/80 uppercase tracking-wide mb-2">
      Match Prediction
    </h3>
    <div className="flex items-baseline space-x-2">
      <span className="text-5xl font-bold">65%</span>
      <span className="text-xl">Home Win</span>
    </div>
    <p className="text-white/90 mt-2">
      High confidence prediction based on recent form
    </p>
  </div>
</div>
```

### 3. Prediction Breakdown with Progress Bars

```jsx
<div className="card p-6 space-y-4">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
    Prediction Breakdown
  </h3>

  {/* Home Win */}
  <div>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Home Win
      </span>
      <span className="text-sm font-bold text-success-600 dark:text-success-400">
        65%
      </span>
    </div>
    <div className="progress-bar h-3">
      <div
        className="progress-fill-success"
        style={{ width: '65%' }}
      ></div>
    </div>
  </div>

  {/* Draw */}
  <div>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Draw
      </span>
      <span className="text-sm font-bold text-warning-600 dark:text-warning-400">
        20%
      </span>
    </div>
    <div className="progress-bar h-3">
      <div
        className="progress-fill-warning"
        style={{ width: '20%' }}
      ></div>
    </div>
  </div>

  {/* Away Win */}
  <div>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Away Win
      </span>
      <span className="text-sm font-bold text-danger-600 dark:text-danger-400">
        15%
      </span>
    </div>
    <div className="progress-bar h-3">
      <div
        className="progress-fill-danger"
        style={{ width: '15%' }}
      ></div>
    </div>
  </div>
</div>
```

### 4. Odds Display

```jsx
<div className="card p-6">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
    Best Odds
  </h3>

  <div className="grid grid-cols-3 gap-4">
    <div className="text-center">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Home</p>
      <div className="odds-box">2.10</div>
    </div>

    <div className="text-center">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Draw</p>
      <div className="odds-box">3.40</div>
    </div>

    <div className="text-center">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Away</p>
      <div className="odds-box">3.80</div>
    </div>
  </div>
</div>
```

### 5. Loading State (Skeleton)

```jsx
<div className="fixture-card animate-fade-in">
  <div className="flex items-center justify-between mb-4">
    <div className="skeleton h-6 w-32"></div>
    <div className="skeleton h-5 w-24"></div>
  </div>

  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-3">
      <div className="skeleton w-16 h-16 rounded-full"></div>
      <div className="skeleton h-6 w-40"></div>
    </div>

    <div className="skeleton h-8 w-12"></div>

    <div className="flex items-center space-x-3">
      <div className="skeleton h-6 w-40"></div>
      <div className="skeleton w-16 h-16 rounded-full"></div>
    </div>
  </div>

  <div className="skeleton h-10 w-full"></div>
</div>
```

### 6. Empty State

```jsx
<div className="empty-state">
  <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
  </svg>
  <h3 className="text-lg font-semibold mb-2">No fixtures available</h3>
  <p className="text-sm">Check back later for upcoming matches</p>
</div>
```

### 7. Error State

```jsx
<div className="error-state">
  <div className="flex items-start">
    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
    <div>
      <h3 className="font-semibold mb-1">Error loading predictions</h3>
      <p className="text-sm">Please try again later or contact support if the issue persists.</p>
    </div>
  </div>
</div>
```

### 8. Live Match Indicator

```jsx
<div className="badge-danger">
  <span className="status-live">LIVE</span>
</div>
```

### 9. Page Layout with Animation

```jsx
<div className="min-h-screen bg-gray-50 dark:bg-dark-950">
  {/* Navigation */}
  <nav className="glass sticky top-0 z-50">
    <div className="container-custom">
      <div className="flex items-center justify-between h-16">
        <h1 className="text-2xl font-display font-bold gradient-text">
          SportMonks Predictions
        </h1>

        {/* Dark mode toggle would go here */}
      </div>
    </div>
  </nav>

  {/* Main Content */}
  <main className="container-custom section">
    <div className="animate-fade-in-up">
      {/* Page content */}
    </div>
  </main>
</div>
```

### 10. Grid Layout for Fixtures

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Fixture cards with staggered animation */}
  <div className="animate-fade-in-up">
    {/* Fixture Card 1 */}
  </div>

  <div className="animate-fade-in-up animation-delay-100">
    {/* Fixture Card 2 */}
  </div>

  <div className="animate-fade-in-up animation-delay-200">
    {/* Fixture Card 3 */}
  </div>
</div>
```

## Animation Classes

### Entry Animations
- `animate-fade-in`: Simple fade in
- `animate-fade-in-up`: Fade in while sliding up
- `animate-fade-in-down`: Fade in while sliding down
- `animate-slide-in-right`: Slide in from left
- `animate-slide-in-left`: Slide in from right
- `animate-scale-in`: Scale up while fading in

### Loading Animations
- `animate-pulse`: For skeletons
- `animate-spin`: For spinners
- `animate-spin-slow`: Slower spinner
- `animate-shimmer`: For shimmer effects

### Continuous Animations
- `animate-bounce-subtle`: Gentle bounce
- `animate-pulse-subtle`: Subtle pulsing

### Animation Delays
Use with any animation: `animation-delay-100`, `animation-delay-200`, etc.

## Responsive Design Breakpoints

- **Mobile**: Default (< 640px)
- **Tablet**: `md:` (>= 768px)
- **Desktop**: `lg:` (>= 1024px)
- **Large Desktop**: `xl:` (>= 1280px)

## Dark Mode

The design system is built with dark mode support. To enable dark mode, add the `dark` class to the `<html>` element:

```jsx
// Dark mode toggle example
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);
```

## Best Practices

1. **Use semantic colors**:
   - Success (green) for home win
   - Warning (yellow) for draw
   - Danger (red) for away win

2. **Maintain consistency**: Use the predefined component classes

3. **Accessibility**:
   - Always provide proper contrast ratios
   - Use semantic HTML
   - Include ARIA labels where needed

4. **Performance**:
   - Use loading skeletons for better perceived performance
   - Implement proper error boundaries
   - Lazy load images and heavy components

5. **Animations**:
   - Keep animations subtle and purposeful
   - Use staggered animations for lists (animation-delay classes)
   - Respect `prefers-reduced-motion` media query

## Implementation Notes

### Match Status Colors
```jsx
const getStatusColor = (status) => {
  switch (status) {
    case 'live':
      return 'badge-danger';
    case 'upcoming':
      return 'badge-info';
    case 'finished':
      return 'badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    default:
      return 'badge-info';
  }
};
```

### Prediction Confidence Colors
```jsx
const getPredictionColor = (percentage) => {
  if (percentage >= 70) return 'progress-fill-success';
  if (percentage >= 50) return 'progress-fill-warning';
  return 'progress-fill-danger';
};
```

### Responsive Card Grid
```jsx
// 1 column on mobile, 2 on tablet, 3 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {fixtures.map((fixture, index) => (
    <div
      key={fixture.id}
      className={`animate-fade-in-up animation-delay-${Math.min(index * 100, 500)}`}
    >
      {/* Fixture card */}
    </div>
  ))}
</div>
```

## SportMonks-Style Prediction Component

```jsx
<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-8 text-white shadow-2xl">
  {/* Animated background effect */}
  <div className="absolute inset-0 bg-white/5 animate-shimmer"></div>

  <div className="relative z-10">
    {/* Main prediction */}
    <div className="text-center mb-8">
      <p className="text-sm uppercase tracking-wide text-white/80 mb-2">
        AI Prediction
      </p>
      <div className="flex items-center justify-center space-x-4">
        <div className="text-6xl font-bold">65</div>
        <div className="text-left">
          <div className="text-sm text-white/80">Percent</div>
          <div className="text-2xl font-semibold">Home Win</div>
        </div>
      </div>
    </div>

    {/* Three-way breakdown */}
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
        <div className="text-3xl font-bold mb-1">65%</div>
        <div className="text-xs text-white/80">Home</div>
      </div>
      <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
        <div className="text-3xl font-bold mb-1">20%</div>
        <div className="text-xs text-white/80">Draw</div>
      </div>
      <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
        <div className="text-3xl font-bold mb-1">15%</div>
        <div className="text-xs text-white/80">Away</div>
      </div>
    </div>
  </div>
</div>
```

## Quick Reference

### Common Button Patterns
- Primary CTA: `btn-primary`
- Secondary action: `btn-secondary`
- Positive action: `btn-success`
- Destructive action: `btn-danger`

### Common Card Patterns
- Static card: `card`
- Interactive card: `card-hover`
- Fixture card: `fixture-card`
- Glass card: `card glass`

### Common Badge Patterns
- League/Competition: `badge-info`
- Live status: `badge-danger` + `status-live`
- Win prediction: `badge-success`
- Draw prediction: `badge-warning`
- Loss prediction: `badge-danger`

### Common Layout Patterns
- Page container: `container-custom`
- Section spacing: `section`
- Content grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

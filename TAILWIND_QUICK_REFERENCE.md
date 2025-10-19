# Tailwind CSS Quick Reference for SportMonks Predictions

## Most Used Classes in This Project

### Layout & Spacing

```jsx
// Container
className="container-custom"           // Max-width container with padding

// Section spacing
className="section"                    // Standard section padding (py-8 md:py-12 lg:py-16)

// Grid layouts
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Flex layouts
className="flex items-center justify-between"
className="flex flex-col space-y-4"
className="flex items-center space-x-3"
```

### Cards

```jsx
// Basic card
className="card"

// Interactive card with hover
className="card-hover"

// Fixture card (pre-styled)
className="fixture-card"

// Glass effect card
className="card glass"
```

### Buttons

```jsx
// Primary button
className="btn-primary"

// Secondary button
className="btn-secondary"

// Success button
className="btn-success"

// Danger button
className="btn-danger"
```

### Badges

```jsx
// League/Info badge
className="badge-info"

// Success badge
className="badge-success"

// Warning badge
className="badge-warning"

// Danger badge
className="badge-danger"

// Live indicator
className="badge-danger">
  <span className="status-live">LIVE</span>
</span>
```

### Progress Bars

```jsx
// Container
<div className="progress-bar">
  {/* Success (green) */}
  <div className="progress-fill-success" style={{ width: '65%' }}></div>

  {/* Warning (yellow) */}
  <div className="progress-fill-warning" style={{ width: '20%' }}></div>

  {/* Danger (red) */}
  <div className="progress-fill-danger" style={{ width: '15%' }}></div>
</div>

// Thicker progress bar
<div className="progress-bar h-3">
  <div className="progress-fill-success" style={{ width: '65%' }}></div>
</div>
```

### Animations

```jsx
// Fade in
className="animate-fade-in"

// Fade in up (from bottom)
className="animate-fade-in-up"

// Fade in down (from top)
className="animate-fade-in-down"

// Slide in from left
className="animate-slide-in-right"

// Slide in from right
className="animate-slide-in-left"

// Scale in
className="animate-scale-in"

// With delay (use with any animation)
className="animate-fade-in-up animation-delay-100"
className="animate-fade-in-up animation-delay-200"
className="animate-fade-in-up animation-delay-300"
```

### Colors

```jsx
// Primary blue
className="bg-primary-600 text-white"
className="text-primary-600"
className="border-primary-600"

// Success green
className="bg-success-600 text-white"
className="text-success-600 dark:text-success-400"

// Warning yellow
className="bg-warning-600 text-white"
className="text-warning-600 dark:text-warning-400"

// Danger red
className="bg-danger-600 text-white"
className="text-danger-600 dark:text-danger-400"

// Dark mode backgrounds
className="bg-gray-50 dark:bg-dark-950"      // Page background
className="bg-white dark:bg-dark-900"        // Card background
className="bg-gray-100 dark:bg-dark-800"     // Light background

// Text colors
className="text-gray-900 dark:text-white"         // Headings
className="text-gray-700 dark:text-gray-300"      // Body text
className="text-gray-500 dark:text-gray-400"      // Secondary text
```

### Typography

```jsx
// Display headings
className="text-4xl font-display font-bold"

// Regular headings
className="text-2xl font-bold text-gray-900 dark:text-white"
className="text-xl font-semibold text-gray-900 dark:text-white"
className="text-lg font-semibold text-gray-900 dark:text-white"

// Body text
className="text-base text-gray-700 dark:text-gray-300"

// Small text
className="text-sm text-gray-600 dark:text-gray-400"

// Extra small (meta info)
className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide"

// Gradient text
className="gradient-text"

// Monospace (for odds/numbers)
className="font-mono text-lg font-semibold"
```

### Team Logos

```jsx
// Standard team logo container
<div className="team-logo">
  {logo ? (
    <img src={logo} alt="Team" className="w-full h-full rounded-full object-cover" />
  ) : (
    <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
      MUN
    </span>
  )}
</div>
```

### Forms & Inputs

```jsx
// Text input
className="input"

// With full width
className="input w-full"

// Select dropdown
<select className="input">
  <option>Option 1</option>
</select>
```

### Loading States

```jsx
// Skeleton element
className="skeleton h-6 w-32"
className="skeleton w-16 h-16 rounded-full"

// Pulsing animation
className="animate-pulse"
```

### Odds Boxes

```jsx
<div className="odds-box">
  <span className="font-mono">2.10</span>
</div>
```

### Prediction Display (SportMonks Style)

```jsx
<div className="prediction-display">
  <div className="relative z-10">
    <p className="text-sm uppercase tracking-wide text-white/80 mb-2">
      AI Match Prediction
    </p>
    <div className="flex items-baseline space-x-3 mb-2">
      <span className="text-6xl font-bold">65</span>
      <span className="text-2xl">%</span>
    </div>
    <div className="text-xl font-semibold mb-3">Home Win</div>
  </div>
</div>
```

### State Components

```jsx
// Empty state
<div className="empty-state">
  {/* Icon */}
  <h3>Title</h3>
  <p>Message</p>
</div>

// Error state
<div className="error-state">
  {/* Error content */}
</div>
```

## Common Patterns

### Responsive Grid

```jsx
// 1 column mobile, 2 tablet, 3 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### Staggered Animations

```jsx
{items.map((item, index) => (
  <div
    key={item.id}
    className="animate-fade-in-up"
    style={{ animationDelay: `${Math.min(index * 100, 500)}ms` }}
  >
    <Card item={item} />
  </div>
))}
```

### Hover Effects

```jsx
// Card with hover
className="card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"

// Button with hover
className="bg-primary-600 hover:bg-primary-700 transition-colors duration-200"

// Link with hover
className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
```

### Conditional Classes

```jsx
// Using template literals
className={`badge ${status === 'live' ? 'badge-danger' : 'badge-info'}`}

// Using classnames library (optional)
className={classnames('card', {
  'card-hover': isClickable,
  'opacity-50': isDisabled
})}
```

### Dark Mode Toggle

```jsx
// Light/dark variants
className="bg-white dark:bg-dark-900"
className="text-gray-900 dark:text-white"
className="border-gray-200 dark:border-dark-800"

// Dark mode specific styles
className="dark:hover:bg-dark-700"
```

### Flexbox Centering

```jsx
// Center everything
className="flex items-center justify-center"

// Vertical center, space between
className="flex items-center justify-between"

// Column layout with spacing
className="flex flex-col space-y-4"

// Row layout with spacing
className="flex items-center space-x-3"
```

### Truncate Text

```jsx
// Single line truncate
className="truncate"

// Multiple lines
className="line-clamp-2"    // 2 lines
className="line-clamp-3"    // 3 lines
```

### Shadows

```jsx
// Card shadow
className="shadow-card"
className="shadow-card-hover"

// Dark mode shadows
className="shadow-card dark:shadow-card-dark"
className="hover:shadow-card-hover dark:hover:shadow-card-dark-hover"

// Custom shadows
className="shadow-lg"
className="shadow-xl"
```

### Borders & Radius

```jsx
// Standard border
className="border border-gray-200 dark:border-dark-800"

// Rounded corners
className="rounded-lg"       // Standard
className="rounded-xl"       // Larger
className="rounded-2xl"      // Extra large
className="rounded-full"     // Circle
```

## Utility Combinations

### Card with hover and animation

```jsx
<div className="card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
  {/* Content */}
</div>
```

### Responsive text sizes

```jsx
<h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold">
  Heading
</h1>
```

### Centered content with max width

```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Sticky navigation

```jsx
<nav className="sticky top-0 z-50 glass">
  {/* Nav content */}
</nav>
```

### Gradient backgrounds

```jsx
// Linear gradient
className="bg-gradient-to-r from-primary-600 to-primary-800"

// Radial gradient (custom)
className="bg-gradient-to-br from-primary-500 to-primary-700"
```

## Pro Tips

1. **Use @apply for repeated patterns** - Define in index.css
2. **Combine hover states** - `hover:bg-blue-600 hover:shadow-lg`
3. **Stack transforms** - `hover:scale-105 hover:-translate-y-1`
4. **Use arbitrary values** - `w-[47.5%]` when needed
5. **Group hover effects** - `group` and `group-hover:`
6. **Transition all** - `transition-all duration-300` for smooth animations
7. **Focus states** - Always include `focus:ring-2 focus:ring-primary-500`
8. **Dark mode first** - Design with dark mode in mind from the start
9. **Mobile first** - Design for mobile, then add `md:` and `lg:` variants
10. **Use custom components** - Create reusable component classes for consistency

## Debugging

```jsx
// Temporary border to see layout
className="border border-red-500"

// Temporary background
className="bg-red-100"

// See responsive breakpoints
className="bg-red-100 md:bg-blue-100 lg:bg-green-100"
```

## VS Code Setup

For better Tailwind development experience, install:
- Tailwind CSS IntelliSense extension
- Auto-complete for class names
- Linting for unused classes

Add to VS Code settings.json:
```json
{
  "tailwindCSS.experimental.classRegex": [
    ["classNames\\(([^)]*)\\)", "'([^']*)'"]
  ]
}
```

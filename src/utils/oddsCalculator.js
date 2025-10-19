/**
 * Calculates decimal fair odds from prediction percentage
 * Formula: odds = 1 / (percentage / 100)
 *
 * @param {number} percentage - Prediction percentage (0-100)
 * @returns {number} Decimal odds rounded to 2 decimal places
 *
 * @example
 * calculateFairOdds(50) // returns 2.00 (50% chance = 2.00 odds)
 * calculateFairOdds(25) // returns 4.00 (25% chance = 4.00 odds)
 */
export const calculateFairOdds = (percentage) => {
  if (!percentage || percentage <= 0) return 0;
  return (1 / (percentage / 100)).toFixed(2);
};

/**
 * Formats percentage for display
 * @param {number} percentage - Raw percentage value
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (percentage) => {
  if (!percentage) return '0%';
  return `${percentage.toFixed(1)}%`;
};

/**
 * Determines color based on percentage (for styling)
 * @param {number} percentage - Prediction percentage
 * @returns {string} Color class or value
 */
export const getPercentageColor = (percentage) => {
  if (percentage >= 60) return 'high'; // High probability
  if (percentage >= 40) return 'medium'; // Medium probability
  return 'low'; // Low probability
};

// Alias for backwards compatibility
export const calculateDecimalOdds = calculateFairOdds;

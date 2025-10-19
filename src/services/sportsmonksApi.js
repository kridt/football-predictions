import axios from 'axios';

/**
 * API Service using proxy endpoints to avoid CORS issues
 *
 * In development: Vite proxy forwards /api/* to SportMonks API
 * In production: Vercel serverless functions handle /api/* requests
 */

/**
 * Creates axios instance for proxy API calls
 */
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetches all leagues with upcoming fixtures
 * @returns {Promise} API response with leagues data
 */
export const getLeaguesWithUpcoming = async () => {
  try {
    const response = await apiClient.get('/leagues');
    return response.data;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw error;
  }
};

/**
 * Fetches detailed fixture information by ID
 * @param {string|number} fixtureId - The fixture ID
 * @returns {Promise} API response with fixture details
 */
export const getFixtureDetails = async (fixtureId) => {
  try {
    const response = await apiClient.get('/fixtures', {
      params: {
        id: fixtureId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching fixture ${fixtureId}:`, error);
    throw error;
  }
};

/**
 * Generic API call helper
 * @param {string} endpoint - API endpoint
 * @param {object} params - Query parameters
 * @returns {Promise} API response
 */
export const makeApiCall = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
};

export default apiClient;

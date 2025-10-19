# SportMonks API Setup Guide

## Getting Your API Token

1. Visit [SportMonks](https://www.sportmonks.com/)
2. Sign up for an account
3. Navigate to your dashboard to get your API token

## Configuration

To use your API token in the application:

1. Open `src/services/sportsmonksApi.js`
2. Replace `'YOUR_TOKEN'` with your actual API token:

```javascript
const API_TOKEN = 'your_actual_token_here';
```

## API Endpoints Used

### Landing Page
- **Endpoint**: `/v3/football/leagues`
- **Parameters**:
  - `api_token`: Your API token
  - `include`: `upcoming;country`
- **Description**: Fetches all leagues with their upcoming fixtures

### Match Details
- **Endpoint**: `/v3/football/fixtures/{fixtureId}`
- **Parameters**:
  - `api_token`: Your API token
  - `include`: `participants;league;venue;state;scores;events.type;events.period;events.player;predictions.type`
- **Description**: Fetches detailed fixture information including predictions

## Environment Variables (Optional)

For better security, you can use environment variables:

1. Create a `.env` file in the root directory:
```
VITE_SPORTMONKS_API_TOKEN=your_token_here
```

2. Update `src/services/sportsmonksApi.js`:
```javascript
const API_TOKEN = import.meta.env.VITE_SPORTMONKS_API_TOKEN || 'YOUR_TOKEN';
```

3. Add `.env` to your `.gitignore` file to keep your token private

## Testing the Integration

1. Start the development server:
```bash
npm run dev
```

2. Open your browser to the local URL (usually http://localhost:5173)
3. You should see leagues with upcoming fixtures on the landing page
4. Click any fixture to view detailed predictions

## Troubleshooting

### "Failed to load leagues" error
- Verify your API token is correct
- Check your internet connection
- Ensure you have sufficient API credits

### No predictions showing
- Some fixtures may not have predictions available yet
- Predictions are typically available closer to match time
- Check the SportMonks dashboard for data availability

### CORS errors
- The API should support CORS by default
- If issues persist, contact SportMonks support

## Rate Limits

Be aware of your plan's rate limits:
- Free tier: Limited requests per minute
- Paid tiers: Higher limits based on subscription

## Support

For API-related issues:
- [SportMonks Documentation](https://docs.sportmonks.com/)
- [SportMonks Support](https://www.sportmonks.com/support)

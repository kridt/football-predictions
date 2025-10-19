import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFixtureDetails } from '../services/sportsmonksApi';
import { calculateDecimalOdds } from '../utils/oddsCalculator';
import './MatchDetails.css';

/**
 * MatchDetails Component
 * Displays detailed match information with ALL predictions
 */
const MatchDetails = () => {
  const { fixtureId } = useParams();
  const navigate = useNavigate();
  const [fixture, setFixture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('fulltime');

  useEffect(() => {
    fetchFixtureDetails();
  }, [fixtureId]);

  const fetchFixtureDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFixtureDetails(fixtureId);
      setFixture(data.data);
    } catch (err) {
      setError('Failed to load fixture details');
      console.error('Error fetching fixture:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPredictionByType = (code) => {
    return fixture?.predictions?.find(p => p.type?.code === code);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('da-DK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderFulltimeResult = () => {
    const pred = getPredictionByType('fulltime-result-probability');
    if (!pred) return <div className="no-data">No prediction data available</div>;

    const { home, draw, away } = pred.predictions;

    return (
      <div className="prediction-grid">
        <div className="prediction-card">
          <div className="prediction-label">Home Win</div>
          <div className="prediction-percentage">{home?.toFixed(2)}%</div>
          <div className="prediction-odds">Odds: {calculateDecimalOdds(home)}</div>
        </div>
        <div className="prediction-card">
          <div className="prediction-label">Draw</div>
          <div className="prediction-percentage">{draw?.toFixed(2)}%</div>
          <div className="prediction-odds">Odds: {calculateDecimalOdds(draw)}</div>
        </div>
        <div className="prediction-card">
          <div className="prediction-label">Away Win</div>
          <div className="prediction-percentage">{away?.toFixed(2)}%</div>
          <div className="prediction-odds">Odds: {calculateDecimalOdds(away)}</div>
        </div>
      </div>
    );
  };

  const renderFirstHalfWinner = () => {
    const pred = getPredictionByType('first-half-winner');
    if (!pred) return <div className="no-data">No prediction data available</div>;

    const { home, draw, away } = pred.predictions;

    return (
      <div className="prediction-grid">
        <div className="prediction-card">
          <div className="prediction-label">Home Win (HT)</div>
          <div className="prediction-percentage">{home?.toFixed(2)}%</div>
          <div className="prediction-odds">Odds: {calculateDecimalOdds(home)}</div>
        </div>
        <div className="prediction-card">
          <div className="prediction-label">Draw (HT)</div>
          <div className="prediction-percentage">{draw?.toFixed(2)}%</div>
          <div className="prediction-odds">Odds: {calculateDecimalOdds(draw)}</div>
        </div>
        <div className="prediction-card">
          <div className="prediction-label">Away Win (HT)</div>
          <div className="prediction-percentage">{away?.toFixed(2)}%</div>
          <div className="prediction-odds">Odds: {calculateDecimalOdds(away)}</div>
        </div>
      </div>
    );
  };

  const renderDoubleChance = () => {
    const pred = getPredictionByType('double_chance-probability');
    if (!pred) return <div className="no-data">No prediction data available</div>;

    const { draw_home, home_away, draw_away } = pred.predictions;

    return (
      <div className="prediction-grid">
        <div className="prediction-card">
          <div className="prediction-label">Home or Draw</div>
          <div className="prediction-percentage">{draw_home?.toFixed(2)}%</div>
          <div className="prediction-odds">Odds: {calculateDecimalOdds(draw_home)}</div>
        </div>
        <div className="prediction-card">
          <div className="prediction-label">Home or Away</div>
          <div className="prediction-percentage">{home_away?.toFixed(2)}%</div>
          <div className="prediction-odds">Odds: {calculateDecimalOdds(home_away)}</div>
        </div>
        <div className="prediction-card">
          <div className="prediction-label">Draw or Away</div>
          <div className="prediction-percentage">{draw_away?.toFixed(2)}%</div>
          <div className="prediction-odds">Odds: {calculateDecimalOdds(draw_away)}</div>
        </div>
      </div>
    );
  };

  const renderHalfTimeFullTime = () => {
    const pred = getPredictionByType('half-time-full-time-probability');
    if (!pred) return <div className="no-data">No prediction data available</div>;

    const { home_home, home_draw, home_away, draw_home, draw_draw, draw_away, away_home, away_draw, away_away } = pred.predictions;

    return (
      <div className="htft-container">
        <div className="htft-label-row">HT / FT</div>
        <div className="htft-grid">
          <div className="htft-header">
            <div></div>
            <div className="htft-label">Home</div>
            <div className="htft-label">Draw</div>
            <div className="htft-label">Away</div>
          </div>
          <div className="htft-row">
            <div className="htft-label">Home</div>
            <div className="htft-cell">
              <div className="htft-percentage">{home_home?.toFixed(2)}%</div>
              <div className="htft-odds">{calculateDecimalOdds(home_home)}</div>
            </div>
            <div className="htft-cell">
              <div className="htft-percentage">{home_draw?.toFixed(2)}%</div>
              <div className="htft-odds">{calculateDecimalOdds(home_draw)}</div>
            </div>
            <div className="htft-cell">
              <div className="htft-percentage">{home_away?.toFixed(2)}%</div>
              <div className="htft-odds">{calculateDecimalOdds(home_away)}</div>
            </div>
          </div>
          <div className="htft-row">
            <div className="htft-label">Draw</div>
            <div className="htft-cell">
              <div className="htft-percentage">{draw_home?.toFixed(2)}%</div>
              <div className="htft-odds">{calculateDecimalOdds(draw_home)}</div>
            </div>
            <div className="htft-cell">
              <div className="htft-percentage">{draw_draw?.toFixed(2)}%</div>
              <div className="htft-odds">{calculateDecimalOdds(draw_draw)}</div>
            </div>
            <div className="htft-cell">
              <div className="htft-percentage">{draw_away?.toFixed(2)}%</div>
              <div className="htft-odds">{calculateDecimalOdds(draw_away)}</div>
            </div>
          </div>
          <div className="htft-row">
            <div className="htft-label">Away</div>
            <div className="htft-cell">
              <div className="htft-percentage">{away_home?.toFixed(2)}%</div>
              <div className="htft-odds">{calculateDecimalOdds(away_home)}</div>
            </div>
            <div className="htft-cell">
              <div className="htft-percentage">{away_draw?.toFixed(2)}%</div>
              <div className="htft-odds">{calculateDecimalOdds(away_draw)}</div>
            </div>
            <div className="htft-cell">
              <div className="htft-percentage">{away_away?.toFixed(2)}%</div>
              <div className="htft-odds">{calculateDecimalOdds(away_away)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOverUnder = () => {
    const predictions = [
      { codes: ['over-under-1_5-probability', 'over-under-1_5_probability'], label: 'Over/Under 1.5' },
      { codes: ['over-under-2_5-probability', 'over-under-2_5_probability'], label: 'Over/Under 2.5' },
      { codes: ['over-under-3_5-probability', 'over-under-3_5_probability'], label: 'Over/Under 3.5' },
      { codes: ['over-under-4_5-probability', 'over-under-4_5_probability'], label: 'Over/Under 4.5' }
    ];

    const hasAnyData = predictions.some(({ codes }) =>
      codes.some(code => getPredictionByType(code))
    );
    if (!hasAnyData) return <div className="no-data">No prediction data available</div>;

    return (
      <div className="ou-grid">
        {predictions.map(({ codes, label }) => {
          // Try both code variations due to API inconsistency
          let pred = null;
          for (const code of codes) {
            pred = getPredictionByType(code);
            if (pred) break;
          }
          if (!pred) return null;

          const { yes: over, no: under } = pred.predictions;

          return (
            <div key={codes[0]} className="ou-row">
              <div className="ou-label">{label}</div>
              <div className="ou-option over">
                <span className="ou-text">Over</span>
                <span className="ou-percentage">{over?.toFixed(2)}%</span>
                <span className="ou-odds">{calculateDecimalOdds(over)}</span>
              </div>
              <div className="ou-option under">
                <span className="ou-text">Under</span>
                <span className="ou-percentage">{under?.toFixed(2)}%</span>
                <span className="ou-odds">{calculateDecimalOdds(under)}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderBothTeamsToScore = () => {
    const pred = getPredictionByType('both-teams-to-score-probability');
    if (!pred) return <div className="no-data">No prediction data available</div>;

    const { yes, no } = pred.predictions;

    return (
      <div className="prediction-grid">
        <div className="prediction-card">
          <div className="prediction-label">Yes</div>
          <div className="prediction-percentage">{yes?.toFixed(2)}%</div>
          <div className="prediction-odds">Odds: {calculateDecimalOdds(yes)}</div>
        </div>
        <div className="prediction-card">
          <div className="prediction-label">No</div>
          <div className="prediction-percentage">{no?.toFixed(2)}%</div>
          <div className="prediction-odds">Odds: {calculateDecimalOdds(no)}</div>
        </div>
      </div>
    );
  };

  const renderCorrectScore = () => {
    const pred = getPredictionByType('correct-score-probability');
    if (!pred) return <div className="no-data">No prediction data available</div>;

    const scores = pred.predictions.scores || pred.predictions;
    const scoreEntries = Object.entries(scores).filter(([key]) => !key.startsWith('Other'));

    return (
      <div className="cs-grid">
        {scoreEntries.map(([score, percentage]) => (
          <div key={score} className="cs-card">
            <div className="cs-score">{score}</div>
            <div className="cs-percentage">{typeof percentage === 'number' ? percentage.toFixed(2) : '0.00'}%</div>
            <div className="cs-odds">{calculateDecimalOdds(percentage)}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderTeamToScoreFirst = () => {
    const pred = getPredictionByType('team_to_score_first-probability');
    if (!pred) return <div className="no-data">No prediction data available</div>;

    const { home, away, draw } = pred.predictions;

    return (
      <div className="prediction-grid">
        <div className="prediction-card">
          <div className="prediction-label">Home First</div>
          <div className="prediction-percentage">{home?.toFixed(2)}%</div>
          <div className="prediction-odds">Odds: {calculateDecimalOdds(home)}</div>
        </div>
        <div className="prediction-card">
          <div className="prediction-label">Away First</div>
          <div className="prediction-percentage">{away?.toFixed(2)}%</div>
          <div className="prediction-odds">Odds: {calculateDecimalOdds(away)}</div>
        </div>
        {draw && (
          <div className="prediction-card">
            <div className="prediction-label">No Goals</div>
            <div className="prediction-percentage">{draw?.toFixed(2)}%</div>
            <div className="prediction-odds">Odds: {calculateDecimalOdds(draw)}</div>
          </div>
        )}
      </div>
    );
  };

  const renderHomeOverUnder = () => {
    const predictions = [
      { code: 'home-over-under-0_5_probability', label: 'Home O/U 0.5' },
      { code: 'home-over-under-1_5_probability', label: 'Home O/U 1.5' },
      { code: 'home-over-under-2_5_probability', label: 'Home O/U 2.5' },
      { code: 'home-over-under-3_5_probability', label: 'Home O/U 3.5' }
    ];

    const hasAnyData = predictions.some(({ code }) => getPredictionByType(code));
    if (!hasAnyData) return <div className="no-data">No prediction data available</div>;

    return (
      <div className="ou-grid">
        {predictions.map(({ code, label }) => {
          const pred = getPredictionByType(code);
          if (!pred) return null;

          const { yes: over, no: under } = pred.predictions;

          return (
            <div key={code} className="ou-row">
              <div className="ou-label">{label}</div>
              <div className="ou-option over">
                <span className="ou-text">Over</span>
                <span className="ou-percentage">{over?.toFixed(2)}%</span>
                <span className="ou-odds">{calculateDecimalOdds(over)}</span>
              </div>
              <div className="ou-option under">
                <span className="ou-text">Under</span>
                <span className="ou-percentage">{under?.toFixed(2)}%</span>
                <span className="ou-odds">{calculateDecimalOdds(under)}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderAwayOverUnder = () => {
    const predictions = [
      { code: 'away-over-under-0_5_probability', label: 'Away O/U 0.5' },
      { code: 'away-over-under-1_5_probability', label: 'Away O/U 1.5' },
      { code: 'away-over-under-2_5_probability', label: 'Away O/U 2.5' },
      { code: 'away-over-under-3_5_probability', label: 'Away O/U 3.5' }
    ];

    const hasAnyData = predictions.some(({ code }) => getPredictionByType(code));
    if (!hasAnyData) return <div className="no-data">No prediction data available</div>;

    return (
      <div className="ou-grid">
        {predictions.map(({ code, label }) => {
          const pred = getPredictionByType(code);
          if (!pred) return null;

          const { yes: over, no: under } = pred.predictions;

          return (
            <div key={code} className="ou-row">
              <div className="ou-label">{label}</div>
              <div className="ou-option over">
                <span className="ou-text">Over</span>
                <span className="ou-percentage">{over?.toFixed(2)}%</span>
                <span className="ou-odds">{calculateDecimalOdds(over)}</span>
              </div>
              <div className="ou-option under">
                <span className="ou-text">Under</span>
                <span className="ou-percentage">{under?.toFixed(2)}%</span>
                <span className="ou-odds">{calculateDecimalOdds(under)}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCornersOverUnder = () => {
    const predictions = [
      { code: 'corners-over-under-4-probability', label: 'Corners O/U 4' },
      { code: 'corners-over-under-5-probability', label: 'Corners O/U 5' },
      { code: 'corners-over-under-6-probability', label: 'Corners O/U 6' },
      { code: 'corners-over-under-7-probability', label: 'Corners O/U 7' },
      { code: 'corners-over-under-8-probability', label: 'Corners O/U 8' },
      { code: 'corners-over-under-9-probability', label: 'Corners O/U 9' },
      { code: 'corners-over-under-10-probability', label: 'Corners O/U 10' },
      { code: 'corners-over-under-10_5-probability', label: 'Corners O/U 10.5' },
      { code: 'corners-over-under-11-probability', label: 'Corners O/U 11' }
    ];

    const hasAnyData = predictions.some(({ code }) => getPredictionByType(code));
    if (!hasAnyData) return <div className="no-data">No prediction data available</div>;

    return (
      <div className="ou-grid">
        {predictions.map(({ code, label }) => {
          const pred = getPredictionByType(code);
          if (!pred) return null;

          const { yes: over, no: under, equal } = pred.predictions;

          return (
            <div key={code} className="ou-row">
              <div className="ou-label">{label}</div>
              <div className="ou-option over">
                <span className="ou-text">Over</span>
                <span className="ou-percentage">{over?.toFixed(2)}%</span>
                <span className="ou-odds">{calculateDecimalOdds(over)}</span>
              </div>
              <div className="ou-option under">
                <span className="ou-text">Under</span>
                <span className="ou-percentage">{under?.toFixed(2)}%</span>
                <span className="ou-odds">{calculateDecimalOdds(under)}</span>
              </div>
              {equal && (
                <div className="ou-option equal">
                  <span className="ou-text">Equal</span>
                  <span className="ou-percentage">{equal?.toFixed(2)}%</span>
                  <span className="ou-odds">{calculateDecimalOdds(equal)}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="match-details-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading match details...</p>
        </div>
      </div>
    );
  }

  if (error || !fixture) {
    return (
      <div className="match-details-page">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const homeTeam = fixture.participants?.find(p => p.meta?.location === 'home');
  const awayTeam = fixture.participants?.find(p => p.meta?.location === 'away');

  const tabs = [
    { id: 'fulltime', label: 'Fulltime Result', render: renderFulltimeResult },
    { id: 'halftime', label: 'First Half Winner', render: renderFirstHalfWinner },
    { id: 'doublechance', label: 'Double Chance', render: renderDoubleChance },
    { id: 'htft', label: 'Half Time/Full Time', render: renderHalfTimeFullTime },
    { id: 'overunder', label: 'Over/Under', render: renderOverUnder },
    { id: 'btts', label: 'Both Teams To Score', render: renderBothTeamsToScore },
    { id: 'correctscore', label: 'Correct Score', render: renderCorrectScore },
    { id: 'firstgoal', label: 'First Goal', render: renderTeamToScoreFirst },
    { id: 'homeou', label: 'Home O/U', render: renderHomeOverUnder },
    { id: 'awayou', label: 'Away O/U', render: renderAwayOverUnder },
    { id: 'corners', label: 'Corners O/U', render: renderCornersOverUnder }
  ];

  return (
    <div className="match-details-page">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back
      </button>

      {/* Match Header */}
      <div className="match-header">
        <div className="match-date">
          {formatDate(fixture.starting_at)}
        </div>
        <div className="match-league">
          {fixture.league?.image_path && (
            <img src={fixture.league.image_path} alt={fixture.league.name} />
          )}
          <span>{fixture.league?.name}</span>
        </div>

        <div className="match-teams">
          <div className="team">
            {homeTeam?.image_path && (
              <img src={homeTeam.image_path} alt={homeTeam.name} />
            )}
            <span>{homeTeam?.name}</span>
          </div>
          <div className="match-status">
            <span className={`status-badge ${fixture.state?.developer_name?.toLowerCase()}`}>
              {fixture.state?.name}
            </span>
            <span className="match-time">{fixture.starting_at?.split(' ')[1]}</span>
          </div>
          <div className="team">
            {awayTeam?.image_path && (
              <img src={awayTeam.image_path} alt={awayTeam.name} />
            )}
            <span>{awayTeam?.name}</span>
          </div>
        </div>
      </div>

      {/* Predictions Section */}
      <div className="predictions-section">
        <h2>Predictions</h2>

        <div className="predictions-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="predictions-content">
          {tabs.find(t => t.id === activeTab)?.render()}
        </div>
      </div>

      {/* Venue Info */}
      {fixture.venue && (
        <div className="venue-info">
          <h3>Venue</h3>
          <p>{fixture.venue.name}</p>
          {fixture.venue.city_name && <p>{fixture.venue.city_name}</p>}
        </div>
      )}
    </div>
  );
};

export default MatchDetails;

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch('/api/dashboard');
        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error('Failed to load metrics', err);
      }
      setLoading(false);
    }
    fetchMetrics();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Dashboard</h1>
      {loading && <p>Loading metrics...</p>}
      {metrics && !loading && (
        <div>
          <p>Total Suggestions: {metrics.totalFeedback}</p>
          <p>Average Sentiment: {metrics.averageSentiment.toFixed(2)}</p>
          <p>Positive Count: {metrics.positiveCount}</p>
          <p>Negative Count: {metrics.negativeCount}</p>
          <p>Neutral Count: {metrics.neutralCount}</p>
        </div>
      )}
    </div>
  );
}

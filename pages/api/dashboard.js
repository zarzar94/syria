import { getAggregatedMetrics } from '../../lib/data';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const metrics = getAggregatedMetrics();
  return res.status(200).json(metrics);
}

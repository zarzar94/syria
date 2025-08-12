import { addFeedback } from '../../lib/data';
import { analyzeSentiment } from '../../lib/sentiment';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { name, email, message } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'The message field is required.' });
  }
  // Perform sentiment analysis and store the feedback.
  const sentimentScore = analyzeSentiment(message);
  const id = addFeedback({ name, email, message, sentimentScore });
  return res.status(200).json({ id, sentimentScore });
}

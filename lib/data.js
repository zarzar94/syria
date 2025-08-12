// In-memory store for feedback items and metrics helpers.
//
// Each feedback entry has the shape:
// { id: number, name?: string, email?: string, message: string, sentimentScore: number }
//
// The functions in this module can be used by API routes to persist feedback and
// compute simple aggregated statistics. In a real application you would replace
// this with a call to a database.

// Internal array holding feedback submissions.
const feedbacks = [];

/**
 * Store a feedback submission and return its generated identifier.
 *
 * @param {Object} feedback Object containing at least a message and sentimentScore.
 * @returns {number} The id assigned to the stored feedback.
 */
function addFeedback(feedback) {
  const id = feedbacks.length + 1;
  feedbacks.push({ id, ...feedback });
  return id;
}

/**
 * Retrieve all stored feedback. Intended primarily for debugging.
 *
 * @returns {Array<Object>} An array of feedback objects.
 */
function getFeedback() {
  return [...feedbacks];
}

/**
 * Compute aggregated metrics across all stored feedback.
 *
 * @returns {Object} A metrics object containing the number of feedback entries,
 *  the average sentiment score, and counts of positive, negative and neutral feedback.
 */
function getAggregatedMetrics() {
  const totalFeedback = feedbacks.length;
  if (totalFeedback === 0) {
    return {
      totalFeedback: 0,
      averageSentiment: 0,
      positiveCount: 0,
      negativeCount: 0,
      neutralCount: 0,
    };
  }
  const sentimentScores = feedbacks.map((fb) => fb.sentimentScore ?? 0);
  const sum = sentimentScores.reduce((acc, val) => acc + val, 0);
  const averageSentiment = sum / totalFeedback;
  const positiveCount = sentimentScores.filter((s) => s > 0).length;
  const negativeCount = sentimentScores.filter((s) => s < 0).length;
  const neutralCount = sentimentScores.filter((s) => s === 0).length;
  return {
    totalFeedback,
    averageSentiment,
    positiveCount,
    negativeCount,
    neutralCount,
  };
}

module.exports = {
  addFeedback,
  getFeedback,
  getAggregatedMetrics,
};

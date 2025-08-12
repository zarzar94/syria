// Sentiment analysis helper using the `sentiment` npm package.
//
// The default Sentiment instance assigns integer scores for positive and negative words.
// The returned score represents the sum of word sentiment values. Zero indicates
// neutral sentiment, positive values indicate overall positivity and negative values
// indicate negativity.

const Sentiment = require('sentiment');

// Reuse a single Sentiment instance. According to the documentation this is
// inexpensive to instantiate but reusing it avoids repeated initialisation.
const sentiment = new Sentiment();

/**
 * Analyse the sentiment of a text string.
 *
 * @param {string} text The text to analyse.
 * @returns {number} The sentiment score. Positive for positive sentiment,
 *  negative for negative sentiment and zero for neutral sentiment.
 */
function analyzeSentiment(text) {
  const { score } = sentiment.analyze(text || '');
  return score;
}

module.exports = {
  analyzeSentiment,
};

import OpenAI from 'openai';

/**
 * API route to generate an AI-driven response to a prompt.
 *
 * Expects a POST request with a JSON body containing a `prompt` and optional `context`.
 * Uses the OpenAI API (if configured via OPENAI_API_KEY env variable) to generate a response.
 * Returns a placeholder message if the API key is not configured.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { prompt, context } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'The prompt field is required.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // No API key configured; return placeholder response.
    return res.status(200).json({
      response:
        'The OpenAI API key is not configured. Please set OPENAI_API_KEY to enable AI responses.',
    });
  }

  try {
    const openai = new OpenAI({ apiKey });
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: context || '' },
        { role: 'user', content: prompt },
      ],
    });
    const responseText =
      chatCompletion.choices?.[0]?.message?.content || 'No response generated.';
    return res.status(200).json({ response: responseText });
  } catch (error) {
    console.error('OpenAI error', error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}

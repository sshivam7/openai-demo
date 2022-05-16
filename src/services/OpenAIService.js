const BASE_URL = 'https://api.openai.com/v1/engines';
const API_KEY = process.env.REACT_APP_API_KEY;

export function getCompletionRequestData(prompt, engine) {
  return {
    url: `${BASE_URL}/${engine}/completions`,
    body: {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 300,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    method: 'POST',
  };
}

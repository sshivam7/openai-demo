import Dexie from 'dexie';

export const db = new Dexie('OpenAIData');

db.version(1).stores({
  // Table to hold OpenAPI response data
  response_data: '++id, request_prompt, response',
});

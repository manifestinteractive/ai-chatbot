/**
 * App Configuration
 */
const Config = {
  // AnythingLLM API Base URL
  API_BASE: process.env.REACT_APP_API_BASE || 'http://127.0.0.1:3001',

  // AnythingLLM API Key ( Instance Settings > Tools > Developer API > API Key)
  API_KEY: process.env.REACT_APP_API_KEY,

  // AnythingLLM Workspace Slug ( via /v1/workspaces API Endpoint )
  API_MODEL: process.env.REACT_APP_API_MODEL || 'local-ai',

  // Whether to stream the response or not
  API_STREAM: process.env.REACT_APP_API_STREAM ? process.env.REACT_APP_API_STREAM === 'true' : false,

  // Temperature for the LLM response
  API_TEMPERATURE: parseFloat(process.env.REACT_APP_API_TEMPERATURE) || 0.7,

  // How long the chat history is kept for in milliseconds ( messages older than this will be purged )
  HISTORY_MAX_AGE: process.env.REACT_APP_HISTORY_MAX_AGE ? parseInt(process.env.REACT_APP_HISTORY_MAX_AGE) : 3600000,

  // How many messages to keep in chat history ( messages past this this will be purged )
  HISTORY_MAX_LENGTH: process.env.REACT_APP_HISTORY_MAX_LENGTH ? parseInt(process.env.REACT_APP_HISTORY_MAX_LENGTH) : 10
};

export default Config;

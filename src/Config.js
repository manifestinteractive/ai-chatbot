import md5 from 'md5';

/**
 * App Configuration
 */
const config = {
  // AnythingLLM API Base URL
  apiBase: process.env.REACT_APP_API_BASE || 'http://127.0.0.1:3001',

  // AnythingLLM API Key ( Instance Settings > Tools > Developer API > API Key)
  apiKey: process.env.REACT_APP_API_KEY,

  // Whether to stream the response or not
  apiStream: process.env.REACT_APP_API_STREAM ? process.env.REACT_APP_API_STREAM === 'true' : false,

  // Temperature for the LLM response
  apiTemperature: parseFloat(process.env.REACT_APP_API_TEMPERATURE) || 0.7,

  // AnythingLLM Workspace Slug ( via /v1/workspaces API Endpoint )
  apiWorkspace: parseFloat(process.env.REACT_APP_API_WORKSPACE) || 'local-ai',

  // Password to access the chat interface ( md5 hashed )
  appPassword: process.env.REACT_APP_PASSWORD ? md5(process.env.REACT_APP_PASSWORD) : null,

  // How often in milliseconds to clean up chat history using `historyMaxAge` and `historyMaxLength`
  chatResetTimeout: process.env.REACT_APP_CHAT_RESET_TIMEOUT ? parseInt(process.env.REACT_APP_CHAT_RESET_TIMEOUT) : 300000,

  // How long the chat history is kept for in milliseconds ( messages older than this will be purged )
  historyMaxAge: process.env.REACT_APP_HISTORY_MAX_AGE ? parseInt(process.env.REACT_APP_HISTORY_MAX_AGE) : 3600000,

  // How many messages to keep in chat history ( messages past this this will be purged )
  historyMaxLength: process.env.REACT_APP_HISTORY_MAX_LENGTH ? parseInt(process.env.REACT_APP_HISTORY_MAX_LENGTH) : 25,

  // Hugging Face API Token ( https://huggingface.co/settings/tokens > Fine Grained > Inference > Make calls to the serverless Inference API )
  hfToken: process.env.REACT_APP_HF_TOKEN ? process.env.REACT_APP_HF_TOKEN : null,

  // Personality for the prompt
  promptPersonality: process.env.REACT_APP_PROMPT_PERSONALITY || 'INFP',

  // Default location to use for the prompt
  promptLocation: process.env.REACT_APP_PROMPT_LOCATION || 'Seattle, WA USA',

  // Default unit of measure to use for the prompt
  promptMeasureUnit: process.env.REACT_APP_PROMPT_MEASURE_UNIT || 'Imperial System'
};

export default config;

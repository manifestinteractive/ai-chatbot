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
  API_TEMPERATURE: parseFloat(process.env.REACT_APP_API_TEMPERATURE) || 0.7
}

export default Config

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

  // AnythingLLM Workspace Slug ( via /v1/workspaces API Endpoint )
  apiWorkspace: parseFloat(process.env.REACT_APP_API_WORKSPACE) || 'local-ai',

  // Password to access the chat interface ( md5 hashed )
  appPassword: process.env.REACT_APP_PASSWORD ? md5(process.env.REACT_APP_PASSWORD) : null,

  // Whether to enable demo mode or not ( this will fake conversations and messages )
  demoMode: process.env.REACT_APP_DEMO_MODE ? process.env.REACT_APP_DEMO_MODE === 'true' : false,

  // Hugging Face API Token ( https://huggingface.co/settings/tokens > Fine Grained > Inference > Make calls to the serverless Inference API )
  hfToken: process.env.REACT_APP_HF_TOKEN ? process.env.REACT_APP_HF_TOKEN : null
};

export default config;

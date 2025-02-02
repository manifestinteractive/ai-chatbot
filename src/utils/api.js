import config from '../config';
import { slugify } from '../utils';

const headers = {
  mode: 'cors',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${config.apiKey}`
};

const api = {
  createThread: async (userName) => {
    const slug = slugify(userName);
    const workspace = slugify(config.apiWorkspace);

    if (!workspace || !userName || !slug) {
      return null;
    }

    // Make the API request
    try {
      const response = await fetch(`${config.apiBase}/api/v1/workspace/${workspace}/thread/new`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          name: userName,
          slug: slug,
          userId: 1
        })
      });

      if (!response || !response.ok) {
        console.error('Unable to create workspace thread');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error creating workspace thread:', error);
      return null;
    }
  },
  deleteThread: async (userName) => {
    const thread = slugify(userName);
    const workspace = slugify(config.apiWorkspace);

    if (!workspace || !userName || !thread) {
      return null;
    }

    // Make the API request
    try {
      const response = await fetch(`${config.apiBase}/api/v1/workspace/${workspace}/thread/${thread}`, {
        method: 'DELETE',
        headers: headers
      });

      if (!response || !response.ok) {
        console.error('Unable to delete workspace thread');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting workspace thread:', error);
      return null;
    }
  },
  getHistory: async (userName) => {
    const thread = slugify(userName);
    const workspace = slugify(config.apiWorkspace);

    if (!userName || !thread || !workspace) {
      return null;
    }

    // Make the API request
    try {
      const response = await fetch(`${config.apiBase}/api/v1/workspace/${workspace}/thread/${thread}/chats`, {
        method: 'GET',
        headers: headers
      });

      if (!response || !response.ok) {
        console.warn('No history found');
        return null;
      }

      const data = await response.json();
      return data.history || [];
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return null;
    }
  },
  chat: async (userName, message) => {
    const thread = slugify(userName);
    const workspace = slugify(config.apiWorkspace);

    if (!userName || !thread || !workspace) {
      return null;
    }

    // Make the API request
    try {
      const response = await fetch(`${config.apiBase}/api/v1/workspace/${workspace}/thread/${thread}/chat`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          message: message,
          mode: 'chat',
          userId: 1,
          attachments: []
        })
      });

      if (!response || !response.ok) {
        console.warn('No history found');
        return null;
      }

      const data = await response.json();
      return data.history || [];
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return null;
    }
  },
  streamChat: async (userName, message, handleStream) => {
    const thread = slugify(userName);
    const workspace = slugify(config.apiWorkspace);

    if (!userName || !thread || !workspace) {
      return null;
    }

    // Make the API request
    try {
      const response = await fetch(`${config.apiBase}/api/v1/workspace/${workspace}/thread/${thread}/stream-chat`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          message: message,
          mode: 'chat',
          userId: 1,
          attachments: []
        })
      });

      if (!response || !response.ok) {
        console.warn('No history found');
        return null;
      }

      // Create a stream reader
      const reader = response.body.getReader();
      let content = '';

      // Read the stream
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const decodedChunk = new TextDecoder('utf-8').decode(value);
        const lines = decodedChunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            content += data.textResponse || '';
            handleStream(content, data.close, data.sources);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return null;
    }
  }
};

export default api;

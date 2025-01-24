import config from '../config';

const api = {
  get: async (messages, prompt, handleStream) => {
    // Prepare the messages for the API request
    let chatMessages = [
      {
        role: 'system',
        content: prompt
      }
    ];

    // Add the chat history to the request
    messages.forEach((message) => {
      chatMessages.push({
        role: message.role,
        content: message.content
      });
    });

    // Make the API request
    const response = await fetch(`${config.apiBase}/api/v1/openai/chat/completions`, {
      method: 'POST',
      headers: {
        mode: 'cors',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        messages: chatMessages,
        model: config.apiModel,
        stream: config.apiStream,
        temperature: config.apiTemperature
      })
    });

    // Stream the response if enabled
    if (config.apiStream) {
      const reader = response.body.getReader();
      let content = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const decodedChunk = new TextDecoder('utf-8').decode(value);
        const lines = decodedChunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            if (data.choices[0].delta.content) {
              content += data.choices[0].delta.content;
              handleStream(content);
            }
          }
        }
      }
    } else {
      const data = await response.json();
      return data.choices[0].message.content;
    }
  }
};

export default api;

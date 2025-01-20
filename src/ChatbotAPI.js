import Config from './Config';

const API = {
  GetChatbotResponse: async (messages, prompt, handleStream) => {
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
    const response = await fetch(`${Config.API_BASE}/api/v1/openai/chat/completions`, {
      method: 'POST',
      headers: {
        mode: 'cors',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Config.API_KEY}`
      },
      body: JSON.stringify({
        messages: chatMessages,
        model: Config.API_MODEL,
        stream: Config.API_STREAM,
        temperature: Config.API_TEMPERATURE
      })
    });

    // Stream the response if enabled
    if (Config.API_STREAM) {
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

export default API;

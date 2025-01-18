import Config from './Config'

const API = {
    GetChatbotResponse: async (message, prompt) => {
      const res = await fetch(`${Config.API_BASE}/api/v1/openai/chat/completions`, {
        method: 'POST',
        headers: {
          mode: 'cors',
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Config.API_KEY}`,
        },
        body: JSON.stringify({
          "messages": [
            {
              "role": "system",
              "content": prompt
            },
            {
              "role": "user",
              "content": message
            }
          ],
          "model": Config.API_MODEL,
          "stream": Config.API_STREAM,
          "temperature": Config.API_TEMPERATURE
        })
      });
      
      const data = await res.json();

      return data.choices[0].message.content;
    }
  };
  
  export default API;
  
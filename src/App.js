import { OrbitControls, CameraShake } from '@react-three/drei'
// import { useControls } from 'leva'
import { Particles } from './Particles'
import { useState, useEffect } from 'react'
import { Html } from "@react-three/drei"

import BotMessage from "./components/BotMessage";
import Input from "./components/Input";
import Messages from "./components/Messages";
import UserMessage from "./components/UserMessage";

import API from "./ChatbotAPI";
import Emotions from './Emotions'

export default function App() {
  // Listen for Emotion Change
  const props = Emotions['neutral'];
  const [camera, setCamera] = useState(props.camera);
  const [orbit, setOrbit] = useState(props.orbit);
  const [particles, setParticles] = useState(props.particles);

  // Fetch Prompt
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    fetch('assets/prompt.md') 
      .then(response => response.text())
      .then(data => setPrompt(data))
      .catch(error => console.error('Error fetching text file:', error));
  }, []); 

  useEffect(() => {
    const updateEmotion = (emotion) => {
      console.log('updateEmotion', emotion);
      const body = document.querySelector('body');
  
      body.classList.remove([
        "angry",
        "bored",
        "happy",
        "jealous",
        "love",
        "neutral",
        "relaxed",
        "sad",
        "serious",
        "shy",
        "sleep",
        "surprised",
        "suspicious",
        "victory"
      ])
      body.classList.add(emotion)
  
      const props = Emotions[emotion];
      setCamera(props.camera)
      setOrbit(props.orbit)
      setParticles(props.particles)
    }

    async function fetchAPI(text) {
      let message = await API.GetChatbotResponse(text, prompt);
      const match = message.match(/^\[([a-z]+)\] /g);
  
      if (match) {
        const emotion = match[0].replace('[', '').replace('] ', '').trim();
        updateEmotion(emotion);
        message = message.replace(match[0], '');
        return message;
      }
    }

    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage
          key="1"
          fetchMessage={async () => await fetchAPI('hi')}
        />
      ]);
    }
    loadWelcomeMessage();
  }, [prompt]);

  const send = async text => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => {
          let message = await API.GetChatbotResponse(text, prompt);
          const match = message.match(/^\[([a-z]+)\] /g);
      
          if (match) {
            message = message.replace(match[0], '');
            return message;
          }
        }}
      />
    );

    setMessages(newMessages);
  }

  const [messages, setMessages] = useState([]);

  return (
    <>
      <OrbitControls makeDefault zoomSpeed={0.1} {...orbit} />
      <CameraShake {...camera} />
      <Particles {...particles} />
      <Html wrapperClass="chat-ui" zIndexRange={[100, 0]} calculatePosition={() => [0,0]} >
        <Messages messages={messages} />
        <Input onSend={send} />
      </Html>
    </>
  )
}

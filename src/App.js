import { OrbitControls, CameraShake } from '@react-three/drei'
import { useControls } from 'leva'
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
  const emotions = {
    Angry: 'angry',
    Bored: 'bored',
    Happy: 'happy',
    Jealous: 'jealous',
    Love: 'love',
    Neutral: 'neutral',
    Relaxed: 'relaxed',
    Sad: 'sad',
    Serious: 'serious',
    Shy: 'shy',
    Sleep: 'sleep',
    Surprised: 'surprised',
    Suspicious: 'suspicious',
    Victory: 'victory',
  }

  // Listen for Emotion Change
  const props = Emotions['neutral'];
  const [camera, setCamera] = useState(props.camera);
  const [orbit, setOrbit] = useState(props.orbit);
  const [particles, setParticles] = useState(props.particles);

  useControls({
    emotion: {
      value: emotions['Neutral'],
      options: emotions,
      onChange: (emotion) => {
        const body = document.querySelector('body');

        body.classList.remove(...Object.values(emotions))
        body.classList.add(emotion)

        const props = Emotions[emotion];

        setCamera(props.camera)
        setOrbit(props.orbit)
        setParticles(props.particles)
      }
    }
  })

  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={async () => await API.GetChatbotResponse("hi")}
        />
      ]);
    }
    loadWelcomeMessage();
  }, []);

  const send = async text => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await API.GetChatbotResponse(text)}
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

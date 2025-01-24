// NPM Dependencies
import { Html } from '@react-three/drei';
import { LockOpenIcon } from '@heroicons/react/24/outline';
import { OrbitControls, CameraShake } from '@react-three/drei';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';

import md5 from 'md5';

// React Components
import Input from './components/Input';
import Messages from './components/Messages';

// Configuration
import config from './config';

// Utilities
import { api, emotions, createPrompt } from './utils';

// WebGL Assets
import { Dust } from './webgl/Dust';
import { Particles } from './webgl/Particles';

export default function App() {
  // Loading initial neutral emotion
  const props = emotions.getProps('neutral');

  // Manage State for WebGL
  const [camera, setCamera] = useState(props.camera);
  const [orbit, setOrbit] = useState(props.orbit);
  const [particles, setParticles] = useState(props.particles);

  // Manage State for Chat
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState('');
  const [loginInvalid, setLoginInvalid] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatHistory');
    const isVerified = localStorage.getItem('isVerified');

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    if (isVerified && isVerified === config.appPassword) {
      setIsVerified(true);
    }
  }, []);

  // Fetch Prompt
  const prompt = createPrompt();

  const messagesRef = useRef();
  const loadingRef = useRef();

  messagesRef.current = messages;
  loadingRef.current = loading;

  const handleSubmit = async (input) => {
    const text = input.trim();

    if (text === '') return false;

    setLoading(true);

    const updateEmotion = (emotion) => {
      const body = document.querySelector('body');

      emotions.supported.forEach((cls) => {
        body.classList.remove(cls);
      });

      body.classList.add(emotion);

      const props = emotions.getProps(emotion);
      setCamera(props.camera);
      setOrbit(props.orbit);
      setParticles(props.particles);
    };

    // Handle Clear Command
    if (text.toLowerCase() === 'clear') {
      setTimeout(() => {
        setMessages([
          {
            role: 'assistant',
            emotion: 'neutral',
            content: 'How can I assist you today?',
            timestamp: new Date().getTime(),
            permanent: true
          }
        ]);

        updateEmotion('neutral');
        setLoading(false);
      }, 100);

      return;
    }

    // Create User Message
    let newMessages = messagesRef.current.concat({
      role: 'user',
      emotion: null,
      content: text,
      timestamp: new Date().getTime(),
      permanent: false
    });

    // Update Messages State with new user message
    setMessages(newMessages);

    if (config.apiStream) {
      const handleStream = (content) => {
        if (!content || content === '') return;

        if (loadingRef.current && loadingRef.current === true) {
          const parts = emotions.parse(content);
          newMessages = messagesRef.current.concat({
            role: 'assistant',
            emotion: parts.emotion,
            content: parts.content,
            timestamp: new Date().getTime(),
            permanent: false
          });

          updateEmotion(parts.emotion);
          setMessages(newMessages);
          setLoading(false);
        } else {
          let streamedMessages = [...messagesRef.current];
          const updated = { ...streamedMessages[streamedMessages.length - 1] };
          const parts = emotions.parse(content);

          updated.content = parts.content;
          updated.emotion = parts.emotion;
          streamedMessages[streamedMessages.length - 1] = updated;
          updateEmotion(parts.emotion);
          setMessages(streamedMessages);
        }
      };

      await api.get(newMessages, prompt, handleStream);
    } else {
      const message = await api.get(newMessages, prompt);
      const parts = emotions.parse(message);

      newMessages = newMessages.concat({
        role: 'assistant',
        emotion: parts.emotion,
        content: parts.message,
        timestamp: new Date().getTime(),
        permanent: false
      });

      updateEmotion(parts.emotion);
      setMessages(newMessages);
      setLoading(false);
    }
  };

  useEffect(() => {
    const now = new Date().getTime();

    if (prompt.length > 0 && messages.length === 0) {
      const newMessages = [
        {
          role: 'assistant',
          emotion: 'neutral',
          content: 'How can I assist you today?',
          timestamp: now,
          permanent: true
        }
      ];

      setMessages(newMessages);
      localStorage.setItem('chatHistory', JSON.stringify(newMessages));
    } else {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages, prompt]);

  // Cleanup Old Messages every five minutes ( 300000ms )
  useEffect(() => {
    const cleanHistory = () => {
      let newMessages = [];
      const now = new Date().getTime();

      // Filter out messages older than the max age
      messages.forEach((message, index) => {
        if (
          (message.permanent || now - message.timestamp < config.historyMaxAge) &&
          (message.permanent || messages.length - index <= config.historyMaxLength)
        ) {
          newMessages.push(message);
        }
      });

      // Update Chat History
      if (newMessages.length !== messages.length) {
        setMessages(newMessages);
      }
    };

    const interval = setInterval(cleanHistory, 300000);
    cleanHistory();

    return () => clearInterval(interval);
  }, [messages]);

  const checkPw = (e) => {
    e.preventDefault();
    if (!login || login === '') return;

    const hashed = md5(login);

    if (hashed === config.appPassword) {
      setLoginInvalid(false);
      setIsVerified(true);
      localStorage.setItem('isVerified', hashed);
    } else {
      setLoginInvalid(true);
    }

    setLogin('');
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  return (
    <>
      {isVerified ? (
        <>
          <OrbitControls makeDefault zoomSpeed={0.1} {...orbit} />
          <CameraShake {...camera} />
          <Particles {...particles} />
          <Html wrapperClass="chat-ui" zIndexRange={[1000, 0]} calculatePosition={() => [0, 0]}>
            <Messages messages={messages} />
            <Input onSubmit={handleSubmit} loading={loading} />
            <ToastContainer />
          </Html>
          <Dust {...particles} count={2500} />
        </>
      ) : (
        <Html wrapperClass="login-ui" zIndexRange={[1000, 0]} calculatePosition={() => [0, 0]}>
          <ToastContainer />
          <form onSubmit={checkPw} className={`login-form ${loginInvalid ? 'invalid' : 'valid'}`}>
            <input id="password" type="password" placeholder="Enter password" value={login} onChange={handleLoginChange} />
            <button type="submit">
              <LockOpenIcon width="24" height="24" />
            </button>
          </form>
          {loginInvalid && <span className="invalid">Invalid Password</span>}
        </Html>
      )}
    </>
  );
}

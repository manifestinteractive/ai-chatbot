import { Html } from '@react-three/drei';
import { OrbitControls, CameraShake } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import { LockOpenIcon } from '@heroicons/react/24/outline';

import md5 from 'md5';

import { Dust } from './Dust';
import { Particles } from './Particles';

import Input from './components/Input';
import Messages from './components/Messages';

import API from './ChatbotAPI';
import Config from './Config';
import Emotions from './Emotions';

export default function App() {
  // Listen for Emotion Change
  const props = Emotions['neutral'];
  const [camera, setCamera] = useState(props.camera);
  const [orbit, setOrbit] = useState(props.orbit);
  const [particles, setParticles] = useState(props.particles);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [login, setLogin] = useState('');
  const [loginInvalid, setLoginInvalid] = useState(false);

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatHistory');
    const isVerified = localStorage.getItem('isVerified');

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    if (isVerified && isVerified === Config.APP_PASSWORD) {
      setIsVerified(true);
    }
  }, []);

  // Fetch Prompt
  const [prompt, setPrompt] = useState('');

  const messagesRef = useRef();
  const loadingRef = useRef();

  const supportedEmotions = [
    'angry',
    'bored',
    'happy',
    'jealous',
    'love',
    'neutral',
    'relaxed',
    'sad',
    'serious',
    'shy',
    'sleep',
    'surprised',
    'suspicious',
    'victory'
  ];

  messagesRef.current = messages;
  loadingRef.current = loading;

  const handleSubmit = async (text) => {
    if (text === '') return false;

    setLoading(true);

    const updateEmotion = (emotion) => {
      const body = document.querySelector('body');

      supportedEmotions.forEach((cls) => {
        body.classList.remove(cls);
      });

      body.classList.add(emotion);

      const props = Emotions[emotion];
      setCamera(props.camera);
      setOrbit(props.orbit);
      setParticles(props.particles);
    };

    const parseEmotion = (text) => {
      let content = text;
      const match = content.match(/^@([a-z]+)\n?\n?\s?/g);
      if (match) {
        let emotion = match[0].replace('@', '').replace('\n\n', '').replace(' ', '').trim();
        content = content.replace(match[0], '');

        if (!supportedEmotions.includes(emotion)) {
          emotion = 'neutral';
        }

        updateEmotion(emotion);

        return { content, emotion };
      }

      return { content, emotion: 'neutral' };
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

    let newMessages = messagesRef.current.concat({
      role: 'user',
      emotion: null,
      content: text,
      timestamp: new Date().getTime(),
      permanent: false
    });

    setMessages(newMessages);

    if (Config.API_STREAM) {
      const handleStream = (content) => {
        if (!content || content === '') return;

        if (loadingRef.current && loadingRef.current === true) {
          const parts = parseEmotion(content);
          newMessages = messagesRef.current.concat({
            role: 'assistant',
            emotion: parts.emotion,
            content: parts.content,
            timestamp: new Date().getTime(),
            permanent: false
          });

          setMessages(newMessages);
          setLoading(false);
        } else {
          let streamedMessages = [...messagesRef.current];
          const updated = { ...streamedMessages[streamedMessages.length - 1] };
          const parts = parseEmotion(content);

          updated.content = parts.content;
          updated.emotion = parts.emotion;
          streamedMessages[streamedMessages.length - 1] = updated;
          setMessages(streamedMessages);
        }
      };

      await API.GetChatbotResponse(newMessages, prompt, handleStream);
    } else {
      const message = await API.GetChatbotResponse(newMessages, prompt);
      const parts = parseEmotion(message);

      newMessages = newMessages.concat({
        role: 'assistant',
        emotion: parts.emotion,
        content: parts.message,
        timestamp: new Date().getTime(),
        permanent: false
      });

      setMessages(newMessages);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch('assets/prompt.md')
      .then((response) => response.text())
      .then((data) => {
        setPrompt(data);
      })
      .catch((error) => console.error('Error fetching text file:', error));
  }, []);

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
          (message.permanent || now - message.timestamp < Config.HISTORY_MAX_AGE) &&
          (message.permanent || messages.length - index <= Config.HISTORY_MAX_LENGTH)
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

    if (hashed === Config.APP_PASSWORD) {
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
          <Html wrapperClass="chat-ui" zIndexRange={[100, 0]} calculatePosition={() => [0, 0]}>
            <Messages messages={messages} />
            <Input onSubmit={handleSubmit} loading={loading} />
          </Html>
          <Dust {...particles} count={2500} />
        </>
      ) : (
        <Html wrapperClass="login-ui" zIndexRange={[100, 0]} calculatePosition={() => [0, 0]}>
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

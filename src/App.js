// NPM Dependencies
import { Html } from '@react-three/drei';
import { LockOpenIcon } from '@heroicons/react/24/outline';
import { OrbitControls, CameraShake } from '@react-three/drei';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import { toast, Slide } from 'react-toastify';

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
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      emotion: 'neutral',
      content: 'How can I assist you today?',
      timestamp: new Date().getTime(),
      permanent: true
    }
  ]);

  // Fetch Prompt
  const prompt = createPrompt();

  // Create some references we can use in our callbacks
  const messagesRef = useRef();
  const loadingRef = useRef();
  const timeoutRef = useRef();

  messagesRef.current = messages;
  loadingRef.current = loading;

  // Function to handle changing UI based on emotion
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

  // Load Initial Chat History and Verification
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatHistory');
    const isVerified = localStorage.getItem('isVerified');

    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        if (parsedMessages && parsedMessages.length > 1) {
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error('Error parsing chat history:', error);
      }
    }

    if (isVerified && isVerified === config.appPassword) {
      setIsVerified(true);
    }

    // Switch to sleep mode after a minute of inactivity
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      updateEmotion('sleep');
    }, 60000);
  }, []);

  // Handle Submit of User Input
  const handleSubmit = async (input) => {
    // Remove leading/trailing whitespace
    const text = input.trim();

    // If the input is empty, don't do anything
    if (text === '') return false;

    // Show loading indicator around input
    setLoading(true);

    // Switch to sleep mode after a minute of inactivity
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      updateEmotion('sleep');
    }, 60000);

    // Check if the input is an emotion command ( this is really only used for testing)
    const testEmotion = new RegExp(`^@(${emotions.supported.join('|')})$`, 'gi');
    const emotionInput = text.match(testEmotion);

    // Handle Custom Commands
    if (emotionInput) {
      // User wants to test a specific emotion
      setTimeout(() => {
        const emotion = emotionInput[0].replace('@', '').toLowerCase();
        updateEmotion(emotion);
        setLoading(false);

        toast.success(`Switching to Emotion: @${emotion}`, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: 'light',
          transition: Slide
        });
      }, 100);

      return;
    } else if (text.toLowerCase() === 'clear') {
      // User wants to clear the chat history
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

    // Fetch Response from API
    if (config.apiStream) {
      // Handle Streamed Responses
      const handleStream = (content) => {
        // If the content is empty, don't do anything
        if (!content || content === '') return;

        // If we are still loading, this is the first response
        if (loadingRef.current && loadingRef.current === true) {
          // Parse the response to determine the emotion
          const parts = emotions.parse(content);

          // Update the message with the parsed content
          newMessages = messagesRef.current.concat({
            role: 'assistant',
            emotion: parts.emotion,
            content: parts.content,
            timestamp: new Date().getTime(),
            permanent: false
          });

          // Update the UI with the new messages
          updateEmotion(parts.emotion);
          setMessages(newMessages);
          setLoading(false);
        } else {
          // If we are not loading, we are streaming
          let streamedMessages = [...messagesRef.current];

          // Fetch the last message we started for the stream
          const updated = { ...streamedMessages[streamedMessages.length - 1] };

          // Parse the response to determine the emotion
          const parts = emotions.parse(content);

          // Update the last message with the new content
          updated.content = parts.content;
          updated.emotion = parts.emotion;
          streamedMessages[streamedMessages.length - 1] = updated;

          // Update the UI with the new messages
          updateEmotion(parts.emotion);
          setMessages(streamedMessages);
        }
      };

      // Fetch response using Stream API
      await api.get(newMessages, prompt, handleStream);
    } else {
      // Fetch response
      const message = await api.get(newMessages, prompt);

      // Parse the response to determine the emotion
      const parts = emotions.parse(message);

      // Update the message with the parsed content
      newMessages = newMessages.concat({
        role: 'assistant',
        emotion: parts.emotion,
        content: parts.message,
        timestamp: new Date().getTime(),
        permanent: false
      });

      // Update the UI with the new messages
      updateEmotion(parts.emotion);
      setMessages(newMessages);
      setLoading(false);
    }
  };

  // Save Chat History to Local Storage when it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

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

    // Run the cleanup process every five minutes
    const interval = setInterval(cleanHistory, 300000);
    cleanHistory();

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [messages]);

  // Handle Password Check
  const checkPw = (e) => {
    e.preventDefault();

    // Exit if the login is empty
    if (!login || login === '') return;

    // Hash the login
    const hashed = md5(login);

    // Check if the password is correct
    if (hashed === config.appPassword) {
      setLoginInvalid(false);
      setIsVerified(true);
      localStorage.setItem('isVerified', hashed);
    } else {
      setLoginInvalid(true);
    }

    // Reset the login field
    setLogin('');
  };

  // Handle Login Change
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

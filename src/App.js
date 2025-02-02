// NPM Dependencies
import { Html, OrbitControls, CameraShake } from '@react-three/drei';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect, useRef, useCallback } from 'react';

// React Components
import Input from './components/Input';
import Messages from './components/Messages';
import Login from './components/Login';
import User from './components/User';

// Configuration
import config from './config';

// Utilities
import { api, emotions } from './utils';

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
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'How can I assist you today?'
    }
  ]);

  // Create some references we can use in our callbacks
  const messagesRef = useRef();
  const loadingRef = useRef();

  messagesRef.current = messages;
  loadingRef.current = loading;

  // Function to handle changing UI based on emotion
  const updateEmotion = (emotion) => {
    const $body = document.querySelector('body');
    const $bg = document.querySelector('.gradient-bg');

    emotions.supported.forEach((cls) => {
      $body.classList.remove(cls);
      $bg.classList.remove(cls);
    });

    $body.classList.add(emotion);
    $bg.classList.add(emotion);

    const props = emotions.getProps(emotion);
    setCamera(props.camera);
    setOrbit(props.orbit);
    setParticles(props.particles);
  };

  const fetchHistory = useCallback(async () => {
    const history = await api.getHistory(userName);
    if (!history) {
      await api.createThread(userName);
    } else if (history.length > 0) {
      setMessages(history);
    }
  }, [userName]);

  // Load Initial Chat History and Verification
  useEffect(() => {
    const isVerified = localStorage.getItem('isVerified');
    const userName = localStorage.getItem('userName');

    if (isVerified && isVerified === config.appPassword) {
      setIsVerified(true);
    }

    if (userName) {
      setUserName(userName);
    }
  }, [fetchHistory]);

  // Listen for change in Username
  useEffect(() => {
    fetchHistory();
  }, [userName, fetchHistory]);

  // Handle Submit of User Input
  const handleSubmit = async (input) => {
    // Remove leading/trailing whitespace
    const text = input.trim();

    // If the input is empty, don't do anything
    if (text === '') return false;

    // Show loading indicator around input
    setLoading(true);

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
      }, 100);

      return;
    } else if (text.toLowerCase() === 'clear' || text.toLowerCase() === 'reset' || text.toLowerCase() === '/reset') {
      // Delete our old thread and create a new one
      await api.deleteThread(userName);
      await api.createThread(userName);

      setMessages([
        {
          role: 'assistant',
          content: 'How can I assist you today?'
        }
      ]);

      updateEmotion('neutral');
      setLoading(false);

      return;
    } else if (text.toLowerCase() === 'sync' || text.toLowerCase() === '/sync') {
      // Delete our old thread and create a new one
      fetchHistory();
      updateEmotion('neutral');
      setLoading(false);

      return;
    }

    // Create User Message
    let newMessages = messagesRef.current.concat({
      role: 'user',
      content: text
    });

    // Update Messages State with new user message
    setMessages(newMessages);

    // Fetch Response from API
    if (config.apiStream) {
      // Handle Streamed Responses
      const handleStream = async (content, done, sources) => {
        // If the content is empty, don't do anything
        if (!content || content === '') return;

        // If we are still loading, this is the first response
        if (loadingRef.current && loadingRef.current === true) {
          // Update the message with the parsed content
          newMessages = messagesRef.current.concat({
            role: 'assistant',
            content: content
          });

          // Update the UI with the new messages
          setMessages(newMessages);
          setLoading(false);
        } else {
          // If we are not loading, we are streaming
          let streamedMessages = [...messagesRef.current];

          // Fetch the last message we started for the stream
          const updated = { ...streamedMessages[streamedMessages.length - 1] };

          if (done) {
            // Wait for the stream to finish before adding sources
            updated.sources = sources;

            // Parse the response to determine the emotion
            const emotion = await emotions.classify(content);

            // Update the UI with the new messages
            updateEmotion(emotion);
          }

          // Update the last message with the new content
          updated.content = content;
          streamedMessages[streamedMessages.length - 1] = updated;

          setMessages(streamedMessages);
        }
      };

      // Fetch response using Stream API
      await api.streamChat(userName, text, handleStream);
    } else {
      // Fetch response
      const message = await api.chat(userName, text);

      // Parse the response to determine the emotion
      const emotion = emotions.classify(message.textResponse);

      // Update the message with the parsed content
      newMessages = newMessages.concat({
        role: 'assistant',
        content: message.textResponse,
        sources: message.sources
      });

      // Update the UI with the new messages
      updateEmotion(emotion);
      setMessages(newMessages);
      setLoading(false);
    }
  };

  return (
    <>
      {isVerified && userName ? (
        <>
          <OrbitControls makeDefault zoomSpeed={0.1} {...orbit} />
          <CameraShake {...camera} />
          <Particles {...particles} />
          <Html wrapperClass="chat-ui" zIndexRange={[1000, 0]} calculatePosition={() => [0, 0]}>
            <Messages messages={messages} />
            <Input onSubmit={handleSubmit} loading={loading} />
            <ToastContainer />
          </Html>
          <Dust {...particles} count={5000} />
        </>
      ) : (
        <Html wrapperClass="login-ui" zIndexRange={[1000, 0]} calculatePosition={() => [0, 0]}>
          <ToastContainer />
          {!isVerified ? <Login setIsVerified={setIsVerified} /> : <User setUserName={setUserName} />}
        </Html>
      )}
    </>
  );
}

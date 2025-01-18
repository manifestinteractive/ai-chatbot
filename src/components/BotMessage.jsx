import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'

export default function BotMessage({ fetchMessage, text }) {
  const [isLoading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const el = useRef(null)
  useEffect(() => {
    el.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
  })

  useEffect(() => {
    async function loadMessage() {
      const msg = await fetchMessage()
      setLoading(false)
      setMessage(msg)
      el.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }

    if (text) {
      setLoading(false)
      setMessage(text)
      el.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
    } else {
      setLoading(true)
      loadMessage()
    }
  }, [text, fetchMessage])

  return (
    <div className="message-container">
      <div className="bot-message" ref={el}>
        <ReactMarkdown>{isLoading ? '...' : message}</ReactMarkdown>
      </div>
    </div>
  )
}

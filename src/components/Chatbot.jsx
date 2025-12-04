import React, { useState, useEffect } from 'react';

import { GEMINI_MODELS } from "@/libs/constants"
import ChatbotApi from '@/api/Chatbot'

const Chatbot = ({ open, setOpen, newChat }) => {
  const [model, setModel] = useState('gemini-3-pro-preview')
  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAnswering, setIsAnswering] = useState(false)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([])
  }, [newChat])


  const askQuestion = () => {
    if (!question.trim()) return

    // Add user message AND empty AI message at the same time for immediate feedback
    setMessages((prev) => [...prev, { role: 'user', message: question }, { role: 'ai', message: '' }])
    setQuestion('')
    setIsLoading(true)

    const data = {
      model,
      message: question
    }

    ChatbotApi.askQuestion(
      data,
      startAnswering,
      onAnswering,
      (response, error) => {
        if (error) {
          console.error(`Ask Question Error:`, error)
          // When an error occurs, remove the empty AI message placeholder
          setMessages((prev) => prev.slice(0, -1))
          alert('Error occurred while asking question. Please other select model or try again later.')
        }
        endAnswering(response?.id)
      }
    )
  }


  const startAnswering = () => {
    setIsLoading(false)
    setIsAnswering(true)
  }

  const onAnswering = (chunk) => {
    setMessages((prev) => {
      const newMessages = [...prev]
      const lastMessage = newMessages[newMessages.length - 1]

      if (lastMessage && lastMessage.role === 'ai') {
        newMessages[newMessages.length - 1] = {
          ...lastMessage,
          message: lastMessage.message + chunk
        }
      }
      return newMessages
    })
  }

  const endAnswering = (id) => {
    setIsLoading(false)
    setIsAnswering(false)
    setMessages((prev) => {
      const newMessages = [...prev]
      const lastMessage = newMessages[newMessages.length - 1]

      if (lastMessage && lastMessage.role === 'ai') {
        newMessages[newMessages.length - 1] = {
          ...lastMessage,
          id
        }
      }
      return newMessages
    })
  }

  return (
    <div className={`chatbot-wrapper ${open ? 'open' : 'close'}`}>
      <header className="flex y-center x-between gap-12">
        <div className="flex y-center gap-12">
          <span className="icon-wrap">
            <i className="icon icon-robot" />
          </span>
          <h3 className="text flex flex-column gap-4">
            Chatbot
            <span>{model}</span>
          </h3>
        </div>
        <button className="btn-close" onClick={() => setOpen(false)}>
          <i className="icon icon-close" />
        </button>
      </header>
      <div className="content-wrapper">
        <div className="content">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role} flex flex-column gap-8`}>
              <span>{msg.role === 'ai' ? msg.role.toUpperCase() : msg.role}</span>
              <div className={`message-content ${msg.role}  ${msg.role === 'ai' && index === messages.length - 1 && (isLoading || isAnswering) ? 'typing-indicator' : ''}`}>{msg.message}</div>
            </div>
          ))}
        </div>
        <div className="ask-container flex flex-column xy-center">
          <div className="select-wrapper">
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              {
                GEMINI_MODELS.map((item) => {
                  return <option key={item} value={item}>{item}</option>
                })
              }
            </select>
          </div>
          <div className="ask-wrapper flex y-center">
            <div className="text-wrapper">
              <textarea
                placeholder="Ask me anything"
                rows="1"
                value={question}
                onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="btn-wrapper">
              <button
                className="btn"
                onClick={askQuestion}
                disabled={isLoading || isAnswering}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot

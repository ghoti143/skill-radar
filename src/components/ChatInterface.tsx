'use client';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  return (
    <div className="max-w-2xl mx-auto px-5 py-6">
      <h1 className="text-2xl font-bold mb-1">Dev Skill Radar</h1>
      <p className="text-gray-500 mb-5">Describe your skills and I'll find relevant jobs and skill gaps.</p>

      <div className="border border-gray-200 rounded-lg min-h-[500px] p-4 mb-4">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-48">
            Try: "I know React and TypeScript, what am I missing for senior roles?"
          </p>
        )}

        {messages.map(message => (
          <div key={message.id} className="mb-4">
            <p className={`font-semibold mb-1 ${message.role === 'user' ? 'text-blue-600' : 'text-gray-700'}`}>
              {message.role === 'user' ? 'You' : 'Claude'}
            </p>
            {message.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return (
                    <p key={i} className="m-0 leading-relaxed whitespace-pre-wrap">
                      {part.text}
                    </p>
                  )
                case 'tool-search_jobs':
                  if (part.state === 'output-available') {
                    return (
                      <div key={i} className="bg-gray-100 rounded-md px-3 py-2 mt-2 text-[13px] text-gray-500">
                        🔍 Searched for: <em>{(part.input as any).query}</em>
                      </div>
                    )
                  }
                  return (
                    <div key={i} className="bg-gray-100 rounded-md px-3 py-2 mt-2 text-[13px] text-gray-500">
                      🔍 Searching...
                    </div>
                  )
                default:
                  return null
              }
            })}
          </div>
        ))}

        {isLoading && (
          <p className="text-gray-400">Thinking...</p>
        )}
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput('');
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={e => setInput(e.currentTarget.value)}
          placeholder="Describe your skills..."
          className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}

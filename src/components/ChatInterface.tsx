'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat({ api: '/api/chat' });

  const isLoading = status === 'streaming' || status === 'submitted';

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Dev Skill Radar</h1>
      <p style={{ color: '#666' }}>Describe your skills and I'll find relevant jobs and skill gaps.</p>

      <div style={{ border: '1px solid #eee', borderRadius: '8px', minHeight: '500px', padding: '16px', marginBottom: '16px' }}>
        {messages.length === 0 && (
          <p style={{ color: '#999', textAlign: 'center', marginTop: '200px' }}>
            Try: "I know React and TypeScript, what am I missing for senior roles?"
          </p>
        )}

        {messages.map(message => (
          <div key={message.id} style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '4px', color: message.role === 'user' ? '#0070f3' : '#333' }}>
              {message.role === 'user' ? 'You' : 'Claude'}
            </p>
            {message.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return (
                    <p key={i} style={{ margin: 0, lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {part.text}
                    </p>
                  )
                case 'tool-search_jobs':
                  if (part.state === 'output-available') {
                    return (
                      <div key={i} style={{ background: '#f5f5f5', borderRadius: '6px', padding: '8px 12px', marginTop: '8px', fontSize: '13px', color: '#666' }}>
                        🔍 Searched for: <em>{(part.input as any).query}</em>
                      </div>
                    )
                  }
                  return (
                    <div key={i} style={{ background: '#f5f5f5', borderRadius: '6px', padding: '8px 12px', marginTop: '8px', fontSize: '13px', color: '#666' }}>
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
          <p style={{ color: '#999' }}>Thinking...</p>
        )}
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput('');
        }}
        style={{ display: 'flex', gap: '8px' }}
      >
        <input
          value={input}
          onChange={e => setInput(e.currentTarget.value)}
          placeholder="Describe your skills..."
          style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '15px' }}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', opacity: isLoading ? 0.5 : 1 }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
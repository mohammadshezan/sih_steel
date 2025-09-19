import React, { useState } from 'react';
import './GenerativeAI.css';

const sampleQueries = [
  'Show me delayed rakes this week',
  'Suggest best route to stockyard X',
];

function GenerativeAI() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = () => {
    // Simulate AI response
    if (query.toLowerCase().includes('delayed')) {
      setResponse('Rake 2, Rake 5 delayed this week.');
    } else if (query.toLowerCase().includes('route')) {
      setResponse('Best route to stockyard X: Bokaro → Bhilai.');
    } else {
      setResponse('AI Assistant: Sorry, I need more context.');
    }
  };

  return (
    <div className="generative-ai">
      <h2>Generative AI Assistant</h2>
      <div className="ai-chat-row">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleAsk}>Ask</button>
      </div>
      {response && (
        <div className="ai-response">
          <strong>Response:</strong> {response}
        </div>
      )}
      <div className="sample-queries">
        <h3>Sample Queries</h3>
        <ul>
          {sampleQueries.map((q, idx) => (
            <li key={idx} onClick={() => setQuery(q)} style={{ cursor: 'pointer', color: '#0088FE' }}>{q}</li>
          ))}
        </ul>
      </div>
      <div className="ai-placeholder">
        <h4>LLM Integration</h4>
        <p>Connect to Azure OpenAI or HuggingFace for real answers.</p>
      </div>
    </div>
  );
}

export default GenerativeAI;

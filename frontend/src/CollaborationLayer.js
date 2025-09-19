import React, { useState } from 'react';
import './CollaborationLayer.css';

const initialMessages = [
  { user: 'Admin', text: 'Dispatch update: Rake 1 on time.' },
  { user: 'Manager', text: 'Confirm loading at Bokaro.' },
];

function CollaborationLayer() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { user: 'You', text: input }]);
      setInput('');
    }
  };

  return (
    <div className="collab-layer">
      <h2>Collaboration Layer</h2>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className="chat-msg">
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="push-notifications">
        <h3>Push Notifications</h3>
        <ul>
          <li>Delay alert: Rake 2</li>
          <li>Reroute: Bokaro → Bellary</li>
        </ul>
      </div>
      <div className="role-channels">
        <h3>Role-Based Channels</h3>
        <ul>
          <li>Admin: All updates</li>
          <li>Manager: Dispatch, loading</li>
          <li>Supervisor: Mobile confirmations</li>
        </ul>
      </div>
    </div>
  );
}

export default CollaborationLayer;

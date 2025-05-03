import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import Login from './component/Login';
// import Login from './Login';

function App() {
  const [message, setMessage] = useState('');

  const fetchPublicData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/public');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Failed to fetch public data');
    }
  };

  return (
    <div className="App">
      <Container className="mt-5">
      <h1>Full Stack App</h1>
      <button className="btn btn-primary mb-3" onClick={fetchPublicData}>
        Fetch Public Data
      </button>
      {message && <Alert variant="info">{message}</Alert>}
      <Login />
    </Container>
    </div>
    
  );
}

export default App;
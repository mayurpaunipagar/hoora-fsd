import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Login successful! Token stored.');
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('Login failed');
    }
  };

  const fetchPrivateData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in first');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/private', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Private data: ${data.message} (User: ${data.user.username})`);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('Failed to fetch private data');
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Button variant="secondary" className="mt-3" onClick={fetchPrivateData}>
        Fetch Private Data
      </Button>
      {message && <Alert variant="info" className="mt-3">{message}</Alert>}
    </div>
  );
}

export default Login;
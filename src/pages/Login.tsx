import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // login logic
  }

  return (
    <Container>
      <Form
        style={{ width: '80%', maxWidth: 500, margin: '0 auto' }}
        onSubmit={handleLogin}
      >
        <h2 className="text-center">Log In</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />
        </Form.Group>
        <Button>Log in</Button>
        <div className="py-4">
          <p className="text-center">
            Don't have an account? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </Form>
    </Container>
  );
}

export default Login;

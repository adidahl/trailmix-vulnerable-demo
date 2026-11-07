import React, { useState } from 'react';
import { login } from '../api.js';

export default function LoginForm({ onDone }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      onDone();
    } catch {
      setMsg('Could not sign in');
    }
  }

  return (
    <form onSubmit={submit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
      <button type="submit">Sign in</button>
      <p>{msg}</p>
    </form>
  );
}

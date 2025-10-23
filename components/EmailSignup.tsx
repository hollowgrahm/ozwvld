'use client';

import { useState } from 'react';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 2000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  if (status === 'success') {
    return (
      <div className="text-green-400 text-xs tracking-wider">
        ✓ Subscribed
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
        disabled={status === 'loading'}
        className="bg-transparent text-gray-400 border-b-2 border-gray-500 px-0 py-1 text-xs focus:border-accent outline-none disabled:opacity-50 placeholder:text-gray-400 w-48"
      />
      
      <button
        type="submit"
        disabled={status === 'loading'}
        className="text-accent hover:text-hover text-xs tracking-wider transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? '...' : status === 'error' ? 'retry' : 'join →'}
      </button>
    </form>
  );
}


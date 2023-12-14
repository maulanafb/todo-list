'use client'
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

const Login = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    const result = await signIn('credentials', {
      email: emailAddress,
      password,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <div className="flex flex-col text-white">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="text-black"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;

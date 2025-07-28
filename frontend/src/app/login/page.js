'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    try {
      // Step 1: Login request
      const loginResponse = await fetch('http://192.168.149.146:8080/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!loginResponse.ok) throw new Error('Invalid credentials');

      const loginData = await loginResponse.json(); // e.g., { id: 4, ... }

      const userId = loginData.id;

      // Step 2: Fetch full user data
      const fullResponse = await fetch(`http://192.168.149.146:8080/users/${userId}/full`);
      if (!fullResponse.ok) throw new Error('Failed to fetch user data');

      const fullData = await fullResponse.json();

      // Step 3: Save both in localStorage
      localStorage.setItem('userId', userId);
      localStorage.setItem('user', JSON.stringify(loginData));
      localStorage.setItem('userFullData', JSON.stringify(fullData));

      alert('Login successful!');
      // Optionally redirect:
      // window.location.href = '/dashboard';
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  }

  return (
    <div className="bg-[#121212] min-h-screen text-white flex items-center justify-center font-sans">
      <div className="flex w-full max-w-[1200px] h-[90vh] bg-[#282828] rounded-xl shadow-lg overflow-hidden">
        <div className="w-[140%] bg-[#231e18] p-10 text-center hidden md:block">
          <img src="/photo.png" alt="Illustration" className="w-[60%] mx-auto mb-5" />
          <h2 className="text-[#d6a358] text-2xl mb-2">Take control of your day.</h2>
          <p className="text-[#8b8b8b] text-sm">Our Student Time Planner helps you stay focused, organized</p>
        </div>

        <div className="w-full flex items-center justify-center p-10">
          <div className="w-full max-w-xl bg-[#3f3f3f] p-8 rounded-lg">
            <div className="text-center text-3xl text-[#cf9843] mb-6">⋮⋮</div>
            <h2 className="text-xl mb-2">Login to your Account</h2>
            <p className="text-sm text-[#8b8b8b] mb-5">See what is going on with your business</p>

            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-2.5 mb-4 bg-[#575757] text-white placeholder-[#8b8b8b] border border-[#717171] rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2.5 mb-4 bg-[#575757] text-white placeholder-[#8b8b8b] border border-[#717171] rounded"
              />
              <button
                type="submit"
                className="w-full bg-[#cf9843] text-black font-bold py-2 rounded hover:bg-[#d6a358] transition"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm mt-6">
              Not Registered Yet?{' '}
              <a href="#" className="text-[#d6a358] hover:underline">Create an account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

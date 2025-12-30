'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { LucideDumbbell } from 'lucide-react';
import  { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router=useRouter();

  const handleLogin = async () => {
  const result = await signIn('credentials', {
    email,
    password,
    redirect: false, 
  });
  console.log(result)

  if (result?.error) {  
    console.error('Login failed:', result.error);
    alert('Login failed. Please check your credentials.');
  } else {
    router.push("/")
  }
};

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex flex-col justify-center items-center px-6 text-white">
      <div className="max-w-md w-full space-y-6 rounded-3xl shadow-2xl border-2 border-purple-800 backdrop-blur-md bg-gray-950/80 p-8">
        <div className="flex flex-col items-center mb-4">
          <span className="animate-spin-slow mb-2">
            <LucideDumbbell size={36} className="text-purple-400 drop-shadow" />
          </span>
          <h1 className="text-3xl font-extrabold text-center text-purple-400">Welcome Back</h1>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-purple-300 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-purple-300 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold rounded-lg transition duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-700/40"
        >
          <MdEmail className="text-xl" />
          Sign In with Email
        </button>

        
        <div className="text-center mt-4">
          <span className="text-gray-400">Don&apos;t have an account?</span>
          <a
            href="/signup"
            className="ml-2 text-purple-400 hover:text-purple-300 font-semibold underline transition"
          >
            Sign up
          </a>
        </div>
      </div>
    </main>
  );
}

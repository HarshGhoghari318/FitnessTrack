'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
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
    router.push("/profile")
  }
};

  return (
    <main className="min-h-screen bg-[#0f172a] flex flex-col justify-center items-center px-6 text-white">
      <div className="max-w-md w-full space-y-6 bg-[#1e293b] p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-purple-400 text-center">Welcome Back</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 border-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 border-2"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded flex items-center justify-center gap-2"
        >
          <MdEmail className="text-xl" />
          Sign In with Email
        </button>

        <div className="text-center text-gray-400">or</div>

        <button
          onClick={async () => await signIn('google', { callbackUrl: '/profile' })}
          className="w-full bg-white text-black font-bold py-3 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <FaGoogle className="text-xl text-red-500" />
          Continue with Google
        </button>
      </div>
    </main>
  );
}

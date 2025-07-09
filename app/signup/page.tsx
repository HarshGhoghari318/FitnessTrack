'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const searchParams = useSearchParams();
  const error1 = searchParams.get('error');
  const [error, setError] = useState('');
  const router = useRouter();

 
  




  const handleSignup = async () => {
    if (!age) {
      setError('Age is required.');
      return;
    }

    try {
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
        name,
        gender,
        age,
        weight: weight || null,
        height: height || null,
      });

      if (response.status === 201) {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError('Account created but login failed. Please try logging in.');
          router.push('/login');
        } else {
          router.push('/profile');
        }
      }
    } catch (error) {
      alert("An error occurred during signup");
    }
  };

  return (
    <>
      {error1 === 'CredentialsSignin' && (
        <div className="text-red-500 bg-red-100 p-2 rounded">
          Invalid email or password. Please try again.
        </div>
      )}
      {error && (
        <div className="text-red-500 bg-red-100 p-2 rounded">
          {error}
        </div>
      )}
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg p-8 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700">
          <h1 className="text-3xl font-extrabold text-center text-purple-400 mb-6">
            Create Your Account
          </h1>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="number"
              placeholder="Weight (kg) — Optional"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="number"
              placeholder="Height (cm) — Optional"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              onClick={handleSignup}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md transition duration-300 flex items-center justify-center gap-2"
            >
              <MdEmail className="text-xl" />
              Sign Up with Email
            </button>

            <div className="text-center text-gray-400">or</div>

            <button
              onClick={() => signIn('google', { callbackUrl: '/profile' })}
              className="w-full py-3 bg-white hover:bg-gray-100 text-black font-bold rounded-md transition duration-300 flex items-center justify-center gap-2"
            >
              <FaGoogle className="text-xl text-red-500" />
              Continue with Google
            </button>
          </div>
        </div>
      </main>

    </>
  );
}

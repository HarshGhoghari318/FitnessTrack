'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { LucideDumbbell } from 'lucide-react';
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
          router.push('/');
        }
      }
    } catch (error) {
      console.log(error);
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
  <main className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg p-8 rounded-3xl shadow-2xl border-2 border-purple-800 backdrop-blur-md bg-gray-950/80">
          <div className="flex flex-col items-center mb-6">
            <span className="animate-spin-slow mb-2">
              <LucideDumbbell size={40} className="text-purple-400 drop-shadow" />
            </span>
            <h1 className="text-3xl font-extrabold text-center text-purple-400">
              Create Your Account
            </h1>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-purple-300 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-purple-300 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
            />

            <input
              type="number"
              placeholder="Weight (kg) — Optional"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-purple-300 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
            />

            <input
              type="number"
              placeholder="Height (cm) — Optional"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-purple-300 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
            />

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
              onClick={handleSignup}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold rounded-lg transition duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-700/40"
            >
              <MdEmail className="text-xl" />
              Sign Up with Email
            </button>

            <div className="text-center text-purple-300">or</div>

            <button
              onClick={() => signIn('google', { callbackUrl: '/profile' })}
              className="w-full py-3 bg-white hover:bg-purple-100 text-purple-700 font-bold rounded-lg transition duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <FaGoogle className="text-xl text-red-500" />
              Continue with Google
            </button>
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-400">Already have an account?</span>
            <a
              href="/signin"
              className="ml-2 text-purple-400 hover:text-purple-300 font-semibold underline transition"
            >
              Sign in
            </a>
          </div>
        </div>
      </main>

    </>
  );
}

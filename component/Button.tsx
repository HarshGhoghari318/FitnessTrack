'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-6 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition"
    >
      ← Go Back
    </button>
  );
}
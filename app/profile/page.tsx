import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Image from 'next/image';
import prisma from '@/prismaProvider'; // adjust this import path if needed

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-red-400 text-lg">You must be logged in to view this page.</p>
        <a href='/signin'>Click To go SignIn Page</a>
      </main>
    );
  }

  const user  = await prisma.user.findUnique({
    where: { email: session.user?.email ?? '' },
  });
  console.log(user?.image || null)

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700">
        <div className="flex flex-col items-center">
          {user?.image ? (
            <Image
              src={session?.user?.image || ""}
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full mb-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-700 mb-4 flex items-center justify-center text-gray-400 text-xl">
              {user?.name[0]}
            </div>
          )}
          <h1 className="text-2xl font-bold mb-1">{user?.name}</h1>
          <p className="text-gray-400">{user?.email}</p>
        </div>

        <div className="mt-6 space-y-3 text-sm sm:text-base">
          <p>
            <span className="font-semibold text-purple-400">Gender:</span>{" "}
            {user?.gender || "Not specified"}
          </p>
          <p>
            <span className="font-semibold text-purple-400">Age:</span>{" "}
            {user?.age ?? "Not specified"}
          </p>
          <p>
            <span className="font-semibold text-purple-400">Height:</span>{" "}
            {user?.height ? `${user?.height} cm` : "Not specified"}
          </p>
          <p>
            <span className="font-semibold text-purple-400">Weight:</span>{" "}
            {user?.weight ? `${user?.weight} kg` : "Not specified"}
          </p>
        </div>
      </div>
    </main>
  );
}

export default function InfoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-purple-700 text-center">📘 Fitness Guide</h1>

      {/* How to Train */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-700 mb-2">🏋️ How to Train</h2>
        <p className="text-gray-800 text-base leading-relaxed">
          Start with compound exercises like squats, deadlifts, bench press, and pull-ups.
          Train each muscle group at least 2x per week. Focus on proper form, progressive overload,
          and rest between sets (60–90 seconds for hypertrophy).
        </p>
      </section>

      {/* Best Split */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-red-600 mb-2">📆 Best Workout Split</h2>
        <ul className="text-gray-800 text-base list-disc list-inside space-y-2">
          <li><strong>Beginner:</strong> Full body (3x per week)</li>
          <li><strong>Intermediate:</strong> Push-Pull-Legs (6x per week)</li>
          <li><strong>Advanced:</strong> Upper/Lower Split or Body Part Split</li>
        </ul>
      </section>

      {/* Recovery */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-indigo-700 mb-2">💤 Recovery & Rest</h2>
        <p className="text-gray-800 text-base leading-relaxed">
          Recovery is just as important as your workouts. Aim for 7–9 hours of sleep per night, drink enough water,
          take rest days seriously, and manage stress to allow your muscles to grow.
        </p>
      </section>

      {/* Nutrition */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-green-700 mb-2">🍽️ Nutrition Basics</h2>
        <p className="text-gray-800 text-base leading-relaxed">
          Prioritize protein intake (1.6–2.2g/kg body weight), balance your meals with whole foods, 
          and align your calories with your goals — whether it's fat loss or muscle gain.
        </p>
      </section>

      <footer className="mt-12 text-center text-sm text-gray-500">
        💡 Last updated: June 2025
      </footer>
    </div>
  );
}

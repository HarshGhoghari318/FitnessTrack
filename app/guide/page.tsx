


"use client";
import { motion } from "framer-motion";

const guideSections = [
  {
    icon: "🏋️",
    title: "How to Train",
    desc:
      "Start with compound exercises like squats, deadlifts, bench press, and pull-ups. Train each muscle group at least 2x per week. Focus on proper form, progressive overload, and rest between sets (60–90 seconds for hypertrophy).",
  },
  {
    icon: "📆",
    title: "Best Workout Split",
    desc:
      "Beginner: Full body (3x per week). Intermediate: Push-Pull-Legs (6x per week). Advanced: Upper/Lower Split or Body Part Split.",
  },
  {
    icon: "💤",
    title: "Recovery & Rest",
    desc:
      "Recovery is just as important as your workouts. Aim for 7–9 hours of sleep per night, drink enough water, take rest days seriously, and manage stress to allow your muscles to grow.",
  },
  {
    icon: "🍽️",
    title: "Nutrition Basics",
    desc:
      "Prioritize protein intake (1.6–2.2g/kg body weight), balance your meals with whole foods, and align your calories with your goals — whether it's fat loss or muscle gain.",
  },
];


export default function InfoPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 sm:px-6 py-10 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 sm:mb-12 text-purple-400 text-center drop-shadow-lg"
      >
        Fitness Guide
      </motion.h1>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-4xl w-full">
        {guideSections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.12, duration: 0.6 }}
            className="bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-purple-700 flex flex-col items-center text-center hover:border-purple-400 hover:shadow-purple-400/30 transition"
          >
            <div className="text-4xl sm:text-5xl mb-4">{section.icon}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-purple-300 mb-3">{section.title}</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{section.desc}</p>
          </motion.div>
        ))}
      </div>

      <footer className="mt-16 text-center text-sm text-gray-500">
        💡 Last updated: June 2025
      </footer>
    </main>
  );
}

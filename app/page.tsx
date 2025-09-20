"use client";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="text-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-70 z-0" />
        {/* Content */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="z-10 max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-purple-400 mb-4">
            Build Strength. Fuel Confidence.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            A complete platform for workouts, nutrition, and progress tracking. Your transformation starts today.
          </p>
          <div className="space-x-4">
            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              href="/workouts"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Start Workout
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              href="/signup"
              className="border border-purple-400 text-purple-400 hover:bg-purple-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Join Now
            </motion.a>
          </div>
        </motion.div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-20 bg-gray-900"
      >
        <h2 className="text-3xl font-bold text-center text-purple-300 mb-12">
          What Makes Us Different?
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto px-4">
          {[
            {
              icon: "🏋️‍♂️",
              path: "/workouts",
              title: "Dynamic Workouts",
              desc: "Routines designed for all levels — beginner to advanced — with real results.",
            },
            {
              icon: "🥗",
              path: "/nutrition", // fixed typo
              title: "Goal-Based Nutrition",
              desc: "Smart meal plans to support your muscle gain or fat loss journey.",
            },
            {
              icon: "📊",
              path: "/tracks",
              title: "Visual Progress Tracking",
              desc: "Log workouts, track calories, and see your body transform.",
            },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.path}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gray-800 border border-purple-400 p-6 rounded-xl shadow-lg hover:shadow-purple-400/40 transition"
              whileHover={{ scale: 1.05, boxShadow: "0 0 24px #a78bfa" }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-purple-300 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* Final Call to Action */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="py-16 bg-black text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-purple-400">
          Ready to Change Your Life?
        </h2>
        <p className="text-gray-400 mb-6">
          “Because fitness should be free for all.”
        </p>
        <motion.a
          href="/guide"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition"
        >
          Let’s Begin
        </motion.a>
      </motion.section>
    </main>
  );
}

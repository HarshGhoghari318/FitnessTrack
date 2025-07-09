export default function HomePage() {
  return (
    <main className="text-white">
      {/* Hero Section */}
      <section
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-70 z-0" />
        {/* Content */}
        <div className="z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-purple-400 mb-4">
            Build Strength. Fuel Confidence.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            A complete platform for workouts, nutrition, and progress tracking. Your transformation starts today.
          </p>
          <div className="space-x-4">
            <a
              href="/workouts"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Start Workout
            </a>
            <a
              href="/signup"
              className="border border-purple-400 text-purple-400 hover:bg-purple-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Join Now
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900">
        <h2 className="text-3xl font-bold text-center text-purple-300 mb-12">
          What Makes Us Different?
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto px-4">
          {[
            {
              icon: "🏋️‍♂️",
              path:"/workouts",
              title: "Dynamic Workouts",
              desc: "Routines designed for all levels — beginner to advanced — with real results.",
            },
            {
              icon: "🥗",
              path:"/nutritions",
              title: "Goal-Based Nutrition",
              desc: "Smart meal plans to support your muscle gain or fat loss journey.",
            },
            {
              icon: "📊",
              path:"/tracks",
              title: "Visual Progress Tracking",
              desc: "Log workouts, track calories, and see your body transform.",
            },
          ].map((item, i) => (
            <a
              href={item.path}
              key={i}
              className="bg-gray-800 border border-purple-400 p-6 rounded-xl shadow-lg hover:shadow-purple-400/40 transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-purple-300 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-black text-center">
        <h2 className="text-3xl font-bold mb-4 text-purple-400">
          Ready to Change Your Life?
        </h2>
        <p className="text-gray-400 mb-6">
          You’re one click away from building your best self. Join the movement.
        </p>
        <a
          href="/signup"
          className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition"
        >
          Let’s Begin
        </a>
      </section>
    </main>
  );
}

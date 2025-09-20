const TracksPage = () => {
  type WorkoutPlan = {
    id: number;
    day: string;
    type: string;
    muscles: string[];
  };
  const fallbackPlans: WorkoutPlan[] = [
    {
      id: 1,
      day: "Monday",
      type: "Push",
      muscles: ["chest", "shoulders", "triceps"],
    },
    {
      id: 2,
      day: "Tuesday",
      type: "Pull",
      muscles: ["back", "biceps"],
    },
    {
      id: 3,
      day: "Wednesday",
      type: "Legs",
      muscles: ["legs"],
    },
    {
      id: 4,
      day: "Thursday",
      type: "Push",
      muscles: ["chest", "shoulders", "triceps"],
    },
    {
      id: 5,
      day: "Friday",
      type: "Pull",
      muscles: ["back", "biceps"],
    },
    {
      id: 6,
      day: "Saturday",
      type: "Legs",
      muscles: ["legs"],
    },
    {
      id: 7,
      day: "Sunday",
      type: "Rest",
      muscles: [],
    },
  ];
  let plans: WorkoutPlan[] = [];
  try {
    plans = [];
    // Server-side fetch only, no async client component
    // ...existing code for fetching from prisma if needed...
  } catch {
    plans = [];
  }
  if (!plans || plans.length === 0) {
    plans = fallbackPlans;
  }

  return (
    <main className="min-h-screen bg-cover bg-center text-white relative" style={{backgroundImage: "url('/images/fitness-bg.jpg')"}}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70 z-0" />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400 text-center mb-10 drop-shadow-lg">
          🏋️ Weekly Workout Plan
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {plans.map((plan: WorkoutPlan) => (
            <div
              key={plan.day + '-' + plan.type}
              className="backdrop-blur-lg bg-white/10 border border-purple-500 rounded-2xl p-6 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center"
            >
              <h2 className="text-2xl font-bold text-purple-300 mb-2 tracking-wide drop-shadow">
                {plan.day}
              </h2>
              <span className="inline-block bg-purple-500/80 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow">
                {plan.type}
              </span>
              <div className="w-full">
                <p className="text-sm font-semibold text-gray-200 mb-2 text-center">Muscle Groups:</p>
                <ul className="list-disc list-inside text-gray-100 text-sm mb-2">
                  {plan.muscles.length > 0 ? (
                    plan.muscles.map((muscle: string, index: number) => (
                      <li key={muscle + '-' + index} className="mb-1">
                        <a href={`/workouts/${muscle}`} className="text-purple-300 underline hover:text-purple-400 transition">
                          {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li className="italic text-gray-400">Rest day</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
TracksPage.displayName = "TracksPage";
export default TracksPage;

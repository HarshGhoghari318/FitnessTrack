import prisma from "@/prismaProvider";

export default async function TracksPage() {
  const plans = await prisma.workoutPlan.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div
      className="min-h-screen bg-[url('/images/fitness-bg.jpg')] bg-cover bg-center text-white"
    >
      {/* Overlay */}
      <div className="min-h-screen bg-black/60 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-white mb-10">
            🏋️ Weekly Workout Plan
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white/90 text-black border border-blue-200 rounded-xl p-5 shadow hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-bold text-blue-600 mb-1">{plan.day}</h2>
                <p className="text-sm text-gray-700 mb-3">
                  <span className="font-semibold">Type:</span> {plan.type}
                </p>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Muscle Groups:</p>
                  <ul className="list-disc list-inside text-gray-800 text-sm">
                    {plan.muscles.length > 0 ? (
                      plan.muscles.map((muscle, index) => (
                        <li key={index}>
                          <a href={`/workouts/${muscle}`} className="text-blue-700 underline">
                            {muscle}
                          </a>
                        </li>
                      ))
                    ) : (
                      <li className="italic text-gray-500">Rest day</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

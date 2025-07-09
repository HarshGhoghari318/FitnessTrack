import BackButton from "@/component/Button";
import axios from "axios";

export default async function MuscleExercisesPage({
  params,
}: {
  params: { muscle: string };
}) {
  let exercises: any[] = [];
  let error = false;

  try {
    const res = await axios.get(
      `https://api.api-ninjas.com/v1/exercises?muscle=${params.muscle}`,
      {
        headers: {
          "X-Api-Key": process.env.API_NINJAS_KEY!,
        },
      }
    );
    exercises = res.data;
  } catch (err) {
    console.error("API error:", err);
    error = true;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white px-6 py-10">
        <BackButton />
        <h1 className="text-2xl text-center text-red-400 font-bold mb-4">
          Failed to load exercises
        </h1>
        <p className="text-center text-red-200">
          Please try again later or return to the workout page.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <BackButton />

      <h1 className="text-4xl font-bold mb-8 capitalize text-center text-red-400">
        {params.muscle.replace("_", " ")} Exercises
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div
            key={exercise.name + Math.random()}
            className="bg-red-900/40 border border-red-800 rounded-xl p-5 shadow-md hover:shadow-red-700 transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-red-300 mb-2">
              {exercise.name}
            </h2>
            <p className="text-sm text-red-100 mb-1">
              <strong>Type:</strong> {exercise.type}
            </p>
            <p className="text-sm text-red-100 mb-1">
              <strong>Difficulty:</strong> {exercise.difficulty}
            </p>
            <p className="text-sm text-red-100 mb-1">
              <strong>Equipment:</strong> {exercise.equipment}
            </p>
            <details className="mt-2">
              <summary className="cursor-pointer text-red-300 underline">
                Instructions
              </summary>
              <p className="mt-2 text-sm text-red-100 whitespace-pre-line">
                {exercise.instructions}
              </p>
            </details>
          </div>
        ))}
      </div>
    </main>
  );
}

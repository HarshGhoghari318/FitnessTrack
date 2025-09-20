

import BackButton from "@/component/Button";
import axios from "axios";


const fallbackExercises: Record<string, any[]> = {
  chest: [
    {
      name: "Push-Up",
      type: "Strength",
      difficulty: "Beginner",
      equipment: "None",
      instructions: "Start in a plank position. Lower your body until your chest nearly touches the floor. Push back up. Repeat.",
    },
    {
      name: "Bench Press",
      type: "Strength",
      difficulty: "Intermediate",
      equipment: "Barbell",
      instructions: "Lie on a bench, grip the barbell, lower it to your chest, then press it back up.",
    },
    {
      name: "Incline Dumbbell Press",
      type: "Strength",
      difficulty: "Intermediate",
      equipment: "Dumbbells",
      instructions: "Sit on an incline bench, press dumbbells overhead, then lower back down.",
    },
    {
      name: "Chest Fly",
      type: "Strength",
      difficulty: "Intermediate",
      equipment: "Dumbbells",
      instructions: "Lie on a bench, hold dumbbells above chest, open arms wide, then bring them together.",
    },
  ],
  back: [
    {
      name: "Pull-Up",
      type: "Strength",
      difficulty: "Intermediate",
      equipment: "Pull-up Bar",
      instructions: "Hang from the bar with arms extended, pull your chin above the bar, then lower back down.",
    },
    {
      name: "Bent-Over Row",
      type: "Strength",
      difficulty: "Intermediate",
      equipment: "Barbell",
      instructions: "Bend at the hips, grip the barbell, pull it to your torso, then lower it back down.",
    },
    {
      name: "Lat Pulldown",
      type: "Strength",
      difficulty: "Beginner",
      equipment: "Cable Machine",
      instructions: "Sit at the machine, pull the bar down to your chest, then release back up.",
    },
    {
      name: "Seated Cable Row",
      type: "Strength",
      difficulty: "Beginner",
      equipment: "Cable Machine",
      instructions: "Sit at the machine, pull the handle to your torso, then release.",
    },
  ],
  legs: [
    {
      name: "Squat",
      type: "Strength",
      difficulty: "Beginner",
      equipment: "None",
      instructions: "Stand with feet shoulder-width apart, lower your hips, then return to standing.",
    },
    {
      name: "Lunge",
      type: "Strength",
      difficulty: "Beginner",
      equipment: "None",
      instructions: "Step forward, lower your body, then return to standing. Alternate legs.",
    },
    {
      name: "Leg Press",
      type: "Strength",
      difficulty: "Intermediate",
      equipment: "Leg Press Machine",
      instructions: "Sit at the machine, press the platform away, then return.",
    },
    {
      name: "Calf Raise",
      type: "Strength",
      difficulty: "Beginner",
      equipment: "None",
      instructions: "Stand, raise your heels off the ground, then lower back down.",
    },
  ],
  biceps: [
    {
      name: "Bicep Curl",
      type: "Strength",
      difficulty: "Beginner",
      equipment: "Dumbbells",
      instructions: "Hold dumbbells, curl them toward your shoulders, then lower back down.",
    },
    {
      name: "Hammer Curl",
      type: "Strength",
      difficulty: "Beginner",
      equipment: "Dumbbells",
      instructions: "Hold dumbbells with palms facing in, curl up, then lower.",
    },
    {
      name: "Barbell Curl",
      type: "Strength",
      difficulty: "Intermediate",
      equipment: "Barbell",
      instructions: "Grip barbell, curl toward shoulders, then lower.",
    },
  ],
  triceps: [
    {
      name: "Tricep Dip",
      type: "Strength",
      difficulty: "Intermediate",
      equipment: "Parallel Bars",
      instructions: "Grip bars, lower your body, then press back up.",
    },
    {
      name: "Tricep Pushdown",
      type: "Strength",
      difficulty: "Beginner",
      equipment: "Cable Machine",
      instructions: "Stand at cable machine, push bar down, then release.",
    },
    {
      name: "Overhead Tricep Extension",
      type: "Strength",
      difficulty: "Beginner",
      equipment: "Dumbbell",
      instructions: "Hold dumbbell overhead, lower behind head, then extend.",
    },
  ],
  shoulders: [
    {
      name: "Shoulder Press",
      type: "Strength",
      difficulty: "Intermediate",
      equipment: "Dumbbells",
      instructions: "Press dumbbells overhead, then lower back down.",
    },
    {
      name: "Lateral Raise",
      type: "Strength",
      difficulty: "Beginner",
      equipment: "Dumbbells",
      instructions: "Hold dumbbells at sides, raise arms out, then lower.",
    },
    {
      name: "Front Raise",
      type: "Strength",
      difficulty: "Beginner",
      equipment: "Dumbbells",
      instructions: "Hold dumbbells in front, raise arms up, then lower.",
    },
  ],
};

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
    exercises = fallbackExercises[params.muscle] || [];
    error = exercises.length === 0;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-cover bg-center text-white relative" style={{backgroundImage: "url('/images/fitness-bg.jpg')"}}>
        <div className="absolute inset-0 bg-black opacity-70 z-0" />
        <div className="relative z-10 px-6 py-10">
          <BackButton />
          <h1 className="text-2xl text-center text-purple-400 font-bold mb-4">
            Failed to load exercises
          </h1>
          <p className="text-center text-purple-200">
            Please try again later or return to the workout page.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cover bg-center text-white relative" style={{backgroundImage: "url('/images/fitness-bg.jpg')"}}>
      <div className="absolute inset-0 bg-black opacity-70 z-0" />
      <div className="relative z-10 px-6 py-10">
        <BackButton />
        <h1 className="text-4xl font-extrabold mb-8 capitalize text-center text-purple-400 drop-shadow-lg">
          {params.muscle.replace("_", " ")} Exercises
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exercises.map((exercise, idx) => (
            <div
              key={exercise.name + '-' + exercise.type + '-' + exercise.difficulty}
              className="backdrop-blur-lg bg-white/10 border border-purple-500 rounded-2xl p-6 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <h2 className="text-2xl font-bold text-purple-300 mb-2 tracking-wide drop-shadow">
                {exercise.name}
              </h2>
              <span className="inline-block bg-purple-500/80 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow">
                {exercise.type}
              </span>
              <p className="text-sm text-gray-200 mb-1">
                <strong>Difficulty:</strong> {exercise.difficulty}
              </p>
              <p className="text-sm text-gray-200 mb-1">
                <strong>Equipment:</strong> {exercise.equipment}
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-purple-300 underline">
                  Instructions
                </summary>
                <p className="mt-2 text-sm text-gray-100 whitespace-pre-line">
                  {exercise.instructions}
                </p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

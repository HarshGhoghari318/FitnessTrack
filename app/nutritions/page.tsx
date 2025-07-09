"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

type Food = {
  food: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg?: number | null;
  carbohydrates_total_g?: number | null;
  fiber_g?: number | null;
  sugar_g?: number | null;
  photo: string;
};

export default function NutritionPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [showDiet, setShowDiet] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("Weight loss");
  const [loading, setLoading] = useState(true);
  const [diet, setDiet] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("/api/food");
        const foodList = Array.isArray(response.data)
          ? response.data
          : response.data.data;

        if (Array.isArray(foodList)) {
          setFoods(foodList);
        } else {
          console.error("Unexpected data format", response.data);
        }
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowDiet(true);
    try {
      const res = await axios.post("/api/diet", {
        height,
        weight,
        age,
        goal,
      });
      console.log(res.data)
      setDiet(res.data.text);
      console.log(diet)
    } catch (error) {
      alert("Something went wrong while saving your info.");
    }
  };

  return (
    <div className="min-h-screen bg-[#e6f0e6] p-6 pb-40">
      {/* Intro */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-[#3a5f3a] mb-4">
          Welcome to Your Nutrition Guide 🌿
        </h1>
        <p className="text-[#4a5f4a] text-lg">
          Discover the best high-protein foods to support your fitness and health goals.
          Scroll down to explore nutritious options, and tell us your basic details so we can help craft a diet plan for you!
        </p>
      
      </div>

      {/* Food Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-[#5c7a5c] border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {foods.map((food, index) => (
            <div
              key={index}
              className="bg-white border border-[#cfd8cf] rounded-xl shadow-sm p-4 hover:shadow-md transition"
            >
              <Image
                src={food.photo}
                alt={food.food}
                width={300}
                height={180}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
              />
              <h2 className="text-xl font-semibold text-[#3a5f3a] mt-3 mb-2">
                {food.food}
              </h2>
              <ul className="text-sm text-[#4a5f4a] space-y-1">
                <li><strong>Calories:</strong> {food.calories} kcal</li>
                <li><strong>Serving Size:</strong> {food.serving_size_g}g</li>
                <li><strong>Protein:</strong> {food.protein_g}g</li>
                <li><strong>Total Fat:</strong> {food.fat_total_g}g</li>
                <li><strong>Saturated Fat:</strong> {food.fat_saturated_g}g</li>
                <li><strong>Sodium:</strong> {food.sodium_mg}mg</li>
                <li><strong>Potassium:</strong> {food.potassium_mg}mg</li>
                {food.cholesterol_mg != null && <li><strong>Cholesterol:</strong> {food.cholesterol_mg}mg</li>}
                {food.carbohydrates_total_g != null && <li><strong>Carbs:</strong> {food.carbohydrates_total_g}g</li>}
                {food.fiber_g != null && <li><strong>Fiber:</strong> {food.fiber_g}g</li>}
                {food.sugar_g != null && <li><strong>Sugar:</strong> {food.sugar_g}g</li>}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Diet Modal */}
      {showDiet && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="relative max-w-2xl w-full bg-white p-6 rounded-xl shadow-xl border border-[#d0e0d0]">
            <button
              className="absolute top-2 right-2 text-red-500 text-2xl font-bold hover:text-red-700 transition"
              onClick={() => setShowDiet(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-[#3a5f3a] mb-4 text-center">
              Your Personalized Diet Plan 🍽️
            </h2>

            {!diet ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-[#3a5f3a] border-dashed rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-[#334d33] max-h-[70vh] overflow-y-auto">
                {diet}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sticky Form */}
      <div className="fixed bottom-0 left-0 w-full rounded-t-2xl bg-[#cfe6cf] text-[#2e4e2e] py-4 px-6 shadow-inner z-40">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between max-w-5xl mx-auto"
        >
          <div className="flex gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto">
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="px-3 py-2 rounded-md font-bold border-2 w-full sm:w-36 bg-[#e0eee0] text-[#2e4e2e] placeholder-[#607060]"
              required
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="px-3 py-2 rounded-md font-bold border-2 w-full sm:w-36 bg-[#e0eee0] text-[#2e4e2e] placeholder-[#607060]"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="px-3 py-2 rounded-md font-bold border-2 w-full sm:w-36 bg-[#e0eee0] text-[#2e4e2e] placeholder-[#607060]"
              required
            />
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="px-3 py-2 rounded-md font-bold border-2 w-full sm:w-44 bg-white text-[#2e4e2e]"
            >
              <option value="Weight loss">Weight Loss</option>
              <option value="Muscle gain">Muscle Gain</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="px-3 py-2 rounded-md font-bold border-2 w-full sm:w-44 bg-white text-[#2e4e2e]"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="flex gap-3 flex-col sm:flex-row w-full sm:w-auto">
            <button
              type="submit"
              className="bg-white text-[#3a5f3a] font-bold px-5 py-2 rounded-md hover:bg-[#f1f8f1] transition w-full sm:w-auto"
            >
              Get My Diet Plan
            </button>

            {/* 👇 Workouts CTA Button in Sticky Bar */}
            
          </div>
        </form>
      </div>
    </div>
  );
}

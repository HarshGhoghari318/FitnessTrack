"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Image from "next/image";


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
  const fallbackFoods: Food[] = [
    {
      food: "Chicken Breast",
      calories: 165,
      serving_size_g: 100,
      fat_total_g: 3.6,
      fat_saturated_g: 1,
      protein_g: 31,
      sodium_mg: 74,
      potassium_mg: 256,
      cholesterol_mg: 85,
      carbohydrates_total_g: 0,
      fiber_g: 0,
      sugar_g: 0,
      photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    },
    {
      food: "Eggs",
      calories: 155,
      serving_size_g: 100,
      fat_total_g: 11,
      fat_saturated_g: 3.3,
      protein_g: 13,
      sodium_mg: 124,
      potassium_mg: 126,
      cholesterol_mg: 373,
      carbohydrates_total_g: 1.1,
      fiber_g: 0,
      sugar_g: 1.1,
      photo: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    },
    {
      food: "Greek Yogurt",
      calories: 59,
      serving_size_g: 100,
      fat_total_g: 0.4,
      fat_saturated_g: 0.1,
      protein_g: 10,
      sodium_mg: 36,
      potassium_mg: 141,
      cholesterol_mg: 5,
      carbohydrates_total_g: 3.6,
      fiber_g: 0,
      sugar_g: 3.2,
      photo: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    },
    {
      food: "Lentils",
      calories: 116,
      serving_size_g: 100,
      fat_total_g: 0.4,
      fat_saturated_g: 0.1,
      protein_g: 9,
      sodium_mg: 2,
      potassium_mg: 369,
      cholesterol_mg: 0,
      carbohydrates_total_g: 20,
      fiber_g: 8,
      sugar_g: 1.8,
      photo: "https://images.unsplash.com/photo-1464306076886-debede6bbf94?auto=format&fit=crop&w=400&q=80",
    },
    {
      food: "Salmon",
      calories: 208,
      serving_size_g: 100,
      fat_total_g: 13,
      fat_saturated_g: 3.1,
      protein_g: 20,
      sodium_mg: 59,
      potassium_mg: 363,
      cholesterol_mg: 55,
      carbohydrates_total_g: 0,
      fiber_g: 0,
      sugar_g: 0,
      photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    },
    {
      food: "Tofu",
      calories: 76,
      serving_size_g: 100,
      fat_total_g: 4.8,
      fat_saturated_g: 0.7,
      protein_g: 8,
      sodium_mg: 7,
      potassium_mg: 121,
      cholesterol_mg: 0,
      carbohydrates_total_g: 1.9,
      fiber_g: 0.3,
      sugar_g: 0.6,
      photo: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    },
    {
      food: "Cottage Cheese",
      calories: 98,
      serving_size_g: 100,
      fat_total_g: 4.3,
      fat_saturated_g: 1.7,
      protein_g: 11,
      sodium_mg: 364,
      potassium_mg: 104,
      cholesterol_mg: 17,
      carbohydrates_total_g: 3.4,
      fiber_g: 0,
      sugar_g: 2.7,
      photo: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    },
    {
      food: "Quinoa",
      calories: 120,
      serving_size_g: 100,
      fat_total_g: 1.9,
      fat_saturated_g: 0.2,
      protein_g: 4.4,
      sodium_mg: 7,
      potassium_mg: 172,
      cholesterol_mg: 0,
      carbohydrates_total_g: 21,
      fiber_g: 2.8,
      sugar_g: 0.9,
      photo: "https://images.unsplash.com/photo-1464306076886-debede6bbf94?auto=format&fit=crop&w=400&q=80",
    },
    {
      food: "Tuna",
      calories: 132,
      serving_size_g: 100,
      fat_total_g: 0.6,
      fat_saturated_g: 0.2,
      protein_g: 28,
      sodium_mg: 50,
      potassium_mg: 252,
      cholesterol_mg: 38,
      carbohydrates_total_g: 0,
      fiber_g: 0,
      sugar_g: 0,
      photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    },
  ];
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

        if (Array.isArray(foodList) && foodList.length > 0) {
          setFoods(foodList);
        } else {
          setFoods(fallbackFoods);
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
      console.log(error)
      alert("Something went wrong....");
      setShowDiet(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 p-6 pb-40 text-white">
      {/* Intro */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold text-purple-400 mb-4"
        >
          Welcome to Your Nutrition Guide 🌿
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-purple-200 text-lg"
        >
          Discover the best high-protein foods to support your fitness and health goals.<br />
          Scroll down to explore nutritious options, and tell us your basic details so we can help craft a diet plan for you!
        </motion.p>
      </div>

      {/* Food Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-[#5c7a5c] border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {foods.map((food, index) => (
            <motion.div
              key={food.food + '-' + index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.6 }}
              className="bg-gray-900 border-2 border-purple-700 rounded-2xl shadow-lg p-4 hover:border-purple-400 hover:shadow-purple-400/30 transition text-white"
            >
              <Image
                src={food.photo}
                alt={food.food}
                width={300}
                height={180}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
              />
              <h2 className="text-xl font-bold text-purple-300 mt-3 mb-2">
                {food.food}
              </h2>
              <ul className="text-sm text-purple-200 space-y-1">
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
            </motion.div>
          ))}
        </div>
      )}

      {/* Diet Modal */}
      {showDiet && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="relative max-w-2xl w-full bg-gray-950 p-6 rounded-2xl shadow-2xl border-2 border-purple-700 text-white">
            <button
              className="absolute top-2 right-2 text-red-400 text-2xl font-bold hover:text-red-600 transition"
              onClick={() => setShowDiet(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-purple-300 mb-4 text-center">
              Your Personalized Diet Plan 🍽️
            </h2>

            {!diet ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-purple-400 border-dashed rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-purple-200 max-h-[70vh] overflow-y-auto">
                {diet}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sticky Form */}
      <div className="fixed bottom-0 left-0 w-full z-40 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 items-center justify-between max-w-4xl w-full mx-auto bg-gray-950/90 backdrop-blur-md border-t-2 border-purple-700 rounded-t-2xl shadow-2xl px-4 py-2"
        >
          <div className="flex gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto">
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="px-3 py-2 rounded-lg font-bold border-2 w-full sm:w-28 bg-gray-900 text-purple-200 placeholder-purple-400 border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition text-sm"
              required
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="px-3 py-2 rounded-lg font-bold border-2 w-full sm:w-28 bg-gray-900 text-purple-200 placeholder-purple-400 border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition text-sm"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="px-3 py-2 rounded-lg font-bold border-2 w-full sm:w-28 bg-gray-900 text-purple-200 placeholder-purple-400 border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition text-sm"
              required
            />
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="px-3 py-2 rounded-lg font-bold border-2 w-full sm:w-32 bg-gray-900 text-purple-200 border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition text-sm"
            >
              <option value="Weight loss">Weight Loss</option>
              <option value="Muscle gain">Muscle Gain</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="px-3 py-2 rounded-lg font-bold border-2 w-full sm:w-32 bg-gray-900 text-purple-200 border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition text-sm"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="flex gap-4 flex-col sm:flex-row w-full sm:w-auto">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition w-full sm:w-auto"
            >
              Get My Diet Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

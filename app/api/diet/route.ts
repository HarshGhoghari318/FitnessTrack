// app/api/diet/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { age, height, weight, goal } = await req.json();

    const prompt = `
Generate a 1-day personalized diet plan for:
- Age: ${age}
- Height: ${height} cm
- Weight: ${weight} kg
- Goal: ${goal}

Include breakfast, lunch, dinner with high-protein meals and calorie estimates.
`;

   
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash-002",
    });

    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text)

    return new Response(JSON.stringify({ text }), { status: 200 });
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // Custom error message
    return new Response(
      JSON.stringify({
        error: "Gemini API is currently unavailable or overloaded. Please try again later.",
        details: error?.message || "Unknown error",
      }),
      { status: 503 }
    );
  }
  }
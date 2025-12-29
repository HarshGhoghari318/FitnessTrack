// // app/api/diet/route.ts
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function POST(req: Request) {
//   try {
//     const { age, height, weight, goal } = await req.json();

//     const prompt = `
// Generate a 1-day personalized diet plan for:
// - Age: ${age}
// - Height: ${height} cm
// - Weight: ${weight} kg
// - Goal: ${goal}

// Include breakfast, lunch, and dinner with high-protein meals and calorie estimates.
// `;

//     const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash-latest", // ✅ CORRECT
//     });

//     const result = await model.generateContent(prompt);
//     const text = result.response.text();

//     return new Response(JSON.stringify({ text }), { status: 200 });
//   } catch (error) {
//     console.error("Gemini API Error:", error);

//     return new Response(
//       JSON.stringify({
//         error:
//           "Gemini API is currently unavailable or overloaded. Please try again later.",
//         details:
//           error instanceof Error ? error.message : "Unknown error",
//       }),
//       { status: 503 }
//     );
//   }
// }
import {GoogleGenAI} from '@google/genai';
import { NextResponse } from 'next/server';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export async function POST (req: Request)  {
  try {
    const { age, height, weight, goal } = await req.json();

    const prompt = `
Generate a 1-day personalized diet plan for:
- Age: ${age}
- Height: ${height} cm
- Weight: ${weight} kg
- Goal: ${goal}

Include breakfast, lunch, and dinner with high-protein meals and calorie estimates.
`;
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  // console.log(response.text);

  return new NextResponse(JSON.stringify({ response:response.text }), { status: 200 });

  }catch (error) {
    console.error("Gemini API Error:", error);

    return new Response(
      JSON.stringify({
        error:
          "Gemini API is currently unavailable or overloaded. Please try again later.",
        details:
          error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 503 }
    );
  }
}


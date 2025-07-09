import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prismaProvider"; // Adjust the import based on your setup

export async function POST(req: NextRequest) {
  try {
    const {
      food,
      calories,
      serving_size_g,
      fat_total_g,
      fat_saturated_g,
      protein_g,
      sodium_mg,
      potassium_mg,
      cholesterol_mg,
      carbohydrates_total_g,
      fiber_g,
      sugar_g,
      photo,
    } = await req.json();

    const newFood = await prisma.food.create({
      data: {
        food,
        calories,
        serving_size_g,
        fat_total_g,
        fat_saturated_g,
        protein_g,
        sodium_mg,
        potassium_mg,
        cholesterol_mg,
        carbohydrates_total_g,
        fiber_g,
        sugar_g,
        photo,
      },
    });

    return new Response(JSON.stringify(newFood), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating food:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create food item." }),
      { status: 500 }
    );
  }
}

export async function GET(req:NextRequest){
    const data=await prisma.food.findMany()
    return (NextResponse.json({data}))
}
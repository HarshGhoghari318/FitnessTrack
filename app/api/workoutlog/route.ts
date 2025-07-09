import { NextRequest } from "next/server";
import prisma from "@/prismaProvider";
export async function POST(req:NextRequest){
    const body = await req.json()
    await prisma.workoutPlan.createMany({
    data: body
    })
    
}
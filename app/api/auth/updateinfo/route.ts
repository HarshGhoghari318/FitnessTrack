// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/prismaProvider";

// import { getServerSession } from "next-auth";
// import { authOptions } from "../[...nextauth]/route";

// export async function POST(request: NextRequest) {
//   try {
//     const { height, weight, age, gender } = await request.json();
//     console.log(gender)

//     const session:any = await getServerSession(authOptions);
//     console.log(session);
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     // const x = await prisma.user.update({
//     //   where: {
//     //     email: session.user.email,
//     //   },
//     //   data: {
//     //     height: parseInt(height),
//     //     weight: parseInt(weight),
//     //     age: parseInt(age),
//     //     gender: gender,
//     //   },
//     // });
//     return NextResponse.json({ message: "User info updated", user: x});
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to Update!" }), {
//       status: 500,
//     });
//   }
// }

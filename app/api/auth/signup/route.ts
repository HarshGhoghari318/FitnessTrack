import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prismaProvider';
import bcrypt from 'bcrypt';


export async function POST(request: NextRequest) {

  const {email,password,name,gender,height,age}= await request.json()
    
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, name, and password are required' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        gender: gender || null,
        height:height || null,
        weight:height || null,
        age:age,
        provider: 'credentials'
      }
    });
    
    
    return NextResponse.json(
      { 
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name
        } 
      },
      
      {status: 201 }
    );
    

    

}
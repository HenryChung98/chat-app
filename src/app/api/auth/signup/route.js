import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; 
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  const { email, password, nickname } = body;


  if (!email || !password || !nickname) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
      },
    });

    return NextResponse.json({ message: "success", user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "User creation failed." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); 
  }
}

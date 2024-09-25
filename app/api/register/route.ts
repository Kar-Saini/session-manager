import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const { name, email, password } = body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return NextResponse.json({ message: "registered", name: user.name });
  } catch (error: any) {
    return NextResponse.json(
      {
        messge: "Not registered",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

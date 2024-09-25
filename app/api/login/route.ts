import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const { email, password } = body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const passwordValidation = await bcrypt.compare(hashedPassword, password);
    if (passwordValidation) {
      const userExist = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (userExist) {
        return NextResponse.json({
          message: "Logged In",
          name: userExist.name,
        });
      }
      throw new Error("Invalid Password");
    }
    throw new Error("Invalid credentials");
  } catch (error) {
    throw new Error("Invalid credential");
  }
}

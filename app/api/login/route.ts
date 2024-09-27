import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { createTokenGenerator } from "cybertoken";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const { email, password } = body;

  try {
    const userExist = await prisma.user.findUnique({ where: { email } });
    console.log(userExist);
    if (!userExist) {
      return NextResponse.json({ message: "Invalid credentials" });
    }
    if (userExist) {
      const passwordValidation = await bcrypt.compare(
        password,
        userExist.password
      );
      console.log(passwordValidation);
      if (passwordValidation) {
        console.log("inside passwordValidation");
        try {
          const newSession = await prisma.session.create({
            data: {
              userId: userExist.id,
              token: createTokenGenerator({
                prefixWithoutUnderscore: "session",
              }).generateToken(),
              expiresAt: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
            },
          });
          console.log("session created");
          console.log(newSession);
          return NextResponse.json({
            message: "Succesfully logged in",
            name: userExist.name,
            session: newSession.token,
          });
        } catch (error) {
          console.log(error);
        }
      }
      if (!passwordValidation) {
        return NextResponse.json({ message: "Invalid Password" });
      }
    }
  } catch (error) {
    throw new Error("Invalid credentials");
  }
}

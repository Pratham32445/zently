import client from "@/client";
import { signUpSchema } from "@/types/zod";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsedBody = signUpSchema.safeParse(body);
    if (!parsedBody.success)
      return NextResponse.json(
        { type: "show", errors: parsedBody.error },
        { status: 401 }
      );
    const isUser = await client.user.findFirst({
      where: { email: parsedBody.data.email },
    });
    if (isUser)
      return NextResponse.json(
        { type: "toast", message: "user already exist" },
        { status: 401 }
      );
    const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);
    await client.user.create({
      data: {
        email: parsedBody.data.email,
        userName: parsedBody.data.userName,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 501 }
    );
  }
};

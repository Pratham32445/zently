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
        {
          type: "show-error",
          errors: parsedBody.error.issues.reduce((acc, error) => {
            acc[error.path[0]] = error.message;
            return acc;
          }, {} as Record<string, string>),
        },
        { status: 401 }
      );
    const user = await client.user.findFirst({
      where: {
        email: parsedBody.data.email,
      },
    });
    if (user)
      return NextResponse.json(
        { type: "toast-error", message: "User Already exist" },
        { status: 401 }
      );
    const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);
    await client.user.create({
      data: {
        email: parsedBody.data.email,
        password: hashedPassword,
        userName: parsedBody.data.userName,
      },
    });
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { type: "toast-error", message: "Internal server error" },
      { status: 501 }
    );
  }
};

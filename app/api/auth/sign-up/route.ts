import client from "@/client";
import { signUpSchema } from "@/types/zod";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/sendEmail";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsedBody = signUpSchema.safeParse(body);
    if (!parsedBody.success)
      return NextResponse.json(
        { type: "show-error", errors: parsedBody.error },
        { status: 401 }
      );
    const isUserExist = await client.user.findFirst({
      where: { email: parsedBody.data.email },
    });
    if (isUserExist)
      return NextResponse.json(
        { type: "toast-error", message: "User Already Exist" },
        { status: 401 }
      );
    // create User
    const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);
    await client.user.create({
      data: {
        email: hashedPassword,
        password: parsedBody.data.password,
        userName: parsedBody.data.userName,
      },
    });
    sendEmail(parsedBody.data.email);
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { type: "toast-error", message: "Internal Server Error" },
      { status: 501 }
    );
  }
};

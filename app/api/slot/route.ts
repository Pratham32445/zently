import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export const POST = (req: NextRequest) => {
  try {
    const session = getServerSession(authOptions);
    console.log(session);
  } catch (error) {
    console.log(error);
  }
};

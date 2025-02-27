import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function GET(request: NextRequest) {
  try {
    const users = await prisma?.user.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

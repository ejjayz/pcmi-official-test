import { validateRequest } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await validateRequest();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Auth validation error:", error);
    return NextResponse.json(
      { user: null, session: null },
      { status: 500 }
    );
  }
}

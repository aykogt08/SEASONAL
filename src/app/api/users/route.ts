import { NextRequest, NextResponse } from "next/server";
import { getUsers, getOrCreateUser } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json({ users });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch users";
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, avatar } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const user = await getOrCreateUser(name.trim(), avatar || "🌸");
    return NextResponse.json({ user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process user";
    console.error("Error processing user:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

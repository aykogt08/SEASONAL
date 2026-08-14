import { NextRequest, NextResponse } from "next/server";
import { getUsers, getOrCreateUser, loginUserWithPassword, deleteUser } from "@/lib/storage";

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
    const { action, userId, name, avatar, password } = body;

    // Login with existing user ID & password
    if (action === "login" && userId) {
      const user = await loginUserWithPassword(userId, password);
      return NextResponse.json({ user });
    }

    // Create or login by name
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const user = await getOrCreateUser(name.trim(), avatar || "🌸", password);
    return NextResponse.json({ user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process user";
    if (message === "INCORRECT_PASSWORD") {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }
    console.error("Error processing user:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userIdQuery = searchParams.get("userId");
    const passwordQuery = searchParams.get("password");

    let userId = userIdQuery;
    let password = passwordQuery;

    // Also support JSON body
    if (!userId) {
      try {
        const body = await request.json();
        userId = body.userId;
        password = body.password;
      } catch {}
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await deleteUser(userId, password);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete user";
    if (message === "INCORRECT_PASSWORD") {
      return NextResponse.json(
        { error: "Incorrect password. Cannot delete profile." },
        { status: 401 }
      );
    }
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

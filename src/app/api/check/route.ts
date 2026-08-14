import { NextRequest, NextResponse } from "next/server";
import { toggleFoodCheck } from "@/lib/storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, foodItemId, isEaten } = body;

    if (typeof year !== "number" || !foodItemId || typeof isEaten !== "boolean") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const result = await toggleFoodCheck(year, foodItemId, isEaten);
    return NextResponse.json({ result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to toggle check";
    console.error("Error toggling check:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getFoodsForYear, createFoodItem } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get("year");
    const userId = searchParams.get("userId");
    const currentYear = new Date().getFullYear();
    const year = yearParam ? parseInt(yearParam, 10) : currentYear;

    const foods = await getFoodsForYear(year, userId);
    return NextResponse.json({ foods, year });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch foods";
    console.error("Error fetching foods:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nameEn, nameJa, category, season, iconUrl, userId } = body;

    if (!nameEn || !nameJa || !category || !season) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newItem = await createFoodItem(
      {
        nameEn: nameEn.toUpperCase(),
        nameJa,
        category,
        season,
        iconUrl: iconUrl || "",
      },
      userId || null
    );

    return NextResponse.json({ item: newItem });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create food";
    console.error("Error creating food:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

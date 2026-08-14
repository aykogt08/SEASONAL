import { NextRequest, NextResponse } from "next/server";
import { updateFoodItem, deleteFoodItem } from "@/lib/storage";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nameEn, nameJa, category, season, iconUrl } = body;

    const updated = await updateFoodItem(id, {
      ...(nameEn ? { nameEn: nameEn.toUpperCase() } : {}),
      ...(nameJa ? { nameJa } : {}),
      ...(category ? { category } : {}),
      ...(season ? { season } : {}),
      ...(iconUrl !== undefined ? { iconUrl } : {}),
    });

    return NextResponse.json({ item: updated });
  } catch (error: any) {
    console.error("Error updating food:", error);
    return NextResponse.json({ error: error.message || "Failed to update food" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteFoodItem(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting food:", error);
    return NextResponse.json({ error: error.message || "Failed to delete food" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/png";
    const base64 = `data:${mimeType};base64,${buffer.toString("base64")}`;

    return NextResponse.json({ url: base64 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process image";
    console.error("Upload error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

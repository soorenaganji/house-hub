import { NextResponse } from "next/server";
import { deleteImageFromSupabase } from "@/app/helper/functions";

export async function POST(request) {
  try {
    const { imageUrlOrKey } = await request.json();

    if (!imageUrlOrKey) {
      return NextResponse.json({ error: "Image identifier is required" }, { status: 400 });
    }

    await deleteImageFromSupabase(imageUrlOrKey);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete image", error);
    return NextResponse.json({ error: "Unable to delete image" }, { status: 500 });
  }
}

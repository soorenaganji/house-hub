import { NextResponse } from "next/server";
import { uploadImageToSupabase } from "@/app/helper/functions";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const url = await uploadImageToSupabase(file);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Failed to upload image", error);
    return NextResponse.json({ error: "Unable to upload image" }, { status: 500 });
  }
}

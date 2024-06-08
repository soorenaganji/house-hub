import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import connectDB from "@/app/utils/connectDB";
import { hashPassword } from "@/app/utils/auth";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password, name, lastName } = body;

    // Validate required fields
    if (!email || !password || !name || !lastName) {
      return NextResponse.json(
        { error: "Please provide valid data for email, password, name, and last name" },
        { status: 422 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "This user already exists" },
        { status: 422 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      lastName
    });

    console.log(newUser);
    return NextResponse.json({ message: "Account created successfully" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "There is a problem with the server" },
      { status: 500 }
    );
  }
}

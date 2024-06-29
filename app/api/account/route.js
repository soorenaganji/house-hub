import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        {
          error: "Please Login to your account first",
        },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User Not Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "User Found Successfully",
        name: user.name,
        email: user.email,
        lastName: user.lastName,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "There is a problem with the server" },
      { status: 500 }
    );
  }
}
export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const session = await getServerSession(req);
    const { name, lastName } = body;
   
    if (!session) {
      return NextResponse.json(
        {
          error: "Please Login to your account first",
        },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User Not Found",
        },
        { status: 404 }
      );
    }
    if ( !name || !lastName ) {
      return NextResponse.json(
        {
          error: "Please Enter Valid Data",
        },
        {
          status: 400,
        }
      );
    }
    user.name = name;
    user.lastName = lastName;
    await user.save();
    return NextResponse.json(
      {
        message: "Data Edited Successfully",
        name: user.name,
        email: user.email,
        lastName: user.lastName,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "There is a problem with the server" },
      { status: 500 }
    );
  }
}

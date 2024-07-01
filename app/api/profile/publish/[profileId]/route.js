import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";
import User from "@/models/User";

export async function PATCH(req, context) {
  try {
    await connectDB();

    const id = context.params.profileId;

    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        {
          error: "Please Log in first",
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
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Access Denied" },
        {
          status: 403,
        }
      );
    }

    const profile = await Profile.findOne({ _id: id });
    profile.published = true;
    profile.save();

    return NextResponse.json(
      { message: "Post Published Successfully " },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "These is A Problem With The Server" },
      { status: 500 }
    );
  }
}

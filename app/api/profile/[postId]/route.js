import connectDB from "@/app/utils/connectDB";
import { NextResponse } from "next/server";
import Profile from "@/app/models/Profile";

export async function GET(req, context) {
  try {
    await connectDB();

    const { params } = context;
    const { postId } = params;

    console.log("ID :" ,postId);

    const post = await Profile.findOne({ _id: postId });
    if (!post) {
      return NextResponse.json(
        {
          message: "Post Not Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: post,
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

import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import Profile from "@/models/Profile";
import User from "@/models/User";
import { deleteImageFromSupabase } from "@/app/helper/functions";

export async function DELETE(req, context) {
  try {
    await connectDB();

    const id = context.params.postId;
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

    const profile = await Profile.findOne({ _id: id });
    if (!user._id.equals(profile.userId) && user.role === "ADMIN") {
      const postImageUrls = await profile.ImageUrls;
      if (postImageUrls) {
        await postImageUrls?.map((url) => deleteImageFromSupabase(url));
      }
      await Profile.deleteOne({ _id: id });

      return NextResponse.json(
        { message: "Post Deleted Successfully" },
        { status: 200 }
      );
    }
    if (!user._id.equals(profile.userId)) {
      return NextResponse.json(
        {
          error: "You Cannot Delete This Post",
        },
        { status: 403 }
      );
    }
    const postImageUrls = await profile.ImageUrls;
    if (postImageUrls) {
      await postImageUrls?.map((url) => deleteImageFromSupabase(url));
    }
    await Profile.deleteOne({ _id: id });

    return NextResponse.json(
      { message: "Post Deleted Successfully" },
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

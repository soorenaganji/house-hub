import connectDB from "@/app/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/app/models/User";
import Profile from "@/app/models/Profile";
import { Types } from "mongoose";
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    console.log(body);
    const {
      title,
      description,
      city,
      street,
      zipcode,
      size ,
      bedroomsCount ,
      bathroomsCount ,
      phoneNumber,
      email,
      rentalOrSell,
      deposit,
      mortgage,
      price,
      facilities,
      rules,
    } = body;

    const session = await getServerSession(req);

    if (!session) {
      return NextResponse.json(
        {
          error: "Please Login To Your Profile",
        },
        {
          status: 401,
        }
      );
    }
    const userEmail = await session.user.email;
    const user = await User.findOne({ email: userEmail });
    console.log(user);
    if (!user) {
      return NextResponse.json(
        {
          error: "User Not Found ",
        },
        {
          status: 404,
        }
      );
    }
    if (
      !title ||
      !description ||
      !city ||
      !street ||
      !zipcode ||
      !phoneNumber ||
      !email ||
      !rentalOrSell ||
      !bedroomsCount ||
      !bathroomsCount ||
      !size
    ) {
      return NextResponse.json(
        {
          error: "Please Enter Valid Data",
        },
        {
          status: 400,
        }
      );
    } else if (rentalOrSell === "rental" && (!deposit || !mortgage)) {
      return NextResponse.json(
        {
          error: "Please Enter Valid Data",
        },
        {
          status: 400,
        }
      );
    } else if (rentalOrSell === "sell" && !price) {
      return NextResponse.json(
        {
          error: "Please Enter Valid Data",
        },
        {
          status: 400,
        }
      );
    }
    const newProfile = await Profile.create({
      title,
      description,
      city,
      street,
      zipcode,
      size : +size ,
      bedroomsCount : +bedroomsCount ,
      bathroomsCount : +bathroomsCount ,
      phoneNumber: +phoneNumber,
      email,
      rentalOrSell,
      deposit: +deposit,
      mortgage: +mortgage,
      price: +price,
      facilities,
      rules,
      userId: new Types.ObjectId(user._id),
    });
    console.log(newProfile);
    return NextResponse.json(
      { message: "Post Created Successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "There is a problem with the server",
      },
      {
        status: 500,
      }
    );
  }
}

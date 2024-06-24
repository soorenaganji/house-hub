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
    const {
      title,
      description,
      city,
      street,
      zipcode,
      size,
      bedroomsCount,
      bathroomsCount,
      phoneNumber,
      email,
      rentalOrSell,
      deposit,
      mortgage,
      price,
      facilities,
      rules,
      imageUrls,
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
      size: +size,
      bedroomsCount: +bedroomsCount,
      bathroomsCount: +bathroomsCount,
      phoneNumber: +phoneNumber,
      email,
      rentalOrSell,
      deposit: +deposit,
      mortgage: +mortgage,
      price: +price,
      facilities,
      rules,
      userId: new Types.ObjectId(user._id),
      imageUrls,
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
export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      _id,
      title,
      description,
      city,
      street,
      zipcode,
      size,
      bedroomsCount,
      bathroomsCount,
      phoneNumber,
      email,
      rentalOrSell,
      deposit,
      mortgage,
      price,
      facilities,
      rules,
      imageUrls,
    } = body;
    console.log(_id);
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
      !_id ||
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
      console.log("price");

      return NextResponse.json(
        {
          error: "Please Enter Valid Data",
        },
        {
          status: 400,
        }
      );
    }
    const profile = await Profile.findById(_id);
    profile.title = title;
    profile.description = description;
    profile.city = city;
    profile.street = street;
    profile.zipcode = zipcode;
    profile.phoneNumber = +phoneNumber;
    profile.email = email;
    profile.rentalOrSell = rentalOrSell;
    profile.bedroomsCount = +bedroomsCount;
    profile.bathroomsCount = +bathroomsCount;
    profile.deposit = +deposit;
    profile.mortgage = +mortgage;
    profile.price = +price;
    profile.imageUrls = imageUrls;
    profile.facilities = facilities;
    profile.rules = rules;
    profile.size = +
    await profile.save();
    return NextResponse.json(
      {
        message: "post edited successfully",
      },
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

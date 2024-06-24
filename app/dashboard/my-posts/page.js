import Posts from "@/app/components/templates/Posts";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/app/models/User";
import connectDB from "@/app/utils/connectDB";
import { getServerSession } from "next-auth";
const MyPosts = async () => {
    await connectDB();
    const session = await getServerSession(authOptions);
    const user = await User.aggregate([
      { $match: { email: session.user.email } },
      {
        $lookup: {
          from: "profiles",
          foreignField: "userId",
          localField: "_id",
          as: "posts",
        },
      },
    ]);
    console.log(user)
    return (
        <>
         <Posts posts={user[0].posts} />   
        </>
    );
}

export default MyPosts;
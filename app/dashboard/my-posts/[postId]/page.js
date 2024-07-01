import PostView from "@/app/components/templates/PostView";
import connectDB from "@/app/utils/connectDB";
import User from "@/app/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const page = async ({ params }) => {
  const id = params.postId;
  console.log(id);
  console.log(id);
  async function fetchData(id) {
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

    const post = await user[0].posts.find((p) => p._id.valueOf() === id);
    console.log(post);
    let postsData = {};
    let images = [];
    if (post) {
      postsData = {
        title: post.title,
        description: post.description,
        city: post.city,
        street: post.street,
        zipcode: post.zipcode,
        size: post.size,
        bedroomsCount: post.bedroomsCount,
        bathroomsCount: post.bathroomsCount,
        phoneNumber: post.phoneNumber,
        email: post.email,
        rentalOrSell: post.rentalOrSell,
        deposit: post.deposit,
        mortgage: post.mortgage,
        price: post.price,
        facilities: post.facilities,
        rules: post.rules,
      };
      images = post.imageUrls?.map((url) => ({ url }));
    }

    return { postsData, images };
  }
  const { postsData, images } = await fetchData(id);
  return (
    <div>
      <PostView data={postsData}  />
    </div>
  );
};

export default page;

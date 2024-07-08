import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/app/models/User";
import connectDB from "@/app/utils/connectDB";
import EditPost from "@/app/components/templates/EditPost";
import Profile from "@/app/models/Profile";
const PostEditPage = async ({ params }) => {
  const { editId } = params; // Extract the postId from the params
  console.log(editId);
  async function fetchData(editId) {
    await connectDB();
    const session = await getServerSession(authOptions);
    const userModel = await User.findOne({ email: userEmail });
    if (userModel.role === "USER") {
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
      const post = await user[0].posts.find((p) => p._id.valueOf() === editId);
    }else {
      const post = await Profile.findOne({_id : editId});
    }

    console.log(post);
    let formData = {};
    let images = [];
    if (post) {
      formData = {
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

    return { formData, images };
  }
  const { formData, images } = await fetchData(editId);
  console.log(formData);
  return (
    <>
      {" "}
      <EditPost data={formData} imageUrls={images} id={editId} />
    </>
  );
};

export default PostEditPage;

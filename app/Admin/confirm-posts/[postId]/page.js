import { getServerSession } from "next-auth";
import connectDB from "@/app/utils/connectDB";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";
import User from "@/app/models/User";
import Profile from "@/app/models/Profile";
import PostView from "@/app/components/templates/PostView";
const AdminPostView = async ({ params }) => {
  const id = params.postId;
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const user = await User.findOne({ email: session.user.email });
  if (user.role !== "ADMIN") redirect("/dashboard");
  const post = await Profile.findById(id);
  console.log(post);
  return (
    <>
      <PostView data={post}  />
    </>
  );
};

export default AdminPostView;

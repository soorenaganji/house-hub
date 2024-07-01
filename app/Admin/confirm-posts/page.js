import ConfirmPost from "@/app/components/templates/ConfirmPost";
import { getServerSession } from "next-auth";
import connectDB from "@/app/utils/connectDB";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";
import User from "@/app/models/User";
import Profile from "@/app/models/Profile";
const Confirm = async () => {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const user = await User.findOne({ email: session.user.email });
  if (user.role !== "ADMIN") redirect("/dashboard");
  const posts = await Profile.find({ published: false });
  return (
    <div>
      <ConfirmPost posts={posts} />
    </div>
  );
};

export default Confirm;

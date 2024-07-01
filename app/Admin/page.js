import { getServerSession } from "next-auth";
import AdminPanel from "../components/templates/AdminPanel";
import connectDB from "../utils/connectDB";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";
import User from "../models/User";

const Admin = async () => {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const user = await User.findOne({ email: session.user?.email });
  if (user.role !== "ADMIN" ) redirect("/dashboard")
  return (
    <div>
      <AdminPanel />
    </div>
  );
};

export default Admin;

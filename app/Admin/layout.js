import DashBoardSidebar from "../components/layout/DashboardSidebar";
import { getServerSession } from "next-auth";
import connectDB from "../utils/connectDB";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";
import User from "../models/User";
const AdminLayout = async ({ children }) => {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const user = await User.findOne({ email: session.user.email });
  return (
    <>
      <DashBoardSidebar role={user.role}>{children}</DashBoardSidebar>
    </>
  );
};

export default AdminLayout;

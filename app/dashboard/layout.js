import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route"
import DashboardSidebar from "../components/layout/DashboardSidebar";
import { redirect} from "next/navigation";
import connectDB from "../utils/connectDB";
import User from "../models/User";

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signup")
await connectDB()
const user = await User.findOne({email : session.user.email})
if (!user) return <h3>There is a problem</h3>
  return (
    <>
      <DashboardSidebar role={user.role} >{children}</DashboardSidebar>
    </>
  );
};

export default Layout;

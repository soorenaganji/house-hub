import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route"
import DashboardSidebar from "../components/layout/DashboardSidebar";
import { redirect} from "next/navigation";

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signup")

  return (
    <>
      <DashboardSidebar>{children}</DashboardSidebar>
    </>
  );
};

export default Layout;

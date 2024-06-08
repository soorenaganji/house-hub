import Login from "../../components/templates/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/api/auth/[...nextauth]/route";
const login = async () => {
  const session = await getServerSession(authOptions);
  if (session) {redirect("/");} 
    return (
        <div>
          <Login />
        </div>
    );
}

export default login;
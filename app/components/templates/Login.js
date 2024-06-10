"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const Login = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    toast.promise(
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          router.push("/");
          toast.success("You Logged In successfully");
        } else {
          toast.error(res.error);
        }
      }),
      {
        loading: "Logging in...",
        success: <b>You Logged In successfully!</b>,
        error: <b>Failed to log in.</b>,
      }
    );
  };

  return (
    <main className="w-full h-screen flex items-center justify-center ">
      <div className="flex items-start justify-center flex-col mx-auto gap-8 ">
        <h2 className="text-center lg:text-5xl text-2xl font-bold w-full ">
          Log Into Your Account
        </h2>
        <p>
          Don&apos;t have an Account?{" "}
          <Link href={"/signup"} className="underline text-primary">
            Sign Up
          </Link>{" "}
        </p>
        <div className="mx-auto">
          <input
            onChange={changeHandler}
            name="email"
            type="email"
            placeholder="Email"
            className={`lg:w-96 w-72 h-14 lg:text-lg placeholder:text-slate-500 focus:border-primary focus:shadow-md p-4 rounded-md border outline-none `}
          />
        </div>
        <div className="mx-auto">
          <input
            onChange={changeHandler}
            name="password"
            type="password"
            placeholder="Password"
            className={`lg:w-96 w-72 h-14 lg:text-lg placeholder:text-slate-500 focus:border-primary focus:shadow-md p-4 rounded-md border outline-none `}
          />
          <br />
        </div>
        <button
          className={`lg:w-96 w-72 mx-auto h-14 lg:text-lg p-2 bg-primary text-white rounded-lg hover:shadow-xl transition-all duration-400 hover:shadow-primary/60`}
          onClick={submitHandler}
        >
          Log In
        </button>
      </div>
    </main>
  );
};

export default Login;

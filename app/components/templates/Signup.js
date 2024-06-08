"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { validate } from "app/helper/validate";
import { createUser } from "app/apiCalls/auth";

const Signup = () => {
  const router = useRouter();
  const { status } = useSession();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [userData, setUserData] = useState({
    Email: "",
    Password: "",
    Password2: "",
    name: "",
    lastName: "",
  });

  const finalUserData = {
    email: userData.Email,
    password: userData.Password,
    name: userData.name,
    lastName: userData.lastName,
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  useEffect(() => {
    setErrors(validate(userData, false));
  }, [userData]);

  const changeHandler = useCallback((event) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const touchHandler = useCallback((event) => {
    setTouched((prev) => ({
      ...prev,
      [event.target.name]: true,
    }));
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length) {
      setTouched({
        name: true,
        lastName: true,
        Email: true,
        Password: true,
        Password2: true,
      });
      toast.error("Please fix the errors before submitting");
    } else {
      try {

        const res = await createUser(finalUserData);
        let toastId = toast.loading("Signing you up...");
        console.log(res);
        toast.dismiss(toastId);
        toast.success("You Signed Up Successfully");

        // Automatically log in the user
        
        const { data } =  res.config;
        const loginData = JSON.parse(data)
        console.log(loginData)
        signIn("credentials", { ...loginData , redirect: false });
        router.push("/");
      } catch (err) {

        console.error(err);
        toast.dismiss(err?.message);
        toast.error(err.response?.data?.message || "Sign up failed");
      }
    }
  };

  return (
    <main className="w-full mt-24 transition-all duration-400 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h2 className="text-3xl lg:text-5xl font-bold text-center">
          Create New Account
        </h2>
        <p className="text-start">
          Already Have An Account?{" "}
          <Link href="/login" className="underline text-[#5142FF]">
            Log In
          </Link>
        </p>
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            <input
              onChange={changeHandler}
              onFocus={touchHandler}
              name="name"
              type="text"
              placeholder="Name"
              className={`lg:w-44 w-36 h-14 lg:text-lg placeholder:text-slate-500 focus:border-[#675aff] focus:shadow-md p-2 rounded-md border outline-none ${
                errors.name && touched.name
                  ? "border-red-400"
                  : "border-slate-300"
              }`}
            />
            <input
              onChange={changeHandler}
              onFocus={touchHandler}
              name="lastName"
              type="text"
              placeholder="Last Name"
              className={`lg:w-44 w-36 h-14 lg:text-lg placeholder:text-slate-500 focus:border-[#675aff] focus:shadow-md p-2 rounded-md border outline-none ${
                errors.lastName && touched.lastName
                  ? "border-red-400"
                  : "border-slate-300"
              }`}
            />
          </div>
          <div className="w-full flex justify-between text-sm text-red-500">
            <p>{touched.name && errors.name}</p>
            <p>{touched.lastName && errors.lastName}</p>
          </div>
          <input
            onChange={changeHandler}
            onFocus={touchHandler}
            name="Email"
            type="email"
            placeholder="Email"
            className={`w-80 lg:w-96 h-14 text-lg placeholder:text-slate-500 focus:border-[#675aff] focus:shadow-md p-4 rounded-md border outline-none ${
              errors.Email && touched.Email
                ? "border-red-400"
                : "border-slate-300"
            }`}
          />
          <p className="text-sm mt-3 text-red-500">
            {touched.Email && errors.Email}
          </p>
          <input
            onChange={changeHandler}
            onFocus={touchHandler}
            name="Password"
            type="password"
            placeholder="Password"
            className={`w-80 lg:w-96 h-14 text-lg placeholder:text-slate-500 focus:border-[#675aff] focus:shadow-md p-4 rounded-md border outline-none ${
              errors.Password && touched.Password
                ? "border-red-400"
                : "border-slate-300"
            }`}
          />
          <p className="text-sm mt-3 text-red-500">
            {touched.Password && errors.Password}
          </p>
          <input
            onChange={changeHandler}
            onFocus={touchHandler}
            name="Password2"
            type="password"
            placeholder="Confirm Password"
            className={`w-80 lg:w-96 h-14 text-lg placeholder:text-slate-500 focus:border-[#675aff] focus:shadow-md p-4 rounded-md border outline-none ${
              errors.Password2 && touched.Password2
                ? "border-red-400"
                : "border-slate-300"
            }`}
          />
          <p className="text-sm mt-3 text-red-500">
            {touched.Password2 && errors.Password2}
          </p>
          <button
            type="submit"
            className={`w-80 lg:w-96 h-14 text-lg p-2 rounded-lg text-white transition-all duration-400 ${
              Object.keys(errors).length
                ? "bg-[#7265ff9a]"
                : "bg-[#675aff] hover:shadow-lg hover:shadow-[#685aff96]"
            }`}
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signup;

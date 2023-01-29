import gg from "../../assets/google.svg";
import fb from "../../assets/facebook.svg";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import axiosPublicClient from "../../utils/services/axiosPublicClient";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    axiosPublicClient
      .post("/auth/login", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        window.location.href = "/home/dashboard";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen content-center">
        <div className="w-96 m-auto rounded-lg bg-slate-100 space-y-4 p-16">
          <div id="social-btns" className="space-y-4 ">
            <button className="flex space-x-4 rounded m-auto border border-b-gray-300 w-64 py-2 px-4">
              <img src={gg} alt="Google logo" className="w-8 h-8" />
              <p>Sign in with Google</p>{" "}
            </button>
            <button className="flex space-x-4 rounded m-auto border border-b-gray-300 w-64 py-2 px-4">
              <img src={fb} alt="Facebook logo" className="w-8 h-8" />
              <span>Sign in with Facebook</span>{" "}
            </button>
          </div>
          <div className="divider flex text-center justify-center relative before:content-[''] before:w-full before:border-b before:border-b-gray-400 before:absolute before:left-0 before:top-3 before:z-0">
            <p className="relative w-fit bg-slate-100 z-10 text-center justify-center px-4">
              or
            </p>
          </div>
          <form
            action="post"
            className="flex flex-col m-auto space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="focus:outline-none bg-transparent border-b border-b-gray-200"
              {...register("username", { required: true })}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="focus:outline-none bg-transparent border-b border-b-gray-200"
              {...register("password", { required: true })}
            />
            {errors.password && <span>Username and password is required</span>}
            <button
              type="submit"
              className="bg-zinc-800 hover:bg-zinc-900 rounded-lg py-2 px-4 text-white text-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

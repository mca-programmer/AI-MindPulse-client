import React, { useContext, useState } from "react";
import { AunthContext } from "../Auth/AuthProvider";
import { NavLink, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loader from "../Component/Loader";

const Login = () => {
  const { setUser, handleGoogleSignIn, handleSignIn } =
    useContext(AunthContext);
  const location = useLocation();
  console.log(location, handleSignIn);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setloading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    handleSignIn(email, password)
      .then((res) => {
        if (res.user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successfull",
            showConfirmButton: false,
            timer: 1500,
          });
          setUser(res.user);
          setloading(false);
          console.log(location.state);
          if (location.state) {
            navigate(`${location.state}`);
            return <Loader></Loader>;
          } else {
            navigate("/");
            return <Loader></Loader>;
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Login Fail.Recheck Your Info",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      })
      .catch((error) => {
        console.error(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  }

  function googleSignIN() {
    handleGoogleSignIn()
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        setUser(res.user);
        if (location.state) {
          navigate(`${location.state}`);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login Fail.Recheck Your Info",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  }
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      {/* Card container (replicates gradient, radius, border, shadow) */}
      <div
        className="
        max-w-md w-full
        rounded-[40px] p-6
        border-[5px] border-white
        shadow-[0_30px_30px_-20px_rgba(133,189,215,0.88)]
        bg-white
        bg-gradient-to-b from-white to-[#F4F7FB]
      "
      >
        {/* Heading */}
        <div className="text-center font-black text-3xl text-sky-600">
          Login to
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 ">
            AI MindPulse
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5">
          {/* Email */}
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            className="
              input input-bordered w-full
              bg-white
              rounded-2xl
              mt-4
              shadow-[0_10px_10px_-5px_#cff0ff]
              focus:outline-none focus:ring-2 focus:ring-cyan-500/70 focus:border-cyan-500
            "
          />

          {/* Password */}
          <input
            required
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="
              input input-bordered w-full
              bg-white
              rounded-2xl
              mt-4
              shadow-[0_10px_10px_-5px_#cff0ff]
              focus:outline-none focus:ring-2 focus:ring-cyan-500/70 focus:border-cyan-500
            "
          />

          {/* Forgot password */}
          <span className="block mt-2 ml-2">
            <a className="text-[11px] text-sky-500 hover:underline" href="#">
              Forgot Password ?
            </a>
          </span>

          {/* Sign In button */}
          <button
            type="submit"
            className="
              btn w-full mt-5
              rounded-2xl font-bold text-white
              border-0
              bg-[linear-gradient(45deg,rgb(16,137,211)_0%,rgb(18,177,209)_100%)]
              shadow-[0_20px_10px_-15px_rgba(133,189,215,0.88)]
              transition-transform duration-200 ease-in-out
              hover:scale-[1.03] hover:shadow-[0_23px_10px_-20px_rgba(133,189,215,0.88)]
              active:scale-95 active:shadow-[0_15px_10px_-10px_rgba(133,189,215,0.88)]
            "
          >
            Sign In
          </button>
        </form>

        {/* Social sign-in */}
        <div className="mt-6">
          <span className="block text-center text-[10px] text-neutral-400">
            Or Sign in with
          </span>

          <div className="mt-2 w-full flex justify-center gap-4">
            {/* Google */}
            <button
              onClick={googleSignIN}
              type="button"
              aria-label="Sign in with Google"
              className="
                grid place-content-center
                w-10 aspect-square rounded-full
                border-[5px] border-white
                shadow-[0_12px_10px_-8px_rgba(133,189,215,0.88)]
                transition-transform duration-200 ease-in-out
                hover:scale-110 active:scale-90
                bg-[linear-gradient(45deg,#000_0%,#707070_100%)]
              "
            >
              <svg
                className="w-4 h-4 text-white fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Agreement link */}
        <span className="block text-center mt-4">
          <NavLink
            to="/register"
            className="text-sky-500 text-[9px] hover:underline"
          >
            New?Sign up
          </NavLink>
        </span>
      </div>
    </div>
  );
};

export default Login;

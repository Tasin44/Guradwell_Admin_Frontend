import { Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/logo/logo.svg";
import adminApi from "../../lib/admin-api";
import { setCookie } from "../../lib/cookie-utils";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "admin@guardwell.com",
      password: "AdminSecretPassword123!",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const responseData = await adminApi.login(data.email, data.password);

      if (responseData?.access_token) {
        setCookie("access_token", responseData.access_token, { maxAge: 30 * 24 * 60 * 60 });
      }
      if (responseData?.refresh_token) {
        setCookie("refresh_token", responseData.refresh_token, { maxAge: 30 * 24 * 60 * 60 });
      }
      if (responseData?.user?.role) {
        setCookie("role", responseData.user.role, { maxAge: 30 * 24 * 60 * 60 });
      }
      setCookie("isAuthenticated", "true", { maxAge: 30 * 24 * 60 * 60 });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Signed in successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (err) {
      console.error("Sign-in error:", err);
      Swal.fire({
        icon: "error",
        title: "Sign-in Failed",
        text: err.response?.data?.message || "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#DAECFF] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-md p-10">
        <div className="flex items-center justify-center mb-3">
          <img
            src={logo}
            alt="Guardwell"
            className="w-1/3 select-none pointer-events-none"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-2">
          Welcome Back!
        </h2>
        <p className="text-xs text-gray-500 text-center mb-6">
          Enter your email and password to access the admin portal.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <input
                type="text"
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder="Enter your email"
                className="w-full border border-base-300 rounded-full p-2 outline-none"
              />
              <User
                size={20}
                className="absolute inset-y-3 right-3 flex items-center text-gray-300"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="Enter your Password"
                className="w-full border border-base-300 rounded-full p-2 outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-300 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <div className="flex justify-between items-center mt-2 text-xs">
              <div className="flex items-center opacity-55">
                <input type="checkbox" id="remember" className="mr-1" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <Link
                to="/forgot-password"
                className="hover:underline text-blue-800"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#002457] text-white py-2 rounded-full font-medium hover:shadow-lg transition-shadow cursor-pointer disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

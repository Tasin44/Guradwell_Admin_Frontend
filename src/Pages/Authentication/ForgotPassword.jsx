import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import { User } from "lucide-react";
import adminApi from "../../lib/admin-api";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await adminApi.forgotPassword(data.email);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "6-digit OTP code sent to your email",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/otp-verification", { state: { email: data.email } });
    } catch (err) {
      console.error("Forgot password error:", err);
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: err.response?.data?.message || "Failed to send reset code. Please verify email.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen place-content-center bg-[#DAECFF] p-5">
      <div className="flex items-center justify-center ">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-md p-10">
          <div className="flex items-center justify-center mb-3">
            <img
              src={logo}
              alt="Guardwell"
              className="w-1/3 select-none pointer-events-none"
            />
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-5">
            To reset password enter your email
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#002457] text-white py-2 rounded-full font-medium hover:shadow-lg transition-shadow cursor-pointer disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send Verification Code"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

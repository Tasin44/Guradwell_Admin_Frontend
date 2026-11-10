import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/logo/logo.svg";
import adminApi from "../../lib/admin-api";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const resetToken = location.state?.resetToken;

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    if (!resetToken) {
      Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Please request a new password reset code.",
      });
      navigate("/forgot-password");
      return;
    }

    setLoading(true);
    try {
      await adminApi.resetPassword(resetToken, data.newPassword);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Password changed successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/signin");
    } catch (err) {
      console.error("Reset password error:", err);
      Swal.fire({
        icon: "error",
        title: "Reset Failed",
        text: err.response?.data?.message || "Failed to reset password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen place-content-center bg-[#DAECFF] p-5">
      <div className="flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-md p-10">
          <div className="flex items-center justify-center mb-3">
            <img
              src={logo}
              alt="Guardwell"
              className="w-1/3 select-none pointer-events-none"
            />
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-5">
            Your password must be at least 6 characters
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("newPassword", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter new password"
                  className="w-full border border-base-300 rounded-full p-2 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  placeholder="Confirm new password"
                  className="w-full border border-base-300 rounded-full p-2 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-300 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#002457] text-white py-2 rounded-full font-medium hover:shadow-lg transition-shadow cursor-pointer disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaLeftLong } from "react-icons/fa6";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/logo/logo.svg";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    Swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "Password change successfully",
              showConfirmButton: false,
              timer: 2000,
            });
    navigate("/signin");
    // if (data.password !== data.confirmPassword) {
    //   setApiError("Passwords do not match.");
    //   return;
    // }
    // setApiError(null);
    // try {
    //   await apiClient.post("/auth/reset-password", {
    //     user_id: user_id,
    //     secret_key: secret_key,
    //     new_password: data.password,
    //     confirm_password: data.confirmPassword,
    //   });
    //   // On success, navigate to login page
    //    Swal.fire({
    //     toast: true,
    //     position: "top-end",
    //     icon: "success",
    //     title: "Password Change successful.",
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   navigate("/signin");
    // } catch (error) {
    //   console.error("Reset Password Error:", error);
    //   const errorMessage =
    //     error.response?.data?.message ||
    //     "Password reset failed. Please try again.";
    //   setApiError(errorMessage);
    // }
  };

  return (
    <div className="min-h-screen place-content-center bg-[#DAECFF] p-5">
      {/* Right Side */}
      <div className="flex items-center justify-center p-8">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-md p-10">
          <div className="flex items-center justify-center mb-3">
                    <img
                      src={logo}
                      alt=""
                      className="w-1/3 select-none pointer-events-none"
                    />
                  </div>
          <h2 className="text-2xl font-bold text-center mb-2">
            Reset Password
          </h2>
          <p className="text-center text-sm mb-6">
            Enter your new password below.
          </p>

          {/* Display API error if any */}
        
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <input
                {...register("password", { required: true, minLength: 6 })}
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full border border-base-300 rounded-full p-2 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required and must be at least 6 characters.
                </p>
              )}
            </div>
            <div className="relative">
              <input
                {...register("confirmPassword", { required: true })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full border border-base-300 rounded-full p-2 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Confirm Password is required.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#002457] text-white py-2 rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              Reset Password
            </button>
          </form>
          {/* Back Button */}
          <div className="flex items-center justify-center text-[#002457] mt-4 hover:underline">
            <button onClick={() => navigate(-1)} className="flex items-center">
              <FaLeftLong className="mr-2" />
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
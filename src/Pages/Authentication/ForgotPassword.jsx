import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import { User } from "lucide-react";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const [apiError, setApiError] = useState(null);
  // const [successMessage, setSuccessMessage] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    navigate("/otp-verification");
    // setApiError(null);
    // setSuccessMessage(null);
    // setIsLoading(true);
    // try {
    //   const response = await apiClient.post("/auth/forgot-password", {
    //     email_address: data.email,
    //   });
    //   console.log(response.data.user_id);

    //   // Assuming successful response
    //   setSuccessMessage("A password reset link has been sent to your email.");
    //   navigate("/otp-verification", { state: { user_id: response.data.user_id, email: data.email } });
    // } catch (error) {
    //   console.error("Forgot Password Error:", error);
    //   const errorMessage =
    //     error.response?.data?.message ||
    //     "Failed to send reset link. Please try again.";
    //   setApiError(errorMessage);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="min-h-screen place-content-center bg-[#DAECFF] p-5">
      {/* Right Side */}
      <div className="flex items-center justify-center ">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-md p-10">
          <div className="flex items-center justify-center mb-3">
                    <img
                      src={logo}
                      alt=""
                      className="w-1/3 select-none pointer-events-none"
                    />
                  </div>
          <h2 className="text-2xl font-bold text-center mb-2">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-5">
            To reset password enter your email
          </p>

          {/* Display success message if any */}
          {/* {successMessage && (
            <p className="text-green-500 text-sm text-center mb-4">{successMessage}</p>
          )} */}

          {/* Display API error if any */}
          {/* {apiError && (
            <p className="text-red-500 text-sm text-center mb-4">{apiError}</p>
          )} */}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            <button
              type="submit"
              // disabled={isLoading}
              className="w-full bg-[#002457] text-white py-2 rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              Send OTP
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            <a href="/signin" className="text-[#002457] hover:underline">
              Back to Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

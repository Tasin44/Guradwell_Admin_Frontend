import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import adminApi from "../../lib/admin-api";
import Swal from "sweetalert2";

const OtpVerification = () => {
  const {
    register,
    handleSubmit,
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "admin@guardwell.com";

  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const onSubmit = async (data) => {
    const otpCode = [
      data.otp0,
      data.otp1,
      data.otp2,
      data.otp3,
      data.otp4,
      data.otp5,
    ].join("");

    if (otpCode.length !== 6) {
      Swal.fire({ icon: "warning", title: "Incomplete Code", text: "Please enter all 6 digits" });
      return;
    }

    setLoading(true);
    try {
      const res = await adminApi.verifyForgotOtp(email, otpCode);
      const resetToken = res?.reset_token || res?.token;

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Code verified",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/reset-password", { state: { resetToken, email } });
    } catch (err) {
      console.error("OTP Verification Error:", err);
      Swal.fire({
        icon: "error",
        title: "Invalid Code",
        text: err.response?.data?.message || "Invalid or expired OTP code",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const handleResendOtp = async () => {
    try {
      await adminApi.forgotPassword(email);
      setTimer(60);
      setResendEnabled(false);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "New verification code sent",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error("Resend error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to resend OTP",
      });
    }
  };

  const handleInputChange = (formOnChange) => (e, index) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;
    formOnChange(e);
    if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="min-h-screen place-content-center bg-[#DAECFF] p-4 sm:p-5">
      <div className="flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-md p-6 sm:p-10">
          <div className="flex items-center justify-center mb-3">
            <img
              src={logo}
              alt="Guardwell"
              className="w-1/3 select-none pointer-events-none"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-center">
            Check your email
          </h2>
          <p className="text-center text-sm my-2 text-gray-500">
            We have sent a 6-digit verification code to your email.
          </p>
          <p className="text-center text-sm mb-6 font-medium text-gray-800">{email}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 6 OTP Inputs */}
            <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const {
                  onChange: formOnChange,
                  ref: formRef,
                  ...rest
                } = register(`otp${index}`, {
                  required: true,
                  maxLength: 1,
                });

                return (
                  <input
                    key={index}
                    {...rest}
                    ref={(el) => {
                      formRef(el);
                      inputRefs[index].current = el;
                    }}
                    type="text"
                    maxLength={1}
                    onChange={handleInputChange(formOnChange)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 text-center rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#002457]"
                  />
                );
              })}
            </div>

            <div className="text-center text-sm text-gray-500">
              {resendEnabled ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-800 font-semibold hover:underline cursor-pointer"
                >
                  Resend Code
                </button>
              ) : (
                <span>Resend code in {timer}s</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#002457] text-white py-2 rounded-full font-medium hover:shadow-lg transition-shadow cursor-pointer disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;

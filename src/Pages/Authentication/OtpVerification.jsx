import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { FaLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";

const OtpVerification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const navigate = useNavigate();
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const onSubmit = async (data) => {
    console.log(data);
    navigate("/reset-password");
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
    // Resend OTP logic here
  };

  const handleInputChange = (formOnChange) => (e, index) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;
    formOnChange(e);
    if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="min-h-screen place-content-center bg-[#DAECFF] p-4 sm:p-5">
      <div className="flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-md p-6 sm:p-10">
          <div className="flex items-center justify-center mb-3">
            <img
              src={logo}
              alt=""
              className="w-1/3 select-none pointer-events-none"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-center">
            Check your email
          </h2>
          <p className="text-center text-sm my-2 text-gray-500">
            We have sent a 6-digit verification code to your email.
          </p>
          <p className="text-center text-sm mb-6">example@gmail.com</p>

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
                    inputMode="numeric"
                    maxLength="1"
                    onChange={(e) => handleInputChange(formOnChange)(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-11 h-11 sm:w-14 sm:h-14 text-center border border-gray-300 rounded-full outline-none text-base sm:text-lg focus:border-[#002457] focus:ring-1 focus:ring-[#002457]/20 transition-all"
                  />
                );
              })}
            </div>

            {Object.keys(errors).length > 0 && (
              <p className="text-red-500 text-sm text-center">
                Please fill all OTP fields
              </p>
            )}

            {/* Resend OTP with Timer */}
            <p className="text-center text-sm mt-6">
              {resendEnabled ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-[#002457] hover:underline"
                >
                  Resend OTP
                </button>
              ) : (
                <span className="text-gray-500">Resend OTP in {timer}s</span>
              )}
            </p>

            <button
              type="submit"
              className="w-full bg-[#002457] text-white py-2.5 rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              Verify OTP
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

export default OtpVerification;
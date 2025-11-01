"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import KYCGuideModal from "./Modal/KYCGuideModal";
import { SuccessToast } from "./Success";

const SignUp = () => {
  const { t } = useLanguage();
  const { language } = useLanguage();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referralCode = queryParams.get("referral");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phoneNumber: "",
    telegramId: "",
    referralEmail:"",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [touched, setTouched] = useState({});
  const [rawFile, setRawFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [telegramError, setTelegramError] = useState("");

  // const referralCode = getReferralCodeFromUrl();
  // console.log("🚀 ~ SignUp ~ referralCode:", referralCode);

  const debounceRef = useRef(null);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Must include both letters and numbers and be at least 6 characters long
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    return password.length >= 6 && hasLetters && hasNumbers;
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Format as 010-0000-0000 (Korean format)
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 7) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(
        7,
        11
      )}`;
    }
  };

  const handleInputChange = (field, value) => {
    let processedValue = value;

    // Special handling for phone number formatting
    if (field === "phoneNumber") {
      processedValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: processedValue,
    }));

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const validateEmails = async (e) => {
    const value = e.target.value.trim();

    // 1️⃣ Update local state immediately
    handleInputChange("email", value);

    // 2️⃣ Clear previous debounce timer
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // 3️⃣ Basic local email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setEmailError(t("invalidEmailFormat"));
      return;
    } else {
      setEmailError(""); // clear previous error
    }

    // 4️⃣ Debounce backend validation (e.g., 600ms delay)
    debounceRef.current = setTimeout(async () => {
      try {
        setIsLoading2(true);
        const response = await fetch(
          `https://dropquest-qd-backend.onrender.com/api/v1/user/check-email/${value}`
        );
        const data = await response.json();
        setIsLoading2(false);

        if (data.exists) {
          setEmailError(t("emailAlreadyInUse"));
        } else {
          setEmailError("");
        }
      } catch (err) {
        console.error("Email validation error:", err);
        setEmailError(t("emailValidationError"));
        setIsLoading(false);
      }
    }, 600); // 0.6 seconds debounce
  };

  const validateTelegramId = async (e) => {
    const value = e.target.value.trim();

    // 1️⃣ Update state immediately
    handleInputChange("telegramId", value);

    // 2️⃣ Clear previous debounce timer
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // 3️⃣ Local validation: Telegram handle must start with '@' and contain letters, numbers, or underscores
    const telegramRegex = /^@[a-zA-Z0-9_]{5,}$/;
    if (value && !telegramRegex.test(value)) {
      setTelegramError(t("invalidTelegramFormat")); // e.g., “Telegram handle must start with @ and be at least 5 characters.”
      return;
    } else {
      setTelegramError("");
    }

    // 4️⃣ Debounced backend validation
    debounceRef.current = setTimeout(async () => {
      try {
        setIsLoading3(true);
        const response = await fetch(
          `https://dropquest-qd-backend.onrender.com/api/v1/user/check-telegram/${value}`
        );
        const data = await response.json();
        console.log("🚀 ~ validateTelegramId ~ data:", data);
        setIsLoading3(false);

        if (data.exists) {
          setTelegramError(t("telegramAlreadyInUse"));
        } else {
          setTelegramError("");
        }
      } catch (err) {
        console.error("Telegram validation error:", err);
        setTelegramError(t("telegramValidationError"));
        setIsLoading(false);
      }
    }, 600);
  };

  // Real-time validation
  useEffect(() => {
    const newErrors = {};

    // // Email validation
    // if (touched.email && formData.email && !validateEmail(formData.email)) {
    //   newErrors.email = t("invalidEmailFormat");
    // }

    // Password validation
    if (
      touched.password &&
      formData.password &&
      !validatePassword(formData.password)
    ) {
      newErrors.password = t("invalidPasswordFormat");
    }

    // Confirm password validation
    if (
      touched.confirmPassword &&
      formData.confirmPassword &&
      formData.confirmPassword !== formData.password
    ) {
      newErrors.confirmPassword = t("passwordsDoNotMatch");
    }

    // Phone number validation (Korean format: 11 digits)
    if (touched.phoneNumber && formData.phoneNumber) {
      const digits = formData.phoneNumber.replace(/\D/g, "");
      if (digits.length !== 11) {
        newErrors.phoneNumber = t("invalidPhoneNumberLength");
      }
    }

    setErrors(newErrors);
  }, [formData, touched]);

  // Check if form is valid for submit button
  const isFormValid = () => {
    const requiredFields = [
      "email",
      "password",
      "confirmPassword",
      "name",
      "phoneNumber",
    ];
    const allRequiredFilled = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );
    const noErrors = Object.keys(errors).length === 0;
    const passwordsMatch = formData.password === formData.confirmPassword;
    const validPassword = validatePassword(formData.password);
    const validEmail = validateEmail(formData.email);
    // const referralEmail = validateEmail(formData.referralEmail);

    return (
      allRequiredFilled &&
      noErrors &&
      passwordsMatch &&
      validPassword &&
      validEmail
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(URL.createObjectURL(file));
      setRawFile(file); // store the actual file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    SuccessToast("Uploading image...");

    if (!isFormValid()) {
      console.log("Please fill all required fields correctly.");
      return;
    }
    setIsLoading(true);

    try {
      let imageUrl = "";

      if (rawFile) {
        // Create FormData for image
        const formDataImage = new FormData();
        formDataImage.append("file", rawFile);

        // Upload to backend (you’ll create this endpoint below)
        const imageRes = await fetch(
          "https://dropquest-qd-backend.onrender.com/api/v1/upload",
          // "http://localhost:3000/api/v1/upload",
          {
            method: "POST",
            body: formDataImage,
          }
        );

        const imageData = await imageRes.json();
        imageUrl = imageData.url; // Get the Cloudinary URL
      }
      SuccessToast("Image uploaded successfully!");
      console.log("🚀 ~ handleSaveConfig ~ imageUrl:", imageUrl);
      // Build new user data
      const newUser = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phoneNumber,
        telegramId: formData.telegramId || "",
        referralCode: referralCode || null, // Include referral code if available
        image: imageUrl,
        referralEmail: formData.referralEmail || "",
      };

      // Make signup request to backend

      SuccessToast("Registering user...");

      const response =
        imageUrl &&
        (await fetch(
          // "http://localhost:3000/api/v1/user/users",
          "https://dropquest-qd-backend.onrender.com/api/v1/user/users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          }
        ));
      console.log("🚀 ~ handleSubmit ~ response:", response);
      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg =
          errorData.error || errorData.message || "Failed to register user";
        toast.error(errorMsg);
        setIsLoading(false);
      } else {
        console.log("Registration successful!");
        navigate("/my-page");
        toast.success("Registration successful!");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      console.log("An unexpected error occurred during sign-up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full py-4">
      <CardHeader className="text-center text-white">
        <CardTitle className="text-2xl font-bold">{t("welcome")}</CardTitle>
        <CardDescription>{t("dontMissAirdrop")}</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm font-medium">
              {t("email")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t("email")}
              value={formData.email}
              // onChange={(e) => handleInputChange("email", e.target.value)}
              onChange={validateEmails}
              onBlur={() => handleBlur("email")}
              // className={cn(
              //   "transition-colors placeholder:text-sm",
              //   errors.email &&
              //     touched.email &&
              //     "border-red-500 focus:border-red-500"
              // )}
              className={cn(
                "transition-colors placeholder:text-sm",
                (errors.email || emailError) &&
                  touched.email &&
                  "border-red-500 focus:border-red-500"
              )}
            />
            {isLoading2 && (
              <span className=" transform -translate-y-1/2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              </span>
            )}
            {errors.email && touched.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
            {emailError && <p className="text-xs text-red-500">{emailError}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label htmlFor="password" className="text-sm font-medium">
              {t("password")} <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("password")}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                className={cn(
                  "pr-10 transition-colors placeholder:text-sm",
                  errors.password &&
                    touched.password &&
                    "border-red-500 focus:border-red-500"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
            <p className="text-xs text-gray-400">
              {t("passwordRequirement")} .
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              {t("confirmPassword")} <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="123456"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                onBlur={() => handleBlur("confirmPassword")}
                className={cn(
                  "pr-10 transition-colors placeholder:text-sm",
                  errors.confirmPassword &&
                    touched.confirmPassword &&
                    "border-red-500 focus:border-red-500"
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
            <p className="text-xs text-gray-400">
              {t("passwordMatchValidation")} .
            </p>
          </div>

          {/* Name and Phone Number Row */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-sm font-medium">
                {t("name")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={t("name")}
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                className="placeholder:text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                {t("phoneNumber")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder={t("phoneNumber")}
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                onBlur={() => handleBlur("phoneNumber")}
                className={cn(
                  "transition-colors placeholder:text-sm",
                  errors.phoneNumber &&
                    touched.phoneNumber &&
                    "border-red-500 focus:border-red-500"
                )}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <p className="text-xs text-red-500">{errors.phoneNumber}</p>
              )}
              {language === "ko" && ( 
                <div className="text-[6.9px] text-green-500 font-bold mt-2">추가 본인 인증 시, 50 포인트 추가 지급!!</div>)
                }
            </div>
          </div>

          {/* Telegram ID */}
          <div className="space-y-1">
            <Label htmlFor="telegramId" className="text-sm font-medium">
              {t("telegramId")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="telegramId"
              type="text"
              placeholder="@username"
              value={formData.telegramId}
              onChange={validateTelegramId}
              onBlur={() => handleBlur("telegramId")}
              className={cn(
                "placeholder:text-sm",
                (errors.telegramId || telegramError) &&
                  touched.telegramId &&
                  "border-red-500 focus:border-red-500"
              )}
              required
            />
            {isLoading3 && (
              <span className=" transform -translate-y-1/2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              </span>
            )}
            {(errors.telegramId || telegramError) && touched.telegramId && (
              <p className="text-xs text-red-500">
                {errors.telegramId || telegramError}
              </p>
            )}
            {/* {telegramError && (
              <p className="text-xs text-red-500">
                { telegramError}
              </p>
            )} */}
          </div>

          {/* ✅ ID Card Upload */}
          <div className="space-y-1">
            <Label htmlFor="idCard" className="text-sm font-medium">
              {t("idCardFront")} <span className="text-red-500">*</span>
            </Label>
            {/* KYC Guide Trigger */}
            <div className="mt-3 flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10"
                onClick={() => setShowGuide(true)}
              >
                📷
              </Button>
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                onClick={() => setShowGuide(true)}
              >
                {t("kycPhotoTitle")}
              </button>
            </div>
            <label
              htmlFor="idCard"
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 transition"
            >
              {t("UploadID")}
              <Input
                id="idCard"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {formData.idCard ||
              (uploadedFile && (
                <div className="mt-2">
                  <img
                    // src={URL.createObjectURL(formData.idCard)}
                    src={uploadedFile}
                    alt="ID Preview"
                    className="w-40 h-28 object-cover rounded-md border placeholder:text-sm"
                  />
                </div>
              ))}

            {/* Modal */}
            <KYCGuideModal
              isOpen={showGuide}
              onClose={() => setShowGuide(false)}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="referralEmail" className="text-sm font-semibold">
              {t("referralEmail")}
            </Label>
            <Input
              id="referralEmail"
              type="text"
              // placeholder={t("name")}
              placeholder="DropQuest@gmail.com"
              value={formData.referralEmail}
              onChange={(e) => handleInputChange("referralEmail", e.target.value)}
              onBlur={() => handleBlur("name")}
              className="placeholder:text-base placeholder:text-gray-500"
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full text-lg text-white font-medium mt-4 py-4 flex items-center justify-center gap-2"
            disabled={isLoading || !isFormValid()}
            style={{
              background:
                isFormValid() && !isLoading
                  ? "linear-gradient(to right, #0d0b3e, #3d2abf)"
                  : "#e5e7eb",
              color: isFormValid() && !isLoading ? "white" : "#9ca3af",
            }}
          >
            {isLoading ? <LoadingSpinner /> : t("signUp")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignUp;

"use client";

import { useState, useEffect } from "react";
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

const SignUp = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referralCode = queryParams.get("ref");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phoneNumber: "",
    telegramId: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({});

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

  // Real-time validation
  useEffect(() => {
    const newErrors = {};

    // Email validation
    if (touched.email && formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email format";
    }

    // Password validation
    if (
      touched.password &&
      formData.password &&
      !validatePassword(formData.password)
    ) {
      newErrors.password =
        "Password must include both letters and numbers and be at least 6 characters long";
    }

    // Confirm password validation
    if (
      touched.confirmPassword &&
      formData.confirmPassword &&
      formData.confirmPassword !== formData.password
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Phone number validation (Korean format: 11 digits)
    if (touched.phoneNumber && formData.phoneNumber) {
      const digits = formData.phoneNumber.replace(/\D/g, "");
      if (digits.length !== 11) {
        newErrors.phoneNumber = "Phone number must be 11 digits";
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

    return (
      allRequiredFilled &&
      noErrors &&
      passwordsMatch &&
      validPassword &&
      validEmail
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      console.log("Please fill all required fields correctly.");
      return;
    }
    setIsLoading(true);

    try {
      // Build new user data
      const newUser = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phoneNumber,
        telegramId: formData.telegramId || "",
        referredBy: referralCode || null, // Include referral code if available
      };

      // Make signup request to backend
      const response = await fetch("http://localhost:3000/api/v1/user/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log("Registration successful!");
        navigate("/signin");
      } else {
        const errorData = await response.json();
        console.log(errorData.message || "Sign-up failed.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      console.log("An unexpected error occurred during sign-up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center text-black">
        <CardTitle className="text-2xl font-bold">{t("welcome")}</CardTitle>
        {/* <p className=" text-sm">{t("welcome")}</p> */}
        {/* <p className=" text-sm">{t("dontMissAirdrop")}</p> */}
        <CardDescription>{t("dontMissAirdrop")}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              {t("email")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t("email")}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={cn(
                "transition-colors",
                errors.email &&
                  touched.email &&
                  "border-red-500 focus:border-red-500"
              )}
            />
            {errors.email && touched.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
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
                  "pr-10 transition-colors",
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
            <p className="text-xs text-gray-500">
              {t("passwordRequirement")} .
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
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
                  "pr-10 transition-colors",
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
            <p className="text-xs text-gray-500">
              Please enter the same password as above.
            </p>
          </div>

          {/* Name and Phone Number Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
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
              />
            </div>
            <div className="space-y-2">
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
                  "transition-colors",
                  errors.phoneNumber &&
                    touched.phoneNumber &&
                    "border-red-500 focus:border-red-500"
                )}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <p className="text-xs text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Telegram ID */}
          <div className="space-y-2">
            <Label htmlFor="telegramId" className="text-sm font-medium">
              {t("telegramId")}
            </Label>
            <Input
              id="telegramId"
              type="text"
              placeholder={t("telegramId")}
              value={formData.telegramId}
              onChange={(e) => handleInputChange("telegramId", e.target.value)}
              onBlur={() => handleBlur("telegramId")}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full text-base font-medium mt-3"
            disabled={!isFormValid()}
            style={{
              background: isFormValid()
                ? "linear-gradient(to right, #0d0b3e, #3d2abf)"
                : "#e5e7eb",
              color: isFormValid() ? "white" : "#9ca3af",
            }}
          >
            {t("signUp")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignUp;

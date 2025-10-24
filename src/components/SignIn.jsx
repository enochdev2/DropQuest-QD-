import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { Eye, EyeOff } from "lucide-react";
import { SuccessToast } from "./Success";
import { motion } from "framer-motion";
// import { useAuth } from "../lib/AuthProvider";
import { useLanguage } from "@/contexts/language-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const SignIn = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFindIdDialog, setShowFindIdDialog] = useState(false);
  const [showFindPasswordDialog, setShowFindPasswordDialog] = useState(false);
  const [findIdData, setFindIdData] = useState({ name: "", phoneNumber: "" });
  const [findPasswordData, setFindPasswordData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [foundEmail, setFoundEmail] = useState("");
  const [showFoundEmail, setShowFoundEmail] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetPasswordData, setResetPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailforreset, setEmailforreset] = useState("");

  // Check if form is valid for submit button
  const isFormValid = () => {
    const requiredFields = ["email", "password"];
    const allRequiredFilled = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );

    return allRequiredFilled;
  };

  const handleInputChange = (field, value) => {
    let processedValue = value;

    setFormData((prev) => ({
      ...prev,
      [field]: processedValue,
    }));
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
      };

      // Make signup request to backend
      const response = await fetch(
        "https://dropquest-qd-backend.onrender.com/api/v1/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();

        const errorMsg =
          errorData.error || errorData.message || "Failed to register user";
        toast.error(errorMsg);
      } else {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("You have Logged in successfully!");
        navigate("/my-page");
        SuccessToast(t("loginSuccess"));
      }
    } catch (error) {
      console.error("Error during loggign-in:", error);
      console.log("An unexpected error occurred during log-in.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  const validatePassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLongEnough = password.length >= 6;
    return hasLetter && hasNumber && isLongEnough;
  };

  const handleFindIdSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        "https://dropquest-qd-backend.onrender.com/api/v1/user/check-nameandphone",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: findIdData.name,
            phone: findIdData.phoneNumber,
          }),
        }
      );

      // ❗ Handle non-200 response first
      if (!response.ok) {
        const errorData = await response.json();
        const msg = (errorData.error || "").toLowerCase();

        if (msg.includes("required")) {
          setErrorMessage(t("namePhoneRequired"));
        } else if (msg.includes("no user")) {
          setErrorMessage(t("noUserFound"));
        } else {
          setErrorMessage(t("incorrectInfo"));
        }
        return;
      }

      // ✅ Success
      const userData = await response.json();
      console.log("🚀 ~ handleFindIdSubmit ~ userData:", userData);

      if (userData.email) {
        setFoundEmail(userData.email);
        setShowFoundEmail(true);
      } else {
        setErrorMessage(t("incorrectInfo"));
      }
    } catch (error) {
      console.error("Error finding user:", error);
      // Fallback if something unexpected happens
      setErrorMessage(t("incorrectInfo"));
    }
  };

  const handleFindPasswordSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        // "http://localhost:3000/api/v1/user/check-nameandphoneandemail",
        "https://dropquest-qd-backend.onrender.com/api/v1/user/check-nameandphoneandemail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: findPasswordData.name,
            phone: findPasswordData.phoneNumber,
            email: findPasswordData.email, // Adjust key if backend expects 'phone' instead of 'phoneNumber'
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const userData = await response.json();
      console.log("🚀 ~ handleFindIdSubmit ~ userData:", userData);

      if (userData) {
        setShowFindPasswordDialog(false);
        setEmailforreset(userData.email);
        setShowResetPassword(true);
      } else {
        setErrorMessage(t("incorrectInfo"));
      }
    } catch (error) {
      console.error("Error finding user:", error);
      setErrorMessage(error.message || t("incorrectInfo"));
    }
  };

  const handleResetPasswordSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!validatePassword(resetPasswordData.newPassword)) {
      setErrorMessage(t("passwordRequirement"));
      return;
    }

    if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      setErrorMessage(t("passwordMismatch"));
      return;
    }

    try {
      const response = await fetch(
        // "http://localhost:3000/api/v1/user/resetpassword",
        "https://dropquest-qd-backend.onrender.com/api/v1/user/resetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: resetPasswordData.newPassword,
            email: emailforreset, // Adjust key if backend expects 'phone' instead of 'phoneNumber'
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const userData = await response.json();
      console.log("🚀 ~ handleFindIdSubmit ~ userData:", userData.message);

      setSuccessMessage(t("passwordChanged"));
      setTimeout(() => {
        setShowResetPassword(false);
        setResetPasswordData({ newPassword: "", confirmPassword: "" });
        setFindPasswordData({ name: "", phoneNumber: "", email: "" });
      }, 2000);
    } catch (error) {
      console.error("Error finding user:", error);
      setErrorMessage(error.message || t("incorrectInfo"));
    }
  };

  const handleFindIdInputChange = (field, value) => {
    let processedValue = value;
    if (field === "phoneNumber") {
      processedValue = formatPhoneNumber(value);
    }
    setFindIdData((prev) => ({ ...prev, [field]: processedValue }));
  };

  const handleFindPasswordInputChange = (field, value) => {
    let processedValue = value;
    if (field === "phoneNumber") {
      processedValue = formatPhoneNumber(value);
    }
    setFindPasswordData((prev) => ({ ...prev, [field]: processedValue }));
  };

  const handleResetPasswordInputChange = (field, value) => {
    setResetPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 120,
          damping: 12,
        }}
      >
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            {/* Optional Titles — Uncomment if needed */}
            {/* <CardTitle className="text-xl font-semibold text-gray-800">{t("loginTitle")}</CardTitle> */}
            {/* <CardDescription className="text-sm text-gray-500">
              {t("enterCredentials")}
            </CardDescription> */}
          </CardHeader>

          <CardContent className="grid gap-4 py-4">
            {/* Email Field */}
            <div className="grid gap-2">
              <Label
                htmlFor="login-email"
                className="text-sm font-medium text-gray-700"
              >
                {t("email")}
              </Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="text-base"
              />
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <Label
                htmlFor="login-password"
                className="text-sm font-medium text-gray-700"
              >
                {t("password")}
              </Label>

              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </CardContent>

          {/* Submit Button */}
          <CardFooter>
            <Button
              className="w-full text-base md:text-lg font-medium text-white py-3 transition-all duration-300"
              style={{
                background: isFormValid()
                  ? "linear-gradient(to right, #0d0b3e, #3d2abf)"
                  : "#e5e7eb",
                color: isFormValid() ? "white" : "#9ca3af",
              }}
              onClick={handleSubmit}
              disabled={isLoading || !isFormValid()}
            >
              {isLoading ? <LoadingSpinner /> : t("login")}
            </Button>
          </CardFooter>

          <div className="flex mb-5 w-[90%] mx-auto gap-5 justify-between">
            <button
              onClick={() => {
                setShowFindIdDialog(true);
                setErrorMessage("");
                setFindIdData({ name: "", phoneNumber: "" });
              }}
              className="w-full px-1 border border-[#3d2abf]  cursor-pointer text-white rounded-lg font-medium transition"
            >
              {t("findId")}
            </button>
            <button
              onClick={() => {
                setShowFindPasswordDialog(true);
                setErrorMessage("");
                setFindPasswordData({ name: "", phoneNumber: "", email: "" });
              }}
              className="w-full py-2 px-2 border border-[#3d2abf]  cursor-pointer text-white text-sm rounded-lg font-medium transition"
            >
              {t("findPasswords")}
            </button>
          </div>
        </Card>
      </motion.div>

      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm">
          {t("dontHaveAccount")}{" "}
          <a href="/signup" className="text-purple-400 hover:text-purple-300">
            {t("signUp")}
          </a>
        </p>
      </div>

      {/* Find ID Dialog */}
      <Dialog open={showFindIdDialog} onOpenChange={setShowFindIdDialog}>
        <DialogContent className="bg-black/80 border-gray-700 text-white lg:max-w-[400px] mx-auto md:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {t("findId")}
            </DialogTitle>
          </DialogHeader>

          {!showFoundEmail ? (
            <div className="space-y-4">
              <div>
                <Label className="text-white text-sm font-medium">
                  {t("name")}
                </Label>
                <Input
                  type="text"
                  value={findIdData.name}
                  onChange={(e) =>
                    handleFindIdInputChange("name", e.target.value)
                  }
                  className="mt-1 bg-gray-950 border-gray-700 text-white placeholder-gray-300"
                  placeholder={t("name")}
                />
              </div>

              <div>
                <Label className="text-white text-sm font-medium">
                  {t("phoneNumber")}
                </Label>
                <Input
                  type="tel"
                  value={findIdData.phoneNumber}
                  onChange={(e) =>
                    handleFindIdInputChange("phoneNumber", e.target.value)
                  }
                  className="mt-1 bg-gray-950 border-gray-700 text-white placeholder-gray-300"
                  placeholder="010-0000-0000"
                  maxLength={13}
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => setShowFindIdDialog(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                >
                  {t("cancel")}
                </Button>
                <Button
                  onClick={handleFindIdSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {t("ok")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <p className="text-gray-400 text-sm mb-2">{t("yourId")}</p>
                <p className="text-xl font-bold text-blue-400">{foundEmail}</p>
              </div>

              <Button
                onClick={() => {
                  setShowFindIdDialog(false);
                  setShowFoundEmail(false);
                  setFindIdData({ name: "", phoneNumber: "" });
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {t("ok")}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Find Password Dialog */}
      <Dialog
        open={showFindPasswordDialog}
        onOpenChange={setShowFindPasswordDialog}
      >
        <DialogContent className="bg-black/95 border-gray-700 text-white lg:max-w-[480px] md:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {t("findPassword")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-white font-bold text-sm ">
                {t("name")}
              </Label>
              <Input
                type="text"
                value={findPasswordData.name}
                onChange={(e) =>
                  handleFindPasswordInputChange("name", e.target.value)
                }
                className="mt-1 bg-black/80 border-gray-700 text-white placeholder-gray-400"
                placeholder={t("name")}
              />
            </div>

            <div>
              <Label className="text-white font-bold text-sm ">
                {t("phoneNumber")}
              </Label>
              <Input
                type="tel"
                value={findPasswordData.phoneNumber}
                onChange={(e) =>
                  handleFindPasswordInputChange("phoneNumber", e.target.value)
                }
                className="mt-1 bg-black/80 border-gray-700 text-white placeholder-gray-400"
                placeholder="010-0000-0000"
                maxLength={13}
              />
            </div>

            <div>
              <Label className="text-white text-sm font-medium">
                {t("email")}
              </Label>
              <Input
                type="email"
                value={findPasswordData.email}
                onChange={(e) =>
                  handleFindPasswordInputChange("email", e.target.value)
                }
                className="mt-1 bg-black/80 border-gray-700 text-white placeholder-gray-400"
                placeholder={t("email")}
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setShowFindPasswordDialog(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                {t("cancel")}
              </Button>
              <Button
                onClick={handleFindPasswordSubmit}
                className="flex-1 bg-main border border-blue-800 hover:bg-blue-700 text-white rounded-lg"
              >
                {t("ok")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={showResetPassword} onOpenChange={setShowResetPassword}>
        <DialogContent className="bg-black border-gray-700 text-white lg:max-w-[480px] md:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {t("resetPassword")}
            </DialogTitle>
          </DialogHeader>

          {!successMessage ? (
            <div className="space-y-4">
              <div>
                <Label className="text-white text-sm font-medium">
                  {t("newPassword")} <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={resetPasswordData.newPassword}
                    onChange={(e) =>
                      handleResetPasswordInputChange(
                        "newPassword",
                        e.target.value
                      )
                    }
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 pr-10"
                    placeholder={t("newPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-white text-sm font-medium">
                  {t("confirmPassword")} <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={resetPasswordData.confirmPassword}
                    onChange={(e) =>
                      handleResetPasswordInputChange(
                        "confirmPassword",
                        e.target.value
                      )
                    }
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 pr-10 "
                    placeholder={t("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <p className="text-gray-400 text-xs">
                * {t("passwordRequirement")}
              </p>

              <Button
                onClick={handleResetPasswordSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {t("ok")}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <p className="text-green-400 font-semibold">{successMessage}</p>
                <p className="text-gray-400 text-sm mt-2">
                  {t("tryLoginAgain")}
                </p>
              </div>

              <Button
                onClick={() => {
                  setShowResetPassword(false);
                  setSuccessMessage("");
                  setResetPasswordData({
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {t("ok")}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignIn;

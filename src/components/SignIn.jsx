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
// import { useAuth } from "../lib/AuthProvider";
const SignIn = () => {
  // const {  setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        SuccessToast("Login successful");
      }
    } catch (error) {
      console.error("Error during loggign-in:", error);
      console.log("An unexpected error occurred during log-in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          {/* <CardTitle>Login</CardTitle> */}
          {/* <CardDescription>
                  Enter your credentials to access your account.
                </CardDescription> */}
        </CardHeader>
        <CardContent className=" grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="login-password">Password</Label>

            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full text-base font-medium text-white"
            style={{
              background: isFormValid()
                ? "linear-gradient(to right, #0d0b3e, #3d2abf)"
                : "#e5e7eb",
              color: isFormValid() ? "white" : "#9ca3af",
            }}
            onClick={handleSubmit}
            disabled={isLoading || !isFormValid()}
          >
            {isLoading ? <LoadingSpinner /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;

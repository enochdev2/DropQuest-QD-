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
const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
      const response = await fetch("https://dropquest-qd-backend.onrender.com/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      console.log("🚀 ~ handleSubmit ~ data:", data)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (response.ok) {
        //  setUser(data.user);
        console.log("You have Logged in successfully!");
        navigate("/my-page");
      } else {
        const errorData = await response.json();
        console.log(errorData.message || "Sign-up failed.");

        const errorMsg = errorData.error || errorData.message || "Failed to register user";
        console.log(errorMsg);

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
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full text-base font-medium text-white"
            style={{
              background: "linear-gradient(to right, #0d0b3e, #3d2abf)",
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;

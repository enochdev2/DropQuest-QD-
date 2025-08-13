import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,

} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
const SignIn = () => {
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
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="login-password">Password</Label>
            <Input id="login-password" type="password" placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full text-base font-medium text-white"
            style={{
              background: "linear-gradient(to right, #0d0b3e, #3d2abf)",
            }}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;

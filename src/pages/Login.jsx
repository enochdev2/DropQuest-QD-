import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Login() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-black"
      
    >
      <div className="flex w-full max-w-lg lg:m-0 m-4 flex-col gap-6 bg-white p-3 lg:p-6 rounded-xl shadow-lg">
        <Tabs defaultValue="signup">
          <TabsList className="w-full">
            <TabsTrigger value="login" className="text-[#0d0b3e] w-1/2">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="text-[#0d0b3e] w-1/2">
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* LOGIN TAB */}
          <TabsContent value="login">
            <SignIn />
          </TabsContent>

          {/* SIGN UP TAB */}
          <TabsContent value="signup">
            <SignUp />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Login;

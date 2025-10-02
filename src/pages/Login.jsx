import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex w-full max-w-lg lg:m-0 m-4 flex-col gap-6 bg-white p-3 lg:p-6 rounded-xl">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="w-full flex rounded-lg overflow-hidden bg-gray-200">
            <TabsTrigger
              value="login"
              className="w-1/2 py-1 text-base md:text-lg font-medium text-gray-700 
                         data-[state=active]:bg-[#0d0b3e] rounded-lg
                         data-[state=active]:text-white transition-all duration-300"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="w-1/2 py-3 text-base md:text-lg font-medium rounded-lg text-gray-700 
                         data-[state=active]:bg-[#0d0b3e] 
                         data-[state=active]:text-white transition-all duration-300"
            >
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

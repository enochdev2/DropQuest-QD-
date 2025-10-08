import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Login() {
  return (
    <div className="flex items-center pt-18 justify-center min-h-screen bg-black">
      <div className="flex w-full max-w-lg lg:m-0 m-3 flex-col gap-6 relative min-h-auto bg-cover bg-center bg-no-repeat bg-[url('bg.png')] p-3 lg:p-6 rounded-xl">
         <div className="absolute inset-0 bg-black/60"></div>
        <Tabs defaultValue="login" className="w-full z-10">
          <TabsList className="w-full flex rounded-lg overflow-hidden bg-gray-100">
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
              className="w-1/2 py-2 text-base md:text-lg font-medium rounded-lg text-gray-700 
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

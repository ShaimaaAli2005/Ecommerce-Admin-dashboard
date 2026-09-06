import { useState } from "react";
import { Check } from "lucide-react";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl min-h-[650px] bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E5E7EB] flex">

      
        <div className="hidden md:flex md:w-1/2 bg-[#17233C] text-white p-12 flex-col justify-between">

      
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl border-2 border-[#E89A5B] flex items-center justify-center text-[#E89A5B] font-bold text-xl">
              L
            </div>

            <span className="text-2xl font-bold">
              LUMA
            </span>
          </div>

       
          <div className="max-w-lg ">
            <h1 className="text-4xl font-size: 36px lg:text-5xl   leading-tight mb-5">
              Manage Your Store Like a Pro
            </h1>

            <p className="text-gray-300 text-base lg:text-lg leading-7 mb-7">
              Control products, orders, users and analytics
              from a modern dashboard experience.
            </p>

            <div className="space-y-4 mt-7">
              <div className="bg-white/10 rounded-xl p-4 flex items-center gap-2">
                <Check /> Product Management
              </div>

              <div className="bg-white/10 rounded-xl p-4 flex items-center gap-2">
                <Check /> Order Tracking
              </div>

              <div className="bg-white/10 rounded-xl p-4 flex items-center gap-2 mb-2">
                <Check /> Customer Insights
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-400 ">
            LUMA E-Commerce
          </p>
        </div>

       
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-14">

          <div className="w-full max-w-md">

            <div className="text-center mb-8">
              <h2 className="text-3xl  font-weight: 500  font-size: 24px text-[#17233C]">
                LUMA
              </h2>

              <h3 className="text-2xl font-semibold text-[#1F2937] mt-6">
                Welcome Back
              </h3>

              <p className="text-[#7B8190] mt-2">
                Sign in to your admin dashboard
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#1F2937] mb-2"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 px-4 rounded-[10px] border border-[#E5E7EB] outline-none text-[#1F2937] focus:border-[#17233C]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#1F2937] mb-2"
                 
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="w-full h-12 px-4 rounded-[10px] border border-[#E5E7EB] outline-none text-[#1F2937] focus:border-[#17233C]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 rounded-[10px] bg-[#17233C] text-white font-semibold hover:bg-[#E89A5B] transition duration-200 mb-7"
              >
                Sign In
              </button>

            </form>

            <p className="text-center text-sm text-[#7B8190]">
              Secure Admin Access
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
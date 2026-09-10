import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://e-commerce-api-3wara.vercel.app/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Token saved:", token);
      console.log("User saved:", user);

      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F5F0] flex flex-col justify-center items-center p-0 md:p-6 lg:p-10 font-['Inter'] relative select-none">

      <div className="w-full max-w-5xl bg-white md:rounded-3xl shadow-[0_20px_60px_-15px_rgba(23,35,60,0.08)] border border-[#EBE8E1] overflow-hidden flex flex-col md:flex-row min-h-[640px]">

       
        <div className="relative md:w-5/12 bg-[#0B132B] text-white p-8 md:p-12 flex flex-col justify-between overflow-hidden">

          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85"
              alt="LUMA Luxury Interior"
              className="w-full h-full object-cover opacity-75 contrast-[1.08] brightness-[0.85]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/40 to-black/30" />
          </div>

      
          <div className="relative z-10">
            <span className="text-3xl font-extrabold tracking-widest font-['Poppins'] text-white drop-shadow-md">
              LUMA
            </span>

            <div className="h-1 w-10 bg-[#E89A5B] mt-2 rounded-full shadow-sm"></div>
          </div>

         
          <div className="relative z-10 my-8 backdrop-blur-[2px] bg-black/15 p-4 rounded-2xl border border-white/10">

            <span className="text-[11px] font-bold tracking-widest text-[#E89A5B] uppercase block mb-2 drop-shadow-sm">
              Store Portal
            </span>

            <p className="text-xl sm:text-2xl font-normal leading-snug font-['Poppins'] text-white drop-shadow-md">
              Elevating everyday spaces with purposeful aesthetic minimalism.
            </p>

          </div>

        
          <div className="relative z-10 backdrop-blur-md bg-white/15 border border-white/25 p-4 rounded-2xl flex items-center gap-3.5 shadow-xl">

            <div className="w-10 h-10 rounded-xl bg-[#E89A5B] text-white flex items-center justify-center font-bold text-base shadow-sm">
              ★
            </div>

            <div>
              <p className="text-xs font-bold text-white tracking-wide">
                Signature Collection
              </p>

              <p className="text-[11px] text-slate-100 font-light">
                Store Management Console
              </p>
            </div>

          </div>

        </div>

        
        <div className="md:w-7/12 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-white">

          <div className="max-w-md w-full mx-auto">

            <div className="mb-8">

              <h2 className="text-2xl sm:text-3xl font-bold text-[#17233C] tracking-tight font-['Poppins']">
                Sign In
              </h2>

              <p className="text-sm text-[#7B8190] mt-1.5 leading-relaxed">
                Welcome back! Please enter your store credentials.
              </p>

            </div>

           
            <form onSubmit={handleSubmit} className="space-y-4">

            
              <div>

                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1.5"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@luma.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] focus:border-[#17233C] focus:ring-4 focus:ring-[#17233C]/5 text-sm outline-none transition-all duration-200 bg-[#FAFAFA] focus:bg-white"
                  required
                />

              </div>

           
              <div>

                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-1.5"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] focus:border-[#17233C] focus:ring-4 focus:ring-[#17233C]/5 text-sm outline-none transition-all duration-200 bg-[#FAFAFA] focus:bg-white"
                  required
                />

              </div>

            
              <div className="flex items-center">

                <label className="flex items-center gap-2.5 text-xs text-[#7B8190] cursor-pointer">

                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded text-[#17233C] border-gray-300 accent-[#17233C]"
                  />

                  <span>Remember me</span>

                </label>

              </div>

            
              <button
                type="submit"
                className="w-full bg-[#17233C] hover:bg-[#E89A5B] text-white py-3 px-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 group mt-2"
              >
                <span>Sign in to Dashboard</span>

                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
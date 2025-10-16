
"use client";

import { registerUser } from "@/lib/api"
import { useState } from "react";
import { useRouter } from "next/navigation"
import Swal from "sweetalert2";

export default function LoginRegisterForm() {
  const router = useRouter()
const [first_name, setFirst_name] = useState("");
const [last_name, setLast_name] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState("");
const [message, setMessage] = useState("");

 const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

const handleRegister = async (e) => {
      e.preventDefault();
      console.log("register -> ", {first_name, last_name, username, password});
          try {
            const data = await registerUser({first_name,last_name,username, password });
            await Swal.fire({
                  title: 'Register successful',
                  text: 'You have successfully -> Register in',
                  icon: 'success',
                  confirnButtonText: 'ok',
                  cancelButtonColor: '#3b82f6'
                })
            router.push("/");
          } catch (error) {
              await Swal.fire({
                  title: 'Register unsuccessful',
                  text: 'You have unsuccessfully -> Register ',
                  icon: 'error',
                  confirnButtonText: 'ok',
                 
                })
            console.log("register failed -> ", error);
          }
    }


const handleLogin = () => {
router.push("/")
};


return (
<div className="min-h-screen flex items-center justify-center bg-gray-900">
<div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-80">
<h1 className="text-xl font-bold text-white mb-4 text-center">
Register
</h1>

<div className="mb-4">
<label className="block text-sm text-gray-300 mb-1">First_name</label>
<input
type="text"
value={first_name}
onChange={(e) => setFirst_name(e.target.value)}
className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
/>
</div>

<div className="mb-4">
<label className="block text-sm text-gray-300 mb-1">Last_name</label>
<input
type="text"
value={last_name}
onChange={(e) => setLast_name(e.target.value)}
className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
/>
</div>

<div className="mb-6">
<label className="block text-sm text-gray-300 mb-1">Username</label>
<input
type="Username"
value={username}
onChange={(e) => setUsername(e.target.value)}
className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
/>
</div>

<div className="mb-6">
<label className="block text-sm text-gray-300 mb-1">Password</label>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
/>
</div>

<div className="mb-6">
                    <label className="block text-sm text-gray-300 mb-1">Password</label>
                    {/* ใช้ div เพื่อให้ Input และปุ่ม Eye Icon อยู่ในตำแหน่งเดียวกัน */}
                    <div className="relative">
                        <input
                            // เปลี่ยน type ตามสถานะ showPassword
                            type={setShowPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            // เพิ่ม pr-10 เพื่อเว้นพื้นที่สำหรับไอคอน
                            className="w-full px-3 py-2 pr-10 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                        {/* ปุ่มสำหรับสลับการแสดงรหัสผ่าน */}
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-cyan-400 focus:outline-none"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {/* ไอคอนดวงตา (Eye Icon) แบบ SVG */}
                            {showPassword ? (
                                // ไอคอนซ่อน (Eye-slash)
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l16 16a1 1 0 001.414-1.414l-16-16zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    <path d="M10 16.5A10 10 0 012.33 10a10 10 0 0115.37-6.531l-1.396 1.395A8 8 0 0010 14.5a8 8 0 00-6.23-2.906l1.396 1.396L3.469 10a8 8 0 0012.862 3.109l-1.397-1.397A6 6 0 0110 14.5a6 6 0 01-6.907-3.907l-1.396-1.396A10 10 0 0010 16.5z" />
                                </svg>
                            ) : (
                                // ไอคอนแสดง (Eye)
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>


<div className="flex flex-col">
  
  <button
onClick={handleRegister}
className="flex-0.2 bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold py-2 rounded-lg mb-3 "

>
Register
</button>
<button
onClick={handleLogin}
className="flex-1 border border-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg"
>
go to Login
</button>



</div>
</div>
</div>
);
}
'use client';
import { useRouter } from "next/navigation";

import Input from "../components/input_for_login";
import Button1 from "../components/button1"

export default function LoginPage() {

  const router = useRouter();

  async function Login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const output = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await output.json();
    
    if (output.status === 200) {
      localStorage.setItem("userid", data.userid);
      router.push("/home");
      
    }else{
      document.getElementById("error").innerHTML=data.error;
    }
  }

  

    return (
      <div>

        <p className="w-[225px] text-center m-auto text-[40px] mt-[120px] bg-[#F7F3D6] rounded-xl ">Letter Box</p>
        <div className="bg-[#C9F25D] w-[500px] h-[600px] flex flex-col items-center justify-center rounded-[20px] shadow-lg m-auto mt-[12vh]">
          <h1 className="text-[40px] text-black font-bold mb-4">Login</h1>
          <p className="text-[20px] text-black mb-10">Your movie list missed you.</p>

          <form action="/login" method="post" className="flex flex-col space-y-5 w-[75%] mb-[20px]">
            <Input label="User Name" id="username" name="username" />
            <Input label="Password" id="password" name="password" />
          </form>
          <button onClick={Login} className="bg-[#14213D] text-white w-[75%] h-10 border-0px rounded-[0.5rem]">Login</button>

          <p className="text-[#FF0000]  text-[15px]" id="error"></p>

          <p className="text-cernter">or</p>

          <div className="w-[75%] mt-[20px]">
            <button className="bg-[#14213D] text-white w-30 h-10 border-0px rounded-[0.5rem] w-full" onClick={()=>router.push("/register")}>Register</button>
          </div>
        </div>
      
   
      </div>
    );
  
  }

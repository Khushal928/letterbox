'use client';
import { useRouter } from "next/navigation";

import Input from "../components/input_for_login";
import Button1 from "../components/button1";

export default function RegisterPage() {
  const router = useRouter();

  async function handleRegister() {
    const username = document.getElementById("username").value;
    const gmail = document.getElementById("gmail").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, gmail, password }),
    });
    
    const data = await res.json();

    if (res.status === 201) {

      router.push("/login");
    } else {
      alert(data.error || "Registration failed");
    }
  }

  return (
    <div>
      <p className="w-[225px] text-center m-auto text-[40px] mt-[120px] bg-[#F7F3D6] rounded-xl font-bold">
        Letter Box
      </p>

      <div className="flex flex-row justify-center items-start gap-[4vw] mt-[10vh]">
        <div className="bg-[#C9F25D] w-[500px] h-[550px] flex flex-col items-center justify-center rounded-[20px]">
          <h1 className="text-[40px] text-black font-bold mb-[10px]">Register</h1>

          <form className="flex flex-col space-y-5 w-[75%] mb-[20px]" onSubmit={(e) => e.preventDefault()}>
            <Input label="User Name" id="username" name="username" />
            <Input label="Gmail" id="gmail" name="gmail" />
            <Input label="Password" id="password" name="password" type="password" />

            <button onClick={handleRegister} className="bg-[#14213D] text-white w-30 h-10 border-0px rounded-[0.5rem] w-full">Register</button>
          </form>

          <div className="text-black text-[20px]">
            Already have an account? <a href="/login" className="underline">Login</a>
          </div>
        </div>

        <div className="bg-[#F7F3D6] text-center rounded-xl w-[500px] h-[550px] flex flex-col justify-center items-center p-[30px] shadow-lg">
          <h2 className="text-[30px] font-semibold text-black mb-6">Features</h2>
          <ul className="list-disc list-inside text-[20px] text-black space-y-4 text-left">
            <li>Browse trending movies and shows</li>
            <li>View brief descriptions of movies</li>
            <li>Create and manage multiple watchlists</li>
            <li>Access your watchlists and watched movies</li>
            <li>Rate movies</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

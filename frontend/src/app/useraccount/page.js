'use client';
import { useRouter } from "next/navigation";

import Header from "../components/header";

export default function UserAccount() {

    const router = useRouter();

    async function useraccount(){
        const userid = localStorage.getItem("userid");

        const output = await fetch("http://localhost:5000/api/useraccount", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userid}),
          });

          const data = await output.json();

          document.getElementById("username").innerHTML=data.username;
          document.getElementById("gmail").innerHTML=data.gmail;
          document.getElementById("password").innerHTML=data.password;

    }
    useraccount();
    return (
        <div>
            <Header/>
        <div className="bg-[#C9F25D] rounded-[0.5rem] p-5 w-100 m-auto mt-[30vh]">
                <h2 className="text-[30px] font-bold text-center mb-4">User Account</h2>
                
                <div className="mb-4">
                    <p className="text-[#0F4C5C] ">Username</p>
                    <p id="username" className="text-lg font-bold"></p>
                </div>

                <div className="mb-4">
                    <p className="text-[#0F4C5C]">gmail</p>
                    <p id="gmail" className="text-lg font-bold"></p>
                </div>

                <div className="mb-4">
                    <p className="text-[#0F4C5C]">Password</p>
                    <p id="password" className="text-lg font-bold"></p>
                </div>

                <button className="w-full bg-[#0F4C5C] text-white h-[40px] rounded">
                    Change Account Details
                </button>
        </div>
        </div>

    );
}

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

          document.getElementById("username").value=data.username;
          document.getElementById("gmail").value=data.gmail;
          document.getElementById("password").value=data.password;


    }
    useraccount();

    async function changeaccountdetails(){

        const userid = localStorage.getItem("userid");

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const output = await fetch("http://localhost:5000/api/changeaccount", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userid,username,password}),
          });

          
          if(output.status===200){
            localStorage.removeItem("userid");
            router.push("/login")
          }

          
    }

    return (
        <div>
            <Header/>
            <div className="bg-[#C9F25D] rounded-[0.5rem] p-5 w-[400px] m-auto mt-[30vh]">
                <h2 className="text-[30px] font-bold text-center mb-4">User Account</h2>
                
                <div className="mb-4">
                    <p className="text-[#0F4C5C]">Email</p>
                    <input 
                        type="email"
                        className="w-full p-2 border rounded bg-white text-lg font-bold"
                        id="gmail"
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <p className="text-[#0F4C5C]">Username</p>
                    <input 
                        type="text"
                        className="w-full p-2 border rounded bg-white text-lg font-bold"
                        id="username"
                    />
                </div>



                <div className="mb-4">
                    <p className="text-[#0F4C5C]">Password</p>
                    <input 
                        type="password"
                        className="w-full p-2 border rounded bg-white text-lg font-bold"
                        id="password"
                    />
                </div>

                <button className="w-full bg-[#0F4C5C] text-white h-[40px] rounded" onClick={changeaccountdetails}>
                    Change Account Details
                </button>
            </div>
        </div>
    );
}

'use client';
import { useRouter } from "next/navigation";

export default function Header(){
    const router = useRouter();

    return(
    <div id="header" className="h-[120px] bg-[#F7F3D6] flex items-center">
        <p className="ml-[5vw] text-[40px] mt-[2vh] text-black">LETTER BOX</p>
        <div className="flex ml-[50vw] mt-[2.7vh]  gap-[3vw] text-[25px] text-black">
            <button onClick={() => router.push("/search")}>search</button>
            <button onClick={() => router.push("/useraccount")}>account</button>
            <button onClick={() => router.push("/lists")}>lists</button>
            <button
                onClick={() => {
                    localStorage.removeItem("userid");
                    router.push("/login");
                }}
            >
                logout
            </button>
        </div>
    </div>
    )
}

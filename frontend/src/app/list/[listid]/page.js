"use client";

import Header from "../../components/header";
import Image from "../../components/image_plus_link";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function MoviePage() {
    const { listid } = useParams();  
    const [movieids, setmovieids] = useState([]);
    const [listname, setlistname] = useState("");
    const [imagestobedisplayed, setImages] = useState([]);
    const [popup,setpopup] = useState(false);

    const router = useRouter();


    async function getlist() {
        const res = await fetch("http://localhost:5000/api/getlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ listid }),
        });

        const data = await res.json();
        setmovieids(data.movieids);
        setlistname(data.listname);
    }

    async function getmoviedetails() {
        const apikey = "6acdaaec4869e57d236953225f44c257";
        const imageComponents = [];

        for (let i = 0; i < movieids.length; i++) {
            const url = `https://api.themoviedb.org/3/movie/${movieids[i]}?api_key=${apikey}`;
             
            const response = await fetch(url);
            if (!response.ok) continue;

            const data = await response.json();

            imageComponents.push(
                <Image
                    key={data.id}
                    alt={data.title}
                    imagepath={data.poster_path}
                    movieid={data.id}
                />
            );
            
        }
        
        setImages(imageComponents);
    }

    async function sharelist() {
        const newowner = document.getElementById("newowner").value.trim();
        if(!newowner){alert("please enter a username")}
        else{
            const output = await fetch("http://localhost:5000/api/sharelist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ listid, newowner }),
            });
    
            const data = await output.json();
            console.log(data);
        }

    }


    useEffect(() => {
        getlist(); 
    }, []);
    
    useEffect(() => {
    {
            getmoviedetails();
    }
    }, [movieids]);
    


    return (
        
        
        <div>
            <Header />
            <p className="ml-[5vw] text-[36px] text-[#E8EDDF] mt-[4vh] inline-block text-black">
                {listname}
            </p>
            <button className="ml-[100px] bg-[#14213D] text-white p-[15px] rounded-[10px]" onClick={()=>setpopup(true)} >Share</button>
            <button className="ml-[100px] bg-[#14213D] text-white p-[15px] rounded-[10px]" onClick={()=>router.push(`/addnewmovie/${listid}`)}>Add new movie</button>
            
            {/*  */}

            {popup &&
                (
                    <div className="bg-[#14213D] fixed opacity-[90%] z-50 h-[28vh] w-[25vw] ml-[35vw] mt-[20vh] flex flex-col rounded-lg text-[20px] p-[30px]">
                        <div className="text-white mb-[25px]">Type the username of the person you'd like to share this list with</div>
                        <input type="text" id="newowner" placeholder="usename" className="bg-white rounded-[5px] h-[30px] p-[15px]" /> 
                        <button className="bg-[#F7941D] text-[#14213D] p-[2px] rounded-[10px] mt-[30px] w-[10vw] m-auto" onClick={sharelist}>share</button>
                        <button className="bg-[#F7941D] text-[#14213D] p-[2px] rounded-[10px] mt-[30px] w-[10vw] m-auto" onClick={()=>setpopup(false)}>cancel</button>


                    </div>
                )
            }

            <div className="flex flex-wrap mt-[2vh] ml-[5vw] w-[90vw] p-[30px] space-y-[2vh] justify-around"> 
                {imagestobedisplayed}
            </div>
        </div>
    );
}

"use client";

import { useRouter } from 'next/navigation';


export default function Image({ alt,imagepath,movieid,listid,moviename}) {

  const router = useRouter();

  async function addmovietolist() {

    const output = await fetch("http://localhost:5000/api/addmovietolist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieid, listid, moviename }),
    });

    const data = await output.json();
    if (output.status===200){    router.push(`/list/${listid}`)
    }
  }
  
    return (
      <button className="w-[250px] h-[300px]" onClick={addmovietolist}>            
      {(<img 
      src={`https://image.tmdb.org/t/p/original${imagepath}`} 
      alt={alt}
      className="w-full h-full object-cover rounded-[10px]"
      />)}
  </button>
    );
  }
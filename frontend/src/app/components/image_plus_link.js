"use client";

import { useRouter } from 'next/navigation';


export default function Image({ alt,imagepath,movieid}) {

  const router = useRouter();
  
    return (
      <button className="w-[250px] h-[300px]" onClick={()=>router.push(`/movie/${movieid}`) }>            
      {(<img 
      src={`https://image.tmdb.org/t/p/original${imagepath}`} 
      alt={alt}
      className="w-full h-full object-cover rounded-[10px]" 
      />)}
  </button>
    );
  }
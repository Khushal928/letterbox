'use client';


import Image from "../components/image_plus_link";
import Header from "../components/header";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";



export default function HomePage() {

    const router = useRouter();
    const [trending, settrending] = useState(null);
    const [popularnow ,setpopular] = useState(null);
    const [toprated, settoprated] = useState(null);


    async function trendingthisweek() {
        const apikey="6acdaaec4869e57d236953225f44c257"
        const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apikey}`;
        
        try {
            const response = await fetch(url);
    
            if (!response.ok) {
                console.error("Error fetching data: ", response.status);
                return;
            }
    
            const data = await response.json();
            const top5 = data.results.slice(0, 21);
            settrending(top5);



        } catch (error) {
            console.error("An error occurred: ", error);
        }
    }

    async function popular() {
        const apikey="6acdaaec4869e57d236953225f44c257"
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;
        
        try {
            const response = await fetch(url);
    
            if (!response.ok) {
                console.error("Error fetching data: ", response.status);
                return;
            }
    
            const data = await response.json();
            const top5 = data.results.slice(0, 21);
            setpopular(top5);



        } catch (error) {
            console.error("An error occurred: ", error);
        }
    }

    async function trendingfunc() {
        const apikey="6acdaaec4869e57d236953225f44c257"
        const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}`;
        
        try {
            const response = await fetch(url);
    
            if (!response.ok) {
                console.error("Error fetching data: ", response.status);
                return;
            }
    
            const data = await response.json();
            const top5 = data.results.slice(0, 21);
            settoprated(top5);



        } catch (error) {
            console.error("An error occurred: ", error);
        }
    }


    
    useEffect(() => {
        trendingthisweek();
        popular();
        trendingfunc();
    }, []); 

    let trendingelements = [];
    if (trending) {
      for (let i = 0; i < trending.length; i++) {
        trendingelements.push(
          <Image
            key={trending[i].id}
            alt={trending[i].title}
            imagepath={trending[i].poster_path}
            movieid={trending[i].id}
          />
        );
      }
    }

    let popularelements = [];
    if (popularnow) {
      for (let i = 0; i < popularnow.length; i++) {
        popularelements.push(
          <Image
            key={popularnow[i].id}
            alt={popularnow[i].title}
            imagepath={popularnow[i].poster_path}
            movieid={popularnow[i].id}
          />
        );
      }
    }

    let topratedelements = [];
    if (toprated) {
      for (let i = 0; i < toprated.length; i++) {
        topratedelements.push(
          <Image
            key={toprated[i].id}
            alt={toprated[i].title}
            imagepath={toprated[i].poster_path}
            movieid={toprated[i].id}
          />
        );
      }
    }

    return(

        
        <div>

            <Header/>

            <div>
            <p className="mt-[5vh] ml-[8vw] text-[1.5vw] text-black ">Trending This Week</p>
                <div className="flex flex-wrap mt-[2vh] ml-[5vw] w-[90vw] p-[30px] space-y-[8vh] justify-around">
                    {trendingelements}
                </div>
            </div>
                <p className="mt-[5vh] ml-[8vw] text-[1.5vw] text-black ">Popular Movies</p>
                <div className="flex flex-wrap mt-[2vh] ml-[5vw] w-[90vw] p-[30px] space-y-[8vh] justify-around"> 
                        {popularelements}
                </div>
            <div>

            </div>
                <p className="mt-[5vh] ml-[8vw] text-[1.5vw] text-black ">Top Rated</p>
                <div className="flex flex-wrap mt-[2vh] ml-[5vw] w-[90vw] p-[30px] space-y-[8vh] justify-around"> 
                        {topratedelements}
                </div>
            <div>
            </div>

        </div>
    )
}

                    {/* <button className="w-[250px] h-[300px]" onClick={()=>router.push(`/movie/${trending[0].id}`) }>            
                        {trending &&(<img 
                        src={`https://image.tmdb.org/t/p/w500${trending[0].poster_path}`} 
                        alt={trending[0].title} 
                        className="w-full h-full object-cover rounded-[10px]" 
                        />)}
                    </button>
                    {trending &&
                    <Image alt={`${trending[2].title}`} imagepath={`${trending[2].poster_path}` } movieid={`${trending[2].id}`}/>
} */}

            {/* <div>
            <p className="mt-[8vh] ml-[8vw] text-[1.5vw] text-black">Popular Movies</p>
                <div className="flex flex-wrap mt-[5vh] ml-[5vw] w-[90vw] h-[25vh] space-y-[2vh] justify-around "> 
                <Image className="w-[250px] h-[300px]" imageurl="/image.png" link="hi.com"/>
               <Image className="w-[250px] h-[300px]" imageurl="/image.png" link="hi.com"/>
               <Image className="w-[250px] h-[300px]" imageurl="/image.png" link="hi.com"/>
               <Image className="w-[250px] h-[300px]" imageurl="/image.png" link="hi.com"/>
               <Image className="w-[250px] h-[300px]" imageurl="/image.png" link="hi.com"/>
                </div>
            </div>
            
            <div>
            <p className="mt-[8vh] ml-[8vw] text-[1.5vw] text-black">Recommended</p>
                <div className="flex flex-wrap mt-[5vh] ml-[5vw] w-[90vw] h-[25vh] space-y-[2vh] justify-around "> 
                <Image className="w-[250px] h-[300px]" imageurl="/image.png" link="hi.com"/>
               <Image className="w-[250px] h-[300px]" imageurl="/image.png" link="hi.com"/>
               <Image className="w-[250px] h-[300px]" imageurl="/image.png" link="hi.com"/>
               <Image className="w-[250px] h-[300px]" imageurl="/image.png" link="hi.com"/>
               <Image className="w-[250px] h-[300px]" imageurl="/image.png" link="hi.com"/>
                </div>
            </div> */}
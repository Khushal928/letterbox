'use client';

import { useEffect, useState } from "react";
import Header from "../components/header";
import Image from "../components/image_plus_link";


export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [moviedetails, setMovieDetails] = useState(null);


    async function getdetails() {
        const apikey="6acdaaec4869e57d236953225f44c257"
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apikey}`;


        
        try {
            const response = await fetch(url);
    
            if (!response.ok) {
                console.error("Error fetching data: ", response.status);
                return;
            }
    
            const data = await response.json();
            const top5 = data.results.slice(0, 21);

            setMovieDetails(top5);


        } catch (error) {
            console.error("An error occurred: ", error);
        }
    }


  
    useEffect(() => {
        getdetails();       
    }, [query]);

    let searchelements = [];
    if (moviedetails) {
      for (let i = 0; i < moviedetails.length; i++) {
        searchelements.push(
          <Image
            key={moviedetails[i].id}
            alt={moviedetails[i].title}
            imagepath={moviedetails[i].poster_path}
            movieid={moviedetails[i].id}
          />
        );
      }
    }


      


    return (

        <div>
            <Header />
            <div className="flex justify-center p-10 flex-col rounded-lg">
                <div className="bg-white rounded-lg shadow-lg w-[80%] p-6">
                    <h1 className="text-black text-4xl font-bold">Search</h1>

                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        className="bg-gray-300 w-[300px] h-[40px] mt-4 rounded px-3 text-black"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="w-[80%] flex flex-wrap mt-[2vh] ml-[5vw] p-[30px] space-y-[8vh] justify-around space-x-[2vw]">
                {searchelements}
                </div>
            </div>
        </div>
    );
}
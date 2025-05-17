'use client';

import Header from "../../components/header";
import Image from "../../components/image_plus_link";
import Button2 from "../../components/button1";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";

export default function MoviePage() {

    const router = useRouter();
    const { movieid } = useParams();   
    const [moviedetails, setmoviedetails] = useState(null);
    

    async function getdetails() {
        const apikey="6acdaaec4869e57d236953225f44c257" 
        const url = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${apikey}`;
        
        try {
            const response = await fetch(url);
    
            if (!response.ok) {
                console.error("Error fetching data: ", response.status);
                return;
            }

            const data = await response.json();

            setmoviedetails(data);


        } catch (error) {
            console.error("An error occurred: ", error);
        }
    }

    function showdetails(){
        document.getElementById("heading").innerHTML = moviedetails.title;
        document.getElementById("description").innerHTML = moviedetails.overview;
        document.getElementById("g1").innerHTML = moviedetails.genres[0].name;
        document.getElementById("g2").innerHTML = moviedetails.genres[1].name;
        document.getElementById("g3").innerHTML = moviedetails.genres[2].name;
        document.getElementById("rating").innerHTML = moviedetails.vote_average
    }


    useEffect(() => {
        if (movieid) {
            getdetails();
        }
    }, [movieid]);
    
    useEffect(() => {
        if (moviedetails) {
            showdetails();
        }
    }, [moviedetails]);


    return(        

        <div>
            <Header/>
            <p className="ml-[5vw] text-[45px] mt-[3.5vh]" id="heading">Stranger Things</p>

            
            <div className="flex flex-row flex-wrap text-black">


            {moviedetails &&(<img 
            src={`https://image.tmdb.org/t/p/original${moviedetails.poster_path}`} 
            alt={moviedetails.title} 
            className="w-[450px] h-[500px] ml-[5vw] mt-[6vh]" 
            />)}


                <div className="flex flex-col mt-[4vh] ml-[100px]">
                    <p id="description" className="w-[1000px] h-[300px]  text-[32px] "></p>

                    <ul className="text-[32px]">
                        <li><p id="g1"></p></li>
                        <li><p id="g2"></p></li>
                        <li><p id="g3"></p></li>
                    </ul>
                
                <p className="text-[32px] mt-[4vh]" id="rating"></p>
                


                {/* <div className="flex flex-row mt-[4vh] space-x-[4vw]">
                <Button2 text="Rate" className="bg-[#1C1C2E] text-black text-[22px] "/>
                <input id="newlist" type="text" placeholder="Rate the Movie from 1 to 10!" className="bg-white border rounded-[10px] px-4 py-2 text-[16px] h-[40px] text-[20px]"/>
                </div> */}
                


 

                </div>
                
                <div className="ml-[6vw] mt-[25px] w-[400px] bg-[#F5CB5C]"> 
                    <table className="text-center text-black ">
                        <tr>
                            <td className="w-[250px]">list1</td>
                            <td>list1</td>
                        </tr>
                        <tr>
                            <td>list1</td>
                            <td>list1</td>
                        </tr>
                        <tr>
                            <td>list1</td>
                            <td>list1</td>
                        </tr>
                        <tr>
                            <td>list1</td>
                            <td>list1</td>
                        </tr>
                        <tr>
                            <td>list1</td>
                            <td>list1</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

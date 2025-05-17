import { useRouter } from "next/navigation";

export default function List({listid,listname, movienamelist=[], movieidlist=[] }) {

    const router = useRouter();

        let movies = [];
        {
          for (let i = 0; i < movienamelist.length; i++) {
            movies.push(
                <li className="p-[10px] text-[2vh]"><button onClick={()=>router.push(`/movie/${movieidlist[i]}`)}>{movienamelist[i]}</button></li>
            );
          }
        }
    
    return (
        <div className="w-[15vw]  text-center rounded-xl bg-[#C9F25D] p-[20px]">
        <button onClick={()=>router.push(`/list/${listid}`)} className="text-black mb-[2vh] text-[2.5vh]">{listname}</button>

            <ul>
                {movies}
            </ul>

        </div>
    )
}


       
          
            
            
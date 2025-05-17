export default function Button1({text, className}){
    return(
    <div>
        <button className={`bg-[#14213D] text-white w-30 h-10 border-0px rounded-[0.5rem] ${className}`}>{text}</button>
    </div>
    )
}

export function Button2({text, className}){
    return(
    <div>
        <button className={`${className} w-30 h-10 border-0px rounded-[0.5rem]`}>{text}</button>
    </div>
    )
}
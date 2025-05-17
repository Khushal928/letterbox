"use client";

import Header from "../components/header"
import List from "../components/list"
import { useEffect, useState } from "react";

export default function Lists() {
    const [userlists, setuserlists] = useState(null);
    const [sharedlists, setsharedlists] = useState(null);

    async function getlist() {
        const userid = localStorage.getItem("userid");

        const output = await fetch("http://localhost:5000/api/sendlists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid }),
        });

        const data = await output.json();
        setuserlists(data);
    }

    async function getsharedlists() {
        const userid = localStorage.getItem("userid");

        const output = await fetch("http://localhost:5000/api/getsharedlists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid }),
        });

        const data = await output.json();
        setsharedlists(data);
    }

    async function addnewlist(){
        const name = document.getElementById("newlist").value
        const userid = localStorage.getItem("userid");

        if (!name) {return};

        const output = await fetch("http://localhost:5000/api/addlist",{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({userid,name}),
        });
        const data = await output.json();

        if(output.status===200){
            getlist();
            document.getElementById("newlist").value = "";
        }

    }


    useEffect(() => {
        getlist();
        getsharedlists();
    }, []);


    let listelments = [];
    if (userlists) {
        for (let i = 0; i < userlists.length; i++) {
            listelments.push(
                <List
                listid={userlists[i].listid}
                listname={userlists[i].listname}
                movienamelist={userlists[i].movienames}
                movieidlist={userlists[i].movieids}
                />
            );
        }
    }
    let sharelistelements = [];
    if (sharedlists) {
        for (let i = 0; i < sharedlists.length; i++) {
            sharelistelements.push(
                <List
                listid={sharedlists[i].listid}
                listname={sharedlists[i].listname}
                movienamelist={sharedlists[i].movienames}
                movieidlist={sharedlists[i].movieids}
                />
            );
        }
    }


    return (
        <div>
            <Header />
            <p className="text-black ml-[5vw] text-[36px] mt-[4vh]">Your Lists</p>
            <div className="flex flex-row w-[25vw] justify-around ml-[75vw]">
                <button className="text-[24px] bg-[#14213D] rounded-lg text-white p-[5px]" onClick={addnewlist}>add new list</button>
                <input id="newlist" type="text" placeholder="enter name of new list" className="block bg-white border rounded-[0.5rem] p-[5px]" />
            </div>

            <div className="flex flex-row flex-wrap ml-[5vw] mr-[5vw] justify-around space-x-[2vw] space-y-[4vh] mt-[4vh]">
                {listelments}
            </div>
            <p className="text-black ml-[5vw] text-[36px] mt-[4vh]">Shared Lists with you</p>
            <div className="flex flex-row flex-wrap ml-[5vw] mr-[5vw] justify-around space-x-[2vw] space-y-[4vh] mt-[4vh]">
                {sharelistelements}
            </div>
        </div>
    )
}
import React, { useRef, useState } from "react";

import { Button } from "./button";
import axios from "axios";
import { BACKEND_URL } from "../config";
export interface InputProps{
    placeholder:string,
    type:string
    reference: React.RefObject<HTMLInputElement>
}

interface CreateModelProps {
    open: boolean;
    onClose: () => void;
}



export const CreateModel:React.FC<CreateModelProps> = ({open,onClose}) =>{
    const titleRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    const LinkRef = useRef<HTMLInputElement>(null); 

    async function create(){
        try{
            await axios.post(`${BACKEND_URL}/api/v1/content`,{
                title:titleRef.current?.value,
                type:typeRef.current?.value,
                link:LinkRef.current?.value
            })
           console.log("Model Created") 
        }
        catch(e){
            console.log(e)
        }
    }
    
    
    return (
        <div >
        {open &&
        <div  className="w-screen h-screen border bg-gray-500 opacity-80 fixed  top-0 left-0  flex justify-center items-center z-10">
            <div className="bg-white flex flex-col items-center rounded-md">
                <div className="flex flex-row justify-end w-full p-4">
                    {/* <h1 className="font-mono font-semibold text-[20px]">Create Model</h1> */}
                    <button onClick={onClose} className="font-bold mb-5 relative bottom-2 left-1 bg-black text-white rounded-full px-1">X</button>
                </div>
                <div className="p-3 px-8 -space-y-5   flex flex-col gap-2 rounded-md ">
                    <Input reference={titleRef} placeholder="Name" type="text"/>
                    <Input reference={typeRef} placeholder="Description" type="text"/>
                    <Input  reference={LinkRef} placeholder="Link" type="link"/>
                </div>
                <div className=" text-white rounded-full py-2 mb-1 ">
                    <Button onClick={create} variant="primary" size="md" title={"Submit"} />
                </div>
            </div>
            
        </div>}
        </div>
    )
}

const Input = (props:InputProps)=>{
    return (
        <div>
            <input type={"text"} className="px-2 py-4 border rounded m-2" placeholder={props.placeholder}/>
        </div>
        
    )
}
import React, { useState } from "react";

import { Button } from "./button";
export interface InputProps{
    placeholder:string,
    type:string
}
interface CreateModelProps {
    open: boolean;
    onClose: () => void;
  }



export const CreateModel:React.FC<CreateModelProps> = ({open,onClose}) =>{
    
    
    return (
        <div >
        {open &&
        <div  className="w-screen h-screen border bg-gray-500 opacity-80 fixed top-0 left-0  flex justify-center items-center z-10">
            <div className="bg-white flex flex-col items-center rounded-md">
                <div className="flex flex-row justify-end w-full p-4">
                    {/* <h1 className="font-mono font-semibold text-[20px]">Create Model</h1> */}
                    <button onClick={onClose} className="font-bold mb-5 relative bottom-2 left-1 bg-black text-white rounded-full px-1">X</button>
                </div>
                <div className="p-4 flex flex-col gap-4 rounded-md ">
                    <Input placeholder="Model Name" type="text"/>
                    <Input placeholder="Model Description" type="text"/>
                    <Input placeholder="Input Link" type="link"/>
                </div>
                <div className=" text-white rounded-full py-2 mb-1 ">
                    <Button  variant="primary" size="md" title={"Submit"} />
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
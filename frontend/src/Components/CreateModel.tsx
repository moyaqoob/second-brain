import React, { useState } from "react";

export interface InputProps{
    placeholder:string,
    type:string
}

export const CreateModel = ({open,onClose}) =>{
    
    
    return (
        <div >
        {open &&
        <div  className="w-screen h-screen border bg-slate-500 fixed top-0 left-0 opacity-70 flex justify-center items-center z-10">
            <div className="bg-white flex flex-col items-center rounded-md">
                <div className="flex flex-row justify-between w-full p-4">
                    <h1 className="font-mono font-semibold text-[20px]">Create Model</h1>
                    <button onClick={onClose} className="font-bold mb-5 relative bottom-2 left-1 bg-black text-white rounded-full px-1">X</button>
                </div>
                <div className="p-4 flex flex-col gap-4 rounded-md ">
                    <Input placeholder="Model Name" type="text"/>
                    <Input placeholder="Model Description" type="text"/>
                </div>
                <div className=" bg-black text-white rounded-full p-2 px-4 mb-1 ">
                    <button >Create</button>
                </div>
            </div>
            
        </div>}
        </div>
    )
}

const Input = (props:InputProps)=>{
    return (
        <div>
            <input type="text" placeholder={props.placeholder}/>

        </div>
        
    )
}
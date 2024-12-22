import { ReactElement } from "react"


export interface ButtonProps {
    color: string
    title:String
    variant : "primary" | "secondary"
    size : "sm" | "md" | "lg"
    startIcon ?: ReactElement
    endIcon?:ReactElement
    onClick?:()=>void    
}
//this includes padding and margin and the button is rounded or not.
const sizeStyles = {
    "sm" : "px-2 py-1 text-sm rounded-md",
    "md" : "px-5 py-2 text-md rounded-lg",
    "lg" : "px-2 py-3 text-lg rounded-xl"
}
//this includes btn color,text color
const variantStyles = {
    "primary":"bg-purple-600 text-white hover:bg-purple-700",
    "secondary":"bg-purple-100 text-purple-500 "
}

export const Button = (props:ButtonProps) =>{
   return <button className={variantStyles[props.variant] + ""+ sizeStyles[props.size]} >
        <div className="flex items-center">
            <span>
                {props.startIcon} 
            </span>
            <div className={"font-medium"}>
                {props.title}
            </div>
            {props.endIcon}
        </div>
   </button>
}




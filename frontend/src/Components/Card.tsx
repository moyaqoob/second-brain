import { ReactElement } from "react"  
// import Link from "/"
import ShareIcon from "../Icons/StartIcon"
import DeleteIcon from "../Icons/DeleteIcon"

export interface CardProps {
    title:string,
    link:string,
    type:"twitter" | "youtube"
    startIcon : ReactElement,
    endIcon : ReactElement
}

export const Card =({link,type,title,startIcon,endIcon}:CardProps)=>{
    return (
        <>
            <div className= "max-w-72 w-72 h-[300px] border p-4 border-gray-300 shadow-sm rounded-md border-[#]">
                    <div className="flex justify-between">
                        <div className="flex items-center text-md ">
                            <div className="text-gray-600 pr-2 text-2xl">
                                {startIcon || <ShareIcon/>}
                            </div>
                            {title}
                        </div>
                        <div className="flex items-center ">
                            <div className="">
                                {endIcon || <DeleteIcon/>}
                            </div>
                        </div>
                    </div>
                    <div className="flex h-10 justify-content ml-2 mr-3 relative top-2 right-2 ">
                        {type==="youtube" && <iframe 
                            width="250"
                            height="200"
                            className="rounded-md shadow-md"
                            src={link.replace("watch","embed").replace("?v","/")}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>}
                            {type==="twitter" && <blockquote className="twitter-tweet">
                            <a href="https://twitter.com/username/status/1234567890123456789"/>
                            </blockquote>
                            }
                    </div>

            </div>
        </>
    )
}
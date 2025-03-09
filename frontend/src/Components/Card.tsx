import { ReactElement } from "react";
import DeleteIcon from '../Icons/DeleteIcon'
import ShareIcon from "../Icons/StartIcon"
import { BACKEND_URL } from "../config";
export interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document";

}

export const Card = ({ link, type, title }: CardProps) => {

    const deleteItem=()=>{
        axios.get(`${BACKEND_URL}/api/v1/content`,{
            headers:{
                Autorization:localStorage.getItem("token")
            }
        }).then((res)=>{
            console.log(res.data)
        })
    }

    const shareItem = () =>{
        axios.get(`${BACKEND_URL}/api/v1/share`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then((res)=>{
            //@ts-ignore
            navigator.clipboard.writeText(res.data)
        })
    }


  return (
    <> 
      <div className="max-w-50 w-72 h-[300px] overflow-hidden p-4 border-gray-300 shadow-sm rounded-md border min-h-48 min-w-72 ">
        <div className="flex items-center text-md gap-3 font-bold capitalize  justify-between  ">
          <div className="text-gray-600 pr-2 flex text-lg items-center" onClick={shareItem}>
            { <ShareIcon />}
            {title}
          </div>
          <div onClick={deleteItem} >{<DeleteIcon/>}</div>
        </div>

        <div className="flex items-center justify-center h-64 w-full bg-gray-100 rounded-md shadow-md overflow-hidden">
          {type === "youtube" && (
            <iframe
              className="w-full h-full"
              src={link.replace("watch", "embed").replace("?v", "/")}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}{
            type=="twitter" && 
                <blockquote className="twitter-tweet w-full h-full flex  items-stretch justify-center">
                    <a href={link.replace("x","twitter")}></a>
                </blockquote>}

            {type=="document"&& 
                <blockquote>
                    
                </blockquote>
            }
          
        </div>
      </div>
    </>
  );
};


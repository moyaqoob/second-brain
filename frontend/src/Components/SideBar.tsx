import SidebarItem from "./SidebarItem"

import TwitterIcon from  "../assets/icons8-twitter-50.png"
import youtubeIcon from "../assets/icons8-youtube-50.png"
import documnentIcon from  "../assets/icons8-documents-50.png"

export const Sidebar = ()=>{

    return <>
        <div className="w-70  h-screen absolute bg-gray-50 text-gray-500 cursor-pointer">
            <div className="text-2xl font-bold flex justify-center">
                Brainly
            </div>
            <div className="flex flex-col  mt-8  pl-2 ">
                <SidebarItem icon={TwitterIcon} label={"Twitter"}/>
                <SidebarItem icon={youtubeIcon} label={"Youtube"}/>
                <SidebarItem icon={documnentIcon} label={"Documents"}/>
            </div>
        </div>
        </>
}
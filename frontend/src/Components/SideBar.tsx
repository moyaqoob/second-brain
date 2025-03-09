import SidebarItem from "./SidebarItem";

import { useEffect, useState } from "react";
import brainly from "../assets/brainly-logo.svg";
import documnentIcon from "../assets/icons8-documents-50.png";
import TwitterIcon from "../assets/icons8-twitter-50.png";
import youtubeIcon from "../assets/icons8-youtube-50.png";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleResize = () => {
    if (window.innerWidth > 200) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <>
      {isOpen && (
        <div className="w-72 h-screen absolute bg-gray-100 text-gray-500 cursor-pointer">
          <div className="bg-gray-800">
            <img src={brainly} alt="" className="h-32 md:w-48 w-60" />
          </div>
          <div className="flex flex-col mt-8 relative -top-8">
            <SidebarItem icon={TwitterIcon} label={"Twitter"} />
            <SidebarItem icon={youtubeIcon} label={"Youtube"} />
            <SidebarItem icon={documnentIcon} label={"Documents"} />
          </div>
        </div>
      )}
    </>
  );
};

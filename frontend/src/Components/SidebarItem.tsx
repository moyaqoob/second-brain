import React from "react";

interface SidebarItemProps {
  label: string;
  path?: string;
  icon?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-3 rounded-lg transition-all duration-200 hover:bg-gray-400 hover:shadow-md cursor-pointer group"
    >
      {icon && (
        <div className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded-full group-hover:bg-gray-300 transition-colors duration-200">
          <img src={icon} alt={`${label} icon`} className="w-5 h-5 opacity-70" />
        </div>
      )}
      <span className="text-gray-700 font-medium text-base group-hover:text-gray-900">
        {label}
      </span>
    </div>
  );
};

export default SidebarItem;

import React from 'react';

interface SidebarItemProps {
    label: string;
    path?: string;
    icon?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon }) => {
    return (
        <div className="flex gap-4 items-center p-2  pl-4 ">
            <img src={icon} alt="" className='w-6 h-6 mr-2 ml-2 opacity-50'/>
            <span className="font-semibold text-lg opacity-99">{label}</span>
        </div>
    );
};

export default SidebarItem;
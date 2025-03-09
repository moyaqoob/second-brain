import { ReactElement } from 'react';

export interface ButtonProps {
    title: string;
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    startIcon?: ReactElement;
    className?: string;
    onClick?: () => void;
}

const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-purple-600",
    secondary: "bg-gray-200 text-purple-600 hover:bg-gray-300"
};

const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
};

export const Button = ({
    title,
    startIcon,
    onClick,
    size = "md",
    variant = "primary",
    className = ""
}: ButtonProps) => {
    return (
        <button 
            onClick={onClick} 
            className={`${variantStyles[variant]} ${sizeStyles[size]} rounded-md transition-colors duration-200 ${className}`}
        >
            <div className="flex items-center gap-2 justify-center">
                {startIcon && (
                    <span className="flex items-center">
                        {startIcon}
                    </span>
                )}
                <div className="font-medium">
                      {title}
                </div>
            </div>
        </button>
    );
};




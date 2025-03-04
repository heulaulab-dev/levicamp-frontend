import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", children, ...props }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;

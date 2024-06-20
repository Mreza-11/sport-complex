// Button.tsx
import React from "react";

type ButtonColor =
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "cyan"
  | "gray"
  | "white"
  | "black";

interface ButtonProps {
  color: ButtonColor;
  children: React.ReactNode;
  onClick?: () => void;
}

const colorStyles: { [key in ButtonColor]: string } = {
  blue: "border-blue-500 text-blue-500 hover:border-blue-600 hover:bg-blue-50 focus:border-blue-600 focus:bg-blue-50 active:border-blue-700 active:text-blue-700 dark:text-blue-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950",
  green:
    "border-green-500 text-green-500 hover:border-green-600 hover:bg-green-50 focus:border-green-600 focus:bg-green-50 active:border-green-700 active:text-green-700 dark:hover:bg-green-950 dark:focus:bg-green-950",
  red: "border-red-500 text-red-500 hover:border-red-600 hover:bg-red-50 focus:border-red-600 focus:bg-red-50 active:border-red-700 active:text-red-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950",
  yellow:
    "border-yellow-500 text-yellow-500 hover:border-yellow-600 hover:bg-yellow-50 focus:border-yellow-600 focus:bg-yellow-50 active:border-yellow-700 active:text-yellow-700 dark:hover:bg-yellow-950 dark:focus:bg-yellow-950",
  cyan: "border-cyan-500 text-cyan-500 hover:border-cyan-600 hover:bg-cyan-50 focus:border-cyan-600 focus:bg-cyan-50 active:border-cyan-700 active:text-cyan-700 dark:hover:bg-cyan-950 dark:focus:bg-cyan-950",
  gray: "border-gray-500 text-gray-500 hover:border-gray-600 hover:bg-gray-50 focus:border-gray-600 focus:bg-gray-50 active:border-gray-700 active:text-gray-700 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600",
  white:
    "border-white text-white hover:border-gray-300 hover:text-gray-200 focus:border-gray-300 focus:text-gray-200 active:border-gray-300 active:text-gray-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600",
  black:
    "border-black text-black hover:border-gray-800 hover:bg-gray-100 focus:border-gray-800 focus:bg-gray-100 active:border-gray-900 active:text-gray-900 dark:text-gray-600 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900",
};

const Button: React.FC<ButtonProps> = ({ color, children, onClick }) => {
  return (
    <button
      type="button"
      className={`inline-block rounded border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out motion-reduce:transition-none focus:outline-none focus:ring-0 ${colorStyles[color]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

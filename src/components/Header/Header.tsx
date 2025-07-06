import React from "react";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import useThemeStore from "../../store/themeStore";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10 top-0 left-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="font-semibold hover:text-blue-600 font-mono text-lg dark:text-white"
        >
          <i className="fa-solid fa-umbrella-beach pr-3"></i>
          Smart Todo App
        </a>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white transition"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <CiDark size={20} /> : <CiLight size={20} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{theme === "light" ? "Dark Mode" : "Light Mode"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </nav>
  );
};

export default Header;

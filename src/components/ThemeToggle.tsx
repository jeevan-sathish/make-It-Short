
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme based on system preference or localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full glass-card flex items-center justify-center transition-colors duration-300 hover:bg-accent/10 focus:outline-none"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative w-6 h-6"
      >
        <motion.div
          animate={{
            opacity: isDarkMode ? 0 : 1,
            y: isDarkMode ? -10 : 0,
            transition: { duration: 0.2 }
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun size={20} className="text-amber-500" />
        </motion.div>
        
        <motion.div
          animate={{
            opacity: isDarkMode ? 1 : 0,
            y: isDarkMode ? 0 : 10,
            transition: { duration: 0.2 }
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon size={20} className="text-indigo-300" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;

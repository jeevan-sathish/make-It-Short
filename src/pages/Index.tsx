
import { useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import UrlShortener from "@/components/UrlShortener";
import UrlHistory, { UrlRecord } from "@/components/UrlHistory";

const Index = () => {
  const [urlHistory, setUrlHistory] = useState<UrlRecord[]>([]);

  const addToHistory = (record: UrlRecord) => {
    setUrlHistory(prev => [record, ...prev]);
  };

  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container px-4 py-16 md:py-24 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-3"
          >
            <div className="inline-flex items-center justify-center p-2 rounded-xl bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Elegant URL Shortener
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-3 text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Transform long URLs into concise, powerful links with real-time strength analysis.
          </motion.p>
        </motion.div>

        <UrlShortener onUrlShortened={addToHistory} />
        
        <UrlHistory urlHistory={urlHistory} />
      </div>
      
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="py-6 text-center text-sm text-muted-foreground"
      >
        <p>© {new Date().getFullYear()} URL Shortener. Made with precision and care.</p>
      </motion.footer>
    </div>
  );
};

export default Index;

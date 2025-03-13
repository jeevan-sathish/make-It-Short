
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface UrlStrengthGraphProps {
  url: string;
  shortenedUrl: string | null;
}

const UrlStrengthGraph = ({ url, shortenedUrl }: UrlStrengthGraphProps) => {
  // Calculate strength based on URL reduction percentage
  const calculateStrength = (): number => {
    if (!url || !shortenedUrl) return 0;
    
    // Calculate reduction ratio
    const originalLength = url.length;
    const shortenedLength = shortenedUrl.length;
    
    // If shortened URL is actually longer, strength is 0
    if (shortenedLength >= originalLength) return 0;
    
    // Calculate percentage reduction (0-100)
    const reductionPercentage = ((originalLength - shortenedLength) / originalLength) * 100;
    
    // Map to a 0-100 scale with a minimum of 10 (even small reductions have value)
    return Math.max(10, Math.min(100, reductionPercentage));
  };

  const strength = calculateStrength();
  
  // Determine color based on strength
  const getStrengthColor = () => {
    if (strength < 30) return "text-red-500";
    if (strength < 60) return "text-yellow-500";
    return "text-green-500";
  };

  // Determine label based on strength
  const getStrengthLabel = () => {
    if (strength < 30) return "Low";
    if (strength < 60) return "Medium";
    return "High";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full mt-8 mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">URL Shortening Strength</span>
        <span className={`text-sm font-bold ${getStrengthColor()}`}>
          {shortenedUrl ? `${getStrengthLabel()} (${Math.round(strength)}%)` : "N/A"}
        </span>
      </div>
      
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${strength}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${strength < 30 ? "bg-red-500" : strength < 60 ? "bg-yellow-500" : "bg-green-500"}`}
        />
      </div>
      
      <div className="grid grid-cols-3 w-full mt-1 text-xs text-muted-foreground">
        <span>Low</span>
        <span className="text-center">Medium</span>
        <span className="text-right">High</span>
      </div>
    </motion.div>
  );
};

export default UrlStrengthGraph;

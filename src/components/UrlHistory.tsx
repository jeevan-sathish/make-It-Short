
import { useState, useEffect } from "react";
import { Clock, Copy, Check, Link } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export interface UrlRecord {
  originalUrl: string;
  shortenedUrl: string;
  timestamp: Date;
}

interface UrlHistoryProps {
  urlHistory: UrlRecord[];
}

const UrlHistory = ({ urlHistory }: UrlHistoryProps) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedId(id);
        toast({
          title: "URL copied",
          description: "The shortened URL has been copied to your clipboard.",
          duration: 2000,
        });
        
        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopiedId(null);
        }, 2000);
      })
      .catch(() => {
        toast({
          title: "Copy failed",
          description: "Could not copy the URL to clipboard.",
          variant: "destructive",
          duration: 2000,
        });
      });
  };

  // No history yet
  if (urlHistory.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-6 rounded-xl glass-card text-center"
      >
        <div className="flex flex-col items-center gap-3">
          <Link size={24} className="text-muted-foreground" />
          <h3 className="text-lg font-medium">No URLs shortened yet</h3>
          <p className="text-sm text-muted-foreground">
            Your shortened URLs will appear here once you create them.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-8"
    >
      <h2 className="text-xl font-semibold mb-4">Your URL History</h2>
      
      <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
        <AnimatePresence>
          {urlHistory.map((record, index) => (
            <motion.div
              key={record.timestamp.getTime()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="p-4 rounded-xl glass-card relative"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-full overflow-hidden">
                  <h3 className="font-medium truncate" title={record.originalUrl}>
                    {record.originalUrl}
                  </h3>
                  <div className="flex items-center mt-2 text-primary font-semibold">
                    <span className="truncate" title={record.shortenedUrl}>{record.shortenedUrl}</span>
                  </div>
                  <div className="flex items-center mt-3 text-sm text-muted-foreground">
                    <Clock size={14} className="mr-1" />
                    <span>{format(record.timestamp, "PPpp")}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => copyToClipboard(record.shortenedUrl, record.timestamp.getTime().toString())}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  aria-label="Copy URL"
                >
                  {copiedId === record.timestamp.getTime().toString() ? (
                    <Check size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} className="text-muted-foreground" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default UrlHistory;


import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, ArrowRight, Copy, Check } from "lucide-react";
import { UrlRecord } from "./UrlHistory";
import UrlStrengthGraph from "./UrlStrengthGraph";
import { useToast } from "@/hooks/use-toast";

interface UrlShortenerProps {
  onUrlShortened: (record: UrlRecord) => void;
}

const UrlShortener = ({ onUrlShortened }: UrlShortenerProps) => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Focus the input field on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const isValidUrl = (urlString: string) => {
    try {
      const url = new URL(urlString);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Mock URL shortening function (in a real app, this would call an API)
  const shortenUrl = async (longUrl: string): Promise<string> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, create a shortened URL
    const randomId = Math.random().toString(36).substring(2, 8);
    const shortened = `https://short.url/${randomId}`;
    
    setIsLoading(false);
    return shortened;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "Please enter a URL",
        description: "You need to enter a URL before shortening",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive",
      });
      return;
    }

    try {
      const shortened = await shortenUrl(url);
      setShortenedUrl(shortened);
      
      // Add to history
      onUrlShortened({
        originalUrl: url,
        shortenedUrl: shortened,
        timestamp: new Date(),
      });
      
      toast({
        title: "URL shortened successfully",
        description: "Your shortened URL is ready to use!",
      });
    } catch (error) {
      toast({
        title: "Error shortening URL",
        description: "There was a problem shortening your URL. Please try again.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    if (!shortenedUrl) return;
    
    navigator.clipboard.writeText(shortenedUrl)
      .then(() => {
        setIsCopied(true);
        toast({
          title: "Copied to clipboard",
          description: "The shortened URL has been copied to your clipboard",
        });
        
        // Reset copied state after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch(() => {
        toast({
          title: "Copy failed",
          description: "Failed to copy URL to clipboard",
          variant: "destructive",
        });
      });
  };

  const reset = () => {
    setUrl("");
    setShortenedUrl(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="w-full glass-card rounded-2xl p-8">
        <motion.form 
          onSubmit={handleSubmit}
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Link className="text-muted-foreground" size={20} />
            </div>
            
            <input
              ref={inputRef}
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your URL (https://example.com)"
              className="url-input-animation w-full pl-12 pr-4 py-4 rounded-xl bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              disabled={isLoading}
            />
            <div className="url-underline h-0.5 absolute bottom-0 left-0 right-0 mx-4"></div>
          </div>
          
          <div className="mt-6 flex items-center gap-3">
            <motion.button
              type="submit"
              className="flex-1 py-3 px-6 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 disabled:opacity-70"
              disabled={isLoading || !url}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"></div>
              ) : (
                <>
                  Shorten URL <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        <AnimatePresence>
          {shortenedUrl && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 overflow-hidden"
            >
              <div className="border-t border-border pt-6">
                <UrlStrengthGraph url={url} shortenedUrl={shortenedUrl} />
                
                <div className="p-4 rounded-xl bg-secondary flex items-center justify-between">
                  <span className="font-medium text-primary overflow-hidden text-ellipsis">
                    {shortenedUrl}
                  </span>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={copyToClipboard}
                      className="p-2 rounded-lg hover:bg-background transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isCopied ? (
                        <Check size={18} className="text-green-500" />
                      ) : (
                        <Copy size={18} />
                      )}
                    </motion.button>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button
                    onClick={reset}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Shorten another URL
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UrlShortener;

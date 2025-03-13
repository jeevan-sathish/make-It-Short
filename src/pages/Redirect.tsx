
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "lucide-react";

// In a real app, this would be stored in a database
// For demo purposes, we'll use localStorage
const getOriginalUrl = (shortId: string): string | null => {
  const urlMappings = JSON.parse(localStorage.getItem("urlMappings") || "{}");
  return urlMappings[shortId] || null;
};

const Redirect = () => {
  const { shortId } = useParams<{ shortId: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shortId) {
      setError("Invalid shortened URL");
      return;
    }

    const originalUrl = getOriginalUrl(shortId);
    
    if (originalUrl) {
      // Redirect to the original URL
      window.location.href = originalUrl;
    } else {
      setError("This shortened URL doesn't exist or has expired");
    }
  }, [shortId, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 max-w-md glass-card rounded-xl">
          <div className="mb-4 flex justify-center">
            <Link size={48} className="text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Link Not Found</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <a 
            href="/" 
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting you...</p>
      </div>
    </div>
  );
};

export default Redirect;

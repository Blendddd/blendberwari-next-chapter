import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Helmet>
        <title>Page Not Found — Blend Berwari</title>
        <meta name="description" content="This page doesn't exist. Head back to Blend Berwari's web design and development portfolio." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://blendberwari-next-chapter.lovable.app/404" />
        <meta property="og:title" content="Page Not Found — Blend Berwari" />
        <meta property="og:description" content="This page doesn't exist. Head back to the portfolio homepage." />
        <meta property="og:url" content="https://blendberwari-next-chapter.lovable.app/404" />
      </Helmet>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
        <a href="/" className="text-primary hover:underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blend Berwari — Web Designer &amp; Developer</title>
        <meta name="description" content="Blend Berwari is a web designer and developer in Zakho, Kurdistan, building modern, responsive websites with React, TypeScript and thoughtful UI/UX." />
        <link rel="canonical" href="https://blendberwari-next-chapter.lovable.app/" />
        <meta property="og:title" content="Blend Berwari — Web Designer &amp; Developer" />
        <meta property="og:description" content="Web design and development for businesses in Zakho, Kurdistan and beyond: responsive websites, UI/UX and ongoing maintenance." />
        <meta property="og:url" content="https://blendberwari-next-chapter.lovable.app/" />
      </Helmet>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Work />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

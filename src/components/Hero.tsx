import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
const profilePhoto = "/lovable-uploads/abba735f-7594-454e-972e-d27d7c03ae30.png";

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left fade-in-left">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="glow hover:shadow-elevated transition-all duration-300 text-lg px-8 py-3"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <ExternalLink className="mr-2" size={20} />
                {t.hero.hireMe}
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end fade-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-30 scale-110"></div>
              <img
                src={profilePhoto}
                alt={t.hero.profileAlt}
                className="relative z-10 w-80 h-80 md:w-96 md:h-96 object-cover rounded-full border-4 border-primary/20 shadow-elevated float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
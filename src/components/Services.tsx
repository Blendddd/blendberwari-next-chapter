import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Palette, Smartphone, Globe, Zap, Users } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

const Services = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const services = [
    {
      icon: Code,
      title: t.services.webDevelopment.title,
      description: t.services.webDevelopment.description,
      features: ["React & TypeScript", "Responsive Design", "Performance Optimization", "Clean Code"],
      price: "Starting from $999"
    },
    {
      icon: Palette,
      title: t.services.uiux.title,
      description: t.services.uiux.description,
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
      price: "Starting from $599"
    },
    {
      icon: Globe,
      title: t.services.webDesign.title,
      description: t.services.webDesign.description,
      features: ["Custom Design", "CMS Integration", "SEO Optimization", "Analytics Setup"],
      price: "Starting from $799"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.services.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="glass hover:shadow-card transition-all duration-300 hover:scale-105 group fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} className="text-background" />
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="border-t border-border pt-4">
                    <p className="text-lg font-semibold text-primary mb-3">{service.price}</p>
                    <Button 
                      className="w-full group-hover:shadow-glow transition-all duration-300"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16 fade-in-up">
          <div className="bg-gradient-card p-8 rounded-2xl border border-border/50">
            <h3 className="text-2xl font-bold mb-4">Need Something Custom?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every project is unique. Let's discuss your specific requirements 
              and create a tailored solution that perfectly fits your needs and budget.
            </p>
            <Button 
              size="lg" 
              className="glow"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Let's Talk
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Users, Globe, Award, Coffee, Star, Smartphone } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const skills = [
    { 
      category: language === 'ar' ? 'الواجهة الأمامية' : 'Frontend',
      items: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript"],
      icon: Code2,
      gradient: "from-primary to-primary-glow"
    },
    { 
      category: language === 'ar' ? 'التصميم' : 'Design',
      items: ["Adobe Photoshop", "Sketch", "Figma", "UI/UX Design"],
      icon: Palette,
      gradient: "from-secondary to-accent"
    },
    { 
      category: language === 'ar' ? 'الأدوات' : 'Tools',
      items: ["Git", "VS Code", "Webpack", "Tailwind CSS"],
      icon: Coffee,
      gradient: "from-accent to-primary"
    },
    { 
      category: language === 'ar' ? 'أخرى' : 'Other',
      items: [
        language === 'ar' ? 'التصميم المتجاوب' : 'Responsive Design',
        "SEO",
        language === 'ar' ? 'تحسين الأداء' : 'Performance Optimization'
      ],
      icon: Star,
      gradient: "from-primary-glow to-secondary"
    }
  ];

  const stats = [
    {
      icon: Award,
      number: "5+",
      label: t.about.experience,
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: Palette,
      number: "50+",
      label: t.about.projects,
      gradient: "from-secondary to-accent"
    },
    {
      icon: Users,
      number: "30+",
      label: t.about.clients,
      gradient: "from-accent to-primary"
    },
    {
      icon: Smartphone,
      number: "99%",
      label: language === 'ar' ? 'رضا العملاء' : 'Client Satisfaction',
      gradient: "from-primary-glow to-secondary"
    }
  ];

  return (
    <section id="about" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-20 fade-in-up">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 shadow-sm">
              {language === 'ar' ? 'حولي' : 'About Me'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 gradient-text">
            {t.about.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t.about.description}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="group relative overflow-hidden glass hover:shadow-elegant transition-all duration-500 hover:scale-105 fade-in-up border-0" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <CardContent className="relative p-6 sm:p-8 text-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-glow`}>
                    <Icon size={24} className="sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">{stat.number}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Skills Section */}
        <div className="space-y-8 sm:space-y-12">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              {language === 'ar' ? 'الخبرة التقنية' : 'Technical Expertise'}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'التقنيات والأدوات التي أعمل بها لتحويل الأفكار إلى واقع'
                : 'Technologies and tools I work with to bring ideas to life'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
            {skills.map((skillGroup, index) => {
              const Icon = skillGroup.icon;
              return (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden glass hover:shadow-elegant transition-all duration-500 hover:scale-105 fade-in-up border-0" 
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${skillGroup.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <CardContent className="relative p-6 sm:p-8">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 bg-gradient-to-br ${skillGroup.gradient} rounded-xl flex items-center justify-center shadow-glow`}>
                      <Icon size={20} className="sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-foreground">
                      {skillGroup.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <Badge 
                          key={skill} 
                          variant="secondary" 
                          className="text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-sm"
                          style={{ animationDelay: `${(index * 0.15) + (skillIndex * 0.05)}s` }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
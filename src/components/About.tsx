import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Smartphone, Globe, Award, Users, Coffee, Star } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const skills = [
    { 
      category: "Frontend", 
      items: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript"],
      icon: Code2,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      category: "Design", 
      items: ["Adobe Photoshop", "Sketch", "Figma", "UI/UX Design"],
      icon: Palette,
      color: "from-purple-500 to-pink-500"
    },
    { 
      category: "Tools", 
      items: ["Git", "VS Code", "Webpack", "Tailwind CSS"],
      icon: Coffee,
      color: "from-orange-500 to-red-500"
    },
    { 
      category: "Other", 
      items: ["Responsive Design", "SEO", "Performance Optimization"],
      icon: Star,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    {
      icon: Award,
      number: "5+",
      label: t.about.experience,
      color: "from-primary to-primary-glow"
    },
    {
      icon: Palette,
      number: "50+",
      label: t.about.projects,
      color: "from-secondary to-accent"
    },
    {
      icon: Users,
      number: "30+",
      label: t.about.clients,
      color: "from-accent to-muted"
    },
    {
      icon: Globe,
      number: "99%",
      label: "Client Satisfaction",
      color: "from-primary-glow to-secondary"
    }
  ];

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background/60" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 fade-in-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
              About Me
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            {t.about.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t.about.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="group relative overflow-hidden glass hover:shadow-elegant transition-all duration-500 hover:scale-105 fade-in-up border-0" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <CardContent className="relative p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-foreground">{stat.number}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Skills Section */}
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => {
              const Icon = skillGroup.icon;
              return (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden glass hover:shadow-elegant transition-all duration-500 hover:scale-105 fade-in-up border-0" 
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${skillGroup.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <CardContent className="relative p-8">
                    <div className={`w-12 h-12 mb-6 bg-gradient-to-br ${skillGroup.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <h4 className="text-xl font-semibold mb-6 text-foreground">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <Badge 
                          key={skill} 
                          variant="secondary" 
                          className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-sm"
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
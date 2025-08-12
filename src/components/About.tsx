import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Smartphone, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const skills = [
    { category: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript"] },
    { category: "Design", items: ["Adobe Photoshop", "Sketch", "Figma", "UI/UX Design"] },
    { category: "Tools", items: ["Git", "VS Code", "Webpack", "Tailwind CSS"] },
    { category: "Other", items: ["Responsive Design", "SEO", "Performance Optimization"] }
  ];

  const features = [
    {
      icon: Code2,
      title: "5+",
      description: t.about.experience
    },
    {
      icon: Palette,
      title: "50+",
      description: t.about.projects
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description: t.about.clients
    },
    {
      icon: Globe,
      title: t.about.skills,
      description: "HTML, CSS, JavaScript, React, TypeScript"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t.about.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.about.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="glass hover:shadow-card transition-all duration-300 hover:scale-105 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Icon size={24} className="text-background" />
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, index) => (
            <Card key={index} className="glass hover:shadow-card transition-all duration-300 fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-lg text-primary">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
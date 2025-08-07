import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const Work = () => {
  const projects = [
    {
      title: "Lanova Restaurant",
      description: "Modern restaurant website with elegant design, online reservation system, and interactive menu. Built with focus on user experience and mobile responsiveness.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop&crop=center",
      tags: ["React", "CSS3", "JavaScript", "Responsive Design"],
      liveUrl: "https://lanovarest.netlify.app/",
      status: "Live"
    },
    {
      title: "Restaurant Portfolio",
      description: "Showcase website for a fine dining restaurant featuring beautiful imagery, chef profiles, and reservation integration with modern animations.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop&crop=center",
      tags: ["HTML5", "CSS3", "JavaScript", "UI/UX"],
      liveUrl: "https://examplerestaurant.netlify.app/",
      status: "Live"
    },
    {
      title: "Modern Web Application",
      description: "Full-stack web application with clean interface, real-time features, and comprehensive dashboard. Currently in development phase.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center",
      tags: ["React", "TypeScript", "Node.js", "MongoDB"],
      liveUrl: "#",
      status: "In Progress"
    },
    {
      title: "E-commerce Platform",
      description: "Custom e-commerce solution with payment integration, inventory management, and admin dashboard. Mobile-first approach with PWA features.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop&crop=center",
      tags: ["React", "Stripe", "PWA", "Firebase"],
      liveUrl: "#",
      status: "Planning"
    }
  ];

  return (
    <section id="work" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Here are some of my recent projects showcasing my skills in web development, 
            design, and user experience. Each project represents a unique challenge and solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="glass hover:shadow-elevated transition-all duration-300 hover:scale-105 overflow-hidden group fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={project.status === "Live" ? "default" : project.status === "In Progress" ? "secondary" : "outline"}
                    className={project.status === "Live" ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    disabled={project.status === "Planning" || project.liveUrl === "#"}
                    onClick={() => project.liveUrl !== "#" && window.open(project.liveUrl, "_blank")}
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Live
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <Github size={16} className="mr-2" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
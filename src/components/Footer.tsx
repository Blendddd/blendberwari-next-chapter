import { Github, Instagram, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com"
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/blendd.22"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">My Portfolio</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              I'm a passionate web designer creating beautiful, functional websites 
              that help businesses grow and succeed in the digital world.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", id: "home" },
                { label: "About", id: "about" },
                { label: "Work", id: "work" },
                { label: "Services", id: "services" }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground hover:text-primary transition-colors link-underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="mailto:hello@portfolio.com" className="hover:text-primary transition-colors link-underline">
                  hello@portfolio.com
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="hover:text-primary transition-colors link-underline">
                  +1 (555) 123-4567
                </a>
              </li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} My Portfolio. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center mt-4 sm:mt-0">
            Made with <Heart size={16} className="text-red-500 mx-1" /> using React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
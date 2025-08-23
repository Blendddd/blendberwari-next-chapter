
import { Github, Instagram, X, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
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
    },
    {
      icon: X,
      label: "X",
      href: "https://x.com/blendd.22"
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
            <h3 className="text-2xl font-bold gradient-text mb-4">{t.nav.portfolio}</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              {t.hero.description}
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
                { label: t.nav.home, id: "home" },
                { label: t.nav.about, id: "about" },
                { label: t.nav.work, id: "work" },
                { label: t.nav.services, id: "services" }
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
            <h4 className="font-semibold mb-4">{t.contact.title}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="mailto:blendberwari25@gmail.com" className="hover:text-primary transition-colors link-underline">
                  blendberwari25@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+964750335185" className="hover:text-primary transition-colors link-underline">
                  +964 (750) 335 18 53
                </a>
              </li>
              <li>Zakho, Kurdistan</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            {t.footer.copyright}
          </p>
          <p className="text-muted-foreground text-sm flex items-center mt-4 sm:mt-0">
            Made by  {t.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

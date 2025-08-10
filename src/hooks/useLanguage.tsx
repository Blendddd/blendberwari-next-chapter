import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "ar";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  isRTL: boolean;
};

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  isRTL: false,
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "portfolio-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || defaultLanguage
  );

  const isRTL = language === "ar";

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Set document direction and language
    root.setAttribute("dir", isRTL ? "rtl" : "ltr");
    root.setAttribute("lang", language);
  }, [language, isRTL]);

  const value = {
    language,
    isRTL,
    setLanguage: (language: Language) => {
      localStorage.setItem(storageKey, language);
      setLanguage(language);
    },
  };

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
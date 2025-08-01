import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'pt' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys and values
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.business-apps': 'Business Apps',
    'nav.sector-suites': 'Sector Suites',
    'nav.digital-transformation': 'Digital Transformation',
    'nav.training-certification': 'Training and Certification',
    'nav.video-gallery': 'Video Gallery',
    'nav.blog': 'Blog',
    'nav.support': 'Support',
    'nav.client-login': 'Client Login',
    'nav.cart': 'Cart',
    'nav.start-demo': 'Start Demo',
    
    // Common
    'common.language': 'Language',
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.get-started': 'Get Started',
    'common.learn-more': 'Learn More',
    'common.contact-us': 'Contact Us',
    'common.request-demo': 'Request Demo',
    'common.get-quote': 'Get Quote',
    
    // Home page
    'home.hero.title': 'Nebusis®',
    'home.hero.subtitle': 'Empowering digital transformation with intelligent enterprise solutions',
    'home.stats.applications': 'Intelligent Applications',
    'home.stats.standards': 'ISO Standards',
    'home.stats.rating': 'Average Rating',
    'home.business-suite.title': 'Nebusis® Business Suite',
    'home.business-suite.description': 'Comprehensive digital transformation solutions designed for modern enterprises',
    
    // Certifications
    'cert.title': 'Training and Certification',
    'cert.description': 'Advance your career with industry-recognized certifications. Self-guided learning with automated certificate generation upon completion.',
    'cert.iso-compliance': 'Our certification programs comply with ISO/IEC 17024, the internationally recognized standard for personnel competence certification.',
    'cert.available-courses': 'Available Courses',
    'cert.compliance-standards': 'Compliance Standards',
    'cert.average-rating': 'Average Rating',
    
    // Pricing
    'pricing.title': 'Pricing',
    'pricing.basic': 'Basic',
    'pricing.pro': 'Pro',
    'pricing.enterprise': 'Enterprise',
    'pricing.per-user-month': 'per user/month',
    'pricing.request-quote': 'Request Quote',
    'pricing.setup-fee': 'Setup Fee',
    'pricing.annual-billing': 'Annual Billing',
    'pricing.monthly-billing': 'Monthly Billing',
  },
  es: {
    // Navigation
    'nav.business-apps': 'Aplicaciones Empresariales',
    'nav.sector-suites': 'Suites Sectoriales',
    'nav.digital-transformation': 'Transformación Digital',
    'nav.training-certification': 'Formación y Certificación',
    'nav.video-gallery': 'Galería de Videos',
    'nav.blog': 'Blog',
    'nav.support': 'Soporte',
    'nav.client-login': 'Acceso Cliente',
    'nav.cart': 'Carrito',
    'nav.start-demo': 'Iniciar Demo',
    
    // Common
    'common.language': 'Idioma',
    'common.loading': 'Cargando...',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.get-started': 'Comenzar',
    'common.learn-more': 'Saber Más',
    'common.contact-us': 'Contáctanos',
    'common.request-demo': 'Solicitar Demo',
    'common.get-quote': 'Obtener Cotización',
    
    // Home page
    'home.hero.title': 'Nebusis®',
    'home.hero.subtitle': 'Potenciando la transformación digital con soluciones empresariales inteligentes',
    'home.stats.applications': 'Aplicaciones Inteligentes',
    'home.stats.standards': 'Estándares ISO',
    'home.stats.rating': 'Calificación Promedio',
    'home.business-suite.title': 'Suite Empresarial Nebusis®',
    'home.business-suite.description': 'Soluciones integrales de transformación digital diseñadas para empresas modernas',
    
    // Certifications
    'cert.title': 'Formación y Certificación',
    'cert.description': 'Avanza tu carrera con certificaciones reconocidas por la industria. Aprendizaje autoguiado con generación automática de certificados al completar.',
    'cert.iso-compliance': 'Nuestros programas de certificación cumplen con ISO/IEC 17024, el estándar internacionalmente reconocido para la certificación de competencias del personal.',
    'cert.available-courses': 'Cursos Disponibles',
    'cert.compliance-standards': 'Estándares de Cumplimiento',
    'cert.average-rating': 'Calificación Promedio',
    
    // Pricing
    'pricing.title': 'Precios',
    'pricing.basic': 'Básico',
    'pricing.pro': 'Pro',
    'pricing.enterprise': 'Empresarial',
    'pricing.per-user-month': 'por usuario/mes',
    'pricing.request-quote': 'Solicitar Cotización',
    'pricing.setup-fee': 'Tarifa de Configuración',
    'pricing.annual-billing': 'Facturación Anual',
    'pricing.monthly-billing': 'Facturación Mensual',
  },
  fr: {
    // Navigation
    'nav.business-apps': 'Applications Métier',
    'nav.sector-suites': 'Suites Sectorielles',
    'nav.digital-transformation': 'Transformation Numérique',
    'nav.training-certification': 'Formation et Certification',
    'nav.video-gallery': 'Galerie Vidéo',
    'nav.blog': 'Blog',
    'nav.support': 'Support',
    'nav.client-login': 'Connexion Client',
    'nav.cart': 'Panier',
    'nav.start-demo': 'Démarrer Démo',
    
    // Common
    'common.language': 'Langue',
    'common.loading': 'Chargement...',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.get-started': 'Commencer',
    'common.learn-more': 'En Savoir Plus',
    'common.contact-us': 'Nous Contacter',
    'common.request-demo': 'Demander une Démo',
    'common.get-quote': 'Obtenir un Devis',
    
    // Home page
    'home.hero.title': 'Nebusis®',
    'home.hero.subtitle': 'Autonomiser la transformation numérique avec des solutions d\'entreprise intelligentes',
    'home.stats.applications': 'Applications Intelligentes',
    'home.stats.standards': 'Normes ISO',
    'home.stats.rating': 'Note Moyenne',
    'home.business-suite.title': 'Suite Entreprise Nebusis®',
    'home.business-suite.description': 'Solutions complètes de transformation numérique conçues pour les entreprises modernes',
    
    // Certifications
    'cert.title': 'Formation et Certification',
    'cert.description': 'Faites progresser votre carrière avec des certifications reconnues par l\'industrie. Apprentissage auto-guidé avec génération automatique de certificats à l\'achèvement.',
    'cert.iso-compliance': 'Nos programmes de certification sont conformes à ISO/IEC 17024, la norme internationalement reconnue pour la certification des compétences du personnel.',
    'cert.available-courses': 'Cours Disponibles',
    'cert.compliance-standards': 'Normes de Conformité',
    'cert.average-rating': 'Note Moyenne',
    
    // Pricing
    'pricing.title': 'Tarifs',
    'pricing.basic': 'Basique',
    'pricing.pro': 'Pro',
    'pricing.enterprise': 'Entreprise',
    'pricing.per-user-month': 'par utilisateur/mois',
    'pricing.request-quote': 'Demander un Devis',
    'pricing.setup-fee': 'Frais de Configuration',
    'pricing.annual-billing': 'Facturation Annuelle',
    'pricing.monthly-billing': 'Facturation Mensuelle',
  },
  pt: {
    // Navigation
    'nav.business-apps': 'Aplicações Empresariais',
    'nav.sector-suites': 'Suítes Setoriais',
    'nav.digital-transformation': 'Transformação Digital',
    'nav.training-certification': 'Treinamento e Certificação',
    'nav.video-gallery': 'Galeria de Vídeos',
    'nav.blog': 'Blog',
    'nav.support': 'Suporte',
    'nav.client-login': 'Login do Cliente',
    'nav.cart': 'Carrinho',
    'nav.start-demo': 'Iniciar Demo',
    
    // Common
    'common.language': 'Idioma',
    'common.loading': 'Carregando...',
    'common.search': 'Pesquisar',
    'common.filter': 'Filtrar',
    'common.get-started': 'Começar',
    'common.learn-more': 'Saber Mais',
    'common.contact-us': 'Contate-nos',
    'common.request-demo': 'Solicitar Demo',
    'common.get-quote': 'Obter Cotação',
    
    // Home page
    'home.hero.title': 'Nebusis®',
    'home.hero.subtitle': 'Capacitando a transformação digital com soluções empresariais inteligentes',
    'home.stats.applications': 'Aplicações Inteligentes',
    'home.stats.standards': 'Padrões ISO',
    'home.stats.rating': 'Avaliação Média',
    'home.business-suite.title': 'Suíte Empresarial Nebusis®',
    'home.business-suite.description': 'Soluções abrangentes de transformação digital projetadas para empresas modernas',
    
    // Certifications
    'cert.title': 'Treinamento e Certificação',
    'cert.description': 'Avance sua carreira com certificações reconhecidas pela indústria. Aprendizado autoguiado com geração automática de certificados na conclusão.',
    'cert.iso-compliance': 'Nossos programas de certificação estão em conformidade com ISO/IEC 17024, o padrão internacionalmente reconhecido para certificação de competência de pessoal.',
    'cert.available-courses': 'Cursos Disponíveis',
    'cert.compliance-standards': 'Padrões de Conformidade',
    'cert.average-rating': 'Avaliação Média',
    
    // Pricing
    'pricing.title': 'Preços',
    'pricing.basic': 'Básico',
    'pricing.pro': 'Pro',
    'pricing.enterprise': 'Empresarial',
    'pricing.per-user-month': 'por usuário/mês',
    'pricing.request-quote': 'Solicitar Cotação',
    'pricing.setup-fee': 'Taxa de Configuração',
    'pricing.annual-billing': 'Faturamento Anual',
    'pricing.monthly-billing': 'Faturamento Mensal',
  },
  ar: {
    // Navigation (Arabic RTL)
    'nav.business-apps': 'التطبيقات التجارية',
    'nav.sector-suites': 'مجموعات القطاعات',
    'nav.digital-transformation': 'التحول الرقمي',
    'nav.training-certification': 'التدريب والشهادات',
    'nav.video-gallery': 'معرض الفيديو',
    'nav.blog': 'المدونة',
    'nav.support': 'الدعم',
    'nav.client-login': 'تسجيل دخول العميل',
    'nav.cart': 'السلة',
    'nav.start-demo': 'بدء العرض التوضيحي',
    
    // Common
    'common.language': 'اللغة',
    'common.loading': 'جاري التحميل...',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.get-started': 'البدء',
    'common.learn-more': 'معرفة المزيد',
    'common.contact-us': 'اتصل بنا',
    'common.request-demo': 'طلب عرض توضيحي',
    'common.get-quote': 'الحصول على عرض أسعار',
    
    // Home page
    'home.hero.title': 'نيبوسيس®',
    'home.hero.subtitle': 'تمكين التحول الرقمي بحلول المؤسسات الذكية',
    'home.stats.applications': 'التطبيقات الذكية',
    'home.stats.standards': 'معايير الأيزو',
    'home.stats.rating': 'التقييم المتوسط',
    'home.business-suite.title': 'مجموعة الأعمال نيبوسيس®',
    'home.business-suite.description': 'حلول شاملة للتحول الرقمي مصممة للمؤسسات الحديثة',
    
    // Certifications
    'cert.title': 'التدريب والشهادات',
    'cert.description': 'قم بتطوير مسيرتك المهنية مع الشهادات المعترف بها في الصناعة. التعلم الذاتي مع إنشاء الشهادات تلقائياً عند الانتهاء.',
    'cert.iso-compliance': 'برامج الشهادات لدينا تتوافق مع ISO/IEC 17024، المعيار المعترف به دولياً لشهادة كفاءة الموظفين.',
    'cert.available-courses': 'الدورات المتاحة',
    'cert.compliance-standards': 'معايير الامتثال',
    'cert.average-rating': 'التقييم المتوسط',
    
    // Pricing
    'pricing.title': 'الأسعار',
    'pricing.basic': 'أساسي',
    'pricing.pro': 'متقدم',
    'pricing.enterprise': 'مؤسسي',
    'pricing.per-user-month': 'لكل مستخدم/شهر',
    'pricing.request-quote': 'طلب عرض أسعار',
    'pricing.setup-fee': 'رسوم الإعداد',
    'pricing.annual-billing': 'الفوترة السنوية',
    'pricing.monthly-billing': 'الفوترة الشهرية',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('nebusis-language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nebusis-language', lang);
    
    // Update document direction for RTL languages
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
    }
  };

  // Translation function
  const t = (key: string, fallback?: string): string => {
    const translation = translations[language]?.[key];
    if (translation) return translation;
    
    // Fallback to English if translation not found
    const englishTranslation = translations['en']?.[key];
    if (englishTranslation) return englishTranslation;
    
    // Return the fallback or the key itself
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
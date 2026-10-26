import type { Locale } from '@/types';

type TranslationDict = {
  nav: {
    work: string;
    services: string;
    about: string;
    contact: string;
    letsTalk: string;
  };
  hero: {
    metadata: string;
    headline: string;
    intro: string;
    exploreWork: string;
    startProject: string;
  };
  work: {
    heading: string;
    viewProject: string;
    livePreview: string;
    sourceCode: string;
    noProjects: string;
    noProjectsDesc: string;
    filter: string;
    all: string;
  };
  services: {
    heading: string;
    subheading: string;
    requestQuote: string;
    noServices: string;
    scope: string;
  };
  about: {
    heading: string;
    focusAreas: string;
    principles: string;
    downloadCv: string;
    noContent: string;
  };
  contact: {
    heading: string;
    subheading: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    projectTypeLabel: string;
    projectTypePlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    budgetLabel: string;
    budgetPlaceholder: string;
    timelineLabel: string;
    timelinePlaceholder: string;
    languageLabel: string;
    sendViaWhatsApp: string;
    sendViaEmail: string;
    whatsappNotice: string;
    emailNotice: string;
    noContactMethod: string;
    required: string;
    invalidEmail: string;
    projectTypes: {
      webApp: string;
      website: string;
      api: string;
      frontend: string;
      backend: string;
      other: string;
    };
    budgets: {
      small: string;
      medium: string;
      large: string;
      discuss: string;
    };
    timelines: {
      urgent: string;
      normal: string;
      flexible: string;
      discuss: string;
    };
  };
  capabilities: {
    heading: string;
  };
  approach: {
    heading: string;
    steps: {
      understand: string;
      plan: string;
      build: string;
      deliver: string;
    };
  };
  cta: {
    heading: string;
    subheading: string;
    action: string;
  };
  footer: {
    navigation: string;
    connect: string;
    rights: string;
  };
  common: {
    loading: string;
    error: string;
    notFound: string;
    notFoundDesc: string;
    backHome: string;
    viewAll: string;
    language: string;
    english: string;
    arabic: string;
    draft: string;
    published: string;
    featured: string;
  };
  admin: {
    login: {
      title: string;
      email: string;
      password: string;
      submit: string;
      error: string;
      unauthorized: string;
    };
    dashboard: {
      title: string;
      projects: string;
      published: string;
      drafts: string;
      featured: string;
      services: string;
      checklist: string;
    };
    projects: {
      title: string;
      new: string;
      edit: string;
      basicInfo: string;
      englishContent: string;
      arabicContent: string;
      technical: string;
      links: string;
      image: string;
      publishing: string;
      save: string;
      saveDraft: string;
      publish: string;
      unpublish: string;
      delete: string;
      confirmDelete: string;
      preview: string;
      slug: string;
      category: string;
      technologies: string;
      state: string;
      featured: string;
      order: string;
      title_en: string;
      title_ar: string;
      summary_en: string;
      summary_ar: string;
      overview_en: string;
      overview_ar: string;
      problem_en: string;
      problem_ar: string;
      solution_en: string;
      solution_ar: string;
      technical_en: string;
      technical_ar: string;
      challenges_en: string;
      challenges_ar: string;
      outcome_en: string;
      outcome_ar: string;
      liveUrl: string;
      sourceUrl: string;
      imageUrl: string;
      imageAlt_en: string;
      imageAlt_ar: string;
      completedAt: string;
    };
    content: {
      title: string;
      homePage: string;
      aboutPage: string;
      servicesPage: string;
      footer: string;
      save: string;
      english: string;
      arabic: string;
    };
    services: {
      title: string;
      new: string;
      edit: string;
      visible: string;
      hidden: string;
      save: string;
      delete: string;
      confirmDelete: string;
    };
    settings: {
      title: string;
      contact: string;
      social: string;
      siteMeta: string;
      save: string;
    };
    logout: string;
    backToSite: string;
  };
};

const en: TranslationDict = {
  nav: {
    work: 'Work',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    letsTalk: "Let's Talk",
  },
  hero: {
    metadata: 'INDEPENDENT WEB DEVELOPER · EGYPT / WORLDWIDE',
    headline: 'I BUILD DIGITAL PRODUCTS.',
    intro: "I'm a web developer focused on building thoughtful, functional, and reliable digital experiences — from frontend interfaces to backend systems.",
    exploreWork: 'Explore My Work',
    startProject: 'Start a Project',
  },
  work: {
    heading: 'SELECTED WORK & EXPERIMENTS',
    viewProject: 'View Project',
    livePreview: 'Live Preview',
    sourceCode: 'Source Code',
    noProjects: 'No Projects Yet',
    noProjectsDesc: 'Projects will appear here once they are published.',
    filter: 'Filter',
    all: 'All',
  },
  services: {
    heading: 'Services',
    subheading: 'What I can help you build',
    requestQuote: 'Start a Project',
    noServices: 'Services are being configured.',
    scope: 'Scope',
  },
  about: {
    heading: 'About',
    focusAreas: 'Technical Focus',
    principles: 'Working Principles',
    downloadCv: 'Download CV',
    noContent: 'About content is being prepared.',
  },
  contact: {
    heading: 'Start a Project',
    subheading: "Tell me what you're building, what you need, and what success looks like.",
    nameLabel: 'Your Name',
    namePlaceholder: 'How should I address you?',
    emailLabel: 'Email Address',
    emailPlaceholder: 'your@email.com',
    projectTypeLabel: 'Project Type',
    projectTypePlaceholder: 'Select a project type',
    descriptionLabel: 'Project Description',
    descriptionPlaceholder: 'Describe your project, goals, and requirements...',
    budgetLabel: 'Budget Range (Optional)',
    budgetPlaceholder: 'Select a range',
    timelineLabel: 'Timeline (Optional)',
    timelinePlaceholder: 'Select a timeline',
    languageLabel: 'Preferred Language',
    sendViaWhatsApp: 'Send via WhatsApp',
    sendViaEmail: 'Send via Email',
    whatsappNotice: 'WhatsApp will open with your message ready to review and send.',
    emailNotice: 'Your email client will open with the message ready to send.',
    noContactMethod: 'Contact methods are being configured. Please check back later.',
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    projectTypes: {
      webApp: 'Web Application',
      website: 'Website',
      api: 'API & Integration',
      frontend: 'Frontend Development',
      backend: 'Backend Development',
      other: 'Other',
    },
    budgets: {
      small: 'Under $5,000',
      medium: '$5,000 – $15,000',
      large: '$15,000+',
      discuss: "Let's discuss",
    },
    timelines: {
      urgent: 'Within 2 weeks',
      normal: '1 – 2 months',
      flexible: 'Flexible',
      discuss: "Let's discuss",
    },
  },
  capabilities: {
    heading: 'Capabilities',
  },
  approach: {
    heading: 'Working Approach',
    steps: {
      understand: 'Understand',
      plan: 'Plan',
      build: 'Build',
      deliver: 'Test & Deliver',
    },
  },
  cta: {
    heading: 'HAVE A PROJECT IN MIND?',
    subheading: "Tell me what you're building, what you need, and what success looks like.",
    action: 'Start a Conversation',
  },
  footer: {
    navigation: 'Navigation',
    connect: 'Connect',
    rights: 'All rights reserved.',
  },
  common: {
    loading: 'Loading...',
    error: 'Something went wrong',
    notFound: 'Page Not Found',
    notFoundDesc: "The page you're looking for doesn't exist or has been moved.",
    backHome: 'Back to Home',
    viewAll: 'View All',
    language: 'Language',
    english: 'English',
    arabic: 'العربية',
    draft: 'Draft',
    published: 'Published',
    featured: 'Featured',
  },
  admin: {
    login: {
      title: 'Admin Login',
      email: 'Email',
      password: 'Password',
      submit: 'Sign In',
      error: 'Invalid email or password',
      unauthorized: 'This account is not authorized.',
    },
    dashboard: {
      title: 'Dashboard',
      projects: 'Projects',
      published: 'Published',
      drafts: 'Drafts',
      featured: 'Featured',
      services: 'Services',
      checklist: 'Setup Checklist',
    },
    projects: {
      title: 'Projects',
      new: 'New Project',
      edit: 'Edit Project',
      basicInfo: 'Basic Information',
      englishContent: 'English Content',
      arabicContent: 'Arabic Content',
      technical: 'Technical Details',
      links: 'Links',
      image: 'Cover Image',
      publishing: 'Publishing',
      save: 'Save',
      saveDraft: 'Save Draft',
      publish: 'Publish',
      unpublish: 'Unpublish',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete this project? This cannot be undone.',
      preview: 'Preview',
      slug: 'Slug',
      category: 'Category',
      technologies: 'Technologies (comma-separated)',
      state: 'State',
      featured: 'Featured',
      order: 'Display Order',
      title_en: 'Title (English)',
      title_ar: 'Title (Arabic)',
      summary_en: 'Summary (English)',
      summary_ar: 'Summary (Arabic)',
      overview_en: 'Overview (English)',
      overview_ar: 'Overview (Arabic)',
      problem_en: 'Problem / Objective (English)',
      problem_ar: 'Problem / Objective (Arabic)',
      solution_en: 'Solution (English)',
      solution_ar: 'Solution (Arabic)',
      technical_en: 'Technical Implementation (English)',
      technical_ar: 'Technical Implementation (Arabic)',
      challenges_en: 'Challenges & Trade-offs (English)',
      challenges_ar: 'Challenges & Trade-offs (Arabic)',
      outcome_en: 'Outcome & Limitations (English)',
      outcome_ar: 'Outcome & Limitations (Arabic)',
      liveUrl: 'Live Preview URL',
      sourceUrl: 'Source Code URL',
      imageUrl: 'Cover Image URL',
      imageAlt_en: 'Image Alt Text (English)',
      imageAlt_ar: 'Image Alt Text (Arabic)',
      completedAt: 'Completion Date',
    },
    content: {
      title: 'Content',
      homePage: 'Home Page',
      aboutPage: 'About Page',
      servicesPage: 'Services Page',
      footer: 'Footer',
      save: 'Save',
      english: 'English',
      arabic: 'Arabic',
    },
    services: {
      title: 'Services',
      new: 'New Service',
      edit: 'Edit Service',
      visible: 'Visible',
      hidden: 'Hidden',
      save: 'Save',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete this service?',
    },
    settings: {
      title: 'Settings',
      contact: 'Contact Information',
      social: 'Social & Professional Links',
      siteMeta: 'Site Metadata',
      save: 'Save',
    },
    logout: 'Sign Out',
    backToSite: 'Back to Site',
  },
};

const ar: TranslationDict = {
  nav: {
    work: 'الأعمال',
    services: 'الخدمات',
    about: 'عنّي',
    contact: 'تواصل',
    letsTalk: 'تحدث معي',
  },
  hero: {
    metadata: 'مطور ويب مستقل · مصر / حول العالم',
    headline: 'أبني منتجات رقمية.',
    intro: 'مطور ويب أركز على بناء تجارب رقمية مدروسة وعملية وموثوقة — من واجهات المستخدم إلى أنظمة الخلفية.',
    exploreWork: 'استكشف أعمالي',
    startProject: 'ابدأ مشروعاً',
  },
  work: {
    heading: 'أعمال مختارة وتجارب',
    viewProject: 'عرض المشروع',
    livePreview: 'معاينة مباشرة',
    sourceCode: 'الكود المصدري',
    noProjects: 'لا توجد مشاريع بعد',
    noProjectsDesc: 'ستظهر المشاريع هنا بمجرد نشرها.',
    filter: 'تصفية',
    all: 'الكل',
  },
  services: {
    heading: 'الخدمات',
    subheading: 'ما يمكنني مساعدتك في بنائه',
    requestQuote: 'ابدأ مشروعاً',
    noServices: 'جارٍ تجهيز الخدمات.',
    scope: 'النطاق',
  },
  about: {
    heading: 'عنّي',
    focusAreas: 'التركيز التقني',
    principles: 'مبادئ العمل',
    downloadCv: 'تحميل السيرة الذاتية',
    noContent: 'جارٍ إعداد المحتوى.',
  },
  contact: {
    heading: 'ابدأ مشروعاً',
    subheading: 'أخبرني عما تبنيه، وما تحتاجه، وما يعنيه النجاح بالنسبة لك.',
    nameLabel: 'الاسم',
    namePlaceholder: 'كيف يمكنني مخاطبتك؟',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'your@email.com',
    projectTypeLabel: 'نوع المشروع',
    projectTypePlaceholder: 'اختر نوع المشروع',
    descriptionLabel: 'وصف المشروع',
    descriptionPlaceholder: 'صف مشروعك وأهدافك ومتطلباتك...',
    budgetLabel: 'نطاق الميزانية (اختياري)',
    budgetPlaceholder: 'اختر نطاقاً',
    timelineLabel: 'الجدول الزمني (اختياري)',
    timelinePlaceholder: 'اختر جدولاً زمنياً',
    languageLabel: 'اللغة المفضلة',
    sendViaWhatsApp: 'إرسال عبر واتساب',
    sendViaEmail: 'إرسال عبر البريد',
    whatsappNotice: 'سيتم فتح واتساب مع رسالتك جاهزة للمراجعة والإرسال.',
    emailNotice: 'سيتم فتح برنامج البريد مع الرسالة جاهزة للإرسال.',
    noContactMethod: 'جارٍ تجهيز وسائل التواصل. يرجى العودة لاحقاً.',
    required: 'هذا الحقل مطلوب',
    invalidEmail: 'يرجى إدخال بريد إلكتروني صالح',
    projectTypes: {
      webApp: 'تطبيق ويب',
      website: 'موقع إلكتروني',
      api: 'API وتكاملات',
      frontend: 'تطوير الواجهة الأمامية',
      backend: 'تطوير الخلفية',
      other: 'أخرى',
    },
    budgets: {
      small: 'أقل من ٥٬٠٠٠$',
      medium: '٥٬٠٠٠$ – ١٥٬٠٠٠$',
      large: 'أكثر من ١٥٬٠٠٠$',
      discuss: 'لنناقش',
    },
    timelines: {
      urgent: 'خلال أسبوعين',
      normal: '١ – ٢ شهر',
      flexible: 'مرن',
      discuss: 'لنناقش',
    },
  },
  capabilities: {
    heading: 'القدرات',
  },
  approach: {
    heading: 'نهج العمل',
    steps: {
      understand: 'الفهم',
      plan: 'التخطيط',
      build: 'البناء',
      deliver: 'الاختبار والتسليم',
    },
  },
  cta: {
    heading: 'لديك مشروع في ذهنك؟',
    subheading: 'أخبرني عما تبنيه، وما تحتاجه، وما يعنيه النجاح بالنسبة لك.',
    action: 'ابدأ محادثة',
  },
  footer: {
    navigation: 'التنقل',
    connect: 'تواصل',
    rights: 'جميع الحقوق محفوظة.',
  },
  common: {
    loading: 'جارٍ التحميل...',
    error: 'حدث خطأ ما',
    notFound: 'الصفحة غير موجودة',
    notFoundDesc: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    backHome: 'العودة للرئيسية',
    viewAll: 'عرض الكل',
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',
    draft: 'مسودة',
    published: 'منشور',
    featured: 'مميز',
  },
  admin: {
    login: {
      title: 'تسجيل دخول المسؤول',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      submit: 'تسجيل الدخول',
      error: 'بريد إلكتروني أو كلمة مرور غير صحيحة',
      unauthorized: 'هذا الحساب غير مخول.',
    },
    dashboard: {
      title: 'لوحة التحكم',
      projects: 'المشاريع',
      published: 'منشورة',
      drafts: 'مسودات',
      featured: 'مميزة',
      services: 'الخدمات',
      checklist: 'قائمة الإعداد',
    },
    projects: {
      title: 'المشاريع',
      new: 'مشروع جديد',
      edit: 'تعديل المشروع',
      basicInfo: 'المعلومات الأساسية',
      englishContent: 'المحتوى الإنجليزي',
      arabicContent: 'المحتوى العربي',
      technical: 'التفاصيل التقنية',
      links: 'الروابط',
      image: 'صورة الغلاف',
      publishing: 'النشر',
      save: 'حفظ',
      saveDraft: 'حفظ كمسودة',
      publish: 'نشر',
      unpublish: 'إلغاء النشر',
      delete: 'حذف',
      confirmDelete: 'هل أنت متأكد من حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء.',
      preview: 'معاينة',
      slug: 'الرابط المختصر',
      category: 'الفئة',
      technologies: 'التقنيات (مفصولة بفواصل)',
      state: 'الحالة',
      featured: 'مميز',
      order: 'ترتيب العرض',
      title_en: 'العنوان (إنجليزي)',
      title_ar: 'العنوان (عربي)',
      summary_en: 'الملخص (إنجليزي)',
      summary_ar: 'الملخص (عربي)',
      overview_en: 'نظرة عامة (إنجليزي)',
      overview_ar: 'نظرة عامة (عربي)',
      problem_en: 'المشكلة / الهدف (إنجليزي)',
      problem_ar: 'المشكلة / الهدف (عربي)',
      solution_en: 'الحل (إنجليزي)',
      solution_ar: 'الحل (عربي)',
      technical_en: 'التنفيذ التقني (إنجليزي)',
      technical_ar: 'التنفيذ التقني (عربي)',
      challenges_en: 'التحديات والمقايضات (إنجليزي)',
      challenges_ar: 'التحديات والمقايضات (عربي)',
      outcome_en: 'النتيجة والقيود (إنجليزي)',
      outcome_ar: 'النتيجة والقيود (عربي)',
      liveUrl: 'رابط المعاينة المباشرة',
      sourceUrl: 'رابط الكود المصدري',
      imageUrl: 'رابط صورة الغلاف',
      imageAlt_en: 'نص بديل للصورة (إنجليزي)',
      imageAlt_ar: 'نص بديل للصورة (عربي)',
      completedAt: 'تاريخ الإنجاز',
    },
    content: {
      title: 'المحتوى',
      homePage: 'الصفحة الرئيسية',
      aboutPage: 'صفحة عنّي',
      servicesPage: 'صفحة الخدمات',
      footer: 'التذييل',
      save: 'حفظ',
      english: 'إنجليزي',
      arabic: 'عربي',
    },
    services: {
      title: 'الخدمات',
      new: 'خدمة جديدة',
      edit: 'تعديل الخدمة',
      visible: 'مرئية',
      hidden: 'مخفية',
      save: 'حفظ',
      delete: 'حذف',
      confirmDelete: 'هل أنت متأكد من حذف هذه الخدمة؟',
    },
    settings: {
      title: 'الإعدادات',
      contact: 'معلومات التواصل',
      social: 'الروابط الاجتماعية والمهنية',
      siteMeta: 'بيانات الموقع',
      save: 'حفظ',
    },
    logout: 'تسجيل الخروج',
    backToSite: 'العودة للموقع',
  },
};

const translations: Record<Locale, TranslationDict> = { en, ar };

export function getTranslations(locale: Locale): TranslationDict {
  return translations[locale] || translations.en;
}

export type { TranslationDict };

export type ProjectCategory = 'ai-ml' | 'computer-vision' | 'full-stack' | 'security' | 'data-cloud';

export interface Project {
  id: string;
  slug: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  stack: string[];
  status: 'active' | 'prototype' | 'completed' | 'hackathon';
  featured: boolean;
  githubUrl: string;
  demoUrl?: string;
  demoLabel?: string;
  context?: string;
  solution?: string;
  features?: string[];
  architecture?: string;
  myRole?: string;
  color: string; // Subtle accent for visual differentiation
}

export const PROJECTS: Project[] = [
  {
    id: 'deepshield',
    slug: 'deepshield',
    number: '01',
    name: 'DeepShield',
    tagline: 'AI-Powered Deepfake Detection & Cybersecurity Platform',
    description:
      'An intelligent cybersecurity platform that protects users from deepfakes, AI-generated content, identity misuse, and image leaks by combining Vision Transformer models, reverse image intelligence, perceptual hashing, and automated legal response generation.',
    categories: ['ai-ml', 'computer-vision', 'security'],
    stack: ['Python', 'FastAPI', 'React', 'Vite', 'Vision Transformer', 'Uvicorn', 'Perceptual Hashing'],
    status: 'active',
    featured: true,
    githubUrl: 'https://github.com/abhisheksuvarna782-coder/DeepShield',
    context:
      'Deepfake and AI-generated content pose growing threats to digital identity and personal safety. Existing tools are fragmented across platforms and lack integrated legal response workflows.',
    solution:
      'DeepShield unifies AI deepfake detection (Vision Transformer), NSFW content classification, reverse image search for leak intelligence, and an automated legal toolkit—DMCA notices, police complaint drafts, and platform removal requests—into a single platform.',
    features: [
      'Vision Transformer (ViT) based deepfake detection',
      'AI-generated image classification',
      'NSFW content detection and safety classification',
      'Reverse image search with perceptual hash matching',
      'Automated DMCA takedown and police complaint generation',
      'Continuous web monitoring dashboard',
      'Privacy-first architecture with local hashing',
    ],
    architecture:
      'React + Vite frontend communicates with a FastAPI backend. Multiple trained models (ViT, NSFW classifier) are served as inference endpoints. Perceptual hashing runs locally for privacy.',
    myRole: 'Full-stack development and AI model integration.',
    color: '#777C5B',
  },
  {
    id: 'route-recover-ai',
    slug: 'route-recover-ai',
    number: '02',
    name: 'RouteRecover AI',
    tagline: 'AI-Powered Travel Disruption Recovery Platform',
    description:
      'An intelligent travel recovery platform that helps travellers recover from flight cancellations, missed connections, and major delays by generating constraint-aware alternative itineraries considering budget, deadlines, and personal constraints.',
    categories: ['ai-ml', 'full-stack'],
    stack: ['Python', 'AI Planning', 'Vercel'],
    status: 'hackathon',
    featured: true,
    githubUrl: 'https://github.com/abhisheksuvarna782-coder/ROUTE_RECOVER_AI',
    demoUrl: 'https://route-recover-ai.vercel.app',
    demoLabel: 'Live Demo',
    context:
      'Built for Sahyadri DevHost 2026 / Synergia 26 — Problem Statement 4.1, Team QuadCoders. Travel disruptions force travellers to manually search across multiple platforms while managing budget, deadline, and itinerary constraints simultaneously.',
    solution:
      'RouteRecover AI transforms travel disruption into a structured recovery process. It organises trip information, evaluates alternative options against real-world constraints, and presents ranked recovery plans in a centralised workspace.',
    features: [
      'Constraint-aware recovery planning (budget, deadlines, itinerary)',
      'AI-assisted route and itinerary evaluation',
      'Centralised trip and disruption management',
      'Alternative transport mode comparison',
      'Deadline-focused ranking of recovery options',
    ],
    architecture:
      'Python backend with AI-oriented planning logic. Deployed to Vercel.',
    myRole: 'Backend development, AI recovery planning logic, and deployment.',
    color: '#A88A62',
  },
  {
    id: 'cyberguard-x',
    slug: 'cyberguard-x',
    number: '03',
    name: 'CyberGuard X',
    tagline: 'ML-Powered Spam Detection & Threat Intelligence',
    description:
      'An intelligent spam detection and phone number threat analysis system powered by trained machine learning models. Classifies messages as spam or legitimate, analyses phone number threat levels, and provides real-time cyber threat insights.',
    categories: ['ai-ml', 'security'],
    stack: ['Python', 'Flask', 'scikit-learn', 'NumPy', 'Pandas', 'HTML', 'CSS', 'Railway'],
    status: 'active',
    featured: true,
    githubUrl: 'https://github.com/abhisheksuvarna782-coder/CYBERGUARD-X',
    demoUrl: 'https://joyful-forgiveness-production-3ac1.up.railway.app',
    demoLabel: 'Live Demo',
    context:
      'Spam messages and malicious phone numbers are widespread threats. Most users lack accessible, real-time tools for threat classification.',
    solution:
      'CyberGuard X provides a clean web interface backed by trained classification models (model.pkl, vectorizer.pkl) for spam and phone number threat analysis, with database logging and analytics.',
    features: [
      'AI-powered spam message classification',
      'Phone number threat intelligence analysis',
      'Real-time prediction engine',
      'Trained scikit-learn classification models',
      'Database logging and analytics',
      'Production-deployed backend',
    ],
    architecture:
      'Flask server hosts trained scikit-learn models as inference endpoints. HTML/CSS frontend communicates via REST. Deployed on Railway.',
    myRole: 'Machine learning model training, backend API, and deployment.',
    color: '#777C5B',
  },
  {
    id: 'healvision',
    slug: 'healvision',
    number: '04',
    name: 'HealVision',
    tagline: 'AI Health Analysis & Personalised Wellness Platform',
    description:
      'An AI-powered health analysis application delivering personalised health insights and wellness recommendations. Developed under national hackathon time constraints using Python and machine learning.',
    categories: ['ai-ml'],
    stack: ['Python', 'Machine Learning', 'Healthcare Analytics', 'FastAPI'],
    status: 'hackathon',
    featured: true,
    githubUrl: 'https://github.com/abhisheksuvarna782-coder/healvision-backend',
    context:
      'Developed at a national hackathon. The challenge was to make personalised health guidance accessible without requiring clinical expertise from the user.',
    solution:
      'HealVision processes health input data through machine learning pipelines to surface personalised insights and actionable wellness recommendations.',
    features: [
      'Personalised health insight generation',
      'Wellness recommendation engine',
      'Machine learning-driven health analytics',
    ],
    architecture:
      'Python + FastAPI backend with ML inference pipeline. Backend-focused implementation developed under hackathon constraints.',
    myRole: 'Backend development and ML pipeline integration.',
    color: '#A88A62',
  },
  {
    id: 'pathfinder-ai',
    slug: 'pathfinder-ai',
    number: '05',
    name: 'PathFinder AI',
    tagline: 'AI-Guided Learning & Career Path Platform',
    description:
      'An AI-driven platform for learning path guidance and career development recommendations, helping users navigate skill development systematically.',
    categories: ['ai-ml', 'full-stack'],
    stack: ['Python', 'AI/ML', 'Web Development'],
    status: 'prototype',
    featured: false,
    githubUrl: 'https://github.com/abhisheksuvarna782-coder/PATHFINDER_AI',
    color: '#777C5B',
  },
  {
    id: 'finance-dashboard',
    slug: 'finance-dashboard',
    number: '06',
    name: 'Finance Dashboard',
    tagline: 'Full-Stack Financial Data Visualisation',
    description:
      'A full-stack financial dashboard with data synchronisation between frontend and backend, providing an interactive interface for financial metrics and CRM data.',
    categories: ['full-stack', 'data-cloud'],
    stack: ['JavaScript', 'HTML', 'CSS', 'REST API'],
    status: 'completed',
    featured: false,
    githubUrl: 'https://github.com/abhisheksuvarna782-coder/FINANCE-DASHBOARD',
    color: '#A88A62',
  },
  {
    id: 'weather-ai',
    slug: 'weather-ai',
    number: '07',
    name: 'Weather AI',
    tagline: 'Real-Time Location-Based Weather Application',
    description:
      'A responsive, location-based weather application with multi-day forecasts fetched from an external Weather API, built with vanilla JavaScript.',
    categories: ['full-stack'],
    stack: ['JavaScript', 'HTML', 'CSS', 'Weather API', 'Geolocation API'],
    status: 'completed',
    featured: false,
    githubUrl: 'https://github.com/abhisheksuvarna782-coder/weather_AI',
    color: '#777C5B',
  },
  {
    id: 'viksith-bharat',
    slug: 'viksith-bharat',
    number: '08',
    name: 'Viksith Bharat',
    tagline: 'Technology Project for National Development',
    description:
      'A software project exploring technology solutions for national development challenges, aligned with the Viksit Bharat initiative.',
    categories: ['full-stack'],
    stack: ['Python', 'Web Development'],
    status: 'prototype',
    featured: false,
    githubUrl: 'https://github.com/abhisheksuvarna782-coder/Viksith-Bharat-Project',
    color: '#A88A62',
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
export const ARCHIVE_PROJECTS = PROJECTS.filter((p) => !p.featured);

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  'ai-ml': 'AI & Machine Learning',
  'computer-vision': 'Computer Vision',
  'full-stack': 'Full Stack',
  'security': 'Cybersecurity',
  'data-cloud': 'Data & Cloud',
};

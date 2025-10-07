export const INDUSTRIES = [
  'Healthcare',
  'Finance',
  'Education',
  'E-commerce',
  'Entertainment',
  'Transportation',
  'Agriculture',
  'Manufacturing',
  'Real Estate',
  'Social Media',
  'Gaming',
  'Cybersecurity',
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Cloud Computing',
  'Blockchain',
  'Cryptocurrency',
  'Fintech',
  'EdTech',
  'HealthTech',
  'AgriTech',
  'Clean Energy',
  'Environmental',
  'Sustainability',
  'Smart Cities',
  'IoT',
  'Robotics',
  'Automation',
  'Telecommunications',
  'Media',
  'Publishing',
  'Retail',
  'Hospitality',
  'Tourism',
  'Sports',
  'Fitness',
  'Wellness',
  'Food & Beverage',
  'Logistics',
  'Supply Chain',
  'Government',
  'Non-profit',
  'Legal',
  'Insurance',
  'Consulting',
  'Marketing',
  'Advertising',
  'Human Resources',
  'Recruitment',
] as const;

export const PROJECT_TYPES = [
  'Mobile App',
  'Web App',
  'Desktop App',
  'IoT App',
] as const;

export const DIFFICULTY_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
] as const;

export type Industry = typeof INDUSTRIES[number];
export type ProjectType = typeof PROJECT_TYPES[number];
export type DifficultyLevel = typeof DIFFICULTY_LEVELS[number];

export interface CapstoneIdeaRequest {
  industry: string;
  projectType: string;
  difficulty: string;
}

export interface CapstoneIdeaResponse {
  title: string;
  description: string;
  technologyStack: string[];
  similarProjects: Array<{
    name: string;
    description: string;
    url: string;
  }>;
  learningOutcomes: string[];
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: string;
  prerequisites: string[];
}

export interface CapstoneIdea extends CapstoneIdeaResponse {
  industry: string;
  projectType: string;
  difficulty: string;
}
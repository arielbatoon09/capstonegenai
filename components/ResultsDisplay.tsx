import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Code as Code2, Layers, ExternalLink } from 'lucide-react';
import { CapstoneIdea } from '../types/capstone';

// Technology database with purposes and official websites
const TECHNOLOGY_DATABASE: Record<string, { purpose: string; url: string }> = {
  // Frontend Technologies
  'React': { purpose: 'Frontend library for building user interfaces', url: 'https://reactjs.org' },
  'Vue.js': { purpose: 'Progressive JavaScript framework for building UIs', url: 'https://vuejs.org' },
  'Angular': { purpose: 'Platform for building mobile and desktop web applications', url: 'https://angular.io' },
  'Next.js': { purpose: 'React framework for production with server-side rendering', url: 'https://nextjs.org' },
  'Nuxt.js': { purpose: 'Vue.js framework for building modern web applications', url: 'https://nuxtjs.org' },
  'Svelte': { purpose: 'Component framework for building fast web applications', url: 'https://svelte.dev' },
  'TypeScript': { purpose: 'Typed superset of JavaScript for better development', url: 'https://www.typescriptlang.org' },
  'JavaScript': { purpose: 'Programming language for web development', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  'HTML': { purpose: 'Markup language for creating web pages', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  'CSS': { purpose: 'Styling language for web pages', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  'Tailwind CSS': { purpose: 'Utility-first CSS framework for rapid UI development', url: 'https://tailwindcss.com' },
  'Bootstrap': { purpose: 'CSS framework for responsive web design', url: 'https://getbootstrap.com' },
  'Material-UI': { purpose: 'React components implementing Google Material Design', url: 'https://mui.com' },
  'Chakra UI': { purpose: 'Simple, modular and accessible component library', url: 'https://chakra-ui.com' },
  
  // Backend Technologies
  'Node.js': { purpose: 'JavaScript runtime for server-side development', url: 'https://nodejs.org' },
  'Express.js': { purpose: 'Fast, unopinionated web framework for Node.js', url: 'https://expressjs.com' },
  'Python': { purpose: 'High-level programming language for web and data science', url: 'https://www.python.org' },
  'Django': { purpose: 'High-level Python web framework for rapid development', url: 'https://www.djangoproject.com' },
  'Flask': { purpose: 'Lightweight Python web framework', url: 'https://flask.palletsprojects.com' },
  'FastAPI': { purpose: 'Modern, fast web framework for building APIs with Python', url: 'https://fastapi.tiangolo.com' },
  'Java': { purpose: 'Object-oriented programming language for enterprise applications', url: 'https://www.java.com' },
  'Spring Boot': { purpose: 'Java framework for building microservices and web applications', url: 'https://spring.io/projects/spring-boot' },
  'C#': { purpose: 'Microsoft programming language for .NET applications', url: 'https://docs.microsoft.com/en-us/dotnet/csharp' },
  '.NET': { purpose: 'Microsoft framework for building various types of applications', url: 'https://dotnet.microsoft.com' },
  'PHP': { purpose: 'Server-side scripting language for web development', url: 'https://www.php.net' },
  'Laravel': { purpose: 'PHP web framework with elegant syntax', url: 'https://laravel.com' },
  'Ruby': { purpose: 'Dynamic programming language focused on simplicity', url: 'https://www.ruby-lang.org' },
  'Ruby on Rails': { purpose: 'Ruby web framework for rapid application development', url: 'https://rubyonrails.org' },
  'Go': { purpose: 'Google programming language for efficient system programming', url: 'https://golang.org' },
  'Rust': { purpose: 'Systems programming language focused on safety and performance', url: 'https://www.rust-lang.org' },
  
  // Databases
  'MongoDB': { purpose: 'NoSQL document database for modern applications', url: 'https://www.mongodb.com' },
  'PostgreSQL': { purpose: 'Advanced open-source relational database', url: 'https://www.postgresql.org' },
  'MySQL': { purpose: 'Popular open-source relational database management system', url: 'https://www.mysql.com' },
  'SQLite': { purpose: 'Lightweight, serverless SQL database engine', url: 'https://www.sqlite.org' },
  'Redis': { purpose: 'In-memory data structure store for caching and messaging', url: 'https://redis.io' },
  'Firebase': { purpose: 'Google platform for building mobile and web applications', url: 'https://firebase.google.com' },
  'Supabase': { purpose: 'Open-source Firebase alternative with PostgreSQL', url: 'https://supabase.com' },
  
  // Cloud & DevOps
  'AWS': { purpose: 'Amazon Web Services cloud computing platform', url: 'https://aws.amazon.com' },
  'Google Cloud': { purpose: 'Google Cloud Platform for cloud computing services', url: 'https://cloud.google.com' },
  'Azure': { purpose: 'Microsoft cloud computing platform', url: 'https://azure.microsoft.com' },
  'Docker': { purpose: 'Platform for developing, shipping, and running applications', url: 'https://www.docker.com' },
  'Kubernetes': { purpose: 'Container orchestration platform for managing applications', url: 'https://kubernetes.io' },
  'Git': { purpose: 'Distributed version control system', url: 'https://git-scm.com' },
  'GitHub': { purpose: 'Code hosting platform for version control and collaboration', url: 'https://github.com' },
  'GitLab': { purpose: 'DevOps platform for software development lifecycle', url: 'https://gitlab.com' },
  
  // Mobile Development
  'React Native': { purpose: 'Framework for building native mobile apps with React', url: 'https://reactnative.dev' },
  'Flutter': { purpose: 'Google UI toolkit for building natively compiled applications', url: 'https://flutter.dev' },
  'Ionic': { purpose: 'Framework for building cross-platform mobile apps', url: 'https://ionicframework.com' },
  'Xamarin': { purpose: 'Microsoft framework for building native mobile apps', url: 'https://dotnet.microsoft.com/apps/xamarin' },
  'Swift': { purpose: 'Apple programming language for iOS development', url: 'https://developer.apple.com/swift' },
  'Kotlin': { purpose: 'Modern programming language for Android development', url: 'https://kotlinlang.org' },
  
  // AI/ML
  'TensorFlow': { purpose: 'Open-source machine learning platform', url: 'https://www.tensorflow.org' },
  'PyTorch': { purpose: 'Deep learning framework for research and production', url: 'https://pytorch.org' },
  'Scikit-learn': { purpose: 'Machine learning library for Python', url: 'https://scikit-learn.org' },
  'OpenAI': { purpose: 'AI research and deployment company', url: 'https://openai.com' },
  
  // Testing
  'Jest': { purpose: 'JavaScript testing framework', url: 'https://jestjs.io' },
  'Cypress': { purpose: 'End-to-end testing framework for web applications', url: 'https://www.cypress.io' },
  'Selenium': { purpose: 'Web browser automation framework', url: 'https://selenium.dev' },
  
  // Additional Technologies
  'GraphQL': { purpose: 'Query language and runtime for APIs', url: 'https://graphql.org' },
  'REST API': { purpose: 'Architectural style for designing web services', url: 'https://restfulapi.net' },
  'WebSocket': { purpose: 'Communication protocol for real-time web applications', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API' },
  'OAuth': { purpose: 'Authorization framework for secure API access', url: 'https://oauth.net' },
  'JWT': { purpose: 'JSON Web Token for secure information transmission', url: 'https://jwt.io' },
};

interface ResultsDisplayProps {
  idea: CapstoneIdea | null;
  isLoading: boolean;
}

export function ResultsDisplay({ idea, isLoading }: ResultsDisplayProps) {
  if (isLoading) {
    return (
      <div className="h-full overflow-y-auto w-full">
        <div className="space-y-4 pr-2 w-full grid lg:grid-cols-2 gap-4">
          {/* Main Idea Card Skeleton */}
          <Card className="border-2 border-blue-200 shadow-md flex flex-col pt-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50 p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg shadow-sm">
                  <div className="h-5 w-5 bg-white/30 rounded animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="h-6 bg-slate-200 rounded animate-pulse w-4/5 mb-2" />
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-blue-200 rounded animate-pulse" />
                    <div className="h-5 w-20 bg-emerald-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-1 flex flex-col justify-center">
              <div className="space-y-2">
                <div className="h-3 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 bg-slate-200 rounded animate-pulse w-5/6" />
                <div className="h-3 bg-slate-200 rounded animate-pulse w-4/5" />
              </div>
            </CardContent>
          </Card>

          {/* Project Details Card Skeleton */}
          <Card className="shadow-md flex flex-col pt-0">
            <CardHeader className="bg-blue-50 p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-500 rounded-md">
                  <div className="h-6 w-6 bg-white/30 rounded animate-pulse" />
                </div>
                <div className="h-5 bg-slate-200 rounded animate-pulse w-32" />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-1 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="h-3 bg-slate-200 rounded animate-pulse w-16 mx-auto mb-1" />
                  <div className="h-5 bg-slate-200 rounded animate-pulse w-12 mx-auto" />
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="h-3 bg-slate-200 rounded animate-pulse w-24 mx-auto mb-1" />
                  <div className="h-5 bg-slate-200 rounded animate-pulse w-16 mx-auto" />
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="h-3 bg-slate-200 rounded animate-pulse w-14 mx-auto mb-1" />
                  <div className="h-5 bg-slate-200 rounded animate-pulse w-20 mx-auto" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="h-6 bg-slate-200 rounded animate-pulse w-32 mb-2" />
                  <div className="space-y-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="h-3 w-3 bg-green-200 rounded-full animate-pulse mt-0.5" />
                        <div className="h-3 bg-slate-200 rounded animate-pulse flex-1" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="h-6 bg-slate-200 rounded animate-pulse w-24 mb-2" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-5 w-16 bg-orange-200 rounded animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology Stack Card Skeleton */}
          <Card className="shadow-md flex flex-col pt-0">
            <CardHeader className="bg-emerald-50 p-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-500 rounded-md">
                  <div className="h-4 w-4 bg-white/30 rounded animate-pulse" />
                </div>
                <div className="h-5 bg-slate-200 rounded animate-pulse w-48" />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-1 flex flex-col justify-center">
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="h-4 bg-slate-200 rounded animate-pulse w-24 mb-1" />
                        <div className="h-3 bg-slate-200 rounded animate-pulse w-full mb-2" />
                      </div>
                      <div className="h-3 w-16 bg-blue-200 rounded animate-pulse flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Similar Projects Card Skeleton */}
          <Card className="shadow-md flex flex-col pt-0">
            <CardHeader className="bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-600 rounded-md">
                  <div className="h-4 w-4 bg-white/30 rounded animate-pulse" />
                </div>
                <div className="h-5 bg-slate-200 rounded animate-pulse w-32" />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-1 flex flex-col justify-center">
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 rounded-lg border border-slate-200">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="h-4 bg-slate-200 rounded animate-pulse w-28 mb-1" />
                        <div className="h-3 bg-slate-200 rounded animate-pulse w-full mb-2" />
                        <div className="h-3 bg-slate-200 rounded animate-pulse w-3/4" />
                      </div>
                      <div className="h-3 w-12 bg-blue-200 rounded animate-pulse flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="bg-white/50 rounded-xl border-2 border-dashed border-slate-300 p-8 flex flex-col items-center justify-center h-full min-h-[400px] w-full lg:w-1/2 mx-auto">
        <Lightbulb className="h-12 w-12 text-slate-300 mb-3" />
        <h3 className="text-lg font-semibold text-slate-400 mb-2">No Results Yet</h3>
        <p className="text-slate-400 text-center text-sm max-w-xs">
          Select your preferences and click Generate to get your capstone project idea.
          Loading time may vary based on the AI model and project complexity.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto w-full">
      <div className="space-y-4 pr-2 w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Main Idea Card */}
        <Card className="border-2 border-blue-200 shadow-md flex flex-col pt-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50 p-4 rounded-t-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg shadow-sm">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg mb-2 text-slate-800">{idea.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs">
                    {idea.industry}
                  </Badge>
                  <Badge variant="outline" className="border-emerald-300 text-emerald-700 text-xs">
                    {idea.projectType}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-1 flex flex-col justify-center">
            <p className="text-slate-700 leading-relaxed text-sm">{idea.description}</p>
          </CardContent>
        </Card>

        {/* Project Details Card */}
        <Card className="shadow-md flex flex-col pt-0 border-gray-200">
          <CardHeader className="bg-blue-50 p-4 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500 rounded-md">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg text-slate-800">Project Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-1 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-sm font-medium text-slate-600 mb-1">Difficulty</div>
                <div className="text-lg font-semibold text-slate-800">{idea.difficultyLevel}</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-sm font-medium text-slate-600 mb-1">Estimated Months</div>
                <div className="text-lg font-semibold text-slate-800">{idea.estimatedHours}</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-sm font-medium text-slate-600 mb-1">Team Size</div>
                <div className="text-lg font-semibold text-slate-800">1-4 students</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Learning Outcomes</h4>
                <ul className="space-y-1">
                  {idea.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-green-500 font-bold mt-0.5">✓</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Prerequisites</h4>
                <div className="flex flex-wrap gap-2">
                  {idea.prerequisites.map((prereq, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-orange-300 text-orange-700">
                      {prereq}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack Card */}
        <Card className="shadow-md flex flex-col pt-0">
          <CardHeader className="bg-emerald-50 p-4 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-500 rounded-md">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-slate-800">Technology Stack (For Reference Only)</CardTitle>
                <p className="text-slate-600 text-xs mb-2">Feel free to decide on a different technology stack based on your own preferences and needs.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-1 flex flex-col">
            <div className="space-y-3">
              {idea.technologyStack.map((tech, index) => {
                const techInfo = TECHNOLOGY_DATABASE[tech] || {
                  purpose: 'Technology for software development',
                  url: `https://www.google.com/search?q=${encodeURIComponent(tech)}`
                };
                
                return (
                  <div key={index} className="p-3 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all duration-200">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-800 mb-1 text-sm">{tech}</h4>
                        <p className="text-slate-600 text-xs mb-2">{techInfo.purpose}</p>
                      </div>
                      <a
                        href={techInfo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors flex-shrink-0"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Learn More
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Similar Projects Card */}
        <Card className="shadow-md flex flex-col pt-0 !rounded-lg">
          <CardHeader className="bg-slate-50 p-4 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-600 rounded-md">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg text-slate-800">Similar Projects</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-1 flex flex-col">
            <div className="space-y-3">
              {idea.similarProjects.map((project, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 mb-1 text-sm truncate">{project.name}</h4>
                      <p className="text-slate-600 text-xs mb-2 line-clamp-2">{project.description}</p>
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors flex-shrink-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Visit
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
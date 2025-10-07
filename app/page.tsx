'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FilterSection } from '@/components/FilterSection';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { generateCapstoneIdeaAction } from '@/app/actions/generate-idea';
import { Industry, ProjectType, DifficultyLevel, CapstoneIdea } from '@/types/capstone';
import { Sparkles, GraduationCap, Clock } from 'lucide-react';
import { toast } from "sonner";
import { Toaster } from "sonner";

function App() {
  const [industry, setIndustry] = useState<Industry | ''>('');
  const [projectType, setProjectType] = useState<ProjectType | ''>('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel | ''>('');
  const [idea, setIdea] = useState<CapstoneIdea | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [rateLimitResetTime, setRateLimitResetTime] = useState<number | null>(null);

  // Update countdown timer for server-side rate limiting
  useEffect(() => {
    if (!rateLimitResetTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, rateLimitResetTime - now);
      setTimeRemaining(Math.ceil(remaining / 1000));

      if (remaining <= 0) {
        setRateLimitResetTime(null);
        setTimeRemaining(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [rateLimitResetTime]);

  const handleGenerate = async () => {
    if (!industry || !projectType || !difficulty) {
      toast.error('Please select an industry, project type, and difficulty level.');
      return;
    }

    // Check if rate limited
    if (rateLimitResetTime && Date.now() < rateLimitResetTime) {
      const remainingTime = Math.ceil((rateLimitResetTime - Date.now()) / 1000);
      toast.error(`Please wait ${remainingTime} seconds before generating another idea.`);
      return;
    }

    setIsLoading(true);
    setIdea(null);

    try {
      const result = await generateCapstoneIdeaAction({
        industry,
        projectType,
        difficulty,
      });

      if (result.success && result.data) {
        setIdea(result.data as CapstoneIdea);
        toast.success('Your capstone idea has been generated successfully!');
      } else {
        // Handle rate limiting from server
        if (result.resetTime) {
          setRateLimitResetTime(result.resetTime);
          const remainingTime = Math.ceil((result.resetTime - Date.now()) / 1000);
          toast.error(`Rate limit exceeded. Please wait ${remainingTime} seconds before trying again.`);
        } else {
          toast.error(result.error || 'Failed to generate capstone idea. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error generating idea:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const canGenerate = industry && projectType && !isLoading;

  // Check if rate limited
  const isRateLimited = () => {
    return !!(rateLimitResetTime && Date.now() < rateLimitResetTime);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      <div className="container mx-auto">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-4 px-4 flex-shrink-0 mt-10"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <GraduationCap className="h-12 w-12 text-blue-600" />
            </motion.div>
            <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Capstone Idea Generator
            </h1>
          </div>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Discover innovative project ideas for your IT/Computer Science capstone.
          </p>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto pt-2">
            Created with ❤️ by <a href="https://www.arielbatoon.com/" className="text-blue-600">Ariel Batoon</a>
          </p>
        </motion.div>

        {/* Main Content - Full Width Layout */}
        <div className="flex-1 w-full px-4 pb-4 mt-10">
          <div className="grid grid-cols-1 gap-10 h-full w-full max-w-none">
            {/* Left Panel - Controls */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col w-full lg:w-1/2 mx-auto"
            >
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-fit">
                <h2 className="text-xl font-semibold mb-4 text-slate-800">
                  Select Your Preferences
                </h2>

                <FilterSection
                  industry={industry}
                  projectType={projectType}
                  difficulty={difficulty}
                  onIndustryChange={setIndustry}
                  onProjectTypeChange={setProjectType}
                  onDifficultyChange={setDifficulty}
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6"
                >
                  <Button
                    onClick={handleGenerate}
                    disabled={!canGenerate || isRateLimited()}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold h-12 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                      </motion.div>
                    ) : isRateLimited() ? (
                      <Clock className="h-4 w-4 mr-2" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    {isLoading
                      ? 'Generating...'
                      : isRateLimited()
                        ? `Wait ${timeRemaining}s`
                        : 'Generate Capstone Idea'
                    }
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Panel - Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col min-h-0"
            >
              <div className="flex-1 overflow-hidden">
                <ResultsDisplay idea={idea} isLoading={isLoading} />
              </div>
            </motion.div>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
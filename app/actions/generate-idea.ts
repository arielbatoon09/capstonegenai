'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { CapstoneIdeaRequest, CapstoneIdeaResponse } from '@/types/capstone';

// Verify that the Google AI API key is available
const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!apiKey) {
  throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 3 * 60 * 1000; // 3 minutes in milliseconds
const MAX_REQUESTS_PER_WINDOW = 1;

// Available Gemini models for rotation
const AVAILABLE_MODELS = [
  'gemini-2.5-pro',
  'gemini-2.5-flash',
  'gemini-2.5-flash-preview-09-2025',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash-lite-preview-09-2025',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-pro',
  'gemini-1.5-flash',
] as const;

// Function to get a random model
function getRandomModel(): string {
  return AVAILABLE_MODELS[Math.floor(Math.random() * AVAILABLE_MODELS.length)];
}

// Function to get a model with fallback logic
async function getWorkingModel(): Promise<string> {
  const maxAttempts = AVAILABLE_MODELS.length;
  const attemptedModels = new Set<string>();

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    let modelName: string;

    // Get a random model that hasn't been tried yet
    do {
      modelName = getRandomModel();
    } while (attemptedModels.has(modelName) && attemptedModels.size < AVAILABLE_MODELS.length);

    attemptedModels.add(modelName);

    try {
      // Test if the model is available by creating a model instance
      const model = genAI.getGenerativeModel({ model: modelName });

      // Try a simple test generation to verify the model works
      const testResult = await model.generateContent('Test');
      if (testResult.response) {
        console.log(`Using model: ${modelName}`);
        return modelName;
      }
    } catch (error) {
      console.warn(`Model ${modelName} failed, trying another...`, error);
      continue;
    }
  }

  // If all models fail, fallback to the default
  console.warn('All models failed, falling back to gemini-2.5-flash');
  return 'gemini-2.5-flash';
}

// Rate limiting function
function checkRateLimit(identifier: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const userLimit = rateLimitStore.get(identifier);

  if (!userLimit) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  // Reset if window has passed
  if (now > userLimit.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  // Check if under limit
  if (userLimit.count < MAX_REQUESTS_PER_WINDOW) {
    userLimit.count++;
    return { allowed: true };
  }

  return { allowed: false, resetTime: userLimit.resetTime };
}

export async function generateCapstoneIdeaAction(
  request: CapstoneIdeaRequest,
  userIdentifier: string = 'anonymous'
): Promise<{ success: boolean; data?: CapstoneIdeaResponse; error?: string; resetTime?: number }> {
  try {
    // Check rate limiting
    const rateLimitResult = checkRateLimit(userIdentifier);
    if (!rateLimitResult.allowed) {
      const remainingTime = Math.ceil((rateLimitResult.resetTime! - Date.now()) / 1000);
      return {
        success: false,
        error: `Rate limit exceeded. Please wait ${remainingTime} seconds before trying again.`,
        resetTime: rateLimitResult.resetTime
      };
    }

    // Get a working model with fallback logic
    const modelName = await getWorkingModel();
    const model = genAI.getGenerativeModel({ model: modelName });

    // Define the prompt outside the try block so it's accessible in catch
    const prompt = `You are an expert capstone project advisor helping IT/Computer Science students create innovative, educational, and industry-relevant projects. Generate a comprehensive capstone project idea with the following criteria:

🎯 PROJECT SPECIFICATIONS:
- Industry Focus: ${request.industry}
- Project Type: ${request.projectType}
- Target Audience: Undergraduate/Graduate Computer Science students
- Duration: 3-6 months (typical capstone timeline)
- Team Size: 1-4 students

📚 EDUCATIONAL REQUIREMENTS:
- Must demonstrate mastery of core CS concepts
- Should include both theoretical knowledge and practical implementation
- Must be suitable for academic evaluation and grading
- Should showcase problem-solving and critical thinking skills
- Must include documentation and presentation components

🏗️ PROJECT STRUCTURE REQUIREMENTS:
- Clear problem statement and motivation
- Literature review and research component
- Technical implementation with modern technologies
- Testing and validation methodology
- Documentation and user manuals
- Presentation and demonstration materials

Please provide a response in the following JSON format (respond ONLY with valid JSON, no markdown or additional text):
{
  "title": "A creative, descriptive project title that clearly indicates the problem being solved",
  "description": "A comprehensive 3-4 paragraph description including: 1) Problem statement and motivation, 2) Target users and market need, 3) Key features and functionality, 4) Educational value and learning outcomes",
  "technologyStack": ["Modern Technology 1", "Modern Technology 2", "Modern Technology 3", "Modern Technology 4", "Modern Technology 5"],
  "similarProjects": [
    {
      "name": "Real Project Name 1",
      "description": "Brief description of what this project does and how it relates to the generated idea",
      "url": "https://github.com/real-project-1"
    },
    {
      "name": "Real Project Name 2", 
      "description": "Brief description of what this project does and how it relates to the generated idea",
      "url": "https://github.com/real-project-2"
    },
    {
      "name": "Real Project Name 3",
      "description": "Brief description of what this project does and how it relates to the generated idea", 
      "url": "https://github.com/real-project-3"
    },
    {
      "name": "Real Project Name 4",
      "description": "Brief description of what this project does and how it relates to the generated idea", 
      "url": "https://github.com/real-project-4"
    },
    {
      "name": "Real Project Name 5",
      "description": "Brief description of what this project does and how it relates to the generated idea", 
      "url": "https://github.com/real-project-5"
    }
  ],
  "learningOutcomes": [
    "Specific skill or concept student will learn 1",
    "Specific skill or concept student will learn 2", 
    "Specific skill or concept student will learn 3",
    "Specific skill or concept student will learn 4"
  ],
  "difficultyLevel": "Beginner|Intermediate|Advanced",
  "estimatedHours": "Number of months to complete (between 1-5 months, e.g., 2-3 months)",
  "prerequisites": ["Required skill 1", "Required skill 2", "Required skill 3"]
}

🎓 STUDENT-FOCUSED GUIDELINES:
- Choose technologies that are in high demand in the job market
- Ensure the project demonstrates both technical depth and practical application
- Include real-world problem solving that employers value
- Make it suitable for showcasing in portfolios, resumes, and interviews
- Consider scalability and potential for future development
- Include elements that show understanding of software engineering best practices
- Ensure the project can be completed within typical academic timelines
- Focus on problems that are meaningful and have genuine user impact

🔗 SIMILAR PROJECTS REQUIREMENTS:
- Provide real, existing projects with actual GitHub repositories or live demos
- Choose projects that are similar in scope, technology, or problem domain
- Include both open-source and commercial examples when possible
- Ensure URLs are valid and projects are actively maintained
- Select projects that students can study and learn from

Make sure the technology stack is appropriate for ${request.projectType} projects in the ${request.industry} industry. Include modern, industry-standard technologies that are currently in demand by employers.

IMPORTANT: The difficulty level must be exactly "${request.difficulty}". Adjust the complexity of the project, technology stack, and prerequisites accordingly. For ${request.difficulty} level projects:
- Beginner: Use simpler technologies, basic concepts, minimal prerequisites
- Intermediate: Use moderate complexity technologies, some advanced concepts, moderate prerequisites  
- Advanced: Use complex technologies, advanced concepts, extensive prerequisites

The estimated timeline should be between 1-5 months maximum.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Handle markdown code blocks - extract JSON from ```json ... ``` or just plain JSON
      let jsonString = text;

      // Check if response is wrapped in markdown code blocks
      const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (codeBlockMatch) {
        jsonString = codeBlockMatch[1];
      } else {
        // Fallback to original regex for plain JSON
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          console.error('No JSON found in response:', text);
          throw new Error('Failed to parse AI response');
        }
        jsonString = jsonMatch[0];
      }

      try {
        const parsedResponse = JSON.parse(jsonString) as CapstoneIdeaResponse;

        // Add the request parameters to the response
        const enhancedResponse: CapstoneIdeaResponse & { industry: string; projectType: string; difficulty: string } = {
          ...parsedResponse,
          industry: request.industry,
          projectType: request.projectType,
          difficulty: request.difficulty,
        };

        return {
          success: true,
          data: enhancedResponse
        };
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('JSON string that failed to parse:', jsonString);
        throw new Error('Failed to parse AI response as JSON');
      }
    } catch (error) {
      console.error('Model failed during generation:', error);

      // If the current model fails, try with a different random model
      if (AVAILABLE_MODELS.length > 1) {
        console.log('Retrying with a different model...');
        const fallbackModelName = getRandomModel();
        const fallbackModel = genAI.getGenerativeModel({ model: fallbackModelName });

        try {
          const result = await fallbackModel.generateContent(prompt);
          const response = await result.response;
          const text = response.text();

          // Handle markdown code blocks - extract JSON from ```json ... ``` or just plain JSON
          let jsonString = text;

          // Check if response is wrapped in markdown code blocks
          const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
          if (codeBlockMatch) {
            jsonString = codeBlockMatch[1];
          } else {
            // Fallback to original regex for plain JSON
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
              console.error('No JSON found in response:', text);
              throw new Error('Failed to parse AI response');
            }
            jsonString = jsonMatch[0];
          }

          try {
            const parsedResponse = JSON.parse(jsonString) as CapstoneIdeaResponse;

            // Add the request parameters to the response
            const enhancedResponse: CapstoneIdeaResponse & { industry: string; projectType: string; difficulty: string } = {
              ...parsedResponse,
              industry: request.industry,
              projectType: request.projectType,
              difficulty: request.difficulty,
            };

            console.log(`Successfully used fallback model: ${fallbackModelName}`);
            return {
              success: true,
              data: enhancedResponse
            };
          } catch (parseError) {
            console.error('JSON parse error:', parseError);
            console.error('JSON string that failed to parse:', jsonString);
            throw new Error('Failed to parse AI response as JSON');
          }
        } catch (fallbackError) {
          console.error(`Fallback model ${fallbackModelName} also failed:`, fallbackError);
          return {
            success: false,
            error: 'All models failed to generate content. Please try again later.'
          };
        }
      } else {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to generate capstone idea'
        };
      }
    }
  } catch (finalError) {
    console.error('Unexpected error in generateCapstoneIdeaAction:', finalError);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    };
  }
}
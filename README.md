# Capstone Idea Generator

A Next.js application that generates innovative capstone project ideas for IT/Computer Science students using AI. This project has been migrated from React to Next.js with proper server-side security and rate limiting.

## Features

- 🤖 **AI-Powered Generation**: Uses Google's Gemini models via Google Generative AI SDK
- 🔒 **Secure Server Actions**: API keys are kept secure on the server-side
- ⚡ **Rate Limiting**: Built-in rate limiting to prevent abuse
- 🎨 **Modern UI**: Beautiful, responsive interface with Tailwind CSS
- 📱 **Mobile Friendly**: Works seamlessly on all devices
- 🚀 **Next.js 15**: Built with the latest Next.js features

## Security Improvements

This application has been migrated from a client-side React app to a secure Next.js application with the following security enhancements:

- **Server-Side API Calls**: All AI API calls are now handled server-side using Next.js Server Actions
- **Protected API Keys**: Google AI API keys are never exposed to the client
- **Server-Side Rate Limiting**: Rate limiting is enforced on the server to prevent abuse
- **Input Validation**: All user inputs are validated before processing

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Google AI API key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd capstonegenai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Google AI API key:
```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/
│   ├── actions/
│   │   └── generate-idea.ts    # Server action for AI generation
│   ├── page.tsx                # Main page component (client-side)
│   └── layout.tsx              # Root layout
├── components/
│   ├── FilterSection.tsx       # Industry/type/difficulty filters
│   ├── ResultsDisplay.tsx      # Results display component
│   └── ui/                     # Reusable UI components
├── types/
│   └── capstone.ts             # TypeScript type definitions
└── lib/
    └── utils.ts                # Utility functions
```

## Architecture

### Server-Side (Secure)
- **Server Actions**: Handle AI API calls securely
- **Rate Limiting**: Prevent abuse with server-side rate limiting
- **Environment Variables**: Keep API keys secure

### Client-Side (UI Only)
- **React Components**: Handle user interface and interactions
- **State Management**: Manage UI state and user inputs
- **Toast Notifications**: Provide user feedback

## Rate Limiting

The application implements server-side rate limiting:
- **Window**: 3 minutes
- **Limit**: 1 request per window per user
- **Storage**: In-memory (for production, consider Redis or database)

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **AI SDK**: Google Generative AI SDK with full Gemini model support
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Notifications**: Sonner
- **Language**: TypeScript

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

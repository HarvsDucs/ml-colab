import Image from 'next/image';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { mockProjects } from '../data/mockData';
import Layout from '../components/Layout';
import Button from '../components/ui/Button';
import { projectIdeas } from '../data/projectIdeas';
// import FeaturedProjects from '../components/FeaturedProjects';

export default async function Home() {
  // Check if user is authenticated on the server
  const user = await currentUser();
  
  // If user is authenticated, redirect to dashboard
  if (user) {
    return redirect('/dashboard');
  }

  // Get top 3 project ideas to highlight
  const featuredIdeas = projectIdeas.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-12 px-4 sm:px-6 lg:px-0">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="block">Open Source Collaboration for</span>
            <span className="block text-blue-600">Data Scientists & Engineers</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Find exciting ML and data engineering projects to collaborate on. Share your expertise and build your portfolio with like-minded professionals.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:flex-wrap sm:justify-center md:mt-8">
            <div className="rounded-md shadow w-full sm:w-auto mb-3 sm:mb-0">
              <Link href="/sign-in">
                <Button size="lg" className="w-full px-8">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="rounded-md shadow w-full sm:w-auto sm:ml-3">
              <Link href="/explore">
                <Button variant="outline" size="lg" className="w-full px-8">
                  Explore Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-md mx-4 sm:mx-6 lg:mx-0">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              ML-Colab is an ongoing proof of concept project. Voting on project ideas will help us prioritize development efforts and move the platform forward.
            </p>
          </div>
        </div>
      </div>

      {/* Project Ideas Section */}
      <section className="mb-12 px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Project Ideas</h2>
          <Link href="/project-ideas" className="mt-2 sm:mt-0 text-blue-600 hover:text-blue-800 font-medium">
            View all & vote →
          </Link>
        </div>
        <p className="text-gray-600 mb-6">
          Help us decide which open source projects to develop next. The top voted projects will be prioritized for development.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredIdeas.map((idea) => (
            <div key={idea.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{idea.title}</h3>
                <p className="text-gray-600 mb-4">{idea.description}</p>
                <Link href="/project-ideas">
                  <Button variant="outline" size="sm" className="w-full">
                    Vote for this project
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/project-ideas">
            <Button variant="primary" size="md">
              See All Project Ideas
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Projects Section */}
      {/* <FeaturedProjects projects={mockProjects.slice(0, 2)} isSignedIn={false} /> */}
    </Layout>
  );
}

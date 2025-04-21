'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import Layout from '../../components/Layout';
import { mockProjects } from '../../data/mockData';
import ProjectCard from '../../components/ProjectCard';
import Button from '../../components/ui/Button';

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    // Redirect to home if not authenticated
    if (isLoaded && !isSignedIn) {
      redirect('/');
    }
  }, [isSignedIn, isLoaded]);

  if (!isLoaded) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  // In a real app, these would be fetched from an API based on the user's ID
  const myProjects = mockProjects.slice(0, 1);
  const collaboratingProjects = mockProjects.slice(1);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <Button variant="primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">My Projects</h2>
              <Link href="/projects" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </Link>
            </div>
            
            {myProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">You haven't created any projects yet.</p>
                <Button variant="primary" className="mt-4">
                  Create Your First Project
                </Button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Projects I'm Collaborating On</h2>
              <Link href="/explore" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Find More
              </Link>
            </div>
            
            {collaboratingProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {collaboratingProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">You're not collaborating on any projects yet.</p>
                <Link href="/explore">
                  <Button variant="primary" className="mt-4">
                    Explore Projects
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <p className="text-sm text-gray-600">You joined the project <span className="font-medium text-gray-900">ML Model Deployment Framework</span></p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <p className="text-sm text-gray-600">You completed task <span className="font-medium text-gray-900">Set up CI/CD pipeline</span></p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-1">
                <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Sarah Chen</span> joined your project</p>
                <p className="text-xs text-gray-500">5 days ago</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Tasks</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="task-1"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <label
                  htmlFor="task-1"
                  className="ml-3 text-sm text-gray-700"
                >
                  Fix memory leak in prediction API
                </label>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="task-2"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <label
                  htmlFor="task-2"
                  className="ml-3 text-sm text-gray-700"
                >
                  Implement model versioning
                </label>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="task-3"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <label
                  htmlFor="task-3"
                  className="ml-3 text-sm text-gray-700"
                >
                  Create documentation
                </label>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                View All Tasks
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

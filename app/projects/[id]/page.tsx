'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { mockProjects } from '../../../data/mockData';
import Layout from '../../../components/Layout';
import Button from '../../../components/ui/Button';
import CollaboratorsList from '../../../components/CollaboratorsList';
import TasksList from '../../../components/TasksList';
import TodoList from '../../../components/TodoList';
import { Project } from '../../../types';

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const { isSignedIn, isLoaded } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to sign-in if not authenticated
    if (isLoaded && !isSignedIn) {
      redirect('/');
    }

    // In a real app, this would be an API call
    const foundProject = mockProjects.find(p => p.id === params.id);
    setProject(foundProject || null);
    setLoading(false);
  }, [params.id, isSignedIn, isLoaded]);

  if (!isLoaded || loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return notFound();
  }

  const daysSinceCreation = Math.ceil(
    (new Date().getTime() - new Date(project.createdAt).getTime()) / (1000 * 3600 * 24)
  );

  return (
    <Layout>
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Project Title and Image */}
        <div className="relative">
          {project.imageUrl && (
            <div className="relative w-full h-64 md:h-80">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-3xl font-bold text-white">{project.title}</h1>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {/* Days Active */}
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {daysSinceCreation} days active
                </span>
                
                {/* Collaborators Count */}
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {project.collaborators.length} collaborators
                </span>
                
                {/* GitHub Link */}
                <Link 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub Repository
                </Link>
              </div>
            </div>
            <div>
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Join Project
              </Button>
            </div>
          </div>

          {/* Project Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Project Description</h2>
            <p className="mt-2 text-gray-700">{project.description}</p>
          </div>

          {/* Flowchart Image Description */}
          {project.flowchartDescription && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Process Flow</h2>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700">{project.flowchartDescription}</p>
              </div>
            </div>
          )}

          {/* Current Collaborators */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <CollaboratorsList collaborators={project.collaborators} />
            <TasksList tasks={project.tasks} />
          </div>

          {/* Project To-Do List */}
          <div className="mt-8">
            <TodoList todos={project.todos} collaborators={project.collaborators} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

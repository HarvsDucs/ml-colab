'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

interface FeaturedProjectsProps {
  projects: Project[];
  isSignedIn: boolean;
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects, isSignedIn }) => {
  return (
    <section className="px-4 sm:px-6 lg:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
        <Link href="/explore" className="mt-2 sm:mt-0 text-blue-600 hover:text-blue-800 font-medium">
          View all projects →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            isSignedIn={isSignedIn}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;

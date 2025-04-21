import { currentUser } from '@clerk/nextjs/server';
import React from 'react';
import Layout from '../../components/Layout';
import ProjectCard from '../../components/ProjectCard';
import { mockProjects } from '../../data/mockData';
import Button from '../../components/ui/Button';

export default async function ExplorePage() {
  // Check if user is authenticated on the server
  const user = await currentUser();
  const isSignedIn = !!user;

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explore Projects</h1>
        <p className="mt-2 text-gray-600">Discover open source ML and data engineering projects to collaborate on</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="font-medium text-gray-900 mb-4">Filters</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input id="ml" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="ml" className="ml-2 text-sm text-gray-700">Machine Learning</label>
                </div>
                <div className="flex items-center">
                  <input id="data-eng" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="data-eng" className="ml-2 text-sm text-gray-700">Data Engineering</label>
                </div>
                <div className="flex items-center">
                  <input id="data-viz" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="data-viz" className="ml-2 text-sm text-gray-700">Data Visualization</label>
                </div>
                <div className="flex items-center">
                  <input id="nlp" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="nlp" className="ml-2 text-sm text-gray-700">NLP</label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input id="active" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="active" className="ml-2 text-sm text-gray-700">Active (last 30 days)</label>
                </div>
                <div className="flex items-center">
                  <input id="needs-help" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="needs-help" className="ml-2 text-sm text-gray-700">Needs collaborators</label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input id="python" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="python" className="ml-2 text-sm text-gray-700">Python</label>
                </div>
                <div className="flex items-center">
                  <input id="tensorflow" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="tensorflow" className="ml-2 text-sm text-gray-700">TensorFlow</label>
                </div>
                <div className="flex items-center">
                  <input id="pytorch" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="pytorch" className="ml-2 text-sm text-gray-700">PyTorch</label>
                </div>
                <div className="flex items-center">
                  <input id="spark" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="spark" className="ml-2 text-sm text-gray-700">Apache Spark</label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-2">
              <Button variant="primary" size="sm" className="w-full">Apply</Button>
              <Button variant="outline" size="sm" className="w-full">Reset</Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">Showing {mockProjects.length} projects</span>
            </div>
            <div>
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>Most Recent</option>
                <option>Most Active</option>
                <option>Most Collaborators</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                isSignedIn={isSignedIn} 
              />
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button variant="outline">Load More Projects</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

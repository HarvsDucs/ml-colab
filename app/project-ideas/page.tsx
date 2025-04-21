import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import Layout from '../../components/Layout';
import ProjectVoting from '../../components/ProjectVoting';

export default async function ProjectIdeasPage() {
  const user = await currentUser();
  const isSignedIn = !!user;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Project Ideas</h1>
          <p className="mt-2 text-base sm:text-lg text-gray-600">
            Browse and vote on potential open source projects for the ML-Colab community. 
            The top 3 most voted projects will be developed next.
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-md">
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

        <ProjectVoting />

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Project Ideas</h2>
          <p className="text-gray-600 mb-4 sm:mb-6">
            Here are the potential projects that could be developed by our community. 
            Sign in to vote for your favorites or suggest your own!
          </p>

          <div className="space-y-4 sm:space-y-6">
            <div className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">ML Roadmap</h3>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                Build a problem set with a corresponding solution set that helps guide Data 
                Engineers/Scientists of all skill levels through a roadmap UI.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Public Health Data Pipeline</h3>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                Create an ETL system that aggregates and standardizes public health datasets 
                from various government sources, making epidemic tracking and health resource 
                allocation more efficient.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Environmental Monitoring Framework</h3>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                Develop a pipeline that collects, processes, and visualizes environmental 
                sensor data from open sources to track pollution, climate patterns, and 
                ecological changes.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Open Transit Data Hub</h3>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                Build an ETL system that normalizes and combines public transportation data 
                from multiple cities, enabling better transit planning and accessibility tools.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Disaster Response Data Integrator</h3>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                Design a real-time ETL platform that processes social media, weather, and 
                emergency service data during natural disasters to improve response coordination.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Agricultural Yield Optimizer</h3>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                Create a data pipeline that combines satellite imagery, weather data, and 
                soil information to help small-scale farmers optimize planting and harvesting decisions.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Non-profit Financial Transparency Tool</h3>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                Develop an ETL system that standardizes and analyzes public financial records 
                from non-profits to increase sector transparency and accountability.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Educational Outcome Analyzer</h3>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                Build a framework that processes educational data across different regions 
                to identify successful interventions and address equity gaps.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Small Business Economic Indicator</h3>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                Create a pipeline that aggregates economic data relevant to small businesses, 
                providing insights that are typically only available to large corporations.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Supply Chain Resilience Monitor</h3>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                Develop an ETL system that tracks global supply chain disruptions by processing 
                news, shipping data, and manufacturing reports to help businesses adapt quickly.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Community Resource Allocator</h3>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                Build a data pipeline that combines demographic information with service 
                utilization data to help community organizations better allocate resources 
                to underserved areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

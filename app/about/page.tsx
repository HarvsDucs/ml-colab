import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Layout from '../../components/Layout';
import Button from '../../components/ui/Button';

export default async function AboutPage() {
  // Check if user is authenticated on the server
  const user = await currentUser();
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl tracking-tight">About ML-Colab</h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Connecting data scientists and engineers to collaborate on open source projects
          </p>
        </div>

        <div className="prose prose-lg prose-blue mx-auto max-w-none">
          <p className="text-lg leading-relaxed text-gray-700">
            ML-Colab is a platform designed to help data scientists and data engineers find and collaborate on 
            exciting open source projects. Our mission is to foster innovation in the machine learning and data 
            engineering community by making collaboration easier and more accessible.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            We believe that open source collaboration is essential for advancing the field of data science and 
            machine learning. By connecting talented individuals with interesting projects, we aim to:
          </p>
          <ul className="space-y-2 my-6">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg text-gray-700">Accelerate innovation in machine learning and data engineering</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg text-gray-700">Help data professionals build their portfolios and gain practical experience</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg text-gray-700">Support the development of tools and frameworks that benefit the entire community</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg text-gray-700">Create a supportive environment for learning and knowledge sharing</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How It Works</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            ML-Colab provides a structured way to discover, join, and contribute to open source projects:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Discover</h3>
              </div>
              <p className="text-gray-700">Browse through projects based on your interests and skills</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Connect</h3>
              </div>
              <p className="text-gray-700">Join projects and connect with other collaborators</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Contribute</h3>
              </div>
              <p className="text-gray-700">Work on tasks and track your progress</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Share</h3>
              </div>
              <p className="text-gray-700">Showcase your contributions and build your portfolio</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">For Project Owners</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            If you have an open source project related to machine learning or data engineering, ML-Colab 
            can help you find collaborators with the skills you need. You can:
          </p>
          <ul className="space-y-2 my-6">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg text-gray-700">Create a project profile with detailed information about your project</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg text-gray-700">Define tasks and to-do items for potential collaborators</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg text-gray-700">Track progress and manage contributions</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg text-gray-700">Connect with talented data professionals from around the world</span>
            </li>
          </ul>

          <div className="my-12 bg-blue-50 p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-center mb-6">Join Our Community</h2>
            <p className="text-lg text-center mb-6 max-w-2xl mx-auto leading-relaxed">
              Whether you{'"'}re looking to contribute to exciting projects or find collaborators for your own, 
              ML-Colab is the place to connect with like-minded data professionals.
            </p>
            <p className="mt-4 text-gray-600">
              Our platform is designed to make collaboration easy and effective. We believe that open source projects thrive when talented individuals can connect and contribute their unique skills.
            </p>
            <p className="mt-4 text-gray-600">
              Whether you{'"'}re a seasoned data scientist or just starting your journey in data engineering, ML-Colab provides the tools and community you need to make an impact.
            </p>
            <div className="flex justify-center">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="px-8 py-3 text-lg">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link href="/sign-in">
                  <Button size="lg" className="px-8 py-3 text-lg">Get Started Today</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

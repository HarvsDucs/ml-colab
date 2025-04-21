'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { ProjectIdea, Vote } from '../types';
import { projectIdeas } from '../data/projectIdeas';
import { supabase } from '../utils/supabase';
import Button from './ui/Button';

const ProjectVoting: React.FC = () => {
  const { user, isSignedIn } = useUser();
  const [ideas, setIdeas] = useState<ProjectIdea[]>(projectIdeas);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [customIdea, setCustomIdea] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [topProjects, setTopProjects] = useState<ProjectIdea[]>([]);

  // Check if user has already voted
  useEffect(() => {
    const checkUserVote = async () => {
      if (!isSignedIn || !user?.primaryEmailAddress?.emailAddress) return;

      const { data, error } = await supabase
        .from('ml-colab-voting')
        .select('*')
        .eq('user_email', user.primaryEmailAddress.emailAddress);

      if (error) {
        console.error('Error checking user vote:', error);
        return;
      }

      if (data && data.length > 0) {
        setHasVoted(true);
        // If they voted for custom idea, show it
        const customVote = data.find(vote => vote.custom_idea);
        if (customVote) {
          setCustomIdea(customVote.custom_idea || '');
        }
        
        // Set their selected projects
        setSelectedProjects(data.map(vote => vote.project_id));
      }
    };

    // Get top voted projects
    const getTopProjects = async () => {
      try {
        // First get all votes
        const { data, error } = await supabase
          .from('ml-colab-voting')
          .select('*')
          .not('project_id', 'eq', 'custom');

        if (error) {
          console.error('Error getting votes:', error);
          return;
        }

        if (data && data.length > 0) {
          // Count votes for each project
          const voteCounts: Record<string, number> = {};
          data.forEach(vote => {
            if (vote.project_id) {
              voteCounts[vote.project_id] = (voteCounts[vote.project_id] || 0) + 1;
            }
          });

          // Convert to array and sort
          const sortedProjects = Object.entries(voteCounts)
            .map(([projectId, count]) => ({ projectId, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 3)
            .map(item => item.projectId);

          // Get the top 3 projects
          const topProjectsList = ideas.filter(idea => sortedProjects.includes(idea.id));
          setTopProjects(topProjectsList);
        }
      } catch (err) {
        console.error('Error in getTopProjects:', err);
      }
    };

    checkUserVote();
    getTopProjects();
  }, [isSignedIn, user, ideas]);

  const handleProjectSelect = (projectId: string) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter(id => id !== projectId));
    } else {
      // Only allow up to 3 selections
      if (selectedProjects.length < 3) {
        setSelectedProjects([...selectedProjects, projectId]);
      } else {
        setMessage({
          text: 'You can only select up to 3 projects',
          type: 'error'
        });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSignedIn || !user) {
      setMessage({
        text: 'You must be signed in to vote',
        type: 'error'
      });
      return;
    }

    if (selectedProjects.length === 0 && !customIdea) {
      setMessage({
        text: 'Please select at least one project or provide a custom idea',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const userEmail = user.primaryEmailAddress?.emailAddress;
      const userName = `${user.firstName} ${user.lastName}`;

      if (!userEmail) {
        throw new Error('User email not available');
      }

      // Delete any existing votes from this user
      await supabase
        .from('ml-colab-voting')
        .delete()
        .eq('user_email', userEmail);

      // Insert votes for selected projects
      if (selectedProjects.length > 0) {
        const votes: Vote[] = selectedProjects.map(projectId => ({
          user_email: userEmail,
          user_full_name: userName || 'Anonymous User',
          project_id: projectId
        }));

        const { error } = await supabase
          .from('ml-colab-voting')
          .insert(votes);

        if (error) throw error;
      }

      // Insert custom idea if provided
      if (customIdea.trim()) {
        const { error } = await supabase
          .from('ml-colab-voting')
          .insert({
            user_email: userEmail,
            user_full_name: userName || 'Anonymous User',
            project_id: 'custom',
            custom_idea: customIdea.trim()
          });

        if (error) throw error;
      }

      setMessage({
        text: 'Thank you for voting! Your input helps shape our community projects.',
        type: 'success'
      });
      setHasVoted(true);
      
      // Refresh top projects
      try {
        // First get all votes
        const { data, error } = await supabase
          .from('ml-colab-voting')
          .select('*')
          .not('project_id', 'eq', 'custom');

        if (error) {
          console.error('Error getting votes:', error);
          return;
        }

        if (data && data.length > 0) {
          // Count votes for each project
          const voteCounts: Record<string, number> = {};
          data.forEach(vote => {
            if (vote.project_id) {
              voteCounts[vote.project_id] = (voteCounts[vote.project_id] || 0) + 1;
            }
          });

          // Convert to array and sort
          const sortedProjects = Object.entries(voteCounts)
            .map(([projectId, count]) => ({ projectId, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 3)
            .map(item => item.projectId);

          // Get the top 3 projects
          const topProjectsList = ideas.filter(idea => sortedProjects.includes(idea.id));
          setTopProjects(topProjectsList);
        }
      } catch (err) {
        console.error('Error refreshing top projects:', err);
      }
      
    } catch (error) {
      console.error('Error submitting vote:', error);
      setMessage({
        text: 'An error occurred while submitting your vote. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Project Voting</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          Sign in to vote on which projects should be developed next. The top 3 most voted projects will be prioritized for development.
        </p>
        <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
          <p className="text-sm text-blue-700">
            Please sign in to participate in project voting.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Project Voting</h2>
      <p className="text-sm sm:text-base text-gray-600 mb-4">
        Vote on which projects you'd like to see developed next. The top 3 most voted projects will be prioritized for development.
      </p>

      {topProjects.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Current Top Projects</h3>
          <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
            <ol className="list-decimal pl-5">
              {topProjects.map((project, index) => (
                <li key={project.id} className="text-sm sm:text-base text-blue-700 mb-1">
                  <span className="font-medium">{project.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {message.text && (
        <div className={`p-3 sm:p-4 rounded-md mb-4 ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          <p className="text-sm sm:text-base">{message.text}</p>
        </div>
      )}

      {hasVoted ? (
        <div className="bg-green-50 p-3 sm:p-4 rounded-md">
          <p className="text-sm sm:text-base text-green-700">
            Thank you for your vote! You've already participated in the project voting.
          </p>
          {customIdea && (
            <div className="mt-2">
              <p className="text-sm sm:text-base text-green-700 font-medium">Your custom idea:</p>
              <p className="text-sm sm:text-base text-green-700">{customIdea}</p>
            </div>
          )}
          {selectedProjects.length > 0 && (
            <div className="mt-2">
              <p className="text-sm sm:text-base text-green-700 font-medium">You voted for:</p>
              <ul className="list-disc pl-5">
                {selectedProjects.map(id => {
                  const project = ideas.find(idea => idea.id === id);
                  return project ? (
                    <li key={id} className="text-sm sm:text-base text-green-700">{project.title}</li>
                  ) : null;
                })}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {ideas.map(idea => (
              <div 
                key={idea.id} 
                className={`border rounded-md p-3 sm:p-4 cursor-pointer transition-colors ${
                  selectedProjects.includes(idea.id) 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleProjectSelect(idea.id)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={selectedProjects.includes(idea.id)}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">{idea.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{idea.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4 sm:mb-6">
            <label htmlFor="customIdea" className="block text-sm font-medium text-gray-700 mb-1">
              Don't see a project you're interested in? Suggest your own:
            </label>
            <textarea
              id="customIdea"
              rows={3}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-sm sm:text-base border-gray-300 rounded-md"
              placeholder="Describe your project idea here..."
              value={customIdea}
              onChange={(e) => setCustomIdea(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || (selectedProjects.length === 0 && !customIdea.trim())}
              className="px-4 py-2 text-sm sm:text-base"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Vote'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProjectVoting;

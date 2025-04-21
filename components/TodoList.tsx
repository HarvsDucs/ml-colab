import React from 'react';
import { Todo, Collaborator } from '../types';

interface TodoListProps {
  todos: Todo[];
  collaborators: Collaborator[];
  className?: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, collaborators, className = '' }) => {
  const getAssignedName = (assignedTo?: string) => {
    if (!assignedTo) return 'Unassigned';
    const collaborator = collaborators.find(c => c.id === assignedTo);
    return collaborator ? collaborator.name : 'Unknown';
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900">Project To-Do List</h3>
      <div className="space-y-3">
        {todos.map((todo) => (
          <div 
            key={todo.id} 
            className={`p-3 rounded-lg border ${todo.completed 
              ? 'bg-green-50 border-green-200' 
              : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={`todo-${todo.id}`}
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 flex-1">
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`text-sm font-medium ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}
                >
                  {todo.title}
                </label>
                <div className="mt-1 flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    Assigned to: {getAssignedName(todo.assignedTo)}
                  </span>
                  {todo.dueDate && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded ${
                      new Date(todo.dueDate) < new Date() && !todo.completed
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      Due: {formatDate(todo.dueDate)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;

import React from 'react';
import { Task } from '../types';

interface TasksListProps {
  tasks: Task[];
  className?: string;
}

const TasksList: React.FC<TasksListProps> = ({ tasks, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900">Project Tasks/Checklist</h3>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id={`task-${task.id}`}
                type="checkbox"
                checked={task.completed}
                readOnly
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <label
              htmlFor={`task-${task.id}`}
              className={`ml-3 text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}
            >
              {task.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksList;

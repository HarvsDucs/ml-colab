export interface Project {
  id: string;
  title: string;
  description: string;
  githubLink: string;
  imageUrl?: string;
  flowchartDescription?: string;
  createdAt: Date;
  collaborators: Collaborator[];
  tasks: Task[];
  todos: Todo[];
}

export interface Collaborator {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
  githubUsername?: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  assignedTo?: string;
  dueDate?: Date;
}

export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
  votes: number;
}

export interface Vote {
  id?: string;
  user_email: string;
  user_full_name: string;
  project_id: string;
  custom_idea?: string;
  created_at?: string;
}

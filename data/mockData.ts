import { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'ML Model Deployment Framework',
    description: 'An open-source framework for deploying machine learning models in production with monitoring and A/B testing capabilities.',
    githubLink: 'https://github.com/example/ml-deploy-framework',
    imageUrl: '/images/projects/ml-deploy.png',
    flowchartDescription: 'Model training → Validation → Containerization → Deployment → Monitoring',
    createdAt: new Date('2024-12-15'),
    collaborators: [
      {
        id: '101',
        name: 'Alex Johnson',
        avatarUrl: '/images/avatars/alex.png',
        role: 'ML Engineer',
        githubUsername: 'alexj'
      },
      {
        id: '102',
        name: 'Sarah Chen',
        avatarUrl: '/images/avatars/sarah.png',
        role: 'Data Scientist',
        githubUsername: 'schen'
      }
    ],
    tasks: [
      { id: 't1', title: 'Set up CI/CD pipeline', completed: true },
      { id: 't2', title: 'Implement model versioning', completed: true },
      { id: 't3', title: 'Add monitoring dashboard', completed: false },
      { id: 't4', title: 'Create documentation', completed: false }
    ],
    todos: [
      { id: 'td1', title: 'Fix memory leak in prediction API', completed: false, assignedTo: '101', dueDate: new Date('2025-05-01') },
      { id: 'td2', title: 'Optimize Docker image size', completed: false, assignedTo: '102', dueDate: new Date('2025-04-25') }
    ]
  },
  {
    id: '2',
    title: 'Data Pipeline Orchestrator',
    description: 'A tool for orchestrating complex data pipelines with support for multiple data sources and transformation types.',
    githubLink: 'https://github.com/example/data-pipeline-orchestrator',
    imageUrl: '/images/projects/data-pipeline.png',
    flowchartDescription: 'Data extraction → Transformation → Loading → Scheduling → Monitoring',
    createdAt: new Date('2025-01-10'),
    collaborators: [
      {
        id: '201',
        name: 'Michael Wong',
        avatarUrl: '/images/avatars/michael.png',
        role: 'Data Engineer',
        githubUsername: 'mwong'
      },
      {
        id: '202',
        name: 'Emily Davis',
        avatarUrl: '/images/avatars/emily.png',
        role: 'DevOps Engineer',
        githubUsername: 'emilyd'
      }
    ],
    tasks: [
      { id: 't21', title: 'Implement Spark connector', completed: true },
      { id: 't22', title: 'Add support for streaming data', completed: false },
      { id: 't23', title: 'Create error handling framework', completed: false }
    ],
    todos: [
      { id: 'td21', title: 'Fix Kafka integration bug', completed: false, assignedTo: '201', dueDate: new Date('2025-04-30') },
      { id: 'td22', title: 'Add unit tests for transformers', completed: true, assignedTo: '202', dueDate: new Date('2025-04-15') }
    ]
  }
];

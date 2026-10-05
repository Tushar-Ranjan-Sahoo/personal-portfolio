import { NavigationItem, Project, TimelineItem } from '../types';

export const navigationData: NavigationItem[] = [
  { id: 'home', label: 'HOME', href: '#home', number: '01.' },
  { id: 'about', label: 'ABOUT', href: '#about', number: '02.' },
  { id: 'services', label: 'SERVICES', href: '#services', number: '03.' },
  { id: 'work', label: 'WORK', href: '#work', number: '04.' },
  { id: 'journal', label: 'JOURNAL', href: '#journal', number: '05.' },
  { id: 'contact', label: 'CONTACT', href: '#contact', number: '06.' },
  { id: 'resume', label: 'RESUME', href: '#resume', number: '07.' },
];

export const projectData: Project[] = [
  {
    id: 'project-1',
    title: 'CRYPTOFI',
    description: 'Blockchain Marketplace system with dynamic smart contracts and real-time ledger tracking.',
    image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=800&auto=format&fit=crop', // placeholder
    tags: ['React', 'Solidity', 'Web3']
  },
  {
    id: 'project-2',
    title: 'PARCEL MANAGEMENT',
    description: 'Logistics and parcel tracking system with predictive analytics.',
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800&auto=format&fit=crop', // placeholder
    tags: ['TypeScript', 'Node.js', 'PostgreSQL']
  },
  {
    id: 'project-3',
    title: 'BANK MANAGEMENT',
    description: 'Secure, scalable banking management system with role-based access control.',
    image: 'https://images.unsplash.com/photo-1541888050669-8d7658c1db16?q=80&w=800&auto=format&fit=crop', // placeholder
    tags: ['Next.js', 'Java', 'Spring Boot']
  }
];

export const timelineData: TimelineItem[] = [
  {
    id: 'exp-1',
    date: 'SEP 2024 - PRESENT',
    title: 'Associate Software Engineer',
    company: 'Tech Mahindra',
    description: 'Working on enterprise applications using Java, Spring Framework, REST APIs, and Microservices. Involved in development, deployment, and production support.'
  },
  {
    id: 'exp-2',
    date: 'JUN 2024 - SEP 2024',
    title: 'Test Engineer',
    company: 'Pinnacle Consulting LLC',
    description: 'Involved in software testing, test case creation, bug tracking, and quality assurance.'
  },
  {
    id: 'exp-3',
    date: 'MAY 2024 - MAY 2024',
    title: 'Software Development Engineer',
    company: 'QuotUS',
    description: 'Developed blockchain based solutions and smart contracts. Worked on automation and backend services.'
  },
  {
    id: 'exp-4',
    date: 'JUN 2022 - AUG 2022',
    title: 'Web Development Intern',
    company: 'Cisco thingQbator',
    description: 'Built web applications using React and integrated blockchain features with MetaMask authentication.'
  }
];

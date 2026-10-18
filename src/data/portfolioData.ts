import { NavigationItem, Project, TimelineItem } from '../types';

export const navigationData: NavigationItem[] = [
  { id: 'home', label: 'HOME', href: '#home', number: '01.' },
  { id: 'about', label: 'ABOUT', href: '#about', number: '02.' },
  { id: 'experience', label: 'EXPERIENCE', href: '#experience', number: '03.' },
  { id: 'problem-solving', label: 'PROBLEM SOLVING', href: '#problem-solving', number: '04.' },
  { id: 'skills', label: 'SKILLS', href: '#skills', number: '05.' },
  { id: 'work', label: 'WORK', href: '#work', number: '06.' },
  { id: 'contact', label: 'CONTACT', href: '#contact', number: '07.' },
];

export const projectData: Project[] = [
  {
    id: 'project-1',
    title: 'CRYFFITI',
    description: 'Blockchain-driven art platform using React.js for frontend, Web3 for blockchain interactions, OpenZeppelin for secure smart contracts, MetaMask authentication, and IPFS decentralized storage. Hackathon 3rd Prize winner.',
    image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=800&auto=format&fit=crop',
    tags: ['React.js', 'Web3', 'OpenZeppelin', 'MetaMask', 'IPFS', 'Infura'],
    link: 'https://github.com/Tushar-Ranjan-Sahoo/'
  },
  {
    id: 'project-2',
    title: 'PARCEL MANAGEMENT',
    description: 'Logistics and parcel tracking system with predictive analytics, real-time status dispatch, and automated routing.',
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800&auto=format&fit=crop',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL']
  },
  {
    id: 'project-3',
    title: 'BANK MANAGEMENT',
    description: 'Secure, scalable banking management system with role-based access control and encrypted transaction auditing.',
    image: 'https://images.unsplash.com/photo-1541888050669-8d7658c1db16?q=80&w=800&auto=format&fit=crop',
    tags: ['Java', 'Spring Boot', 'Spring Security', 'MySQL']
  }
];

export const timelineData: TimelineItem[] = [
  {
    id: 'exp-0',
    date: 'MAY 2025 - PRESENT',
    title: 'Systems Engineer',
    company: 'Tata Consultancy Services (TCS)',
    description: 'Migrating Data Service APIs from Spring MVC to Spring Boot 3.2.0, upgrading Java 8 to Java 21, architecting microservices, implementing Spring Security 6 session management, and integrating Redis caching to boost API performance by 40% with sub-millisecond latency.'
  },
  {
    id: 'exp-1',
    date: 'SEP 2024 - MAY 2025',
    title: 'Associate Software Engineer',
    company: 'Tech Mahindra',
    description: 'Developed and maintained enterprise web applications using Java, JSP, Spring, Spring Boot, and React. Built CI/CD pipelines using Jenkins, Docker, and Maven.'
  },
  {
    id: 'exp-2',
    date: 'JUN 2024 - SEP 2024',
    title: 'Test Engineer',
    company: 'Pinnacle Consulting LLC',
    description: 'Involved in software testing, test case creation, defect lifecycle tracking, and quality assurance.'
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


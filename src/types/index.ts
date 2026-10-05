export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  number: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  company: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

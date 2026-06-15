export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: 'Admin' | 'Agent';
};

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Negotiation' | 'Closed Won' | 'Closed Lost';

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  budget: number;
  status: LeadStatus;
  assignedAgent: string;
  createdAt: string;
};

export type PropertyStatus = 'Available' | 'Pending' | 'Sold';

export type Property = {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  price: number;
  status: PropertyStatus;
  images: string[];
  description: string;
  createdAt: string;
};

export type DealStage = 'New Lead' | 'Contacted' | 'Qualified' | 'Offer Made' | 'Under Contract' | 'Closed';

export type Deal = {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  clientId?: string;
  propertyId?: string;
  assignedAgent: string;
  closeDate: string;
};

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export type Task = {
  id: string;
  title: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: TaskStatus;
  assignee: string;
};

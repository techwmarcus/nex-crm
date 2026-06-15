import { Lead, Property, Deal, Task } from '../types';

export const mockUser = {
  id: 'usr_1',
  firstName: 'Sarah',
  lastName: 'Jenkins',
  email: 'sarah.j@nexuscrm.com',
  avatar: 'https://i.pravatar.cc/150?u=sarah.j@nexuscrm.com',
  role: 'Admin' as const,
};

export const mockDashboardStats = {
  totalLeads: 1248,
  activeClients: 342,
  propertiesListed: 89,
  closedDeals: 156,
  monthlyRevenue: 2450000,
  conversionRate: 18.5,
};

export const mockLeads: Lead[] = [
  { id: 'ld_1', name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', source: 'Website', budget: 450000, status: 'New', assignedAgent: 'Sarah Jenkins', createdAt: '2024-03-10' },
  { id: 'ld_2', name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', source: 'Referral', budget: 850000, status: 'Contacted', assignedAgent: 'Michael Chang', createdAt: '2024-03-09' },
  { id: 'ld_3', name: 'Robert Johnson', email: 'robert.j@company.com', phone: '(555) 567-8901', source: 'Zillow', budget: 1200000, status: 'Qualified', assignedAgent: 'Sarah Jenkins', createdAt: '2024-03-08' },
  { id: 'ld_4', name: 'Emily Davis', email: 'emily.d@test.com', phone: '(555) 432-1098', source: 'Organic Search', budget: 320000, status: 'Proposal Sent', assignedAgent: 'David Miller', createdAt: '2024-03-05' },
  { id: 'ld_5', name: 'Michael Wilson', email: 'mwilson@email.com', phone: '(555) 246-8135', source: 'Social Media', budget: 675000, status: 'Negotiation', assignedAgent: 'Sarah Jenkins', createdAt: '2024-03-01' },
];

export const mockProperties: Property[] = [
  { id: 'prop_1', address: '123 Meadow Lane', city: 'Austin', state: 'TX', zip: '78701', bedrooms: 4, bathrooms: 3, squareFeet: 2800, price: 850000, status: 'Available', images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'], description: 'Beautiful modern home with open floor plan.', createdAt: '2024-02-15' },
  { id: 'prop_2', address: '456 Oak Avenue', city: 'Austin', state: 'TX', zip: '78704', bedrooms: 3, bathrooms: 2, squareFeet: 1800, price: 550000, status: 'Pending', images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'], description: 'Charming bungalow in the heart of the city.', createdAt: '2024-01-20' },
  { id: 'prop_3', address: '789 Skyline Blvd', city: 'Austin', state: 'TX', zip: '78746', bedrooms: 5, bathrooms: 4.5, squareFeet: 4200, price: 2100000, status: 'Available', images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80'], description: 'Luxury estate with panoramic views.', createdAt: '2024-03-01' },
];

export const mockDeals: Deal[] = [
  { id: 'dl_1', title: '123 Meadow Lane Purchase', value: 850000, stage: 'Offer Made', assignedAgent: 'Sarah Jenkins', closeDate: '2024-04-15' },
  { id: 'dl_2', title: 'First Time Buyer - Jane Smith', value: 450000, stage: 'Qualified', assignedAgent: 'Michael Chang', closeDate: '2024-05-01' },
  { id: 'dl_3', title: '789 Skyline Blvd Investment', value: 2100000, stage: 'Under Contract', assignedAgent: 'Sarah Jenkins', closeDate: '2024-03-30' },
];

export const mockTasks: Task[] = [
  { id: 'tsk_1', title: 'Call John Doe regarding budget', dueDate: '2024-03-12', priority: 'High', status: 'Pending', assignee: 'Sarah Jenkins' },
  { id: 'tsk_2', title: 'Prepare open house materials', dueDate: '2024-03-14', priority: 'Medium', status: 'In Progress', assignee: 'Sarah Jenkins' },
  { id: 'tsk_3', title: 'Send contract to legal', dueDate: '2024-03-11', priority: 'High', status: 'Completed', assignee: 'Michael Chang' },
];

export const mockChartData = {
  revenueTrend: [
    { name: 'Jan', revenue: 150000 },
    { name: 'Feb', revenue: 220000 },
    { name: 'Mar', revenue: 180000 },
    { name: 'Apr', revenue: 280000 },
    { name: 'May', revenue: 350000 },
    { name: 'Jun', revenue: 420000 },
  ],
  leadSource: [
    { name: 'Website', value: 400 },
    { name: 'Zillow', value: 300 },
    { name: 'Referral', value: 250 },
    { name: 'Social', value: 150 },
  ]
};

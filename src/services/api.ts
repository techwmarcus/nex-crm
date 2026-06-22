const API_BASE_URL = 'http://localhost';

// Lead Service API
export const leadApi = {
  getLeads: async (filters?: { status?: string; assignedAgent?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.assignedAgent) params.append('assignedAgent', filters.assignedAgent);
    
    const response = await fetch(`${API_BASE_URL}:4001/leads?${params}`);
    if (!response.ok) throw new Error('Failed to fetch leads');
    return response.json();
  },

  getLead: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}:4001/leads/${id}`);
    if (!response.ok) throw new Error('Failed to fetch lead');
    return response.json();
  },

  createLead: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}:4001/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create lead');
    return response.json();
  },

  updateLead: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}:4001/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update lead');
    return response.json();
  },

  deleteLead: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}:4001/leads/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete lead');
    return response.json();
  },
};

// Property Service API
export const propertyApi = {
  getProperties: async (filters?: { status?: string; city?: string; minPrice?: number; maxPrice?: number }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.city) params.append('city', filters.city);
    if (filters?.minPrice) params.append('minPrice', String(filters.minPrice));
    if (filters?.maxPrice) params.append('maxPrice', String(filters.maxPrice));
    
    const response = await fetch(`${API_BASE_URL}:4002/properties?${params}`);
    if (!response.ok) throw new Error('Failed to fetch properties');
    return response.json();
  },

  getProperty: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}:4002/properties/${id}`);
    if (!response.ok) throw new Error('Failed to fetch property');
    return response.json();
  },

  createProperty: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}:4002/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create property');
    return response.json();
  },

  updateProperty: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}:4002/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update property');
    return response.json();
  },

  deleteProperty: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}:4002/properties/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete property');
    return response.json();
  },
};

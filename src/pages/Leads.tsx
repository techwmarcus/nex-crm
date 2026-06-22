import React, { useState, useEffect } from 'react';
import { mockLeads } from '../services/mockData';
import { leadApi } from '../services/api';
import { Lead, LeadStatus } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { StatusBanner } from '../components/ui/StatusBanner';
import { Search, Plus, Filter, MoreHorizontal } from 'lucide-react';
import { cn } from '../utils/cn';

type LeadForm = {
  name: string;
  email: string;
  phone: string;
  source: string;
  budget: number;
  status: LeadStatus;
  assignedAgent: string;
};

const emptyLeadForm: LeadForm = {
  name: '',
  email: '',
  phone: '',
  source: '',
  budget: 0,
  status: 'New',
  assignedAgent: '',
};

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({ ...emptyLeadForm });
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const response = await leadApi.getLeads();
        setLeads(response.leads);
        setError(null);
      } catch (err) {
        setLeads(mockLeads);
        setError(err instanceof Error ? err.message : 'Lead service currently offline');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeads();
  }, []);

  const handleEditLead = (lead: Lead) => {
    setEditingLeadId(lead.id);
    setLeadForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      budget: lead.budget,
      status: lead.status,
      assignedAgent: lead.assignedAgent,
    });
    setShowCreateForm(true);
    setSubmitError(null);
    setSuccessMessage(null);
  };

  const handleDeleteLead = async (id: string) => {
    try {
      await leadApi.deleteLead(id);
      setLeads(prev => prev.filter(lead => lead.id !== id));
      setSuccessMessage('Lead deleted successfully.');
      setSubmitError(null);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Unable to delete lead');
      setSuccessMessage(null);
    }
  };

  const handleCreateLead = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const payload = {
      name: leadForm.name,
      email: leadForm.email,
      phone: leadForm.phone,
      source: leadForm.source || 'Website',
      budget: Number(leadForm.budget) || 0,
      status: leadForm.status,
      assignedAgent: leadForm.assignedAgent || 'Unassigned',
    };

    if (editingLeadId) {
      try {
        const result = await leadApi.updateLead(editingLeadId, payload);
        setLeads(prev => prev.map(lead => lead.id === editingLeadId ? result.lead : lead));
        setSuccessMessage('Lead updated successfully.');
        setSubmitError(null);
        setEditingLeadId(null);
        setLeadForm({ ...emptyLeadForm });
        setShowCreateForm(false);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Unable to update lead');
        setSuccessMessage(null);
      }
      return;
    }

    try {
      const result = await leadApi.createLead(payload);
      setLeads(prev => [result.lead, ...prev]);
      setLeadForm({ ...emptyLeadForm });
      setShowCreateForm(false);
      setSuccessMessage('Lead added successfully.');
      setSubmitError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to create lead';
      setSubmitError(message);
      setSuccessMessage(null);
      setLeads(prev => [
        {
          id: `local-${Date.now()}`,
          ...payload,
          createdAt: new Date().toISOString().split('T')[0],
        },
        ...prev,
      ]);
      setShowCreateForm(false);
    }
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {error && (
        <StatusBanner message="Lead service offline. Showing local fallback data." variant="warning" />
      )}
      {successMessage && (
        <StatusBanner message={successMessage} variant="info" />
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Leads</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and track your prospective clients.</p>
        </div>
        <Button className="shrink-0 gap-2" onClick={() => {
          setShowCreateForm(prev => !prev);
          setSuccessMessage(null);
          setSubmitError(null);
        }}>
          <Plus className="w-4 h-4" />
          {showCreateForm ? 'Cancel' : 'Add Lead'}
        </Button>
      </div>
      {showCreateForm && (
        <Card className="p-6 bg-slate-50 border border-slate-200">
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCreateLead}>
            <Input
              value={leadForm.name}
              onChange={e => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Name"
              required
            />
            <Input
              type="email"
              value={leadForm.email}
              onChange={e => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Email"
              required
            />
            <Input
              value={leadForm.phone}
              onChange={e => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Phone"
            />
            <Input
              value={leadForm.assignedAgent}
              onChange={e => setLeadForm(prev => ({ ...prev, assignedAgent: e.target.value }))}
              placeholder="Assigned Agent"
            />
            <Input
              value={leadForm.source}
              onChange={e => setLeadForm(prev => ({ ...prev, source: e.target.value }))}
              placeholder="Source"
            />
            <Input
              type="number"
              value={leadForm.budget}
              onChange={e => setLeadForm(prev => ({ ...prev, budget: Number(e.target.value) }))}
              placeholder="Budget"
              min={0}
            />
            <div className="md:col-span-2 flex flex-wrap gap-2 items-center">
              <Button type="submit">Save Lead</Button>
              <Button variant="outline" type="button" onClick={() => {
                setLeadForm({ ...emptyLeadForm });
                setEditingLeadId(null);
                setShowCreateForm(false);
              }}>
                Cancel
              </Button>
            </div>
            {submitError && (
              <div className="md:col-span-2 text-sm text-red-600">{submitError}</div>
            )}
          </form>
        </Card>
      )}

      <Card className="flex flex-col">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center gap-4 justify-between bg-white rounded-t-xl">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search leads..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2 shrink-0">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Budget</th>
                <th className="px-6 py-4 hidden md:table-cell">Source</th>
                <th className="px-6 py-4 hidden lg:table-cell">Agent</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">{lead.name}</span>
                      <span className="text-slate-500 text-xs">{lead.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ring-1 ring-inset",
                      lead.status === 'New' ? "bg-blue-50 text-blue-700 ring-blue-600/20" :
                      lead.status === 'Qualified' ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20" :
                      lead.status === 'Negotiation' ? "bg-amber-50 text-amber-700 ring-amber-600/20" :
                      "bg-slate-50 text-slate-700 ring-slate-600/20"
                    )}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    ${lead.budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell text-slate-500">
                    {lead.source}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                         {lead.assignedAgent.charAt(0)}
                       </div>
                       <span className="text-slate-700">{lead.assignedAgent}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditLead(lead)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteLead(lead.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && (
            <div className="p-8 text-center text-slate-500">
              Loading leads...
            </div>
          )}
          {error && (
            <div className="p-8 text-center text-red-500">
              {error}. Showing mock data.
            </div>
          )}
          {!loading && filteredLeads.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No leads found
            </div>
          )}
        </div>
        
        {/* Simple Pagination Placeholder */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-white rounded-b-xl text-sm">
           <span className="text-slate-500">Showing {filteredLeads.length} of {leads.length} results</span>
           <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
           </div>
        </div>
      </Card>
    </div>
  );
}

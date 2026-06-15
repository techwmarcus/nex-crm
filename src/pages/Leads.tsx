import React, { useState } from 'react';
import { mockLeads } from '../services/mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Plus, Filter, MoreHorizontal } from 'lucide-react';
import { cn } from '../utils/cn';

export function Leads() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = mockLeads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Leads</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and track your prospective clients.</p>
        </div>
        <Button className="shrink-0 gap-2">
          <Plus className="w-4 h-4" />
          Add Lead
        </Button>
      </div>

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
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Simple Pagination Placeholder */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-white rounded-b-xl text-sm">
           <span className="text-slate-500">Showing {filteredLeads.length} of {mockLeads.length} results</span>
           <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
           </div>
        </div>
      </Card>
    </div>
  );
}

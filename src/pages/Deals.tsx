import React from 'react';
import { mockDeals } from '../services/mockData';
import { DealStage } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plus, MoreHorizontal, Calendar } from 'lucide-react';
import { cn } from '../utils/cn';

const STAGES: DealStage[] = ['New Lead', 'Contacted', 'Qualified', 'Offer Made', 'Under Contract', 'Closed'];

export function Deals() {
  
  return (
    <div className="flex flex-col h-full -m-6 p-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Deals Pipeline</h1>
          <p className="text-sm text-slate-500 mt-1">Manage opportunities across different stages.</p>
        </div>
        <Button className="shrink-0 gap-2">
          <Plus className="w-4 h-4" />
          New Deal
        </Button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
         <div className="flex h-full gap-6 pb-4 inline-flex items-start">
            {STAGES.map(stage => {
              const stageDeals = mockDeals.filter(d => d.stage === stage);
              const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

              return (
                 <div key={stage} className="flex flex-col w-[320px] shrink-0 h-full max-h-full">
                    <div className="flex items-center justify-between mb-3 px-1 mt-1 shrink-0">
                       <h3 className="font-semibold text-slate-800 text-sm tracking-tight">{stage} <span className="text-slate-400 font-normal ml-1">({stageDeals.length})</span></h3>
                       <span className="text-xs font-medium text-slate-500">${(totalValue / 1000).toFixed(0)}k</span>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-3 pb-2 pr-2 custom-scrollbar">
                       {stageDeals.map(deal => (
                         <Card key={deal.id} className="cursor-grab active:cursor-grabbing hover:border-blue-300 transition-colors bg-white shadow-sm hover:shadow">
                            <CardContent className="p-4 flex flex-col gap-3">
                               <div className="flex justify-between items-start">
                                 <h4 className="font-medium text-slate-900 text-sm leading-snug">{deal.title}</h4>
                                 <button className="text-slate-400 hover:text-slate-600 shrink-0">
                                   <MoreHorizontal className="w-4 h-4" />
                                 </button>
                               </div>
                               <div className="text-lg font-semibold tracking-tight text-slate-800">
                                 ${deal.value.toLocaleString()}
                               </div>
                               <div className="flex items-center justify-between mt-1 pt-3 border-t border-slate-100">
                                 <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                    {new Date(deal.closeDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                 </div>
                                 <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 title" title={deal.assignedAgent}>
                                     {deal.assignedAgent.split(' ').map(n => n[0]).join('')}
                                 </div>
                               </div>
                            </CardContent>
                         </Card>
                       ))}
                       {stageDeals.length === 0 && (
                         <div className="h-24 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm">
                           No deals
                         </div>
                       )}
                    </div>
                 </div>
              )
            })}
         </div>
      </div>
    </div>
  );
}

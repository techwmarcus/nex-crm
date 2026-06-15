import React, { useState } from 'react';
import { mockProperties } from '../services/mockData';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Plus, Filter, BedDouble, Bath, Square, MapPin } from 'lucide-react';
import { cn } from '../utils/cn';

export function Properties() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockProperties.filter(p => 
    p.address.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Properties</h1>
          <p className="text-sm text-slate-500 mt-1">Manage listings and property details.</p>
        </div>
        <Button className="shrink-0 gap-2">
          <Plus className="w-4 h-4" />
          Add Property
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by address or city..." 
              className="pl-9 bg-white shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2 shrink-0 bg-white shadow-sm">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
         {filtered.map(property => (
            <Card key={property.id} className="overflow-hidden group flex flex-col cursor-pointer hover:shadow-md transition-all">
               <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                 <img 
                    src={property.images[0]} 
                    alt={property.address}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 />
                 <div className="absolute top-3 left-3">
                   <span className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm backdrop-blur-md",
                      property.status === 'Available' ? "bg-emerald-500/90 text-white" :
                      property.status === 'Pending' ? "bg-amber-500/90 text-white" : "bg-slate-800/90 text-white"
                   )}>
                      {property.status}
                   </span>
                 </div>
               </div>
               <CardContent className="p-5 flex flex-col flex-1">
                 <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-1">${property.price.toLocaleString()}</h3>
                 <div className="flex items-start gap-1 text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{property.address}<br/>{property.city}, {property.state} {property.zip}</span>
                 </div>
                 
                 <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-slate-600 text-sm">
                    <div className="flex items-center gap-1.5">
                       <BedDouble className="w-4 h-4 text-slate-400" />
                       <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                       <Bath className="w-4 h-4 text-slate-400" />
                       <span className="font-medium">{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                       <Square className="w-4 h-4 text-slate-400" />
                       <span className="font-medium">{property.squareFeet.toLocaleString()} sqft</span>
                    </div>
                 </div>
               </CardContent>
            </Card>
         ))}
      </div>
    </div>
  );
}

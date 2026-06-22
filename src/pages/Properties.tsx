import React, { useState, useEffect } from 'react';
import { mockProperties } from '../services/mockData';
import { propertyApi } from '../services/api';
import { Property, PropertyStatus } from '../types';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { StatusBanner } from '../components/ui/StatusBanner';
import { Search, Plus, Filter, BedDouble, Bath, Square, MapPin } from 'lucide-react';
import { cn } from '../utils/cn';

type PropertyForm = {
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
};

const emptyPropertyForm: PropertyForm = {
  address: '',
  city: '',
  state: '',
  zip: '',
  bedrooms: 0,
  bathrooms: 0,
  squareFeet: 0,
  price: 0,
  status: 'Available',
  images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
  description: '',
};

export function Properties() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [propertyForm, setPropertyForm] = useState<PropertyForm>({ ...emptyPropertyForm });
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await propertyApi.getProperties();
        setProperties(response.properties);
        setError(null);
      } catch (err) {
        setProperties(mockProperties);
        setError(err instanceof Error ? err.message : 'Property service currently offline');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);

  const handleEditProperty = (property: Property) => {
    setEditingPropertyId(property.id);
    setPropertyForm({
      address: property.address,
      city: property.city,
      state: property.state,
      zip: property.zip,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareFeet: property.squareFeet,
      price: property.price,
      status: property.status,
      images: property.images,
      description: property.description,
    });
    setShowCreateForm(true);
    setSubmitError(null);
    setSuccessMessage(null);
  };

  const handleDeleteProperty = async (id: string) => {
    try {
      await propertyApi.deleteProperty(id);
      setProperties(prev => prev.filter(property => property.id !== id));
      setSuccessMessage('Property deleted successfully.');
      setSubmitError(null);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Unable to delete property');
      setSuccessMessage(null);
    }
  };

  const handleCreateProperty = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const payload = {
      address: propertyForm.address,
      city: propertyForm.city,
      state: propertyForm.state,
      zip: propertyForm.zip,
      bedrooms: Number(propertyForm.bedrooms),
      bathrooms: Number(propertyForm.bathrooms),
      squareFeet: Number(propertyForm.squareFeet),
      price: Number(propertyForm.price),
      status: propertyForm.status,
      images: propertyForm.images,
      description: propertyForm.description,
    };

    if (editingPropertyId) {
      try {
        const result = await propertyApi.updateProperty(editingPropertyId, payload);
        setProperties(prev => prev.map(property => property.id === editingPropertyId ? result.property : property));
        setSuccessMessage('Property updated successfully.');
        setSubmitError(null);
        setEditingPropertyId(null);
        setPropertyForm({ ...emptyPropertyForm });
        setShowCreateForm(false);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Unable to update property');
        setSuccessMessage(null);
      }
      return;
    }

    try {
      const result = await propertyApi.createProperty(payload);
      setProperties(prev => [result.property, ...prev]);
      setPropertyForm({ ...emptyPropertyForm });
      setShowCreateForm(false);
      setSuccessMessage('Property added successfully.');
      setSubmitError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to create property';
      setSubmitError(message);
      setSuccessMessage(null);
      setProperties(prev => [
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

  const filtered = properties.filter(p => 
    p.address.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {error && (
        <StatusBanner message="Property service offline. Showing local fallback data." variant="warning" />
      )}
      {successMessage && (
        <StatusBanner message={successMessage} variant="info" />
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Properties</h1>
          <p className="text-sm text-slate-500 mt-1">Manage listings and property details.</p>
        </div>
        <Button className="shrink-0 gap-2" onClick={() => {
          setShowCreateForm(prev => !prev);
          setSuccessMessage(null);
          setSubmitError(null);
        }}>
          <Plus className="w-4 h-4" />
          {showCreateForm ? 'Cancel' : 'Add Property'}
        </Button>
      </div>
      {showCreateForm && (
        <Card className="p-6 bg-slate-50 border border-slate-200">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">{editingPropertyId ? 'Edit Property' : 'Add Property'}</h2>
            <p className="text-sm text-slate-500">{editingPropertyId ? 'Update the property details below.' : 'Create a new property listing.'}</p>
          </div>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCreateProperty}>
            <Input
              value={propertyForm.address}
              onChange={e => setPropertyForm(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Address"
              required
            />
            <Input
              value={propertyForm.city}
              onChange={e => setPropertyForm(prev => ({ ...prev, city: e.target.value }))}
              placeholder="City"
              required
            />
            <Input
              value={propertyForm.state}
              onChange={e => setPropertyForm(prev => ({ ...prev, state: e.target.value }))}
              placeholder="State"
              required
            />
            <Input
              value={propertyForm.zip}
              onChange={e => setPropertyForm(prev => ({ ...prev, zip: e.target.value }))}
              placeholder="ZIP Code"
              required
            />
            <Input
              type="number"
              value={propertyForm.bedrooms}
              onChange={e => setPropertyForm(prev => ({ ...prev, bedrooms: Number(e.target.value) }))}
              placeholder="Bedrooms"
              min={0}
            />
            <Input
              type="number"
              value={propertyForm.bathrooms}
              onChange={e => setPropertyForm(prev => ({ ...prev, bathrooms: Number(e.target.value) }))}
              placeholder="Bathrooms"
              min={0}
            />
            <Input
              type="number"
              value={propertyForm.squareFeet}
              onChange={e => setPropertyForm(prev => ({ ...prev, squareFeet: Number(e.target.value) }))}
              placeholder="Square Feet"
              min={0}
            />
            <Input
              type="number"
              value={propertyForm.price}
              onChange={e => setPropertyForm(prev => ({ ...prev, price: Number(e.target.value) }))}
              placeholder="Price"
              min={0}
            />
            <Input
              value={propertyForm.status}
              onChange={e => setPropertyForm(prev => ({ ...prev, status: e.target.value as any }))}
              placeholder="Status"
            />
            <Input
              value={propertyForm.description}
              onChange={e => setPropertyForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Description"
            />
            <div className="md:col-span-2 flex flex-wrap gap-2 items-center">
              <Button type="submit">{editingPropertyId ? 'Update Property' : 'Save Property'}</Button>
              <Button variant="outline" type="button" onClick={() => {
                setPropertyForm({ ...emptyPropertyForm });
                setEditingPropertyId(null);
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
         {loading && (
           <div className="col-span-full p-8 text-center text-slate-500">
             Loading properties...
           </div>
         )}
         {error && (
           <div className="col-span-full p-8 text-center text-red-500">
             {error}. Showing mock data.
           </div>
         )}
         {!loading && filtered.length === 0 && (
           <div className="col-span-full p-8 text-center text-slate-500">
             No properties found
           </div>
         )}
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
                 <div className="flex flex-col gap-4 mb-4">
                 <div className="flex items-start gap-1 text-slate-500 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{property.address}<br/>{property.city}, {property.state} {property.zip}</span>
                 </div>
                 <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditProperty(property)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteProperty(property.id)}>
                      Delete
                    </Button>
                 </div>
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

import React, { useEffect, useState } from 'react';
import { leadApi, propertyApi } from '../services/api';
import { mockDashboardStats, mockChartData, mockTasks } from '../services/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { StatusBanner } from '../components/ui/StatusBanner';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, Building2, Briefcase, DollarSign } from 'lucide-react';
import { cn } from '../utils/cn';

function StatCard({ title, value, change, trend, icon: Icon }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0">
          <p className="text-sm font-medium tracking-tight text-slate-500">{title}</p>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600">
             <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline space-x-3 mt-4">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{value}</h2>
          <span className={cn(
            "flex items-center text-sm font-medium",
            trend === 'up' ? "text-emerald-600" : "text-red-600"
          )}>
            {trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: mockDashboardStats.totalLeads,
    propertiesListed: mockDashboardStats.propertiesListed,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [leadsRes, propsRes] = await Promise.all([
          leadApi.getLeads(),
          propertyApi.getProperties(),
        ]);
        setStats({
          totalLeads: leadsRes.total || leadsRes.leads?.length || 0,
          propertiesListed: propsRes.total || propsRes.properties?.length || 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Dashboard services are currently unavailable');
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  return (
    <div className="space-y-6">
      {error && (
        <StatusBanner message="Some services are offline. Dashboard data may be stale." variant="warning" />
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Executive Dashboard</h1>
        <div className="flex bg-white border border-slate-200 rounded-lg shadow-sm p-1">
          <button className="px-3 py-1.5 text-sm font-medium bg-slate-100 text-slate-900 rounded-md">12M</button>
          <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900">30D</button>
          <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900">7D</button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Leads" value={stats.totalLeads} change="+12.5%" trend="up" icon={Users} />
        <StatCard title="Properties Listed" value={stats.propertiesListed} change="+4.2%" trend="up" icon={Building2} />
        <StatCard title="Closed Deals" value={mockDashboardStats.closedDeals} change="-2.4%" trend="down" icon={Briefcase} />
        <StatCard title="Monthly Revenue" value={`$${(mockDashboardStats.monthlyRevenue / 1000000).toFixed(1)}M`} change="+18.2%" trend="up" icon={DollarSign} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue generated over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData.revenueTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(value) => `$${value/1000}k`} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Origin of incoming leads for the current period.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData.leadSource} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#0F172A', fontWeight: 500 }} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-2">
         {/* Placeholder for Recent Activity and Tasks to fill the space visually */}
         <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {mockTasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-slate-900">{task.title}</span>
                          <span className="text-xs text-slate-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                        <span className={cn(
                          "px-2 py-1 text-xs font-semibold rounded-full",
                          task.priority === 'High' ? "bg-red-100 text-red-700" :
                          task.priority === 'Medium' ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                        )}>
                          {task.priority}
                        </span>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-6">
                 {[
                   { t: 'New lead generated from Website', d: '2 hours ago', c: 'bg-emerald-500' },
                   { t: 'Property "123 Meadow Lane" status changed to Pending', d: '4 hours ago', c: 'bg-blue-500' },
                   { t: 'Contract signed for "789 Skyline Blvd"', d: '5 hours ago', c: 'bg-purple-500' },
                 ].map((act, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="relative flex-none mt-1">
                          <div className={cn("w-3 h-3 rounded-full ring-4 ring-white", act.c)} />
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-slate-900">{act.t}</span>
                          <span className="text-xs text-slate-500">{act.d}</span>
                       </div>
                    </div>
                 ))}
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}

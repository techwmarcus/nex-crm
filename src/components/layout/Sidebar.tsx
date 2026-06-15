import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '../../store';
import { cn } from '../../utils/cn';
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  FileText, 
  CheckSquare, 
  Calendar, 
  BarChart, 
  Settings,
  Briefcase,
  Home
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Leads', to: '/leads', icon: Users },
  { name: 'Properties', to: '/properties', icon: Home },
  { name: 'Deals', to: '/deals', icon: Briefcase },
  { name: 'Clients', to: '/clients', icon: Building2 }, // Placeholder mapping
  { name: 'Documents', to: '/documents', icon: FileText },
  { name: 'Tasks', to: '/tasks', icon: CheckSquare },
  { name: 'Calendar', to: '/calendar', icon: Calendar },
  { name: 'Reports', to: '/reports', icon: BarChart },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export function Sidebar() {
  const { sidebarOpen } = useAppStore();

  return (
    <div className={cn(
      "flex flex-col bg-slate-900 border-r border-slate-800 text-slate-300 transition-all duration-300 ease-in-out z-20",
      sidebarOpen ? "w-64" : "w-20"
    )}>
      <div className="flex h-16 shrink-0 items-center justify-center border-b border-slate-800 px-4">
        {sidebarOpen ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Nexus CRM</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto pt-6 pb-4">
        <nav className="flex-1 space-y-1 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) => cn(
                  "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white",
                  isActive ? "bg-slate-800 text-blue-400" : "text-slate-400"
                )}
              >
                <Icon className={cn(
                  "shrink-0",
                  sidebarOpen ? "mr-3 h-5 w-5" : "h-6 w-6 mx-auto"
                )} aria-hidden="true" />
                {sidebarOpen && <span>{item.name}</span>}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </div>
  );
}

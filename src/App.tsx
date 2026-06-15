import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Leads } from './pages/Leads';
import { Properties } from './pages/Properties';
import { Deals } from './pages/Deals';
import { Login } from './pages/Login';

// Placeholder empty page component for unresolved routes
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-slate-500">This module is under construction.</p>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="properties" element={<Properties />} />
          <Route path="deals" element={<Deals />} />
          <Route path="clients" element={<PlaceholderPage title="Client Profiles" />} />
          <Route path="documents" element={<PlaceholderPage title="Document Management" />} />
          <Route path="tasks" element={<PlaceholderPage title="Task Board" />} />
          <Route path="calendar" element={<PlaceholderPage title="Calendar Integration" />} />
          <Route path="reports" element={<PlaceholderPage title="Analytics Reports" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings configuration" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const PORT = Number(process.env.LEAD_PORT || 4001);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost';

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', FRONTEND_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
app.use(express.json());

let leads = [
  { id: 'ld_1', name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', source: 'Website', budget: 450000, status: 'New', assignedAgent: 'Sarah Jenkins', createdAt: '2024-03-10' },
  { id: 'ld_2', name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', source: 'Referral', budget: 850000, status: 'Contacted', assignedAgent: 'Michael Chang', createdAt: '2024-03-09' },
  { id: 'ld_3', name: 'Robert Johnson', email: 'robert.j@company.com', phone: '(555) 567-8901', source: 'Zillow', budget: 1200000, status: 'Qualified', assignedAgent: 'Sarah Jenkins', createdAt: '2024-03-08' },
  { id: 'ld_4', name: 'Emily Davis', email: 'emily.d@test.com', phone: '(555) 432-1098', source: 'Organic Search', budget: 320000, status: 'Proposal Sent', assignedAgent: 'David Miller', createdAt: '2024-03-05' },
  { id: 'ld_5', name: 'Michael Wilson', email: 'mwilson@email.com', phone: '(555) 246-8135', source: 'Social Media', budget: 675000, status: 'Negotiation', assignedAgent: 'Sarah Jenkins', createdAt: '2024-03-01' },
];

const generateId = () => 'ld_' + crypto.randomBytes(8).toString('hex');

app.get('/status', (req, res) => {
  res.json({ status: 'ok', service: 'lead', version: '0.1.0' });
});

app.get('/leads', (req, res) => {
  const { status, assignedAgent } = req.query;
  
  let filtered = leads;
  if (status) {
    filtered = filtered.filter(lead => lead.status === status);
  }
  if (assignedAgent) {
    filtered = filtered.filter(lead => lead.assignedAgent === assignedAgent);
  }
  
  res.json({ leads: filtered, total: filtered.length });
});

app.get('/leads/:id', (req, res) => {
  const lead = leads.find(l => l.id === req.params.id);
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  res.json({ lead });
});

app.post('/leads', (req, res) => {
  const { name, email, phone, source, budget, status = 'New', assignedAgent } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const newLead = {
    id: generateId(),
    name,
    email,
    phone,
    source,
    budget,
    status,
    assignedAgent,
    createdAt: new Date().toISOString().split('T')[0],
  };
  
  leads.push(newLead);
  res.status(201).json({ lead: newLead });
});

app.put('/leads/:id', (req, res) => {
  const lead = leads.find(l => l.id === req.params.id);
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  
  Object.assign(lead, req.body);
  res.json({ lead });
});

app.delete('/leads/:id', (req, res) => {
  const index = leads.findIndex(l => l.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  
  const deleted = leads.splice(index, 1);
  res.json({ success: true, lead: deleted[0] });
});

app.use((_, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Lead service running on port ${PORT}`);
});

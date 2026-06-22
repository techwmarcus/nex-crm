import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const PORT = Number(process.env.PROPERTY_PORT || 4002);
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

let properties = [
  { id: 'prop_1', address: '123 Meadow Lane', city: 'Austin', state: 'TX', zip: '78701', bedrooms: 4, bathrooms: 3, squareFeet: 2800, price: 850000, status: 'Available', images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'], description: 'Beautiful modern home with open floor plan.', createdAt: '2024-02-15' },
  { id: 'prop_2', address: '456 Oak Avenue', city: 'Austin', state: 'TX', zip: '78704', bedrooms: 3, bathrooms: 2, squareFeet: 1800, price: 550000, status: 'Pending', images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'], description: 'Charming bungalow in the heart of the city.', createdAt: '2024-01-20' },
  { id: 'prop_3', address: '789 Skyline Blvd', city: 'Austin', state: 'TX', zip: '78746', bedrooms: 5, bathrooms: 4.5, squareFeet: 4200, price: 2100000, status: 'Available', images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80'], description: 'Luxury estate with panoramic views.', createdAt: '2024-03-01' },
];

const generateId = () => 'prop_' + crypto.randomBytes(8).toString('hex');

app.get('/status', (req, res) => {
  res.json({ status: 'ok', service: 'property', version: '0.1.0' });
});

app.get('/properties', (req, res) => {
  const { status, city, minPrice, maxPrice } = req.query;
  
  let filtered = properties;
  if (status) {
    filtered = filtered.filter(p => p.status === status);
  }
  if (city) {
    filtered = filtered.filter(p => p.city === city);
  }
  if (minPrice) {
    filtered = filtered.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= Number(maxPrice));
  }
  
  res.json({ properties: filtered, total: filtered.length });
});

app.get('/properties/:id', (req, res) => {
  const property = properties.find(p => p.id === req.params.id);
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  res.json({ property });
});

app.post('/properties', (req, res) => {
  const { address, city, state, zip, bedrooms, bathrooms, squareFeet, price, status = 'Available', images = [], description } = req.body;
  
  if (!address || !city || !state || !zip) {
    return res.status(400).json({ error: 'Address, city, state, and zip are required' });
  }
  
  const newProperty = {
    id: generateId(),
    address,
    city,
    state,
    zip,
    bedrooms,
    bathrooms,
    squareFeet,
    price,
    status,
    images,
    description,
    createdAt: new Date().toISOString().split('T')[0],
  };
  
  properties.push(newProperty);
  res.status(201).json({ property: newProperty });
});

app.put('/properties/:id', (req, res) => {
  const property = properties.find(p => p.id === req.params.id);
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  
  Object.assign(property, req.body);
  res.json({ property });
});

app.delete('/properties/:id', (req, res) => {
  const index = properties.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Property not found' });
  }
  
  const deleted = properties.splice(index, 1);
  res.json({ success: true, property: deleted[0] });
});

app.use((_, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Property service running on port ${PORT}`);
});

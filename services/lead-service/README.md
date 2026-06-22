# Lead Service

Standalone lead management service for the Nexus CRM project.

## Run locally

1. Install dependencies:
   ```bash
   cd services/lead-service
   npm install
   ```

2. Start the service:
   ```bash
   npm start
   ```

The service listens on port `4001` by default.

## API Endpoints

- `GET /status` - health check
- `GET /leads` - list all leads (supports `?status=` and `?assignedAgent=` filters)
- `GET /leads/:id` - get a specific lead
- `POST /leads` - create a new lead (requires `name` and `email`)
- `PUT /leads/:id` - update a lead
- `DELETE /leads/:id` - delete a lead

## Docker

Build and run:

```bash
cd services/lead-service
docker build -t nexcrm-lead-service .
docker run -p 4001:4001 nexcrm-lead-service
```

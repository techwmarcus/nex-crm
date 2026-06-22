# Property Service

Standalone property management service for the Nexus CRM project.

## Run locally

1. Install dependencies:
   ```bash
   cd services/property-service
   npm install
   ```

2. Start the service:
   ```bash
   npm start
   ```

The service listens on port `4002` by default.

## API Endpoints

- `GET /status` - health check
- `GET /properties` - list all properties (supports `?status=`, `?city=`, `?minPrice=`, `?maxPrice=` filters)
- `GET /properties/:id` - get a specific property
- `POST /properties` - create a new property (requires `address`, `city`, `state`, `zip`)
- `PUT /properties/:id` - update a property
- `DELETE /properties/:id` - delete a property

## Docker

Build and run:

```bash
cd services/property-service
docker build -t nexcrm-property-service .
docker run -p 4002:4002 nexcrm-property-service
```

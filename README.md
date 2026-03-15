### Claude Notes Agent

Quick project to understand the basics of the claude agent SDK. 

### To Do
- [x] Setup POST/GET /api/notes (with in memory notes)
- [x] Setup basic index.html + app.js client to display/create notes
- [x] Setup drizzle/postgres for DB
- [ ] Replace raw html with react/vite
- [ ] Add WebSocket (ws) to express server 
- [ ] Add basic Claude Agent SDK
- [ ] Add basic MCP tools for creating/getting notes

### Current Status

Setup express HTTP server with ability to POST/GET notes. 

### Instructions

1. Create/run DB
```bash
psql postgres
CREATE DATABASE notes;
\c notes
SELECT version();
```

2. Generate migration + run server
```bash
npm run generate
npm run dev
```

3. Navigate to http://localhost:8080/app

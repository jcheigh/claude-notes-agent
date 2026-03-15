### Claude Notes Agent

Quick project to understand the basics of the claude agent SDK. 

### Current Status

Setup express HTTP server with ability to POST/GET notes. 

### Instructions

1. Start server
```bash
npm run dev
```

2. send POST to create a note
```bash
cURL -X POST -H "Content-Type: application/json" -d '{"note" : "this is a test","title":"test","author":"justin"}' http://localhost:8080/api/notes
```

3. send GET to get notes
```bash
cURL http://localhost:8080/api/notes
```
# Case Management API Documentation

## Overview
This API enables the management and retrieval of user/case data from a JSON-based storage system. It supports functionalities like searching, sorting, filtering by status, and pagination.

## Base URL
Access the API locally:

http://localhost:3000

## Endpoints

### 1. Get Cases

Fetch a list of cases with options for searching, sorting, pagination, and status-based filtering.

#### URL
/requests

#### Method
GET

#### URL Parameters

Optional:
- `search=[string]`: Search keyword across all textual fields.
- `sort=[string]`: Field name to sort by.
- `order=[string]`: Sorting order ('asc' for ascending, 'desc' for descending).
- `page=[integer]`: Page number in the pagination sequence.
- `limit=[integer]`: Number of items per page.
- `status=[string]`: Filter cases by their status (e.g., 'Pending', 'Accepted', 'Rejected').

#### Success Response
- **Code:** 200 OK
- **Content:**
  ```json
  {
    "total": 20,
    "page": 1,
    "limit": 10,
    "data": [
      {
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com",
        "status": "Pending"
      },
      {
        "id": 2,
        "name": "Bob",
        "email": "bob@example.com",
        "status": "Rejected"
      }
      // additional cases
    ]
  }

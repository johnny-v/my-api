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
- `status=[string]`: Filter cases by their status (e.g., 'Pending', 'Accepted', 'Rejected'). Not passing status returns all cases.

#### Success Response
- **Code:** 200 OK
- **Content:**
  ```json
  {
    "total": 20,
    "page": 1,
    "limit": 10,
    "data": [
          "priority": "Routine",
          "caseID": "e226fff7-8441-413a-ae4f-c0a6c9712914",
          "patient": "Joe Merrifield",
          "requestMessage": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
          "type": "Missing material",
          "subType": "IHC",
          "status": "Rejected",
          "requestCreated": "1/18/2024",
          "lastUpdated": "3/5/2024",
          "requestExported": "12/25/2023"
      {
          "priority": "Routine",
          "caseID": "390f0b8e-4f3f-4a58-814f-eb373a6ee70e",
          "patient": "Donetta Morden",
          "requestMessage": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
          "type": "Rescan",
          "subType": "Molecular tests",
          "status": "Accepted",
          "requestCreated": "3/29/2024",
          "lastUpdated": "2/20/2024",
          "requestExported": "9/9/2023"
      }
      // additional cases
    ]
  }

#### Sample Call
curl -X GET "http://localhost:3000/requests?search=Joe&sort=requestCreated&order=asc&page=1&limit=10&status=Pending"

  

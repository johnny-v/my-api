# Case Management API Documentation

## Overview
This API enables the management and retrieval of user/case data from a JSON-based storage system. It supports functionalities like searching, sorting, filtering by status, and pagination.

## Prerequisites
Before setting up the project, ensure you have the following installed:

- Node.js (at least Node 18 or later)
- NPM (Node Package Manager)

## Installation
```
npm install
```

## Running
```
node server.js
```


## Base URL
Access the API locally:

http://localhost:3000

## Endpoints

### 1. Get Cases

Fetch a list of cases with options for searching, sorting, pagination, and status-based filtering.

**URL**: `/requests`

#### Request Details

##### HTTP Method
```
GET
```

##### URL Parameters

Optional:
- `search=[string]`: Search keyword across all textual fields.
- `sort=[string]`: Field name to sort by.
- `order=[string]`: Sorting order ('asc' for ascending, 'desc' for descending).
- `page=[integer]`: Page number in the pagination sequence.
- `limit=[integer]`: Number of items per page.
- `status=[string]`: Filter cases by their status (e.g., 'Pending', 'Accepted', 'Rejected'). Not passing status returns all cases.

##### Success Response
- **Code:** 200 OK
- **Content:**
  ```json
  {
    "total": 20,
    "page": 1,
    "limit": 10,
    "data": [
          {
    "caseName": "2095",
    "priority": "High",
    "assignee": "Cort Bowller",
    "description": "Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    "status": "In Progress",
    "type": "Clinical Chemistry",
    "dateCreated": "12/16/2023",
    "lastUpdated": "10/10/2023"
  },
  {
    "caseName": "3401",
    "priority": "Low",
    "assignee": "Laura Morsley",
    "description": "Morbi porttitor lorem id ligula.",
    "status": "Accepted",
    "type": "Clinical Chemistry",
    "dateCreated": "9/15/2023",
    "lastUpdated": "9/9/2023"
  },
      // additional cases
    ]
  }

##### Sample Call
```bash
curl -X GET "http://localhost:3000/requests?search=Joe&sort=requestCreated&order=asc&page=1&limit=10&status=In%20Progress"
```

### 2. Update Case Status

This endpoint allows clients to update the status of one or more cases. It accepts an array of case IDs and a new status to apply to these cases.

**URL**: `/update-status`

#### Request Details

##### HTTP Method
```
PUT
```

##### Request Body
The request body must include a JSON object with two properties: `ids` and `status`. `ids` is an array of strings that represent the IDs of the cases you wish to update, and `status` is a string indicating the new status for these cases.

##### Example Request Body
```json
{
  "ids": ["2095", "3401"],
  "status": "Accepted"
}
```

##### Parameters
- **ids** (`array` of `strings`): Case IDs to be updated.
- **status** (`string`): The new status to assign to the specified cases.

##### Responses

##### Success Response
- **Code**: 200 OK
- **Content**:
  ```json
  {
    "message": "Case status updated successfully.",
    "updatedCount": 3
  }
  ```

##### Error Responses
- **Code**: 400 Bad Request
- **Content**:
  ```json
  {
    "error": "Invalid request data. Please check the `ids` and `status` fields."
  }
  ```
- **Code**: 500 Internal Server Error
- **Content**:
  ```json
  {
    "error": "Failed to update case status due to a server error."
  }
  ```

##### Example Curl Command
Use the following curl command to invoke this endpoint:
```bash
curl -X PUT http://localhost:3000/update-status      -H "Content-Type: application/json"      -d '{"ids": ["aeb02a1f-de51-41fe-9dd7-eb5e1fb43854", "c95a4f2f-ce51-4c0e-88e9-43f67fe7ae94"], "status": "Accepted"}'
```
  

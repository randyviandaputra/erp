# ERP System API Documentation

## Overview

The ERP System API provides endpoints for managing quotations, sales orders, products, customers, and user authentication. The API uses JWT tokens for authentication and implements role-based access control.

**Base URL**: `http://localhost:4000`  
**Content-Type**: `application/json`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## User Roles

- **ADMIN**: Full access to all endpoints
- **SALES**: Can manage quotations and sales orders
- **CUSTOMER**: Can view their own quotations and create new ones

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "CUSTOMER"
}
```

**Response (201):**
```json
{
  "message": "User created",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CUSTOMER"
  }
}
```

**Error Responses:**
- `400` - Email already exists
- `500` - Internal server error

---

### Login User
**POST** `/auth/login`

Authenticates user and returns JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CUSTOMER"
  }
}
```

**Error Responses:**
- `401` - Invalid credentials
- `500` - Internal server error

---

### Get Current User
**GET** `/auth/me`

Returns information about the currently authenticated user.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "CUSTOMER"
}
```

**Error Responses:**
- `401` - Unauthorized
- `404` - User not found
- `500` - Internal server error

---

## Quotation Endpoints

### Create Quotation
**POST** `/quotations`

Creates a new quotation with items.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "customerId": "customer-uuid",
  "items": [
    {
      "productId": "product-uuid",
      "quantity": 5
    },
    {
      "productId": "another-product-uuid",
      "quantity": 2
    }
  ]
}
```

**Response (201):**
```json
{
  "id": "quotation-uuid",
  "customerId": "customer-uuid",
  "status": "PENDING",
  "createdById": "user-uuid",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "items": [
    {
      "id": "item-uuid",
      "productId": "product-uuid",
      "quantity": 5,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "statusHistory": [
    {
      "id": "history-uuid",
      "status": "PENDING",
      "changedById": "user-uuid",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Error Responses:**
- `400` - Invalid payload
- `401` - Unauthorized
- `500` - Internal server error

---

### Get All Quotations
**GET** `/quotations`

Retrieves all quotations with optional filtering and pagination.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `status` (optional) - Filter by status: `PENDING`, `APPROVED`, `REJECTED`, `CANCELED`
- `startDate` (optional) - Filter quotations created after this date (ISO format)
- `endDate` (optional) - Filter quotations created before this date (ISO format)
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 10)

**Example Request:**
```
GET /quotations?status=PENDING&page=1&limit=5&startDate=2024-01-01&endDate=2024-01-31
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "quotation-uuid",
      "customerId": "customer-uuid",
      "status": "PENDING",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z",
      "customer": {
        "id": "customer-uuid",
        "name": "Acme Corp",
        "createdAt": "2024-01-10T09:00:00Z",
        "updatedAt": "2024-01-10T09:00:00Z"
      },
      "createdBy": {
        "id": "user-uuid",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "SALES"
      },
      "approvedBy": null,
      "items": [
        {
          "id": "item-uuid",
          "productId": "product-uuid",
          "quantity": 5,
          "product": {
            "id": "product-uuid",
            "name": "Product A",
            "price": 100.00
          }
        }
      ],
      "statusHistory": [
        {
          "id": "history-uuid",
          "status": "PENDING",
          "changedById": "user-uuid",
          "timestamp": "2024-01-15T10:30:00Z"
        }
      ]
    }
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `500` - Internal server error

---

### Get Quotation by ID
**GET** `/quotations/{id}`

Retrieves a specific quotation by its ID.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Path Parameters:**
- `id` - Quotation UUID

**Response (200):**
```json
{
  "id": "quotation-uuid",
  "customerId": "customer-uuid",
  "status": "PENDING",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "customer": {
    "id": "customer-uuid",
    "name": "Acme Corp",
    "createdAt": "2024-01-10T09:00:00Z",
    "updatedAt": "2024-01-10T09:00:00Z"
  },
  "items": [
    {
      "id": "item-uuid",
      "productId": "product-uuid",
      "quantity": 5,
      "product": {
        "id": "product-uuid",
        "name": "Product A",
        "price": 100.00
      }
    }
  ],
  "createdBy": {
    "id": "user-uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "SALES"
  },
  "approvedBy": null,
  "statusHistory": [
    {
      "id": "history-uuid",
      "status": "PENDING",
      "changedById": "user-uuid",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized
- `404` - Quotation not found
- `500` - Internal server error

---

### Approve Quotation
**PUT** `/quotations/{id}/approve`

Approves a quotation and automatically creates a sales order.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Path Parameters:**
- `id` - Quotation UUID

**Required Role:** `SALES` or `ADMIN`

**Response (200):**
```json
{
  "message": "Quotation approved and sales order created",
  "quotation": {
    "id": "quotation-uuid",
    "status": "APPROVED",
    "approvedById": "user-uuid",
    "approvedAt": "2024-01-15T11:00:00Z"
  },
  "salesOrder": {
    "id": "sales-order-uuid",
    "quotationId": "quotation-uuid",
    "createdById": "user-uuid",
    "createdAt": "2024-01-15T11:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

**Error Responses:**
- `400` - Quotation already processed
- `401` - Unauthorized
- `403` - Forbidden (insufficient role)
- `404` - Quotation not found
- `500` - Internal server error

---

## Sales Order Endpoints

### Create Sales Order
**POST** `/sales-orders`

Creates a sales order from an approved quotation.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "quotationId": "quotation-uuid"
}
```

**Required Role:** `SALES` or `ADMIN`

**Response (201):**
```json
{
  "message": "Sales order created",
  "salesOrder": {
    "id": "sales-order-uuid",
    "quotationId": "quotation-uuid",
    "createdById": "user-uuid",
    "createdAt": "2024-01-15T11:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

**Error Responses:**
- `400` - Invalid request, quotation not approved, or sales order already exists
- `401` - Unauthorized
- `403` - Forbidden (insufficient role)
- `404` - Quotation not found
- `500` - Internal server error

---

### Get All Sales Orders
**GET** `/sales-orders`

Retrieves all sales orders with related data.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Required Role:** `SALES` or `ADMIN`

**Response (200):**
```json
[
  {
    "id": "sales-order-uuid",
    "quotationId": "quotation-uuid",
    "createdById": "user-uuid",
    "createdAt": "2024-01-15T11:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z",
    "quotation": {
      "id": "quotation-uuid",
      "customerId": "customer-uuid",
      "status": "APPROVED",
      "customer": {
        "id": "customer-uuid",
        "name": "Acme Corp"
      },
      "items": [
        {
          "id": "item-uuid",
          "productId": "product-uuid",
          "quantity": 5,
          "product": {
            "id": "product-uuid",
            "name": "Product A",
            "price": 100.00
          }
        }
      ]
    },
    "createdBy": {
      "id": "user-uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "SALES"
    }
  }
]
```

**Error Responses:**
- `401` - Unauthorized
- `403` - Forbidden (insufficient role)
- `500` - Internal server error

---

## Product Endpoints

### Get All Products
**GET** `/products`

Retrieves all products with optional search functionality.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `search` (optional) - Search products by name (case-insensitive)

**Example Request:**
```
GET /products?search=laptop
```

**Response (200):**
```json
[
  {
    "id": "product-uuid",
    "name": "Laptop Pro",
    "price": 1299.99,
    "createdAt": "2024-01-10T09:00:00Z",
    "updatedAt": "2024-01-10T09:00:00Z"
  },
  {
    "id": "another-product-uuid",
    "name": "Gaming Laptop",
    "price": 1499.99,
    "createdAt": "2024-01-10T10:00:00Z",
    "updatedAt": "2024-01-10T10:00:00Z"
  }
]
```

**Error Responses:**
- `401` - Unauthorized
- `500` - Internal server error

---

## Customer Endpoints

### Get All Customers
**GET** `/customers`

Retrieves all customers with optional search functionality.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `search` (optional) - Search customers by name (case-insensitive)

**Example Request:**
```
GET /customers?search=acme
```

**Response (200):**
```json
[
  {
    "id": "customer-uuid",
    "name": "Acme Corporation",
    "userId": "user-uuid",
    "createdAt": "2024-01-10T09:00:00Z",
    "updatedAt": "2024-01-10T09:00:00Z"
  },
  {
    "id": "another-customer-uuid",
    "name": "Acme Solutions",
    "userId": "another-user-uuid",
    "createdAt": "2024-01-10T10:00:00Z",
    "updatedAt": "2024-01-10T10:00:00Z"
  }
]
```

**Error Responses:**
- `401` - Unauthorized
- `500` - Internal server error

---

## Data Models

### User
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "password": "string (hashed)",
  "role": "ADMIN | SALES | CUSTOMER",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Customer
```json
{
  "id": "uuid",
  "name": "string",
  "userId": "uuid",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Product
```json
{
  "id": "uuid",
  "name": "string",
  "price": "number",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Quotation
```json
{
  "id": "uuid",
  "customerId": "uuid",
  "status": "PENDING | APPROVED | REJECTED | CANCELED",
  "createdById": "uuid",
  "approvedById": "uuid (nullable)",
  "createdAt": "datetime",
  "approvedAt": "datetime (nullable)",
  "updatedAt": "datetime"
}
```

### QuotationItem
```json
{
  "id": "uuid",
  "quotationId": "uuid",
  "productId": "uuid",
  "quantity": "number",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### SalesOrder
```json
{
  "id": "uuid",
  "quotationId": "uuid",
  "createdById": "uuid",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### StatusHistory
```json
{
  "id": "uuid",
  "quotationId": "uuid",
  "status": "PENDING | APPROVED | REJECTED | CANCELED",
  "changedById": "uuid",
  "timestamp": "datetime",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Error description"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

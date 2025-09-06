# 📦 Delivery Partner System – Backend API

Tech Stack: **Node.js, Express.js, MongoDB, JWT Authentication**

## Overview
This project provides a simple backend system for managing delivery partners, orders, and earnings with random order generation, and dashboards for a delivery partner system.

---

## ⚙️ Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Setukrjha90/delivery-partner-system.git
   cd delivery-partner-system

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

 4. Start the server
   ```bash
   npm run dev
   ```        

The server will start on `http://localhost:3000` (or the port you specified).

---

## Base URL
```
http://localhost:PORT/api/
```
Replace `PORT` with your server's port number.

---

## Authentication
Some endpoints require authentication via Bearer Token in the `Authorization` header.

---

## Endpoints

### Partner
### Authentication
#### Register Partner
- **POST** `/partner/register`
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123",
  "vehicleType": "bike"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Partner registered successfully",
  "data": { "partnerId": "..." }
}
```

#### Login Partner
- **POST** `/partner/login`
- **Request Body:**
```json
{
  "identifier": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "success": true,
  "token": "<JWT_TOKEN>"
}
```
### Partner Management
#### Get Partner Profile
- **GET** `/partner/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "success": true,
  "data": {
    "partnerId": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "vehicleType": "bike"
  }
}
```

#### Update Partner Status
- **PUT** `/partner/status`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "status": "available"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Partner status updated successfully"
}
```

#### Update Partner Location
- **PUT** `/partner/location`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
    "latitude": 12,
    "longitude": 77
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Partner location updated successfully"
}
```

---

### Orders
#### Create Order
- **POST** `/orders`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**

 Doesn't require any fields, a random order will be generated.The server will create a random order after every 2-3 minutes through a background job using the orderGenerator utility. You can also create orders manually by calling this endpoint for testing purposes.

- **Response:**
```json
{
  "success": true,
  "order": { "orderId": "...", "status": "pending", ... }
}
```


#### Get All Available Orders
- **GET** `/orders/available`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "success": true,
  "orders": [
    { "orderId": "...", "status": "pending", ... }
  ]
}
```

#### Accept Order
- **PUT** `/orders/accept`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "orderId": "..."
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Order accepted successfully"
}
```

#### Update Order Status
- **PUT** `/orders/status`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "orderId": "...",
  "status": "accepted"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Order status updated successfully"
}
```

#### Get All My Orders
- **GET** `/orders/my-orders`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "success": true,
  "orders": [
    { "orderId": "...", "status": "assigned", ... }
  ]
}
```
---

### Earnings
#### Get Partner Today Earnings
- **GET** `/earnings/today`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "success": true,
  "earnings": 1500
}
```

#### Get Partner Earnings History
- **GET** `/earnings/history`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "success": true,
  "earnings": [
    { "date": "2023-01-01", "amount": 1000 },
    { "date": "2023-01-02", "amount": 1500 }
  ]
}
```

---

### Dashboard
#### Get Dashboard Data
- **GET** `/dashboard`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "success": true,
  "data": {
    "activeOrders": [],
    "availableOrders": [],
    "completedOrders": 20,
    "totalEarnings": 1500
  }
}
```

---

## Postman Collection
A Postman collection can be generated on request. Please let us know if you need it.

---

## Notes
- All endpoints return JSON.
- For protected routes, include the JWT token in the `Authorization` header.
- Error responses will include a `success: false` and an error `message`.

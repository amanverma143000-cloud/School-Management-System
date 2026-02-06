# 🧪 Admin API Testing Guide

## 📋 Available Admin APIs

### 🔐 Authentication APIs

#### 1. **Admin Login**
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin1@school.com",
  "password": "admin123"
}
```

#### 2. **Admin Registration**
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "New Admin",
  "email": "newadmin@school.com",
  "password": "admin123",
  "domain": "Management"
}
```

### 👥 Admin Management APIs (Protected - Need Token)

#### 3. **Get All Admins**
```http
GET http://localhost:3000/api/admin/admins
Authorization: Bearer YOUR_JWT_TOKEN
```

#### 4. **Get Single Admin**
```http
GET http://localhost:3000/api/admin/admins/ADMIN_ID
Authorization: Bearer YOUR_JWT_TOKEN
```

#### 5. **Create New Admin**
```http
POST http://localhost:3000/api/admin/admins
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "Test Admin",
  "email": "testadmin@school.com",
  "password": "admin123",
  "domain": "IT"
}
```

#### 6. **Update Admin**
```http
PUT http://localhost:3000/api/admin/admins/ADMIN_ID
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "Updated Admin Name",
  "email": "updated@school.com",
  "domain": "HR"
}
```

#### 7. **Delete Admin**
```http
DELETE http://localhost:3000/api/admin/admins/ADMIN_ID
Authorization: Bearer YOUR_JWT_TOKEN
```

#### 8. **Get Dashboard Data**
```http
GET http://localhost:3000/api/admin/dashboard
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🚀 Testing Steps

### Step 1: Start Server
```bash
cd backend
npm run dev
```

### Step 2: Test Login
1. Use Postman/Thunder Client/curl
2. Send POST request to login endpoint
3. Copy the token from response

### Step 3: Test Protected Routes
1. Add Authorization header: `Bearer YOUR_TOKEN`
2. Test all CRUD operations

## 📊 Expected Responses

### ✅ Success Response (Get All Admins)
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "admin_id",
      "name": "Admin One",
      "email": "admin1@school.com",
      "domain": "Management",
      "role": "Admin",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### ✅ Success Response (Dashboard Data)
```json
{
  "success": true,
  "data": {
    "counts": {
      "admins": 5,
      "teachers": 5,
      "students": 5,
      "total": 15
    },
    "recentAdmins": [...]
  }
}
```

### ❌ Error Response
```json
{
  "success": false,
  "message": "Admin not found"
}
```

## 🐛 Common Issues & Solutions

### 1. **401 Unauthorized**
- **Problem**: Token missing या invalid
- **Solution**: Login करके नया token ले

### 2. **403 Forbidden**
- **Problem**: Admin role नहीं है
- **Solution**: Admin credentials से login करें

### 3. **404 Not Found**
- **Problem**: Invalid admin ID
- **Solution**: Valid admin ID use करें

### 4. **500 Server Error**
- **Problem**: Database connection या server issue
- **Solution**: Server logs check करें

## 📝 Testing Checklist

- [ ] Admin login working
- [ ] Token generation working
- [ ] Get all admins working
- [ ] Get single admin working
- [ ] Create admin working
- [ ] Update admin working
- [ ] Delete admin working
- [ ] Dashboard data working
- [ ] Error handling working
- [ ] Authorization working

## 🔧 Postman Collection

Import this collection in Postman:

```json
{
  "info": {
    "name": "School Management - Admin APIs",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Admin Login",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"admin1@school.com\",\n  \"password\": \"admin123\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/auth/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "auth", "login"]
        }
      }
    }
  ]
}
```
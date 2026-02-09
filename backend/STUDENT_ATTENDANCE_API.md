# 📚 Student Attendance API Documentation

## Base URL
```
http://localhost:3000/api/attendance/student
```

## Authentication
Saare endpoints ko JWT token ki zaroorat hai. Token ko Authorization header mein bhejein:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📋 API Endpoints

### 1️⃣ Mark Student Attendance (Add)
**Endpoint:** `POST /api/attendance/student/`

**Access:** Admin, Teacher

**Request Body:**
```json
{
  "studentId": "65abc123def456789",
  "status": "Present",
  "remarks": "On time",
  "date": "2024-01-15"
}
```

**Fields:**
- `studentId` (required): Student ka MongoDB ObjectId
- `status` (required): "Present", "Absent", ya "Leave"
- `remarks` (optional): Koi special note
- `date` (optional): Agar nahi diya to aaj ki date use hogi

**Success Response (201):**
```json
{
  "success": true,
  "message": "Attendance marked successfully",
  "data": {
    "_id": "65xyz789abc123",
    "student": {
      "_id": "65abc123def456789",
      "name": "Rahul",
      "lastname": "Sharma",
      "rollNumber": "2024001",
      "class": "10th",
      "section": "A"
    },
    "date": "2024-01-15T00:00:00.000Z",
    "status": "Present",
    "remarks": "On time",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Invalid studentId ya status
- `404`: Student not found
- `400`: Attendance already marked for this date

---

### 2️⃣ Get Specific Student Attendance
**Endpoint:** `GET /api/attendance/student/:studentId`

**Access:** Admin, Teacher, Student

**URL Parameters:**
- `studentId`: Student ka MongoDB ObjectId

**Success Response (200):**
```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "_id": "65xyz789abc123",
      "student": {
        "_id": "65abc123def456789",
        "name": "Rahul",
        "lastname": "Sharma",
        "rollNumber": "2024001",
        "class": "10th",
        "section": "A"
      },
      "date": "2024-01-15T00:00:00.000Z",
      "status": "Present",
      "remarks": "On time"
    }
  ]
}
```

---

### 3️⃣ Get All Students Attendance
**Endpoint:** `GET /api/attendance/student/`

**Access:** Admin, Teacher

**Success Response (200):**
```json
{
  "success": true,
  "count": 150,
  "data": [
    {
      "_id": "65xyz789abc123",
      "student": {
        "_id": "65abc123def456789",
        "name": "Rahul",
        "lastname": "Sharma",
        "rollNumber": "2024001",
        "class": "10th",
        "section": "A"
      },
      "date": "2024-01-15T00:00:00.000Z",
      "status": "Present",
      "remarks": "On time"
    }
  ]
}
```

---

### 4️⃣ Update Student Attendance
**Endpoint:** `PUT /api/attendance/student/:id`

**Access:** Admin, Teacher

**URL Parameters:**
- `id`: Attendance record ka MongoDB ObjectId

**Request Body:**
```json
{
  "status": "Absent",
  "remarks": "Was sick"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Attendance updated successfully",
  "data": {
    "_id": "65xyz789abc123",
    "student": {
      "_id": "65abc123def456789",
      "name": "Rahul",
      "lastname": "Sharma",
      "rollNumber": "2024001",
      "class": "10th",
      "section": "A"
    },
    "date": "2024-01-15T00:00:00.000Z",
    "status": "Absent",
    "remarks": "Was sick"
  }
}
```

---

### 5️⃣ Delete Student Attendance
**Endpoint:** `DELETE /api/attendance/student/:id`

**Access:** Admin only

**URL Parameters:**
- `id`: Attendance record ka MongoDB ObjectId

**Success Response (200):**
```json
{
  "success": true,
  "message": "Attendance deleted successfully"
}
```

---

## 🧪 Testing Examples (Postman/Thunder Client)

### Example 1: Mark Attendance
```bash
POST http://localhost:3000/api/attendance/student/
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  Content-Type: application/json

Body:
{
  "studentId": "65abc123def456789",
  "status": "Present",
  "remarks": "On time"
}
```

### Example 2: Get Student Attendance
```bash
GET http://localhost:3000/api/attendance/student/65abc123def456789
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Example 3: Update Attendance
```bash
PUT http://localhost:3000/api/attendance/student/65xyz789abc123
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  Content-Type: application/json

Body:
{
  "status": "Leave",
  "remarks": "Medical leave"
}
```

---

## 🔒 Role-Based Access

| Endpoint | Admin | Teacher | Student |
|----------|-------|---------|---------|
| POST / (Mark) | ✅ | ✅ | ❌ |
| GET / (All) | ✅ | ✅ | ❌ |
| GET /:studentId | ✅ | ✅ | ✅ (own only) |
| PUT /:id (Update) | ✅ | ✅ | ❌ |
| DELETE /:id | ✅ | ❌ | ❌ |

---

## ⚠️ Important Notes

1. **Duplicate Prevention**: Ek student ke liye ek din mein sirf ek baar attendance mark ho sakti hai
2. **Date Format**: Date ISO 8601 format mein honi chahiye (YYYY-MM-DD)
3. **Status Values**: Sirf "Present", "Absent", ya "Leave" allowed hain
4. **Authentication**: Har request mein valid JWT token hona chahiye
5. **Student Access**: Student sirf apni khud ki attendance dekh sakta hai

---

## 🐛 Common Errors

### Error 400: Invalid studentId
```json
{
  "success": false,
  "message": "Invalid studentId"
}
```
**Solution**: Valid MongoDB ObjectId provide karein

### Error 404: Student not found
```json
{
  "success": false,
  "message": "Student not found"
}
```
**Solution**: Check karein ki student database mein exist karta hai

### Error 400: Attendance already marked
```json
{
  "success": false,
  "message": "Attendance already marked for this date"
}
```
**Solution**: Update API use karein existing attendance ko modify karne ke liye

---

## 📊 Database Schema

```javascript
{
  student: ObjectId (ref: "students"),
  date: Date,
  status: String (enum: ["Present", "Absent", "Leave"]),
  remarks: String,
  createdAt: Date,
  updatedAt: Date
}
```

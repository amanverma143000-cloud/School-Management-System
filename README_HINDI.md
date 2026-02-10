# 🏫 School Management System - Beginner Guide

## 📚 Project Overview (प्रोजेक्ट की जानकारी)

यह एक **School Management System** है जो React (Frontend) और Node.js (Backend) का उपयोग करके बनाया गया है। इस system में तीन प्रकार के users हैं:

- **👨‍💼 Admin** - School का management करता है
- **👩‍🏫 Teacher** - Students को पढ़ाता है और homework/exams manage करता है  
- **👨‍🎓 Student** - Homework, exams, attendance देख सकता है

## 🛠️ Technology Stack (तकनीकी स्टैक)

### Backend (सर्वर साइड):
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web server framework
- **MongoDB** - Database (डेटा स्टोरेज के लिए)
- **Mongoose** - MongoDB के साथ connection के लिए
- **JWT** - Authentication (login/logout) के लिए
- **bcrypt** - Password encryption के लिए

### Frontend (क्लाइंट साइड):
- **React.js** - User interface बनाने के लिए
- **Redux Toolkit** - State management के लिए
- **React Router** - Page navigation के लिए
- **Tailwind CSS** - Styling के लिए

## 📁 Project Structure (प्रोजेक्ट की संरचना)

```
school-management-system/
├── backend/                 # Server-side code
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic functions
│   ├── middlewares/        # Authentication & validation
│   ├── models/            # Database schemas
│   ├── routes/            # API endpoints
│   ├── utils/             # Helper functions
│   ├── server.js          # Main server file
│   └── seedDB.js          # Sample data generator
│
├── frontend/               # Client-side code
│   ├── src/
│   │   ├── Components/    # Reusable UI components
│   │   ├── pages/         # Different pages (Admin, Teacher, Student)
│   │   ├── context/       # React context for state management
│   │   ├── Api/           # API calls and Redux setup
│   │   └── App.jsx        # Main app component
│   └── public/            # Static files
```

## 🚀 Installation & Setup (इंस्टॉलेशन और सेटअप)

### Prerequisites (आवश्यकताएं):
- **Node.js** (v16 या उससे ऊपर)
- **MongoDB** (local या cloud)
- **Git** (version control के लिए)

### Step 1: Project Clone करें
```bash
git clone <repository-url>
cd school-management-system
```

### Step 2: Backend Setup
```bash
# Backend folder में जाएं
cd backend

# Dependencies install करें
npm install

# Environment variables setup करें
# .env file बनाएं और ये variables add करें:
MONGO_URI=mongodb://localhost:27017/school_management
JWT_SECRET=your_secret_key_here
PORT=3000

# Sample data add करें (optional)
npm run seed

# Development server start करें
npm run dev
```

### Step 3: Frontend Setup
```bash
# नई terminal खोलें और frontend folder में जाएं
cd frontend

# Dependencies install करें
npm install

# Development server start करें
npm run dev
```

## 🔐 Default Login Credentials (डिफ़ॉल्ट लॉगिन जानकारी)

### Admin Login:
- **Email:** admin1@school.com
- **Password:** admin123

### Teacher Login:
- **Email:** rajesh@school.com
- **Password:** teacher123

### Student Login:
- **Email:** rahul@school.com
- **Password:** student123

## 📋 Features (फीचर्स)

### 👨‍💼 Admin Features:
- ✅ Students और Teachers को add/edit/delete करना
- ✅ Classes और subjects manage करना
- ✅ Events और notices create करना
- ✅ Attendance reports देखना
- ✅ Exam results overview

### 👩‍🏫 Teacher Features:
- ✅ Students को homework assign करना
- ✅ Exams create करना और marks upload करना
- ✅ Student attendance mark करना
- ✅ Leave requests approve/reject करना
- ✅ Notices देखना

### 👨‍🎓 Student Features:
- ✅ Homework assignments देखना
- ✅ Exam schedule और results देखना
- ✅ Attendance record देखना
- ✅ Leave requests submit करना
- ✅ School notices पढ़ना

## 🗄️ Database Models (डेटाबेस मॉडल्स)

### 1. **User Models:**
- **Admin** - School administrators
- **Teacher** - Teaching staff
- **Student** - School students

### 2. **Academic Models:**
- **Class** - Different classes (10th, 12th, etc.)
- **Exam** - Exam details
- **ExamResult** - Student exam results
- **Homework** - Homework assignments

### 3. **Management Models:**
- **Event** - School events
- **Notice** - Announcements
- **LeaveRequest** - Leave applications
- **AttendStudent** - Student attendance
- **AttendTeacher** - Teacher attendance
- **Holiday** - School holidays

## 🔄 API Endpoints (API एंडपॉइंट्स)

### Authentication:
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Admin Routes:
- `GET /api/admin/students` - Get all students
- `POST /api/admin/students` - Create new student
- `PUT /api/admin/students/:id` - Update student
- `DELETE /api/admin/students/:id` - Delete student

### Teacher Routes:
- `GET /api/teacher/homework` - Get homework assignments
- `POST /api/teacher/homework` - Create homework
- `POST /api/teacher/exam` - Create exam

### Student Routes:
- `GET /api/student/homework` - Get assigned homework
- `GET /api/student/results` - Get exam results
- `POST /api/student/leave` - Submit leave request

## 🎯 How to Use (कैसे उपयोग करें)

### 1. **Admin के रूप में:**
1. Admin credentials से login करें
2. Dashboard से students/teachers manage करें
3. Events और notices create करें
4. Reports देखें

### 2. **Teacher के रूप में:**
1. Teacher credentials से login करें
2. Students को homework assign करें
3. Exams create करें और marks upload करें
4. Attendance mark करें

### 3. **Student के रूप में:**
1. Student credentials से login करें
2. Homework assignments check करें
3. Exam results देखें
4. Leave request submit करें

## 🐛 Common Issues & Solutions (सामान्य समस्याएं और समाधान)

### 1. **Database Connection Error:**
```
Solution: MongoDB server running है या नहीं check करें
Command: mongod (MongoDB start करने के लिए)
```

### 2. **Port Already in Use:**
```
Solution: .env file में PORT number change करें
या फिर: npx kill-port 3000
```

### 3. **JWT Token Error:**
```
Solution: .env file में JWT_SECRET properly set है या नहीं check करें
```

## 📝 Code Comments Guide (कोड कमेंट्स गाइड)

इस project में हर file में beginner-friendly comments add किए गए हैं:

- **Hindi comments** - समझने में आसानी के लिए
- **Step-by-step explanation** - हर function का detailed explanation
- **Purpose explanation** - हर code block का purpose
- **Error handling** - Error cases की व्याख्या

## 🤝 Contributing (योगदान)

अगर आप इस project में contribute करना चाहते हैं:

1. Repository को fork करें
2. नया branch बनाएं (`git checkout -b feature/new-feature`)
3. Changes commit करें (`git commit -m 'Add new feature'`)
4. Branch को push करें (`git push origin feature/new-feature`)
5. Pull Request create करें

## 📞 Support (सहायता)

अगर कोई problem आए या कुछ समझ न आए तो:

1. **GitHub Issues** में problem report करें
2. **Documentation** को carefully पढ़ें
3. **Console errors** को check करें

## 🎓 Learning Resources (सीखने के संसाधन)

### Beginners के लिए:
- **JavaScript Basics** - MDN Web Docs
- **React Tutorial** - Official React Documentation
- **Node.js Guide** - Node.js Official Website
- **MongoDB Tutorial** - MongoDB University

### Advanced Topics:
- **JWT Authentication** - jwt.io
- **Redux Toolkit** - Redux Toolkit Documentation
- **Express.js** - Express.js Guide

---

**Happy Coding! 🚀**

*यह project educational purpose के लिए बनाया गया है। Real production use के लिए additional security measures add करें।*
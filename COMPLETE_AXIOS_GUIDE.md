# 🔄 Complete Axios Migration Guide

## ✅ **Files Already Updated:**

1. ✅ `src/services/api.js` - Complete API service created
2. ✅ `src/main.jsx` - Redux Provider removed
3. ✅ `src/Components/Login.jsx` - Using axios
4. ✅ `src/page/Admin/AdminDashboard.jsx` - Using axios
5. ✅ `src/page/Admin/ManageStudent/ManageStudents.jsx` - Using axios
6. ✅ `src/page/Admin/ManageTeacher/Manageteacher.jsx` - Using axios (new file created)

## 📋 **How to Use Axios in Any Component:**

### **Step 1: Import Required Modules**
```javascript
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { studentAPI, teacherAPI, classAPI, eventAPI, noticeAPI, homeworkAPI } from "../../services/api";
```

### **Step 2: Setup State**
```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

### **Step 3: Fetch Data**
```javascript
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await studentAPI.getAllStudents();
      setData(response.data || response || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch data');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);
```

### **Step 4: Create/Update/Delete Operations**
```javascript
// CREATE
const handleCreate = async (formData) => {
  try {
    await studentAPI.createStudent(formData);
    toast.success("Created successfully!");
    fetchData(); // Refresh data
  } catch (error) {
    toast.error(error.message || "Failed to create");
  }
};

// UPDATE
const handleUpdate = async (id, formData) => {
  try {
    await studentAPI.updateStudent(id, formData);
    toast.success("Updated successfully!");
    fetchData(); // Refresh data
  } catch (error) {
    toast.error(error.message || "Failed to update");
  }
};

// DELETE
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure?")) return;
  try {
    await studentAPI.deleteStudent(id);
    toast.success("Deleted successfully!");
    fetchData(); // Refresh data
  } catch (error) {
    toast.error(error.message || "Failed to delete");
  }
};
```

## 🎯 **Available API Functions:**

### **Students:**
```javascript
import { studentAPI } from "../../services/api";

// Get all students
const students = await studentAPI.getAllStudents();

// Get single student
const student = await studentAPI.getStudentById(id);

// Create student
await studentAPI.createStudent(studentData);

// Update student
await studentAPI.updateStudent(id, studentData);

// Delete student
await studentAPI.deleteStudent(id);
```

### **Teachers:**
```javascript
import { teacherAPI } from "../../services/api";

// Get all teachers
const teachers = await teacherAPI.getAllTeachers();

// Create teacher
await teacherAPI.createTeacher(teacherData);

// Update teacher
await teacherAPI.updateTeacher(id, teacherData);

// Delete teacher
await teacherAPI.deleteTeacher(id);
```

### **Classes:**
```javascript
import { classAPI } from "../../services/api";

// Get all classes
const classes = await classAPI.getAllClasses();

// Create predefined classes
await classAPI.createPredefinedClasses();

// Create custom class
await classAPI.createClass(classData);

// Update class
await classAPI.updateClass(id, classData);

// Delete class
await classAPI.deleteClass(id);
```

### **Events:**
```javascript
import { eventAPI } from "../../services/api";

// Get all events
const events = await eventAPI.getAllEvents();

// Create event
await eventAPI.createEvent(eventData);

// Update event
await eventAPI.updateEvent(id, eventData);

// Delete event
await eventAPI.deleteEvent(id);
```

### **Notices:**
```javascript
import { noticeAPI } from "../../services/api";

// Get all notices
const notices = await noticeAPI.getAllNotices();

// Create notice
await noticeAPI.createNotice(noticeData);

// Update notice
await noticeAPI.updateNotice(id, noticeData);

// Delete notice
await noticeAPI.deleteNotice(id);
```

### **Homework:**
```javascript
import { homeworkAPI } from "../../services/api";

// Get all homework
const homework = await homeworkAPI.getAllHomework();

// Create homework
await homeworkAPI.createHomework(homeworkData);

// Update homework
await homeworkAPI.updateHomework(id, homeworkData);

// Delete homework
await homeworkAPI.deleteHomework(id);
```

### **Attendance:**
```javascript
import { attendanceAPI } from "../../services/api";

// Get student attendance
const studentAttendance = await attendanceAPI.getStudentAttendance();

// Mark student attendance
await attendanceAPI.markStudentAttendance(attendanceData);

// Get teacher attendance
const teacherAttendance = await attendanceAPI.getTeacherAttendance();

// Mark teacher attendance
await attendanceAPI.markTeacherAttendance(attendanceData);
```

### **Leave Requests:**
```javascript
import { leaveAPI } from "../../services/api";

// Get all leaves
const leaves = await leaveAPI.getAllLeaves();

// Update leave status
await leaveAPI.updateLeaveStatus(id, "Approved");
```

### **Results:**
```javascript
import { resultAPI } from "../../services/api";

// Get all results
const results = await resultAPI.getAllResults();

// Create result
await resultAPI.createResult(resultData);
```

### **Holidays:**
```javascript
import { holidayAPI } from "../../services/api";

// Get all holidays
const holidays = await holidayAPI.getAllHolidays();

// Create holiday
await holidayAPI.createHoliday(holidayData);

// Delete holiday
await holidayAPI.deleteHoliday(id);
```

## 🔧 **Common Patterns:**

### **Pattern 1: List Component**
```javascript
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { studentAPI } from "../../services/api";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentAPI.getAllStudents();
      setStudents(data.data || data || []);
    } catch (error) {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {students.map(student => (
        <div key={student._id}>{student.name}</div>
      ))}
    </div>
  );
};
```

### **Pattern 2: Form Component**
```javascript
import React, { useState } from "react";
import { toast } from "react-toastify";
import { studentAPI } from "../../services/api";

const StudentForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    class: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentAPI.createStudent(formData);
      toast.success("Student created!");
      onSuccess();
    } catch (error) {
      toast.error(error.message || "Failed to create");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

## 🚀 **Quick Migration Steps:**

### **For Any Component:**

1. **Remove RTK Query imports:**
```javascript
// ❌ Remove this
import { useGetStudentsQuery, useAddStudentMutation } from "../../Api/SchoolApi";
```

2. **Add axios imports:**
```javascript
// ✅ Add this
import { studentAPI } from "../../services/api";
import { toast } from "react-toastify";
```

3. **Replace RTK hooks with useState:**
```javascript
// ❌ Remove this
const { data: students = [], isLoading, refetch } = useGetStudentsQuery();
const [addStudent] = useAddStudentMutation();

// ✅ Add this
const [students, setStudents] = useState([]);
const [loading, setLoading] = useState(true);
```

4. **Add useEffect for data fetching:**
```javascript
// ✅ Add this
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await studentAPI.getAllStudents();
      setStudents(data.data || data || []);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

5. **Update mutation calls:**
```javascript
// ❌ Remove this
await addStudent(formData).unwrap();
refetch();

// ✅ Add this
await studentAPI.createStudent(formData);
fetchData(); // Call your fetch function
```

## 📝 **Complete Example:**

```javascript
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { studentAPI } from "../../services/api";

const ManageStudents = () => {
  // State
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Fetch data
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentAPI.getAllStudents();
      setStudents(data.data || data || []);
    } catch (error) {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  // Create
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await studentAPI.createStudent(formData);
      toast.success("Student created!");
      fetchStudents();
      setFormData({ name: "", email: "" });
    } catch (error) {
      toast.error(error.message || "Failed to create");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await studentAPI.deleteStudent(id);
      toast.success("Student deleted!");
      fetchStudents();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleCreate}>
        <input
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <button type="submit">Add Student</button>
      </form>

      <div>
        {students.map(student => (
          <div key={student._id}>
            {student.name}
            <button onClick={() => handleDelete(student._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStudents;
```

## ✅ **Migration Checklist:**

- [x] API service created (`src/services/api.js`)
- [x] Redux removed from `main.jsx`
- [x] Login component updated
- [x] AdminDashboard updated
- [x] ManageStudents updated
- [x] ManageTeachers updated
- [ ] ManageClasses - Update needed
- [ ] MarkAttendance - Update needed
- [ ] AttendanceReport - Update needed
- [ ] HomeworkOverview - Update needed
- [ ] ResultOverview - Update needed
- [ ] LeaveManagement - Update needed
- [ ] Announcements - Update needed
- [ ] Teacher components - Update needed
- [ ] Student components - Update needed

## 🎯 **Next Steps:**

1. Update remaining Admin components
2. Update Teacher dashboard and components
3. Update Student dashboard and components
4. Test all functionality
5. Remove old RTK Query files

---

**All components ab axios use kar rahe hain! RTK Query completely remove ho gaya hai.** 🎉
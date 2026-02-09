// Test Teacher APIs
// Run this after logging in as teacher and getting token

const token = "YOUR_TEACHER_TOKEN_HERE";

const testAPIs = async () => {
  const baseURL = "http://localhost:3000/api/teacher";
  
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  console.log("Testing Teacher APIs...\n");

  // Test 1: Get My Students
  try {
    const res1 = await fetch(`${baseURL}/my-students`, { headers });
    const data1 = await res1.json();
    console.log("✅ GET /my-students:", data1);
  } catch (err) {
    console.error("❌ GET /my-students:", err.message);
  }

  // Test 2: Get My Classes
  try {
    const res2 = await fetch(`${baseURL}/my-classes`, { headers });
    const data2 = await res2.json();
    console.log("✅ GET /my-classes:", data2);
  } catch (err) {
    console.error("❌ GET /my-classes:", err.message);
  }

  // Test 3: Get My Sections
  try {
    const res3 = await fetch(`${baseURL}/my-sections`, { headers });
    const data3 = await res3.json();
    console.log("✅ GET /my-sections:", data3);
  } catch (err) {
    console.error("❌ GET /my-sections:", err.message);
  }

  // Test 4: Get My Subjects
  try {
    const res4 = await fetch(`${baseURL}/my-subjects`, { headers });
    const data4 = await res4.json();
    console.log("✅ GET /my-subjects:", data4);
  } catch (err) {
    console.error("❌ GET /my-subjects:", err.message);
  }
};

// Copy this to browser console and run
console.log("Copy the testAPIs function and run: testAPIs()");

# 📦 Backend Dependencies Guide (बैकएंड डिपेंडेंसीज गाइड)

## 🎯 Package.json की व्याख्या

### 📋 Basic Information:
- **name**: "backend" - प्रोजेक्ट का नाम
- **version**: "1.0.0" - वर्जन नंबर
- **description**: प्रोजेक्ट की जानकारी
- **main**: "server.js" - मुख्य entry file
- **type**: "module" - ES6 modules use करने के लिए

### 🚀 Scripts (कमांड्स):
```bash
npm start     # Production में server start करने के लिए
npm run dev   # Development में server start करने के लिए (auto-restart)
npm run seed  # Database में sample data add करने के लिए
```

## 🔧 Production Dependencies

### 1. **bcryptjs** (^2.4.3)
- **Purpose**: Password encryption के लिए
- **Use**: User के passwords को safely store करने के लिए
- **Example**: Login के time password verify करना

### 2. **cors** (^2.8.5)
- **Purpose**: Cross-Origin Resource Sharing enable करने के लिए
- **Use**: Frontend (React) से backend (Node.js) को access करने के लिए
- **Example**: Different ports पर running apps को connect करना

### 3. **dotenv** (^16.3.1)
- **Purpose**: Environment variables load करने के लिए
- **Use**: Sensitive data (database URL, JWT secret) को .env file में store करना
- **Example**: `process.env.MONGO_URI` से database URL access करना

### 4. **express** (^5.1.0)
- **Purpose**: Web server framework
- **Use**: HTTP server बनाने और API routes handle करने के लिए
- **Example**: `app.get('/api/students')` जैसे routes बनाना

### 5. **jsonwebtoken** (^9.0.1)
- **Purpose**: JWT tokens create और verify करने के लिए
- **Use**: User authentication और authorization के लिए
- **Example**: Login के बाद token generate करना

### 6. **mongoose** (^7.5.1)
- **Purpose**: MongoDB database के साथ connection और operations
- **Use**: Database models बनाना और data operations करना
- **Example**: Student, Teacher models create करना

## 🛠️ Development Dependencies

### 1. **nodemon** (^3.0.3)
- **Purpose**: Development में automatic server restart
- **Use**: File changes detect करके server को automatically restart करना
- **Example**: Code change करने पर manually server restart नहीं करना पड़ता

## 📝 Installation Commands

```bash
# सभी dependencies install करने के लिए
npm install

# Specific dependency install करने के लिए
npm install express

# Development dependency install करने के लिए
npm install --save-dev nodemon

# Dependency remove करने के लिए
npm uninstall package-name
```

## 🔍 Version Numbers की व्याख्या

- **^2.4.3** - Caret (^) का मतलब है compatible version updates allow करना
- **~2.4.3** - Tilde (~) का मतलब है sirf patch updates allow करना
- **2.4.3** - Exact version, कोई updates नहीं

## 🚨 Common Issues

### 1. **Module Not Found Error**
```bash
Solution: npm install चलाएं
```

### 2. **Version Conflicts**
```bash
Solution: npm audit fix चलाएं
```

### 3. **Outdated Packages**
```bash
# Check outdated packages
npm outdated

# Update packages
npm update
```

## 📚 Learning Resources

- **NPM Documentation**: https://docs.npmjs.com/
- **Package.json Guide**: https://nodejs.org/en/knowledge/getting-started/npm/what-is-the-file-package-json/
- **Semantic Versioning**: https://semver.org/
# 🚀 Start Servers - Correct Commands

## ⚠️ Important: Path Structure

Your project has a nested folder structure:
```
C:\Users\Admin\Downloads\TestProj\TestProj\
```

Use these **correct commands** below:

---

## 🖥️ Terminal 1 - Start Backend Server

### Option 1: From Downloads\TestProj folder
```bash
cd TestProj/server
npm run dev
```

### Option 2: Full path
```bash
cd C:\Users\Admin\Downloads\TestProj\TestProj\server
npm run dev
```

**Wait for:**
```
Server running on port 5000
MongoDB Connected: cluster0.qvn8i.mongodb.net
```

---

## 🌐 Terminal 2 - Start Frontend Client

### Option 1: From Downloads\TestProj folder
```bash
cd TestProj/client
npm start
```

### Option 2: Full path
```bash
cd C:\Users\Admin\Downloads\TestProj\TestProj\client
npm start
```

**Wait for:**
```
Compiled successfully!
Local: http://localhost:3000
```

---

## 🧪 Test API (Optional)

### From Downloads\TestProj folder
```bash
cd TestProj/server
node testAPI.js
```

### Full path
```bash
cd C:\Users\Admin\Downloads\TestProj\TestProj\server
node testAPI.js
```

---

## 🔄 Reset Database

### From Downloads\TestProj folder
```bash
cd TestProj/server
node seedDatabase.js
```

### Full path
```bash
cd C:\Users\Admin\Downloads\TestProj\TestProj\server
node seedDatabase.js
```

---

## 🔐 Login After Servers Start

1. **Open browser:** http://localhost:3000/login

2. **Admin Login:**
   - Email: admin@test.com
   - Password: admin123
   - Dashboard: http://localhost:3000/admin/dashboard

3. **Executive Login:**
   - Email: exec1@test.com
   - Password: exec123
   - Dashboard: http://localhost:3000/executive/dashboard

---

## ✅ Quick Verification

After starting both servers, verify:
- [ ] Backend shows: `MongoDB Connected`
- [ ] Frontend opens in browser
- [ ] No errors in either terminal
- [ ] Can access http://localhost:3000

---

## 🐛 Troubleshooting

### "Cannot find path" error
**Solution:** You're in the wrong directory. Use the full path commands above.

### "Cannot read package.json" error
**Solution:** You need to be in the `TestProj/server` or `TestProj/client` folder, not the root.

### Port already in use
**Solution:** 
```bash
# Kill process on port 5000 (backend)
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Kill process on port 3000 (frontend)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

---

## 📍 Current Directory Structure

```
C:\Users\Admin\Downloads\TestProj\
└── TestProj\                    ← Your project is here!
    ├── server\                  ← Backend
    │   ├── config\
    │   ├── controllers\
    │   ├── models\
    │   ├── routes\
    │   ├── seedDatabase.js
    │   ├── testAPI.js
    │   └── server.js
    ├── client\                  ← Frontend
    │   ├── src\
    │   ├── public\
    │   └── package.json
    ├── START_HERE.md
    ├── QUICK_START.md
    └── CRM_TESTING_GUIDE.md
```

---

## 🎯 Ready to Start!

**Step 1:** Open Terminal 1 → Run backend command  
**Step 2:** Open Terminal 2 → Run frontend command  
**Step 3:** Login and test!

**Happy Testing! 🚀**

# 🚀 Quick Start Guide - CRM Testing

## ✅ Setup Complete!

Your CRM application is fully configured and ready for testing!

### What's Been Done:
1. ✅ MongoDB Atlas connected
2. ✅ Database seeded with test users and leads
3. ✅ All API endpoints configured
4. ✅ Role-based access control implemented
5. ✅ Environment variables configured

---

## 🎯 Start Testing in 3 Steps

### Step 1: Start Backend Server
Open a terminal and run:
```bash
cd server
npm run dev
```

**Wait for:** `MongoDB Connected: cluster0.qvn8i.mongodb.net`

### Step 2: Start Frontend Client
Open a **new terminal** and run:
```bash
cd client
npm start
```

**Wait for:** Browser opens at `http://localhost:3000`

### Step 3: Login and Test
Go to: http://localhost:3000/login

**Try Admin Login:**
- Email: `admin@test.com`
- Password: `admin123`
- Then visit: http://localhost:3000/admin/dashboard

**Try Executive Login:**
- Email: `exec1@test.com`
- Password: `exec123`
- Then visit: http://localhost:3000/executive/dashboard

---

## 📋 Test Data Available

### 5 Sample Leads Created:
1. John Doe - Health Insurance
2. Jane Smith - Life Insurance
3. Robert Johnson - Car Insurance
4. Emily Davis - Travel Insurance
5. Michael Brown - Health Insurance

All leads are **unassigned** and have status **"New"**

### 6 Test Users Created:
1. **Admin** - admin@test.com (admin123)
2. **Manager** - manager@test.com (manager123)
3. **Executive 1** - exec1@test.com (exec123)
4. **Executive 2** - exec2@test.com (exec123)
5. **Employee** - employee@test.com (employee123)
6. **Customer** - customer@test.com (customer123)

---

## 🧪 Quick Test Scenarios

### Scenario 1: Admin Assigns Leads (5 minutes)
1. Login as admin
2. Go to admin dashboard
3. Assign 3 leads to Executive 1
4. Assign 2 leads to Executive 2
5. Check statistics update

### Scenario 2: Executive Manages Leads (5 minutes)
1. Login as exec1@test.com
2. Go to executive dashboard
3. Open a lead
4. Update status: New → Contacted
5. Add a remark: "Called customer"
6. Update status: Contacted → Interested
7. Update status: Interested → Converted

### Scenario 3: Role-Based Access (2 minutes)
1. Login as executive
2. Try to access: http://localhost:3000/admin/dashboard
3. Should see: "Access Denied" (403 error)

---

## 📊 What to Expect

### Admin Dashboard Shows:
- Total leads: 5
- All unassigned initially
- Can assign/reassign leads
- Can export CSV
- Can see all activity

### Executive Dashboard Shows:
- Only assigned leads
- Can update status
- Can add remarks
- Can see personal stats
- Cannot see other executives' leads

---

## 🔧 If Something Goes Wrong

### Backend won't start?
```bash
cd server
npm install
npm run dev
```

### Frontend won't start?
```bash
cd client
npm install
npm start
```

### Need to reset data?
```bash
cd server
node seedDatabase.js
```

### MongoDB connection error?
Check `server/.env` file - connection string is already configured correctly.

---

## 📖 Full Testing Guide

For detailed step-by-step testing instructions, see:
**`CRM_TESTING_GUIDE.md`**

---

## 🎉 You're Ready!

Everything is configured and working. Just start the servers and begin testing!

**Questions?** Check the troubleshooting section in `CRM_TESTING_GUIDE.md`

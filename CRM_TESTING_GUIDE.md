# 🎯 Complete CRM Testing Workflow Guide

## ✅ Prerequisites Setup Complete

### Step 1: MongoDB Setup ✓
**Status:** ✅ COMPLETED
- MongoDB Atlas connection configured
- Connection String: `mongodb+srv://chandanawellness:testsni%40456@cluster0.qvn8i.mongodb.net/insurance-crm`
- Database: `insurance-crm`

### Step 2: Environment Variables ✓
**Status:** ✅ COMPLETED
- `.env` file configured in `server/` folder
- MongoDB URI: Connected to Atlas cluster
- JWT Secret: Configured
- JWT Expire: 30 days
- Port: 5000

### Step 3: Database Seeded ✓
**Status:** ✅ COMPLETED
- 6 test users created with different roles
- 5 sample enquiries/leads created (all with status "New")
- All leads are unassigned and ready for testing

---

## 🔐 Test Credentials

### Admin Dashboard Access
- **Email:** admin@test.com
- **Password:** admin123
- **Dashboard:** http://localhost:3000/admin/dashboard
- **Permissions:** Full access to all leads, assignment, analytics

### Management Dashboard Access
- **Email:** manager@test.com
- **Password:** manager123
- **Dashboard:** http://localhost:3000/admin/dashboard
- **Permissions:** Same as admin

### Executive Dashboard Access (User 1)
- **Email:** exec1@test.com
- **Password:** exec123
- **Dashboard:** http://localhost:3000/executive/dashboard
- **Permissions:** View and manage assigned leads only

### Executive Dashboard Access (User 2)
- **Email:** exec2@test.com
- **Password:** exec123
- **Dashboard:** http://localhost:3000/executive/dashboard
- **Permissions:** View and manage assigned leads only

### Employee Dashboard Access
- **Email:** employee@test.com
- **Password:** employee123
- **Dashboard:** http://localhost:3000/executive/dashboard
- **Permissions:** Same as executive

---

## 🚀 How to Start Testing

### 1. Start the Backend Server
```bash
cd server
npm run dev
```
**Expected Output:**
```
Server running on port 5000
MongoDB Connected: cluster0.qvn8i.mongodb.net
```

### 2. Start the Frontend Client
```bash
cd client
npm start
```
**Expected Output:**
```
Compiled successfully!
You can now view client in the browser.
Local: http://localhost:3000
```

---

## 📋 Complete Testing Workflow

### Phase 1: Admin Dashboard Testing

#### 1.1 Login as Admin
1. Navigate to http://localhost:3000/login
2. Enter email: `admin@test.com`
3. Enter password: `admin123`
4. Click "Login"

**Expected Result:** ✅ Successfully logged in and redirected to home page

#### 1.2 Access Admin Dashboard
1. Navigate to http://localhost:3000/admin/dashboard

**Expected Result:** ✅ Dashboard displays:
- **Statistics Cards:**
  - New: 5
  - Contacted: 0
  - Interested: 0
  - Converted: 0
  - Lost: 0
  - Total Leads: 5
  - Assigned: 0
  - Conversion Rate: 0%
- **Table:** Shows 5 unassigned leads

#### 1.3 Test Filtering
1. Click on "Status" dropdown
2. Select "New"

**Expected Result:** ✅ All 5 leads displayed (all are "New")

3. Select "Assigned To" dropdown
4. Choose "Unassigned"

**Expected Result:** ✅ All 5 leads still displayed

#### 1.4 Test Search
1. Type "John" in the search box

**Expected Result:** ✅ Only "John Doe" lead displayed

2. Clear search

**Expected Result:** ✅ All 5 leads displayed again

#### 1.5 Assign a Lead
1. Click "Assign" button on the first lead (John Doe)
2. Modal opens showing executive dropdown
3. Select "Executive One (0 leads)"
4. Click "Confirm"

**Expected Result:** ✅
- Modal closes
- Lead now shows "Assigned To: Executive One"
- Statistics update: Assigned: 1

#### 1.6 Assign More Leads
1. Assign 2 more leads to "Executive One"
2. Assign 2 leads to "Executive Two"

**Expected Result:** ✅
- All 5 leads now assigned
- Statistics show: Assigned: 5
- Executive One has 3 leads
- Executive Two has 2 leads

#### 1.7 Test Reassignment
1. Click "Reassign" on a lead assigned to Executive One
2. Change to Executive Two
3. Confirm

**Expected Result:** ✅
- Lead now assigned to Executive Two
- Executive One: 2 leads
- Executive Two: 3 leads

#### 1.8 Test Export
1. Click "Export CSV" button

**Expected Result:** ✅
- CSV file downloads
- Contains all lead data

---

### Phase 2: Executive Dashboard Testing

#### 2.1 Logout and Login as Executive
1. Logout from admin account
2. Navigate to http://localhost:3000/login
3. Login with:
   - Email: `exec1@test.com`
   - Password: `exec123`

#### 2.2 Access Executive Dashboard
1. Navigate to http://localhost:3000/executive/dashboard

**Expected Result:** ✅
- **Statistics showing:**
  - Total Assigned: 2 (or 3, depending on reassignment)
  - Pending: 2
  - Converted: 0
  - Conversion Rate: 0%
- Lead cards displayed for assigned leads only
- Status tabs showing counts

#### 2.3 Test Status Filtering
1. Click "All" tab

**Expected Result:** ✅ All assigned leads shown

2. Click "New" tab

**Expected Result:** ✅ Only leads with "New" status shown (should be all of them)

#### 2.4 View Lead Details
1. Click on any lead card
2. Modal opens with full lead details

**Expected Result:** ✅
- Customer information displayed (name, email, phone, product)
- Message shown (if any)
- Status dropdown showing current status
- Add remark section visible
- Empty remarks history
- Activity timeline showing "created" action

#### 2.5 Update Lead Status
1. In the lead detail modal
2. Change status from "New" to "Contacted"
3. Click "Update"

**Expected Result:** ✅
- Status updated successfully
- Activity timeline shows new entry: "status_changed"
- Lead card updates to show "Contacted" badge

#### 2.6 Add a Remark
1. In the same lead detail modal
2. Select remark type: "Call"
3. Enter text: "Called customer, interested in premium plan"
4. Click "Add Remark"

**Expected Result:** ✅
- Remark added successfully
- Appears in "Remarks History" section
- Shows timestamp and your name
- Activity timeline shows "remark_added"

#### 2.7 Progress Lead Through Lifecycle
1. Update status to "Interested"

**Expected Result:** ✅ Status updates successfully

2. Add another remark: "Sent quote via email"
3. Update status to "Converted"

**Expected Result:** ✅
- Status updated to "Converted"
- Statistics update: Converted: 1
- Conversion rate increases

#### 2.8 Test Status Validation
1. Try to update a "Converted" lead to "Contacted"

**Expected Result:** ✅ Error or disabled option (Converted is final state)

#### 2.9 Mark a Lead as Lost
1. Open another lead
2. Update from "New" → "Contacted" → "Lost"

**Expected Result:** ✅
- Status updates successfully
- Lost count increases
- Lead still visible but marked as Lost

---

### Phase 3: Cross-Role Testing

#### 3.1 Test Role-Based Access Control
1. While logged in as Executive
2. Try to access http://localhost:3000/admin/dashboard

**Expected Result:** ✅
- Access Denied (403 error page)
- Message: "You do not have permission to access this page"

#### 3.2 Test Admin Can Access Executive Dashboard
1. Logout and login as Admin
2. Navigate to http://localhost:3000/executive/dashboard

**Expected Result:** ✅
- Access granted (admin has higher privileges)
- Shows empty dashboard (no leads assigned to admin)

#### 3.3 Test Executive Cannot See Other's Leads
1. Login as Executive One
2. Note which leads are assigned
3. Logout and login as Executive Two
4. Check dashboard

**Expected Result:** ✅
- Executive Two only sees their assigned leads
- Cannot see Executive One's leads

---

### Phase 4: Advanced Features Testing

#### 4.1 Test Activity Log (Admin)
1. Login as Admin
2. Navigate to admin dashboard
3. Check activity timeline for leads

**Expected Result:** ✅
- All actions logged (created, assigned, status changes, remarks)
- Shows who performed each action
- Timestamps accurate

#### 4.2 Test Statistics Accuracy
1. As Admin, verify dashboard stats match actual data:
   - Count leads by status manually
   - Verify conversion rate calculation
   - Check assigned vs unassigned counts

**Expected Result:** ✅ All statistics accurate

#### 4.3 Test Email/Phone Links (Executive)
1. Open lead detail modal
2. Click on email address

**Expected Result:** ✅ Opens default email client with email pre-filled

3. Click on phone number

**Expected Result:** ✅ Initiates call (on mobile) or shows phone number

---

## 📊 Expected Final State

After completing all tests:

### Admin Dashboard Should Show:
- Total Leads: 5
- New: 2-3 (depending on how many you progressed)
- Contacted: 0-1
- Interested: 0-1
- Converted: 1
- Lost: 1
- Assigned: 5
- Conversion Rate: 20%

### Executive One Dashboard Should Show:
- Assigned leads with various statuses
- Remarks added
- Complete activity history

### Executive Two Dashboard Should Show:
- Different set of assigned leads
- Independent from Executive One's view

---

## 🔧 Troubleshooting

### Issue: Cannot connect to MongoDB
**Solution:** Check your MONGO_URI in .env file. The connection string is already configured correctly with URL-encoded password.

### Issue: "User not found" on login
**Solution:** Run the seed script again:
```bash
cd server
node seedDatabase.js
```

### Issue: Dashboard shows no data
**Solution:**
1. Check browser console for errors
2. Verify backend is running: `npm run dev` in server folder
3. Check network tab for API responses

### Issue: 403 Access Denied
**Solution:** Verify you're logged in with the correct role for that dashboard

### Issue: Statistics not updating
**Solution:** Refresh the page or check Redux DevTools for state updates

---

## 📡 API Endpoints Reference

### Admin Endpoints
- `GET /api/admin/leads` - Get all leads
- `POST /api/admin/leads/:id/assign` - Assign lead
- `PUT /api/admin/leads/:id/reassign` - Reassign lead
- `GET /api/admin/dashboard/stats` - Get statistics
- `GET /api/admin/leads/export` - Export CSV
- `GET /api/admin/executives` - Get executives list
- `GET /api/admin/activity-log` - Get activity log

### Executive Endpoints
- `GET /api/executive/leads` - Get assigned leads
- `GET /api/executive/leads/:id` - Get lead details
- `PUT /api/executive/leads/:id/status` - Update status
- `POST /api/executive/leads/:id/remarks` - Add remark
- `GET /api/executive/stats` - Get personal stats

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

---

## ✅ Next Steps After Testing

1. ✅ Verify all features work as expected
2. 📧 Implement email notifications (optional)
3. 📝 Update enquiry form with consent checkbox (optional)
4. 🔄 Create database migration for existing data (if needed)
5. 🚀 Deploy to production

---

## 🎉 Testing Checklist

- [ ] Admin can login successfully
- [ ] Admin dashboard displays correct statistics
- [ ] Admin can filter and search leads
- [ ] Admin can assign leads to executives
- [ ] Admin can reassign leads
- [ ] Admin can export leads to CSV
- [ ] Executive can login successfully
- [ ] Executive dashboard shows only assigned leads
- [ ] Executive can view lead details
- [ ] Executive can update lead status
- [ ] Executive can add remarks
- [ ] Executive cannot access admin dashboard
- [ ] Admin can access executive dashboard
- [ ] Status transitions are validated correctly
- [ ] Activity log tracks all actions
- [ ] Statistics are calculated accurately
- [ ] Conversion rate updates correctly
- [ ] Email/phone links work properly

---

## 📞 Support

If you encounter any issues during testing:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Ensure MongoDB connection is active
4. Check browser console and server logs for errors

**Database Connection:** ✅ Connected to MongoDB Atlas
**Backend Server:** Ready to start on port 5000
**Frontend Client:** Ready to start on port 3000

---

**Happy Testing! 🚀**

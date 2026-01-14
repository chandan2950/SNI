# ✅ CRM Verification Checklist

Use this checklist to verify all features are working correctly.

---

## 🔧 Pre-Testing Setup

- [x] MongoDB Atlas connection configured
- [x] `.env` file updated with correct MongoDB URI
- [x] Password URL-encoded in connection string (`@` → `%40`)
- [x] Database seeded with test users and leads
- [x] All dependencies installed (`npm install` in both server and client)

---

## 🚀 Server Startup

### Backend Server
```bash
cd server
npm run dev
```

**Verify:**
- [ ] Server starts without errors
- [ ] Shows: `Server running on port 5000`
- [ ] Shows: `MongoDB Connected: cluster0.qvn8i.mongodb.net`
- [ ] No connection errors

### Frontend Client
```bash
cd client
npm start
```

**Verify:**
- [ ] Client compiles successfully
- [ ] Browser opens at `http://localhost:3000`
- [ ] No compilation errors
- [ ] No console errors

---

## 🧪 API Testing (Optional but Recommended)

```bash
cd server
node testAPI.js
```

**Expected Results:**
- [ ] All tests pass (11/11)
- [ ] Admin login successful
- [ ] Executive login successful
- [ ] Dashboard stats retrieved
- [ ] Leads retrieved
- [ ] Executives list retrieved
- [ ] Lead assignment works
- [ ] Status update works
- [ ] Remark addition works
- [ ] Role-based access control enforced

---

## 🔐 Authentication Testing

### Admin Login
- [ ] Navigate to `http://localhost:3000/login`
- [ ] Enter: `admin@test.com` / `admin123`
- [ ] Click Login
- [ ] Successfully redirected to home page
- [ ] User info displayed correctly

### Executive Login
- [ ] Logout from admin
- [ ] Navigate to `http://localhost:3000/login`
- [ ] Enter: `exec1@test.com` / `exec123`
- [ ] Click Login
- [ ] Successfully redirected to home page
- [ ] User info displayed correctly

### Invalid Credentials
- [ ] Try login with wrong password
- [ ] Error message displayed
- [ ] Not logged in

---

## 👨‍💼 Admin Dashboard Testing

### Access Dashboard
- [ ] Login as admin
- [ ] Navigate to `http://localhost:3000/admin/dashboard`
- [ ] Dashboard loads successfully
- [ ] No errors in console

### Statistics Display
- [ ] New: 5 displayed
- [ ] Contacted: 0 displayed
- [ ] Interested: 0 displayed
- [ ] Converted: 0 displayed
- [ ] Lost: 0 displayed
- [ ] Total Leads: 5 displayed
- [ ] Assigned: 0 displayed
- [ ] Unassigned: 5 displayed
- [ ] Conversion Rate: 0% displayed

### Leads Table
- [ ] 5 leads displayed in table
- [ ] All leads show status "New"
- [ ] All leads show "Unassigned"
- [ ] Lead names visible (John Doe, Jane Smith, etc.)
- [ ] Product types visible
- [ ] Email and phone visible

### Filtering
- [ ] Status dropdown works
- [ ] Select "New" - shows all 5 leads
- [ ] Select "Contacted" - shows 0 leads
- [ ] Assigned To dropdown works
- [ ] Select "Unassigned" - shows all 5 leads
- [ ] Product Type filter works (if implemented)

### Search
- [ ] Type "John" in search box
- [ ] Only John Doe displayed
- [ ] Type "Health" in search
- [ ] Shows health insurance leads
- [ ] Clear search - all leads return

### Lead Assignment
- [ ] Click "Assign" on first lead
- [ ] Modal opens
- [ ] Executive dropdown shows executives
- [ ] Shows "Executive One (0 leads)"
- [ ] Shows "Executive Two (0 leads)"
- [ ] Select Executive One
- [ ] Click Confirm
- [ ] Modal closes
- [ ] Lead now shows "Assigned To: Executive One"
- [ ] Statistics update: Assigned: 1

### Multiple Assignments
- [ ] Assign 2 more leads to Executive One
- [ ] Executive One now has 3 leads
- [ ] Assign 2 leads to Executive Two
- [ ] Executive Two now has 2 leads
- [ ] All 5 leads now assigned
- [ ] Statistics show: Assigned: 5, Unassigned: 0

### Reassignment
- [ ] Click "Reassign" on a lead assigned to Executive One
- [ ] Modal opens
- [ ] Change to Executive Two
- [ ] Click Confirm
- [ ] Lead now assigned to Executive Two
- [ ] Executive One: 2 leads
- [ ] Executive Two: 3 leads

### Export CSV
- [ ] Click "Export CSV" button
- [ ] CSV file downloads
- [ ] Open CSV file
- [ ] Contains all lead data
- [ ] Headers correct
- [ ] Data formatted properly

### Activity Log (if visible)
- [ ] Activity log shows actions
- [ ] Shows "created" actions
- [ ] Shows "assigned" actions
- [ ] Shows who performed actions
- [ ] Timestamps displayed

---

## 👨‍💻 Executive Dashboard Testing

### Access Dashboard
- [ ] Logout from admin
- [ ] Login as `exec1@test.com` / `exec123`
- [ ] Navigate to `http://localhost:3000/executive/dashboard`
- [ ] Dashboard loads successfully

### Statistics Display
- [ ] Total Assigned: 2 (or 3) displayed
- [ ] Pending: 2 (or 3) displayed
- [ ] Converted: 0 displayed
- [ ] Conversion Rate: 0% displayed
- [ ] Statistics match assigned leads

### Leads Display
- [ ] Only assigned leads visible
- [ ] Lead cards displayed
- [ ] Status badges visible
- [ ] Product type shown
- [ ] Customer name shown

### Status Tabs (if implemented)
- [ ] "All" tab shows all assigned leads
- [ ] "New" tab shows only new leads
- [ ] "Contacted" tab shows contacted leads
- [ ] "Interested" tab shows interested leads
- [ ] "Converted" tab shows converted leads
- [ ] "Lost" tab shows lost leads
- [ ] Counts on tabs correct

### View Lead Details
- [ ] Click on a lead card
- [ ] Modal opens
- [ ] Customer name displayed
- [ ] Email displayed (clickable)
- [ ] Phone displayed (clickable)
- [ ] Product type displayed
- [ ] Message displayed
- [ ] Current status shown
- [ ] Status dropdown visible
- [ ] Add remark section visible
- [ ] Activity timeline visible

### Update Lead Status
- [ ] In lead detail modal
- [ ] Change status from "New" to "Contacted"
- [ ] Click Update/Save
- [ ] Success message shown
- [ ] Modal updates or closes
- [ ] Lead card shows new status
- [ ] Activity timeline shows status change

### Status Validation
- [ ] Try changing "New" to "Converted" directly
- [ ] Should not allow (or show error)
- [ ] Only valid transitions allowed:
  - [ ] New → Contacted ✓
  - [ ] New → Lost ✓
  - [ ] Contacted → Interested ✓
  - [ ] Contacted → Lost ✓
  - [ ] Interested → Converted ✓
  - [ ] Interested → Lost ✓
  - [ ] Converted → (no changes) ✓
  - [ ] Lost → (no changes) ✓

### Add Remark
- [ ] Open lead detail modal
- [ ] Select remark type: "Call"
- [ ] Enter text: "Called customer, interested in premium plan"
- [ ] Click "Add Remark"
- [ ] Success message shown
- [ ] Remark appears in remarks history
- [ ] Shows your name
- [ ] Shows timestamp
- [ ] Shows remark type
- [ ] Activity timeline shows "remark_added"

### Progress Lead Through Lifecycle
- [ ] Open a lead with status "New"
- [ ] Update to "Contacted"
- [ ] Add remark: "Initial contact made"
- [ ] Update to "Interested"
- [ ] Add remark: "Sent quote"
- [ ] Update to "Converted"
- [ ] Statistics update: Converted: 1
- [ ] Conversion rate increases
- [ ] Lead still visible but marked as Converted

### Mark Lead as Lost
- [ ] Open another lead
- [ ] Update from "New" to "Contacted"
- [ ] Update from "Contacted" to "Lost"
- [ ] Statistics update: Lost: 1
- [ ] Lead still visible but marked as Lost

### Email/Phone Links
- [ ] Click on email address
- [ ] Default email client opens (or copy option)
- [ ] Email pre-filled
- [ ] Click on phone number
- [ ] Phone dialer opens (mobile) or number displayed

---

## 🔒 Security & Access Control Testing

### Executive Cannot Access Admin Routes
- [ ] Login as executive
- [ ] Try to access `http://localhost:3000/admin/dashboard`
- [ ] Access denied (403 error page)
- [ ] Error message displayed
- [ ] Cannot see admin features

### Admin Can Access Executive Routes
- [ ] Login as admin
- [ ] Navigate to `http://localhost:3000/executive/dashboard`
- [ ] Access granted
- [ ] Dashboard loads (may be empty if no leads assigned to admin)

### Executive Cannot See Other's Leads
- [ ] Login as `exec1@test.com`
- [ ] Note which leads are assigned (e.g., 2 leads)
- [ ] Logout
- [ ] Login as `exec2@test.com`
- [ ] Check dashboard
- [ ] Only sees their own leads (e.g., 3 leads)
- [ ] Cannot see Executive One's leads

### Token Expiration (Optional)
- [ ] Login and get token
- [ ] Wait for token to expire (or manually expire)
- [ ] Try to access protected route
- [ ] Redirected to login
- [ ] Error message shown

---

## 📊 Data Integrity Testing

### Activity Logging
- [ ] All actions logged in activity timeline
- [ ] "created" action logged on lead creation
- [ ] "assigned" action logged on assignment
- [ ] "reassigned" action logged on reassignment
- [ ] "status_changed" action logged on status update
- [ ] "remark_added" action logged on remark addition
- [ ] Each action shows who performed it
- [ ] Each action shows timestamp
- [ ] Details preserved correctly

### Statistics Accuracy
- [ ] Count leads manually by status
- [ ] Compare with dashboard statistics
- [ ] Statistics match actual data
- [ ] Conversion rate calculated correctly
- [ ] Formula: (Converted / Total) * 100
- [ ] Assigned count matches actual assignments
- [ ] Unassigned count matches actual unassigned

### Consent Tracking
- [ ] All leads have consent data
- [ ] Consent timestamp recorded
- [ ] IP address recorded (if available)
- [ ] Privacy policy version recorded

---

## 🔄 End-to-End Workflow Testing

### Complete Lead Lifecycle
- [ ] Admin assigns lead to executive
- [ ] Executive receives lead
- [ ] Executive contacts customer (status: Contacted)
- [ ] Executive adds call remark
- [ ] Customer shows interest (status: Interested)
- [ ] Executive adds quote remark
- [ ] Customer converts (status: Converted)
- [ ] Statistics update throughout
- [ ] All actions logged
- [ ] Conversion rate increases

### Reassignment Workflow
- [ ] Admin assigns lead to Executive One
- [ ] Executive One starts working on lead
- [ ] Executive One adds remarks
- [ ] Admin reassigns to Executive Two
- [ ] Executive Two can see lead
- [ ] Executive Two can see previous remarks
- [ ] Executive Two can see activity history
- [ ] Executive One no longer sees lead

---

## 📈 Performance Testing (Optional)

### Page Load Times
- [ ] Admin dashboard loads in < 2 seconds
- [ ] Executive dashboard loads in < 2 seconds
- [ ] Lead details modal opens instantly
- [ ] No lag when updating status
- [ ] No lag when adding remarks

### Large Data Sets (Optional)
- [ ] Create 100+ leads (modify seed script)
- [ ] Dashboard still loads quickly
- [ ] Pagination works correctly
- [ ] Filtering works correctly
- [ ] Search works correctly

---

## 🐛 Error Handling Testing

### Network Errors
- [ ] Stop backend server
- [ ] Try to login
- [ ] Appropriate error message shown
- [ ] Try to load dashboard
- [ ] Appropriate error message shown

### Invalid Data
- [ ] Try to assign lead with invalid executive ID
- [ ] Error message shown
- [ ] Try to update status with invalid status
- [ ] Error message shown
- [ ] Try to add empty remark
- [ ] Error message shown

### Validation Errors
- [ ] Try to login with empty email
- [ ] Validation error shown
- [ ] Try to login with invalid email format
- [ ] Validation error shown
- [ ] Try to update lead with invalid data
- [ ] Validation error shown

---

## 📱 Browser Compatibility (Optional)

### Chrome
- [ ] All features work
- [ ] No console errors
- [ ] UI displays correctly

### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] UI displays correctly

### Safari
- [ ] All features work
- [ ] No console errors
- [ ] UI displays correctly

### Edge
- [ ] All features work
- [ ] No console errors
- [ ] UI displays correctly

---

## 📝 Final Verification

### Database State
- [ ] Connect to MongoDB Atlas
- [ ] Verify users collection has 6 users
- [ ] Verify enquiries collection has 5 leads
- [ ] Verify activity logs are populated
- [ ] Verify remarks are saved correctly
- [ ] Verify assignments are saved correctly

### Documentation
- [ ] README files are clear
- [ ] Testing guide is comprehensive
- [ ] API endpoints documented
- [ ] Test credentials listed
- [ ] Troubleshooting section helpful

### Code Quality
- [ ] No console errors in browser
- [ ] No server errors in terminal
- [ ] Code follows best practices
- [ ] Error handling implemented
- [ ] Validation implemented

---

## 🎉 Completion Summary

**Total Checks:** ~150+  
**Categories:** 12  
**Critical Features:** All implemented  

### Sign-off

- [ ] All critical features tested and working
- [ ] All security features verified
- [ ] All user roles tested
- [ ] Data integrity confirmed
- [ ] Documentation complete
- [ ] Ready for production (after additional testing)

---

## 📞 Issues Found

If you find any issues during testing, document them here:

### Issue 1
- **Description:**
- **Steps to Reproduce:**
- **Expected Behavior:**
- **Actual Behavior:**
- **Severity:** (Critical/High/Medium/Low)

### Issue 2
- **Description:**
- **Steps to Reproduce:**
- **Expected Behavior:**
- **Actual Behavior:**
- **Severity:** (Critical/High/Medium/Low)

---

## ✅ Testing Complete!

Once all items are checked, your CRM system is fully verified and ready to use!

**Date Tested:** _______________  
**Tested By:** _______________  
**Result:** ☐ Pass ☐ Fail ☐ Pass with Issues  
**Notes:** _______________

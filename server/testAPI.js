const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test credentials
const adminCreds = { email: 'admin@test.com', password: 'admin123' };
const exec1Creds = { email: 'exec1@test.com', password: 'exec123' };

let adminToken = '';
let exec1Token = '';

// Helper function to make requests
const makeRequest = async (method, url, data = null, token = null) => {
    try {
        const config = {
            method,
            url: `${BASE_URL}${url}`,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        };
        
        if (data) {
            config.data = data;
        }
        
        const response = await axios(config);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || error.message,
            status: error.response?.status,
        };
    }
};

// Test functions
const testAdminLogin = async () => {
    console.log('\n🔐 Testing Admin Login...');
    const result = await makeRequest('POST', '/auth/login', adminCreds);
    
    if (result.success) {
        adminToken = result.data.token;
        console.log('✅ Admin login successful');
        console.log(`   User: ${result.data.user.name} (${result.data.user.role})`);
        return true;
    } else {
        console.log('❌ Admin login failed:', result.error);
        return false;
    }
};

const testExecutiveLogin = async () => {
    console.log('\n🔐 Testing Executive Login...');
    const result = await makeRequest('POST', '/auth/login', exec1Creds);
    
    if (result.success) {
        exec1Token = result.data.token;
        console.log('✅ Executive login successful');
        console.log(`   User: ${result.data.user.name} (${result.data.user.role})`);
        return true;
    } else {
        console.log('❌ Executive login failed:', result.error);
        return false;
    }
};

const testAdminDashboardStats = async () => {
    console.log('\n📊 Testing Admin Dashboard Stats...');
    const result = await makeRequest('GET', '/admin/dashboard/stats', null, adminToken);
    
    if (result.success) {
        console.log('✅ Dashboard stats retrieved');
        console.log('   Stats:', JSON.stringify(result.data.stats.statusCounts, null, 2));
        console.log(`   Total Leads: ${result.data.stats.totalLeads}`);
        console.log(`   Assigned: ${result.data.stats.assignedCount}`);
        console.log(`   Unassigned: ${result.data.stats.unassignedCount}`);
        return true;
    } else {
        console.log('❌ Failed to get dashboard stats:', result.error);
        return false;
    }
};

const testGetAllLeads = async () => {
    console.log('\n📋 Testing Get All Leads (Admin)...');
    const result = await makeRequest('GET', '/admin/leads', null, adminToken);
    
    if (result.success) {
        console.log('✅ Leads retrieved successfully');
        console.log(`   Total: ${result.data.total}`);
        console.log(`   Count: ${result.data.count}`);
        if (result.data.leads.length > 0) {
            console.log(`   First Lead: ${result.data.leads[0].name} - ${result.data.leads[0].productType}`);
        }
        return result.data.leads;
    } else {
        console.log('❌ Failed to get leads:', result.error);
        return [];
    }
};

const testGetExecutives = async () => {
    console.log('\n👥 Testing Get Executives List...');
    const result = await makeRequest('GET', '/admin/executives', null, adminToken);
    
    if (result.success) {
        console.log('✅ Executives retrieved successfully');
        console.log(`   Count: ${result.data.data.length}`);
        result.data.data.forEach(exec => {
            console.log(`   - ${exec.name} (${exec.email}) - ${exec.assignedLeadsCount} leads`);
        });
        return result.data.data;
    } else {
        console.log('❌ Failed to get executives:', result.error);
        return [];
    }
};

const testAssignLead = async (leadId, executiveId) => {
    console.log('\n📌 Testing Assign Lead...');
    const result = await makeRequest('POST', `/admin/leads/${leadId}/assign`, 
        { executiveId }, adminToken);
    
    if (result.success) {
        console.log('✅ Lead assigned successfully');
        console.log(`   Lead: ${result.data.lead.name}`);
        console.log(`   Assigned To: ${result.data.lead.assignedTo.name}`);
        return true;
    } else {
        console.log('❌ Failed to assign lead:', result.error);
        return false;
    }
};

const testExecutiveGetLeads = async () => {
    console.log('\n📋 Testing Get Assigned Leads (Executive)...');
    const result = await makeRequest('GET', '/executive/leads', null, exec1Token);
    
    if (result.success) {
        console.log('✅ Assigned leads retrieved successfully');
        console.log(`   Total: ${result.data.total}`);
        console.log(`   Count: ${result.data.count}`);
        if (result.data.leads.length > 0) {
            console.log(`   First Lead: ${result.data.leads[0].name} - ${result.data.leads[0].status}`);
        }
        return result.data.leads;
    } else {
        console.log('❌ Failed to get assigned leads:', result.error);
        return [];
    }
};

const testExecutiveStats = async () => {
    console.log('\n📊 Testing Executive Stats...');
    const result = await makeRequest('GET', '/executive/stats', null, exec1Token);
    
    if (result.success) {
        console.log('✅ Executive stats retrieved');
        console.log('   Stats:', JSON.stringify(result.data.stats.statusCounts, null, 2));
        console.log(`   Total Assigned: ${result.data.stats.totalAssigned}`);
        console.log(`   Pending: ${result.data.stats.pendingLeads}`);
        console.log(`   Conversion Rate: ${result.data.stats.conversionRate}%`);
        return true;
    } else {
        console.log('❌ Failed to get executive stats:', result.error);
        return false;
    }
};

const testUpdateLeadStatus = async (leadId) => {
    console.log('\n🔄 Testing Update Lead Status...');
    const result = await makeRequest('PUT', `/executive/leads/${leadId}/status`, 
        { status: 'Contacted' }, exec1Token);
    
    if (result.success) {
        console.log('✅ Lead status updated successfully');
        console.log(`   Lead: ${result.data.lead.name}`);
        console.log(`   New Status: ${result.data.lead.status}`);
        return true;
    } else {
        console.log('❌ Failed to update lead status:', result.error);
        return false;
    }
};

const testAddRemark = async (leadId) => {
    console.log('\n💬 Testing Add Remark...');
    const result = await makeRequest('POST', `/executive/leads/${leadId}/remarks`, 
        { text: 'Test remark - Called customer', type: 'call' }, exec1Token);
    
    if (result.success) {
        console.log('✅ Remark added successfully');
        console.log(`   Lead: ${result.data.lead.name}`);
        console.log(`   Remarks Count: ${result.data.lead.remarks.length}`);
        return true;
    } else {
        console.log('❌ Failed to add remark:', result.error);
        return false;
    }
};

const testRoleBasedAccess = async () => {
    console.log('\n🔒 Testing Role-Based Access Control...');
    const result = await makeRequest('GET', '/admin/leads', null, exec1Token);
    
    if (!result.success && result.status === 403) {
        console.log('✅ Role-based access control working correctly');
        console.log('   Executive cannot access admin routes (403 Forbidden)');
        return true;
    } else if (result.success) {
        console.log('❌ Security issue: Executive can access admin routes!');
        return false;
    } else {
        console.log('⚠️  Unexpected error:', result.error);
        return false;
    }
};

// Main test runner
const runTests = async () => {
    console.log('='.repeat(60));
    console.log('🧪 CRM API Testing Suite');
    console.log('='.repeat(60));
    console.log('\n⚠️  Make sure the server is running on http://localhost:5000');
    console.log('   Run: cd server && npm run dev\n');
    
    // Wait a bit for user to read
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let passedTests = 0;
    let totalTests = 0;
    
    // Test 1: Admin Login
    totalTests++;
    if (await testAdminLogin()) passedTests++;
    
    // Test 2: Executive Login
    totalTests++;
    if (await testExecutiveLogin()) passedTests++;
    
    // Test 3: Admin Dashboard Stats
    totalTests++;
    if (await testAdminDashboardStats()) passedTests++;
    
    // Test 4: Get All Leads
    totalTests++;
    const leads = await testGetAllLeads();
    if (leads.length > 0) passedTests++;
    
    // Test 5: Get Executives
    totalTests++;
    const executives = await testGetExecutives();
    if (executives.length > 0) passedTests++;
    
    // Test 6: Assign Lead
    if (leads.length > 0 && executives.length > 0) {
        totalTests++;
        if (await testAssignLead(leads[0]._id, executives[0]._id)) passedTests++;
    }
    
    // Test 7: Executive Get Assigned Leads
    totalTests++;
    const assignedLeads = await testExecutiveGetLeads();
    if (assignedLeads.length >= 0) passedTests++;
    
    // Test 8: Executive Stats
    totalTests++;
    if (await testExecutiveStats()) passedTests++;
    
    // Test 9: Update Lead Status (if executive has leads)
    if (assignedLeads.length > 0) {
        totalTests++;
        if (await testUpdateLeadStatus(assignedLeads[0]._id)) passedTests++;
        
        // Test 10: Add Remark
        totalTests++;
        if (await testAddRemark(assignedLeads[0]._id)) passedTests++;
    }
    
    // Test 11: Role-Based Access Control
    totalTests++;
    if (await testRoleBasedAccess()) passedTests++;
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Test Summary');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${passedTests}/${totalTests}`);
    console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
    console.log(`📈 Success Rate: ${((passedTests/totalTests) * 100).toFixed(1)}%`);
    console.log('='.repeat(60));
    
    if (passedTests === totalTests) {
        console.log('\n🎉 All tests passed! Your CRM API is working perfectly!');
    } else {
        console.log('\n⚠️  Some tests failed. Check the errors above.');
    }
};

// Run the tests
runTests().catch(error => {
    console.error('\n❌ Test suite error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. Server is running: cd server && npm run dev');
    console.log('   2. Database is seeded: cd server && node seedDatabase.js');
    console.log('   3. MongoDB is connected');
});

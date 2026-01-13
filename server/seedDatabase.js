const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Enquiry = require('./models/Enquiry');
require('dotenv').config();

// Test users with different roles
const testUsers = [
    {
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'admin123',
        phone: '1234567890',
        role: 'admin',
        isActive: true,
    },
    {
        name: 'Management User',
        email: 'manager@test.com',
        password: 'manager123',
        phone: '1234567891',
        role: 'management',
        isActive: true,
    },
    {
        name: 'Executive One',
        email: 'exec1@test.com',
        password: 'exec123',
        phone: '1234567892',
        role: 'executive',
        isActive: true,
    },
    {
        name: 'Executive Two',
        email: 'exec2@test.com',
        password: 'exec123',
        phone: '1234567893',
        role: 'executive',
        isActive: true,
    },
    {
        name: 'Employee User',
        email: 'employee@test.com',
        password: 'employee123',
        phone: '1234567894',
        role: 'employee',
        isActive: true,
    },
    {
        name: 'Customer User',
        email: 'customer@test.com',
        password: 'customer123',
        phone: '1234567895',
        role: 'customer',
        isActive: true,
    },
];

// Sample enquiries/leads
const sampleEnquiries = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        productType: 'Health Insurance',
        message: 'Looking for family health insurance coverage',
        status: 'New',
        consent: {
            given: true,
            timestamp: new Date(),
            ipAddress: '192.168.1.1',
            privacyPolicyVersion: '1.0',
        },
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '9876543211',
        productType: 'Life Insurance',
        message: 'Need term life insurance for 1 crore',
        status: 'New',
        consent: {
            given: true,
            timestamp: new Date(),
            ipAddress: '192.168.1.2',
            privacyPolicyVersion: '1.0',
        },
    },
    {
        name: 'Robert Johnson',
        email: 'robert@example.com',
        phone: '9876543212',
        productType: 'Car Insurance',
        message: 'Comprehensive car insurance needed',
        status: 'New',
        consent: {
            given: true,
            timestamp: new Date(),
            ipAddress: '192.168.1.3',
            privacyPolicyVersion: '1.0',
        },
    },
    {
        name: 'Emily Davis',
        email: 'emily@example.com',
        phone: '9876543213',
        productType: 'Travel Insurance',
        message: 'International travel insurance for Europe trip',
        status: 'New',
        consent: {
            given: true,
            timestamp: new Date(),
            ipAddress: '192.168.1.4',
            privacyPolicyVersion: '1.0',
        },
    },
    {
        name: 'Michael Brown',
        email: 'michael@example.com',
        phone: '9876543214',
        productType: 'Health Insurance',
        message: 'Senior citizen health insurance',
        status: 'New',
        consent: {
            given: true,
            timestamp: new Date(),
            ipAddress: '192.168.1.5',
            privacyPolicyVersion: '1.0',
        },
    },
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('\n🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Enquiry.deleteMany({});
        console.log('✅ Cleared existing users and enquiries');

        // Create users
        console.log('\n👥 Creating test users...');
        const createdUsers = await User.insertMany(testUsers);
        console.log('✅ Created test users:');
        createdUsers.forEach((user) => {
            console.log(`   - ${user.name} (${user.email}) - Role: ${user.role}`);
        });

        // Create enquiries
        console.log('\n📋 Creating sample enquiries...');
        const createdEnquiries = await Enquiry.insertMany(sampleEnquiries);
        console.log(`✅ Created ${createdEnquiries.length} sample enquiries`);

        console.log('\n✨ Database seeded successfully!\n');
        console.log('='.repeat(60));
        console.log('TEST CREDENTIALS:');
        console.log('='.repeat(60));
        console.log('\n🔐 ADMIN ACCESS:');
        console.log('   Email: admin@test.com');
        console.log('   Password: admin123');
        console.log('   Dashboard: /admin/dashboard');

        console.log('\n🔐 MANAGEMENT ACCESS:');
        console.log('   Email: manager@test.com');
        console.log('   Password: manager123');
        console.log('   Dashboard: /admin/dashboard');

        console.log('\n🔐 EXECUTIVE ACCESS:');
        console.log('   Email: exec1@test.com');
        console.log('   Password: exec123');
        console.log('   Dashboard: /executive/dashboard');

        console.log('\n🔐 EXECUTIVE 2 ACCESS:');
        console.log('   Email: exec2@test.com');
        console.log('   Password: exec123');
        console.log('   Dashboard: /executive/dashboard');

        console.log('\n🔐 EMPLOYEE ACCESS:');
        console.log('   Email: employee@test.com');
        console.log('   Password: employee123');
        console.log('   Dashboard: /executive/dashboard');

        console.log('\n' + '='.repeat(60));
        console.log('\n📝 Sample Data:');
        console.log(`   - ${createdEnquiries.length} leads created (all with status "New")`);
        console.log('   - Ready for assignment and testing');
        console.log('\n' + '='.repeat(60) + '\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase();

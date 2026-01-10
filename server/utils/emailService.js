const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Send welcome email
exports.sendWelcomeEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: `Insurance Platform <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Welcome to Our Insurance Platform',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0041a3;">Welcome to Our Insurance Platform!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for registering with us. We're excited to help you find the best insurance solutions for your needs.</p>
          <p>You can now:</p>
          <ul>
            <li>Browse our insurance products</li>
            <li>Submit enquiries for personalized quotes</li>
            <li>Access learning resources</li>
            <li>Manage your account through our CRM portal</li>
          </ul>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Best regards,<br>The Insurance Platform Team</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

// Send enquiry confirmation email
exports.sendEnquiryConfirmation = async (email, name, productType) => {
    try {
        const mailOptions = {
            from: `Insurance Platform <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Enquiry Received - We\'ll Contact You Soon',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0041a3;">Thank You for Your Enquiry!</h2>
          <p>Dear ${name},</p>
          <p>We have received your enquiry for <strong>${productType}</strong>.</p>
          <p>Our team will review your request and contact you within 24-48 hours with personalized recommendations.</p>
          <p>In the meantime, you can:</p>
          <ul>
            <li>Explore our learning resources</li>
            <li>Use our insurance calculators</li>
            <li>Read customer testimonials</li>
          </ul>
          <p>Thank you for choosing us!</p>
          <p>Best regards,<br>The Insurance Platform Team</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Enquiry confirmation email sent successfully');
    } catch (error) {
        console.error('Error sending enquiry confirmation email:', error);
    }
};

// Send admin notification for new enquiry
exports.sendAdminNotification = async (enquiryData) => {
    try {
        const mailOptions = {
            from: `Insurance Platform <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send to admin email
            subject: 'New Enquiry Received',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0041a3;">New Enquiry Alert</h2>
          <p><strong>Name:</strong> ${enquiryData.name}</p>
          <p><strong>Email:</strong> ${enquiryData.email}</p>
          <p><strong>Phone:</strong> ${enquiryData.phone}</p>
          <p><strong>Product Type:</strong> ${enquiryData.productType}</p>
          <p><strong>Message:</strong> ${enquiryData.message || 'No message provided'}</p>
          <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Admin notification email sent successfully');
    } catch (error) {
        console.error('Error sending admin notification email:', error);
    }
};

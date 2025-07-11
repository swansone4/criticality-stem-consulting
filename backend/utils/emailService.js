const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Email templates
const emailTemplates = {
  welcome: (data) => ({
    subject: 'Welcome to Criticality - Your STEM Career Journey Begins',
    html: `
      <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2E8B57; margin-bottom: 10px;">Criticality</h1>
          <p style="color: #666; font-size: 18px;">STEM Career Consulting</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #2E8B57; margin-bottom: 20px;">Welcome, ${data.name}!</h2>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out to Criticality. We're excited to help you reach criticality 
            in your STEM career journey.
          </p>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            Based on your interests in <strong>${data.interests.join(', ')}</strong> and your 
            current academic level as a <strong>${data.academicLevel}</strong>, we're preparing 
            a personalized strategy for your success.
          </p>
          
          <div style="background: #2E8B57; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-bottom: 15px;">What's Next?</h3>
            <ul style="text-align: left; margin: 0; padding-left: 20px;">
              <li>We'll review your information within 24 hours</li>
              <li>You'll receive a personalized consultation invitation</li>
              <li>Access to our exclusive STEM resources library</li>
              <li>Priority scheduling for upcoming workshops</li>
            </ul>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #666; font-size: 14px;">
            If you have any immediate questions, feel free to reply to this email.
          </p>
          <p style="color: #666; font-size: 14px;">
            Best regards,<br>
            The Criticality Team
          </p>
        </div>
      </div>
    `
  }),

  adminNotification: (data) => ({
    subject: `New Contact: ${data.name} - ${data.academicLevel}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2E8B57;">New Contact Submission</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Contact Details:</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Academic Level:</strong> ${data.academicLevel}</p>
          <p><strong>Interests:</strong> ${data.interests.join(', ')}</p>
          <p><strong>Contact ID:</strong> ${data.contactId}</p>
        </div>
        
        <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Message:</h3>
          <p style="font-style: italic;">${data.message}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.ADMIN_DASHBOARD_URL}/contacts/${data.contactId}" 
             style="background: #2E8B57; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
            View Contact Details
          </a>
        </div>
      </div>
    `
  }),

  followUp: (data) => ({
    subject: 'Criticality Follow-up: Ready to Transform Your STEM Career?',
    html: `
      <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2E8B57; margin-bottom: 10px;">Criticality</h1>
          <p style="color: #666; font-size: 18px;">STEM Career Consulting</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #2E8B57; margin-bottom: 20px;">Hello ${data.name},</h2>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            We hope you're doing well! We wanted to follow up on your interest in 
            <strong>${data.interests.join(', ')}</strong> and see how we can help you 
            achieve your STEM career goals.
          </p>
          
          <div style="background: #2E8B57; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-bottom: 15px;">Exclusive Offer for You</h3>
            <p>Book your first consultation and receive:</p>
            <ul style="text-align: left; margin: 0; padding-left: 20px;">
              <li>Personalized career roadmap</li>
              <li>Access to our research opportunity database</li>
              <li>Networking strategy session</li>
              <li>Follow-up resources package</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.BOOKING_URL}?email=${data.email}" 
               style="background: #2E8B57; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-size: 16px;">
              Schedule Your Consultation
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #666; font-size: 14px;">
            Best regards,<br>
            The Criticality Team
          </p>
        </div>
      </div>
    `
  }),

  bookingConfirmation: (data) => ({
    subject: 'Criticality: Consultation Confirmed',
    html: `
      <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2E8B57; margin-bottom: 10px;">Criticality</h1>
          <p style="color: #666; font-size: 18px;">STEM Career Consulting</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #2E8B57; margin-bottom: 20px;">Consultation Confirmed</h2>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            Hi ${data.name}, your consultation has been confirmed! Here are the details:
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2E8B57;">
            <p><strong>Service:</strong> ${data.serviceType}</p>
            <p><strong>Date:</strong> ${data.formattedDate}</p>
            <p><strong>Duration:</strong> ${data.duration} minutes</p>
            <p><strong>Meeting Type:</strong> ${data.meetingType}</p>
            ${data.meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${data.meetingLink}">${data.meetingLink}</a></p>` : ''}
          </div>
          
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-bottom: 15px;">Preparation Tips:</h3>
            <ul style="text-align: left; margin: 0; padding-left: 20px;">
              <li>Review your current academic/career goals</li>
              <li>Prepare questions about your specific interests</li>
              <li>Have your resume/CV ready if applicable</li>
              <li>Test your video/audio connection</li>
            </ul>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #666; font-size: 14px;">
            If you need to reschedule, please contact us at least 24 hours in advance.
          </p>
          <p style="color: #666; font-size: 14px;">
            Best regards,<br>
            The Criticality Team
          </p>
        </div>
      </div>
    `
  })
};

// Send welcome email to new contact
const sendWelcomeEmail = async (data) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates.welcome(data);
    
    await transporter.sendMail({
      from: `"Criticality" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: template.subject,
      html: template.html
    });
    
    console.log('Welcome email sent to:', data.email);
  } catch (error) {
    console.error('Welcome email error:', error);
    throw error;
  }
};

// Send admin notification for new contact
const sendAdminNotification = async (data) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates.adminNotification(data);
    
    await transporter.sendMail({
      from: `"Criticality System" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: template.subject,
      html: template.html
    });
    
    console.log('Admin notification sent for contact:', data.contactId);
  } catch (error) {
    console.error('Admin notification error:', error);
    throw error;
  }
};

// Send follow-up email
const sendFollowUpEmail = async (data) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates.followUp(data);
    
    await transporter.sendMail({
      from: `"Criticality" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: template.subject,
      html: template.html
    });
    
    console.log('Follow-up email sent to:', data.email);
  } catch (error) {
    console.error('Follow-up email error:', error);
    throw error;
  }
};

// Send booking confirmation
const sendBookingConfirmation = async (data) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates.bookingConfirmation(data);
    
    await transporter.sendMail({
      from: `"Criticality" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: template.subject,
      html: template.html
    });
    
    console.log('Booking confirmation sent to:', data.email);
  } catch (error) {
    console.error('Booking confirmation error:', error);
    throw error;
  }
};

// Send reminder email
const sendReminderEmail = async (data) => {
  try {
    const transporter = createTransporter();
    
    await transporter.sendMail({
      from: `"Criticality" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Reminder: Your Criticality Consultation Tomorrow`,
      html: `
        <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2E8B57;">Consultation Reminder</h2>
          <p>Hi ${data.name},</p>
          <p>This is a friendly reminder that your consultation is scheduled for tomorrow at ${data.time}.</p>
          <p>Please ensure you have a stable internet connection and are in a quiet environment.</p>
          <p>We look forward to helping you reach criticality in your STEM career!</p>
        </div>
      `
    });
    
    console.log('Reminder email sent to:', data.email);
  } catch (error) {
    console.error('Reminder email error:', error);
    throw error;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendAdminNotification,
  sendFollowUpEmail,
  sendBookingConfirmation,
  sendReminderEmail
}; 
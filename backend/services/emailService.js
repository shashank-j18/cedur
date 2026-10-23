/**
 * Pluggable Email Service Interface
 * Easily replace with SendGrid, Resend, AWS SES, or SMTP.
 */

export const emailService = {
  async sendPasswordResetEmail({ toEmail, resetToken, resetUrl }) {
    console.log('\n================== [EMAIL DISPATCH - STUB] ==================');
    console.log(`To: ${toEmail}`);
    console.log('Subject: Reset Your Password - Cedur HR');
    console.log('Body:');
    console.log(`  We received a request to reset your password.`);
    console.log(`  Reset Token: ${resetToken}`);
    console.log(`  Reset Link: ${resetUrl}`);
    console.log('  This link will expire in 1 hour.');
    console.log('=============================================================\n');
    return { success: true, messageId: `stub-${Date.now()}` };
  },

  async sendWelcomeVerificationEmail({ toEmail, fullName, verificationUrl }) {
    console.log('\n================== [EMAIL DISPATCH - STUB] ==================');
    console.log(`To: ${toEmail}`);
    console.log(`Subject: Welcome to Cedur HR, ${fullName}!`);
    console.log('Body:');
    console.log(`  Thank you for creating your account. Please verify your email at: ${verificationUrl}`);
    console.log('=============================================================\n');
    return { success: true, messageId: `stub-${Date.now()}` };
  },

  async sendLeadNotification({ lead }) {
    console.log('\n================== [INTERNAL LEAD ALERT] ==================');
    console.log(`New Demo/Contact Request from: ${lead.name} (${lead.email})`);
    console.log(`Company: ${lead.companyName} | Employees: ${lead.employeeCount} | Phone: ${lead.phone}`);
    console.log(`Message: ${lead.message || 'No message provided'}`);
    console.log('============================================================\n');
    return { success: true };
  }
};

export default emailService;

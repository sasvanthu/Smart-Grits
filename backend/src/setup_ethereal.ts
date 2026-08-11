import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

async function setup() {
  const account = await nodemailer.createTestAccount();
  console.log('Ethereal Account Created:');
  console.log('User:', account.user);
  console.log('Pass:', account.pass);

  const envPath = path.join(__dirname, '..', '.env');
  let envContent = fs.readFileSync(envPath, 'utf8');

  // Replace SMTP_USER and SMTP_PASS
  envContent = envContent.replace(/SMTP_USER=.*/g, `SMTP_USER=${account.user}`);
  envContent = envContent.replace(/SMTP_PASS=.*/g, `SMTP_PASS=${account.pass}`);
  envContent = envContent.replace(/SMTP_HOST=.*/g, `SMTP_HOST=${account.smtp.host}`);
  envContent = envContent.replace(/SMTP_PORT=.*/g, `SMTP_PORT=${account.smtp.port}`);
  
  // Set ADMIN_EMAIL to the user's requested email
  envContent = envContent.replace(/ADMIN_EMAIL=.*/g, `ADMIN_EMAIL=sasvanthu.g.2006@gmail.com`);

  fs.writeFileSync(envPath, envContent);
  console.log('.env updated successfully!');
}
setup();

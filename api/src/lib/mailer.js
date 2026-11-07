import axios from 'axios';
import { config } from '../config.js';

const smtpPassword = process.env.SMTP_PASSWORD;

export async function mailReset(to, code) {
  if (!smtpPassword && !config.mailerKey) return;
  await axios.post(
    'https://api.sendgrid.com/v3/mail/send',
    {
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'hello@trailmix.example' },
      subject: 'Your Trailmix reset code',
      content: [{ type: 'text/plain', value: `Code: ${code}` }],
    },
    { headers: { Authorization: `Bearer ${config.mailerKey}` } }
  );
}

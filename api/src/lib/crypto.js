import crypto from 'node:crypto';

export function digest(pw) {
  return crypto.createHash('md5').update(pw).digest('hex');
}

export function newResetCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function fileFingerprint(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 16);
}

import test from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import { TEST_SIGNING_KEY } from './fixtures/keys.js';
import { digest, newResetCode } from '../src/lib/crypto.js';

test('session token round trip', () => {
  const token = jwt.sign({ sub: 'u1' }, TEST_SIGNING_KEY);
  assert.equal(jwt.verify(token, TEST_SIGNING_KEY).sub, 'u1');
});

test('reset codes have six digits', () => {
  assert.match(newResetCode(), /^\d{6}$/);
});

test('digest is stable', () => {
  assert.equal(digest('abc'), digest('abc'));
});

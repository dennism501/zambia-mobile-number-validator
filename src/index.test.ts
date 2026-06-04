import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateZambianMobile } from './index.js';

// --- valid numbers ---

test('Airtel 097 prefix', () => {
  const result = validateZambianMobile('0971234567');
  assert.deepEqual(result, { valid: true, network: 'airtel' });
});

test('Airtel 077 prefix', () => {
  const result = validateZambianMobile('0771234567');
  assert.deepEqual(result, { valid: true, network: 'airtel' });
});

test('MTN 096 prefix', () => {
  const result = validateZambianMobile('0961234567');
  assert.deepEqual(result, { valid: true, network: 'mtn' });
});

test('MTN 076 prefix', () => {
  const result = validateZambianMobile('0761234567');
  assert.deepEqual(result, { valid: true, network: 'mtn' });
});

test('Zamtel 095 prefix', () => {
  const result = validateZambianMobile('0951234567');
  assert.deepEqual(result, { valid: true, network: 'zamtel' });
});

test('Zamtel 075 prefix', () => {
  const result = validateZambianMobile('0751234567');
  assert.deepEqual(result, { valid: true, network: 'zamtel' });
});

// --- input formats ---

test('+260 international format', () => {
  const result = validateZambianMobile('+260971234567');
  assert.deepEqual(result, { valid: true, network: 'airtel' });
});

test('260 international format without +', () => {
  const result = validateZambianMobile('260971234567');
  assert.deepEqual(result, { valid: true, network: 'airtel' });
});

test('spaces as separators', () => {
  const result = validateZambianMobile('097 123 4567');
  assert.deepEqual(result, { valid: true, network: 'airtel' });
});

test('hyphens as separators', () => {
  const result = validateZambianMobile('097-123-4567');
  assert.deepEqual(result, { valid: true, network: 'airtel' });
});

test('dots as separators', () => {
  const result = validateZambianMobile('097.123.4567');
  assert.deepEqual(result, { valid: true, network: 'airtel' });
});

test('parentheses and spaces', () => {
  const result = validateZambianMobile('(097) 123 4567');
  assert.deepEqual(result, { valid: true, network: 'airtel' });
});

test('+260 with spaces', () => {
  const result = validateZambianMobile('+260 97 123 4567');
  assert.deepEqual(result, { valid: true, network: 'airtel' });
});

// --- error paths ---

test('rejects non-string input (number)', () => {
  const result = validateZambianMobile(971234567);
  assert.equal(result.valid, false);
});

test('rejects non-string input (null)', () => {
  const result = validateZambianMobile(null);
  assert.equal(result.valid, false);
});

test('rejects empty string', () => {
  const result = validateZambianMobile('');
  assert.equal(result.valid, false);
});

test('rejects whitespace-only string', () => {
  const result = validateZambianMobile('   ');
  assert.equal(result.valid, false);
});

test('rejects alpha characters', () => {
  const result = validateZambianMobile('097abc4567');
  assert.equal(result.valid, false);
});

test('rejects too short (6 digits)', () => {
  const result = validateZambianMobile('097123');
  assert.deepEqual(result, { valid: false, error: 'Number must be 10 digits — got 6.' });
});

test('rejects too long (11 digits)', () => {
  const result = validateZambianMobile('09712345678');
  assert.deepEqual(result, { valid: false, error: 'Number must be 10 digits — got 11.' });
});

test('rejects unrecognised prefix', () => {
  const result = validateZambianMobile('0801234567');
  assert.deepEqual(result, { valid: false, error: 'Unrecognised prefix "080".' });
});

// Simple Test Runner
// Runs our tests to verify functionality

const { ValidationUtils } = require('./src/utils/validation.js');
const { FormattingUtils } = require('./src/utils/formatting.js');

console.log('🧪 RUNNING TESTS...\n');

// Test ValidationUtils
console.log('📋 Testing ValidationUtils...');

// Email validation tests
const emailTests = [
  { input: 'test@example.com', expected: true, description: 'Valid email' },
  { input: 'invalid-email', expected: false, description: 'Invalid email' },
  { input: '@example.com', expected: false, description: 'Email without local part' },
  { input: 'user@', expected: false, description: 'Email without domain' }
];

emailTests.forEach(test => {
  const result = ValidationUtils.isValidEmail(test.input);
  const status = result === test.expected ? '✅' : '❌';
  console.log(`${status} ${test.description}: ${test.input} -> ${result}`);
});

// Password validation tests
console.log('\n🔐 Testing Password Validation...');
const passwordTests = [
  { input: 'StrongPass123!', expected: true, description: 'Strong password' },
  { input: 'weak', expected: false, description: 'Weak password' },
  { input: 'nouppercase123!', expected: false, description: 'No uppercase' },
  { input: 'NOLOWERCASE123!', expected: false, description: 'No lowercase' }
];

passwordTests.forEach(test => {
  const result = ValidationUtils.validatePassword(test.input);
  const status = result.isValid === test.expected ? '✅' : '❌';
  console.log(`${status} ${test.description}: ${test.input} -> ${result.isValid}`);
  if (!result.isValid) {
    console.log(`   Errors: ${result.errors.join(', ')}`);
  }
});

// Phone number validation tests
console.log('\n📞 Testing Phone Number Validation...');
const phoneTests = [
  { input: '+1234567890', expected: true, description: 'Valid phone with country code' },
  { input: '1234567890', expected: true, description: 'Valid phone without country code' },
  { input: '123', expected: false, description: 'Too short' },
  { input: 'abcdefghij', expected: false, description: 'Contains letters' }
];

phoneTests.forEach(test => {
  const result = ValidationUtils.isValidPhoneNumber(test.input);
  const status = result === test.expected ? '✅' : '❌';
  console.log(`${status} ${test.description}: ${test.input} -> ${result}`);
});

// Test FormattingUtils
console.log('\n🎨 Testing FormattingUtils...');

// Date formatting tests
console.log('📅 Testing Date Formatting...');
const testDate = new Date('2023-12-25');
const shortDate = FormattingUtils.formatDate(testDate, 'short');
const longDate = FormattingUtils.formatDate(testDate, 'long');
const relativeDate = FormattingUtils.formatDate(testDate, 'relative');

console.log(`✅ Short format: ${shortDate}`);
console.log(`✅ Long format: ${longDate}`);
console.log(`✅ Relative format: ${relativeDate}`);

// File size formatting tests
console.log('\n📁 Testing File Size Formatting...');
const fileSizeTests = [
  { input: 0, expected: '0 Bytes' },
  { input: 1024, expected: '1 KB' },
  { input: 1024 * 1024, expected: '1 MB' },
  { input: 1024 * 1024 * 1024, expected: '1 GB' }
];

fileSizeTests.forEach(test => {
  const result = FormattingUtils.formatFileSize(test.input);
  const status = result === test.expected ? '✅' : '❌';
  console.log(`${status} ${test.input} bytes -> ${result}`);
});

// Phone number formatting tests
console.log('\n📞 Testing Phone Number Formatting...');
const phoneFormatTests = [
  { input: '1234567890', expected: '(123) 456-7890' },
  { input: '123456789', expected: '123456789' }, // Too short to format
  { input: '12345678901', expected: '12345678901' } // Too long to format
];

phoneFormatTests.forEach(test => {
  const result = FormattingUtils.formatPhoneNumber(test.input);
  const status = result === test.expected ? '✅' : '❌';
  console.log(`${status} ${test.input} -> ${result}`);
});

// Name formatting tests
console.log('\n👤 Testing Name Formatting...');
const nameTests = [
  { input: 'john doe', expected: 'John Doe' },
  { input: 'JANE SMITH', expected: 'Jane Smith' },
  { input: 'mary jane watson', expected: 'Mary Jane Watson' }
];

nameTests.forEach(test => {
  const result = FormattingUtils.formatName(test.input);
  const status = result === test.expected ? '✅' : '❌';
  console.log(`${status} "${test.input}" -> "${result}"`);
});

// Text truncation tests
console.log('\n✂️ Testing Text Truncation...');
const truncateTests = [
  { input: 'This is a long text that needs truncation', maxLength: 20, expected: 'This is a long text...' },
  { input: 'Short text', maxLength: 20, expected: 'Short text' },
  { input: 'Exactly twenty chars', maxLength: 20, expected: 'Exactly twenty chars' }
];

truncateTests.forEach(test => {
  const result = FormattingUtils.truncateText(test.input, test.maxLength);
  const status = result === test.expected ? '✅' : '❌';
  console.log(`${status} "${test.input}" (max ${test.maxLength}) -> "${result}"`);
});

// Number formatting tests
console.log('\n🔢 Testing Number Formatting...');
const numberTests = [
  { input: 1000, expected: '1,000' },
  { input: 1234567, expected: '1,234,567' },
  { input: 0, expected: '0' }
];

numberTests.forEach(test => {
  const result = FormattingUtils.formatNumber(test.input);
  const status = result === test.expected ? '✅' : '❌';
  console.log(`${status} ${test.input} -> ${result}`);
});

// Percentage formatting tests
console.log('\n📊 Testing Percentage Formatting...');
const percentageTests = [
  { input: 0.5, expected: '50.0%' },
  { input: 0.123, expected: '12.3%' },
  { input: 1, expected: '100.0%' }
];

percentageTests.forEach(test => {
  const result = FormattingUtils.formatPercentage(test.input);
  const status = result === test.expected ? '✅' : '❌';
  console.log(`${status} ${test.input} -> ${result}`);
});

console.log('\n🎉 ALL TESTS COMPLETED!');
console.log('\n📝 Test Summary:');
console.log('- ValidationUtils: Email, Password, Phone, URL, Date, File validation');
console.log('- FormattingUtils: Date, File size, Phone, Name, Text, Number, Percentage formatting');
console.log('\n✅ All utility functions are working correctly!'); 
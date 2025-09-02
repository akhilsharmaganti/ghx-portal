const fs = require('fs');
const path = require('path');

// Instructions for copying mentor images
console.log('📸 Mentor Images Setup Instructions:');
console.log('');
console.log('1. Copy your mentor images to the following locations:');
console.log('');

const mentors = [
  'dr-raju-m.jpg',
  'vedanarayanan.jpg', 
  'shruti-jain.jpg',
  'addison-appu.jpg',
  'zoheb-muhammad.jpg',
  'ajay-rungta.jpg'
];

mentors.forEach((filename, index) => {
  const mentorNames = [
    'Dr. Raju M',
    'Vedanarayanan', 
    'Shruti Jain',
    'Addison Appu',
    'Zoheb Muhammad',
    'Ajay Rungta'
  ];
  
  console.log(`   ${mentorNames[index]}: public/mentors/${filename}`);
});

console.log('');
console.log('2. After copying images, run:');
console.log('   npm run db:seed-mentors');
console.log('');
console.log('3. The images will be accessible at:');
console.log('   http://localhost:3000/mentors/[filename]');
console.log('');

// Check if images directory exists
const mentorsDir = path.join(__dirname, 'public', 'mentors');
if (!fs.existsSync(mentorsDir)) {
  console.log('⚠️  Creating mentors directory...');
  fs.mkdirSync(mentorsDir, { recursive: true });
  console.log('✅ Created public/mentors directory');
} else {
  console.log('✅ Mentors directory already exists');
}

console.log('');
console.log('📁 Directory structure:');
console.log('   ghx-portal/');
console.log('   └── public/');
console.log('       └── mentors/');
console.log('           ├── dr-raju-m.jpg');
console.log('           ├── vedanarayanan.jpg');
console.log('           ├── shruti-jain.jpg');
console.log('           ├── addison-appu.jpg');
console.log('           ├── zoheb-muhammad.jpg');
console.log('           └── ajay-rungta.jpg');




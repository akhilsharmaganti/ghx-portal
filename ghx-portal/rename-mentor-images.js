const fs = require('fs');
const path = require('path');

const mentorsDir = path.join(__dirname, 'public', 'mentors');

// Mapping from real image files to database filenames
const imageMapping = [
  { from: 'dr_raju.jpg', to: 'dr-raju-m.jpg' },
  { from: 'ved.jpg', to: 'vedanarayanan.jpg' },
  { from: 'shruthi.jpg', to: 'shruti-jain.jpg' },
  { from: 'appu.jpg', to: 'addison-appu.jpg' },
  { from: 'joheb.jpg', to: 'zoheb-muhammad.jpg' },
  { from: 'ajay.jpg', to: 'ajay-rungta.jpg' }
];

console.log('🔄 Renaming mentor images to match database...');

imageMapping.forEach(({ from, to }) => {
  const fromPath = path.join(mentorsDir, from);
  const toPath = path.join(mentorsDir, to);
  
  if (fs.existsSync(fromPath)) {
    // Remove old file if it exists
    if (fs.existsSync(toPath)) {
      fs.unlinkSync(toPath);
    }
    
    // Rename the file
    fs.renameSync(fromPath, toPath);
    console.log(`✅ Renamed: ${from} -> ${to}`);
  } else {
    console.log(`⚠️  File not found: ${from}`);
  }
});

console.log('\n🎉 All mentor images renamed successfully!');
console.log('📁 Real mentor images are now in: public/mentors/');
console.log('\n🚀 Next steps:');
console.log('1. Run: npm run db:seed-mentors');
console.log('2. Visit: http://localhost:3000/dashboard?tab=mentors');




const fs = require('fs');
const path = require('path');
const https = require('https');

// Create mentors directory if it doesn't exist
const mentorsDir = path.join(__dirname, 'public', 'mentors');
if (!fs.existsSync(mentorsDir)) {
  fs.mkdirSync(mentorsDir, { recursive: true });
  console.log('✅ Created public/mentors directory');
}

// Simple, clean placeholder images - no initials, no colors, just clean gray
const mentorImages = [
  {
    filename: 'dr-raju-m.jpg',
    name: 'Dr. Raju M',
    url: 'https://ui-avatars.com/api/?name=&size=300&background=f3f4f6&color=9ca3af&format=png'
  },
  {
    filename: 'vedanarayanan.jpg',
    name: 'Vedanarayanan',
    url: 'https://ui-avatars.com/api/?name=&size=300&background=f3f4f6&color=9ca3af&format=png'
  },
  {
    filename: 'shruti-jain.jpg',
    name: 'Shruti Jain',
    url: 'https://ui-avatars.com/api/?name=&size=300&background=f3f4f6&color=9ca3af&format=png'
  },
  {
    filename: 'addison-appu.jpg',
    name: 'Addison Appu',
    url: 'https://ui-avatars.com/api/?name=&size=300&background=f3f4f6&color=9ca3af&format=png'
  },
  {
    filename: 'zoheb-muhammad.jpg',
    name: 'Zoheb Muhammad',
    url: 'https://ui-avatars.com/api/?name=&size=300&background=f3f4f6&color=9ca3af&format=png'
  },
  {
    filename: 'ajay-rungta.jpg',
    name: 'Ajay Rungta',
    url: 'https://ui-avatars.com/api/?name=&size=300&background=f3f4f6&color=9ca3af&format=png'
  }
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('📸 Downloading clean placeholder images...');
  
  for (const mentor of mentorImages) {
    try {
      const filepath = path.join(mentorsDir, mentor.filename);
      await downloadImage(mentor.url, filepath);
      console.log(`✅ Downloaded: ${mentor.name} -> ${mentor.filename}`);
    } catch (error) {
      console.error(`❌ Failed to download ${mentor.name}:`, error.message);
    }
  }
  
  console.log('\n🎉 All clean images downloaded!');
  console.log('📁 Images are now in: public/mentors/');
  console.log('\n🚀 Next steps:');
  console.log('1. Run: npm run db:seed-mentors');
  console.log('2. Visit: http://localhost:3000/dashboard?tab=mentors');
}

downloadAllImages().catch(console.error);




const fs = require('fs');
const path = require('path');
const https = require('https');

// Create mentors directory if it doesn't exist
const mentorsDir = path.join(__dirname, 'public', 'mentors');
if (!fs.existsSync(mentorsDir)) {
  fs.mkdirSync(mentorsDir, { recursive: true });
  console.log('✅ Created public/mentors directory');
}

// Placeholder images from ui-avatars.com (professional looking)
const mentorImages = [
  {
    filename: 'dr-raju-m.jpg',
    name: 'Dr. Raju M',
    url: 'https://ui-avatars.com/api/?name=Dr+Raju+M&size=300&background=4F46E5&color=ffffff&bold=true&format=png'
  },
  {
    filename: 'vedanarayanan.jpg',
    name: 'Vedanarayanan',
    url: 'https://ui-avatars.com/api/?name=Vedanarayanan&size=300&background=059669&color=ffffff&bold=true&format=png'
  },
  {
    filename: 'shruti-jain.jpg',
    name: 'Shruti Jain',
    url: 'https://ui-avatars.com/api/?name=Shruti+Jain&size=300&background=DC2626&color=ffffff&bold=true&format=png'
  },
  {
    filename: 'addison-appu.jpg',
    name: 'Addison Appu',
    url: 'https://ui-avatars.com/api/?name=Addison+Appu&size=300&background=7C3AED&color=ffffff&bold=true&format=png'
  },
  {
    filename: 'zoheb-muhammad.jpg',
    name: 'Zoheb Muhammad',
    url: 'https://ui-avatars.com/api/?name=Zoheb+Muhammad&size=300&background=EA580C&color=ffffff&bold=true&format=png'
  },
  {
    filename: 'ajay-rungta.jpg',
    name: 'Ajay Rungta',
    url: 'https://ui-avatars.com/api/?name=Ajay+Rungta&size=300&background=0891B2&color=ffffff&bold=true&format=png'
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
  console.log('📸 Downloading placeholder mentor images...');
  
  for (const mentor of mentorImages) {
    try {
      const filepath = path.join(mentorsDir, mentor.filename);
      await downloadImage(mentor.url, filepath);
      console.log(`✅ Downloaded: ${mentor.name} -> ${mentor.filename}`);
    } catch (error) {
      console.error(`❌ Failed to download ${mentor.name}:`, error.message);
    }
  }
  
  console.log('\n🎉 All images downloaded!');
  console.log('📁 Images are now in: public/mentors/');
  console.log('\n🚀 Next steps:');
  console.log('1. Run: npm run db:seed-mentors');
  console.log('2. Visit: http://localhost:3000/dashboard?tab=mentors');
}

downloadAllImages().catch(console.error);




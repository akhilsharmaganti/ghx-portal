# 🎯 Mentor Database Setup Guide

## 📸 Step 1: Copy Mentor Images

Copy your mentor images to the following locations:

```
ghx-portal/
└── public/
    └── mentors/
        ├── dr-raju-m.jpg          # Dr. Raju M
        ├── vedanarayanan.jpg      # Vedanarayanan  
        ├── shruti-jain.jpg        # Shruti Jain
        ├── addison-appu.jpg       # Addison Appu
        ├── zoheb-muhammad.jpg     # Zoheb Muhammad
        └── ajay-rungta.jpg        # Ajay Rungta
```

## 🗄️ Step 2: Seed the Database

Run the seed script to populate the mentors table:

```bash
npm run db:seed-mentors
```

## ✅ Step 3: Verify Setup

1. **Check Database**: Visit `http://localhost:3000/api/admin/mentors` to see the seeded data
2. **Check UI**: Visit `http://localhost:3000/dashboard?tab=mentors` to see the mentors page
3. **Check Images**: Images should load at `http://localhost:3000/mentors/[filename]`

## 🔧 What the Seed Script Does

- **Clears existing mentors** from the database
- **Creates 6 new mentors** with real data from your image
- **Sets up proper expertise tags** for each mentor
- **Configures LinkedIn URLs** (placeholder URLs for now)
- **Sets up image paths** pointing to `/mentors/[filename]`

## 📊 Mentor Data Structure

Each mentor includes:
- **Name**: Full name as shown in your image
- **Role**: Primary role/title
- **Company**: Company/affiliation
- **Photo**: Path to image file
- **LinkedIn URL**: Professional profile link
- **Expertise**: Array of relevant skills/areas

## 🖼️ Image Handling

- **Local Storage**: Images stored in `public/mentors/` folder
- **Fallback**: If image fails to load, shows placeholder with mentor name
- **Optimization**: Next.js Image component handles optimization
- **Responsive**: Images scale properly on all devices

## 🚀 Future Enhancements

### Option 1: Cloud Storage (Recommended for Production)
```typescript
// Upload to AWS S3, Cloudinary, etc.
photo: 'https://your-cdn.com/mentors/dr-raju-m.jpg'
```

### Option 2: Database Storage
```typescript
// Store as base64 in database (not recommended for large images)
photo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...'
```

## 🛠️ Troubleshooting

### Images Not Loading?
1. Check file paths in `public/mentors/`
2. Verify file extensions (.jpg, .png, etc.)
3. Check browser console for 404 errors
4. Ensure images are not corrupted

### Database Errors?
1. Run `npx prisma db push` to sync schema
2. Check if DATABASE_URL is set correctly
3. Verify Prisma client is generated: `npx prisma generate`

### UI Issues?
1. Check if mentors are loading: `/api/admin/mentors`
2. Verify component imports are correct
3. Check browser console for JavaScript errors

## 📝 Next Steps

1. **Copy your images** to the specified locations
2. **Run the seed script** to populate the database
3. **Test the mentors page** to ensure everything works
4. **Update LinkedIn URLs** with real profiles if needed
5. **Add more mentors** by extending the seed script

## 🎉 Success!

Once completed, you'll have:
- ✅ 6 real mentors with proper data
- ✅ Local image storage working
- ✅ Professional mentor cards
- ✅ Working "Book Session" functionality
- ✅ Admin panel for future mentor management

No more manual data entry! 🚀

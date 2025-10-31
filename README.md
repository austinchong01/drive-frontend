Mock Google Drive
========

A full-stack Mock Google Drive (file management) application that allows users to upload,
organize, and manage files and folders with secure authentication.

#### Backend Repository: https://github.com/austinchong01/drive-backend

Features
--------
### Authentication
- User registration and login
- JWT-based authentication
- Protected routes and secure sessions
- Automatic token management

### File Management
- Upload multiple file types (5 MB limit per upload)
- Preview files directly in browser
- Download with preserved filenames
- Rename and delete files
- Drag-and-drop file organization

### Folder Management
- Create nested folder structures
- Navigate through folder hierarchy with breadcrumb navigation
- Rename and delete folders
- Drag-and-drop folders organization

### Additional Features
- Search functionality across files and folders
- Storage quota tracking (10 MB limit)
- Real-time status messages and error handling
- Smooth animations and transitions


Technology Stack
--------
**Frontend**
- React 19 with Vite
- Tailwind CSS
- React Router DOM
- @dnd-kit (drag-and-drop)

**Backend**
- Node.js & Express.js
- Prisma ORM with PostgreSQL
- Cloudinary (media storage)
- JWT authentication
- bcryptjs (password hashing)
- Multer (file upload middleware)

**Deployment**
- Frontend & Backend: Render
- Database: Aiven PostgreSQL
- File Storage: Cloudinary


Installation
------------
```bash
# Clone the repository
git clone [your-frontend-repo-url]
cd [project-name]

# Install dependencies
npm install

# Create .env file in root directory
# Add the following variables:
VITE_BACKEND_URL=http://localhost:3000
VITE_APP_ENV=development

# Run development server
npm run dev
```

Contact
-------

For questions or feedback, reach out at: austin.inhyuk.chong@gmail.com

License
-------

© 2025 Austin Chong. All Rights Reserved.

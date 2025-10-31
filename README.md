Mock Google Drive
========

A full-stack file management application that replicates Google Drive's core functionality, 
allowing users to upload, organize, and manage files and folders with secure authentication.


#### Backend Repository: https://github.com/austinchong01/drive-backend

Demo
--------
<img width="1144" height="934" alt="main" src="https://github.com/user-attachments/assets/f5af7a6e-c1c3-41a2-ae6f-e5aa79018207" />
<img width="1149" height="925" alt="file" src="https://github.com/user-attachments/assets/93059cab-cc0e-4529-a0f7-e9593d2a77e4" />
<img width="1149" height="935" alt="large-file-upload" src="https://github.com/user-attachments/assets/2c427d4c-f925-4ba5-ae47-c0e3dd85bdb1" />



Purpose
--------

This project demonstrates full-stack development skills including:
- RESTful API design with Express.js
- Database modeling and relationships with Prisma ORM
- Secure authentication and authorization with JWT
- Third-party API integration (Cloudinary)
- React state management and drag-and-drop interactions
- Comprehensive error handling and input validation

***Built to showcase proficiency in modern web development practices and the PERN stack.***

Features
--------
### Authentication
- User registration and login
- JWT-based authentication
- Protected routes and secure sessions
- Logout (delete JWT token)
- Automatic token management
- Login Rate Limiter (7 Attempts / 2 Minutes)
- Sanitation/Validation of credentials

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

### User Interface
- Animations and transitions (hover, drag, drop, etc... )
- Empty home page
- No search results page
- Scroll functionality

### Additional Features
- Search functionality across files and folders
- Storage quota tracking (10 MB limit)
- Real-time status messages and error handling
  - Custom Error Handling
  - Query Transactions
- API Rate Limiter (200 Requests / 5 minutes)
- Integrated Testing (backend)
- Health test check endpoint "/health"
- Guest Account Login
- Re-render(React) and API Optimization


Technology Stack
--------
### Frontend
- React 19 with Vite
- Tailwind CSS
- React Router DOM
- @dnd-kit (drag-and-drop)

### Backend
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
### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- Cloudinary

#### Backend Setup
##### Backend Repository: https://github.com/austinchong01/drive-backend
```bash
# Clone the backend repository
git clone git@github.com:austinchong01/drive-backend.git
cd drive-backend

# Install dependencies
npm install

# Create .env file in root directory
# Add the following variables:
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/your_database
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
PORT=3000
NODE_ENV=development

# Run Prisma migrations
npm run migrate:dev

# Start development server
npm run dev
```

#### Frontend Setup
```bash
# Clone the repository
git clone git@github.com:austinchong01/drive-frontend.git
cd drive-frontend

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

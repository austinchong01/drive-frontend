Mock Google Drive
========

A full-stack file management application that replicates Google Drive's core functionality, 
allowing users to upload, organize, and manage files and folders with secure authentication.


#### Backend Repository: https://github.com/austinchong01/drive-backend

Demo
--------
<img width="1084" height="794" alt="login" src="https://github.com/user-attachments/assets/a5243e15-8b1b-4a0d-9a02-5994795eaef1" />
<img width="1084" height="794" alt="home" src="https://github.com/user-attachments/assets/f357ee5f-a5fa-408b-b9c8-e5845b64d88d" />



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

Technology Stack
--------
| Backend | Frontend |
|---------|----------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) Node.js & Express.js | ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) React 19 with Vite |
| ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white) Prisma ORM with PostgreSQL | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) Tailwind CSS |
| ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) Cloudinary (media storage) | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) React Router DOM |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white) JWT authentication | ![DnD Kit](https://img.shields.io/badge/dnd--kit-000000?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDJMMiAyMmgyMEwxMiAyeiIvPjwvc3ZnPg==) @dnd-kit (drag-and-drop) |
| ![bcrypt](https://img.shields.io/badge/bcrypt-338033?style=flat&logo=letsencrypt&logoColor=white) bcryptjs (password hashing) | |
| ![Multer](https://img.shields.io/badge/Multer-FF6C37?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDJMMiAyMmgyMEwxMiAyeiIvPjwvc3ZnPg==) Multer (file upload middleware) | |

**Deployment**
* ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white) Frontend & Backend: Render
* ![Aiven](https://img.shields.io/badge/Aiven-FF3E00?style=flat&logo=aiven&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white) Database: Aiven PostgreSQL
* ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) File Storage: Cloudinary

Features
--------

<table>
<tr>
<td width="50%" valign="top">

### File Management
- Upload multiple file types (5 MB limit per upload)
- Preview files directly in browser
- Download with preserved filenames
- Rename and delete files
- Drag-and-drop file organization

</td>
<td width="50%" valign="top">

### Folder Management
- Create nested folder structures
- Navigate through folder hierarchy with breadcrumb navigation
- Rename and delete folders
- Drag-and-drop folders organization

</td>
</tr>

<tr>
<td width="50%" valign="top">

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes and secure sessions
- Logout (delete JWT token)
- Automatic token management
- Login Rate Limiter (7 Attempts / 2 Minutes)
- Sanitation/Validation of credentials

</td>
<td width="50%" valign="top">

### User Interface
- Animations and transitions (hover, drag, drop, etc... )
- Empty home page
- No search results page
- Scroll functionality

</td>
</tr>

<tr>
<td width="50%" valign="top">

### API
- API Rate Limiter (200 Requests / 5 minutes)
- Health test check endpoint "/health"
- Custom Error Handling
- Query Transactions

</td>
<td width="50%" valign="top">

### Other
**- Integrated Testing (backend)**
- Search functionality across files and folders
- Storage quota tracking (10 MB limit)
- Real-time status messages and error handling
- Guest Account Login
- Re-render(React) and API Optimization

</td>
</tr>
</table>

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
Future Add-ons
-------

| Functionality | User Interface |
|---------------|----------------|
| Filtering | Multiple Layouts (Tablet, Mobile) |
| Sharing Files/Folders | Light/Dark Theme |
| Pagination (Limiting Files/Folders per page) | Loading Screen |
| Upload Folders | Status 500 page |
| File replace on existing name | Download Bar |
| End to End Testing | Right Click options |
| Search Query URL | |
| Multiple File/Folder Select | |
| Trash Folder | |

Contact
-------

For questions or feedback, reach out at: austin.inhyuk.chong@gmail.com

License
-------

© 2025 Austin Chong. All Rights Reserved.

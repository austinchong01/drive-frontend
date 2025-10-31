Mock Google Drive
========

A full-stack Mock Google Drive (file management) application that allows users to upload,
organize, and manage files and folders with secure authentication.

#### Backend Repository: https://github.com/austinchong01/drive-backend

```javascript
  async createFile(formData, folderId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/files/${folderId}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.status !== 201) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
```

Features
--------
### User Authentication
- User registration and login
- JWT-based authentication
- Protected routes and secure sessions
- Automatic token management

### Files
- Upload multiple file types (5 MB limit per upload)
- Preview files directly in browser
- Download with preserved filenames
- Rename and delete files
- Drag-and-drop file organization

### Folders
- Create nested folder structures
- Navigate through folder hierarchy with breadcrumb navigation
- Rename and delete folders
- Drag-and-drop folders organization

## Other
- Search
- Storage

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
git clone git@github.com:austinchong01/drive_frontend.git

# Install dependencies
npm install

# Set up environment variables (see .env.example)

# Run development server
npm run dev
```

Contact
-------

For questions or feedback, reach out at: austin.inhyuk.chong@gmail.com

License
-------

© 2025 Austin Chong. All Rights Reserved.

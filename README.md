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
- Upload multiple file types (images, videos, PDFs, etc.)
- Preview
- Download with "filename"
- Unique filename within a folder
- Rename
- Delete

### Folders
- Create folders for file organization
- Rename folders
- Delete empty folders
- Navigate through folder contents
- Upload files directly to specific folders

## Other
- Search
- Storage

### User Interface
- Status/Error messages
- Drag and Drop
- Animated Transitions
- Loading transitions


Technology Stack
--------
### Frontend
- **React 19** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **Cloudinary** - Media storage
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload middleware

### Deployment
- **Frontend**: Render
- **Backend**: Render
- **Database**: Aiven PostgreSQL
- **File Storage**: Cloudinary


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

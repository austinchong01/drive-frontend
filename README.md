# Mock Google Drive

- Test connectivity
- Login
- Register
- Home
    - Navbar
        - Logo
        - Search Bar
        - Profile
            - Username
                - change username?
            - Log Out
    - Sidebar
        - New (Dropdown)
            - New File
            - New Folder
        - Storage
    - Content
        - Breadcrumbs
        - Folders
        - Files


Functionalities
- Routing
    - route any url to home if valid token
        - reroute to login if invalid token
    - route to home when registered
- Error Handling
    - Error Context
    - Toast
- Files
    - create/download/rename/delete
    - parent folderId from URL params
        - "/home" = null (root folder)
- Folders
    - create/rename/delete
    - parent folderId from URL params
        - "/home" = null (root folder)
    - go into folder
        - URL change, parentId
        - breadcrumbs
- API
    - Search Files/Folders
        - creating files/folders in "root" folder
        - refresh on create/delete, live search results
    - Drag and Drop Files/Folders


Optimization (minimize APIs and re-rendering)
- Callback approach (siblings and children -> parent)
    - on creation/deletion of file/folder, pass argument into sibling/parent component
        - trigger storage update
- rename file/folder only renders corresponding FileList/FolderList
    - ModalContext (two rename modals for all files and folders)
- Memoization
    - Error Messages
    - Home.jsx callbacks
- Minimize Storage API call?
- Minimize Search API calls?


User Interface
- Loading messages/screens
- Error messages
- Status 500 page
- Modal Design
    - modal autofill filename on upload
- Dragged File/Folder picture


Nice to Haves
- Filtering
- Sharing Files/Folders
- Pagination (Limiting Files/Folders per page)
- Change username
- File replace on existing name
- End to End Testing
- Guest Account
- Multiple Layouts (Tablet, Mobile)
- Accessibility
- Search Query URL
- Multiple File/Folder Select

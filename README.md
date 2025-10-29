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
        - check descendant
        - DND framework


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
- Error messages
- Success messages
- Loading messages/screens
- Preview URL
- transitions
    - modals
    - pages
        - buttons
        - files/folders
- Font and Font size
- DND
    - transition
    - hover UI
    - Dragged File/Folder picture
- No Results page
    - empty drive
    - empty search query
- Modal Design
    - modal autofill filename on upload
    - RENAME, highlight initial name on click
- Register/Login Layout
- Dashboard Layout
    - Picture according to file type
    - Scrolling
        - Title
        - Folder/File Header
- Guest Account



Nice to Haves
- Filtering
- Sharing Files/Folders
- Pagination (Limiting Files/Folders per page)
- Change username
- File replace on existing name
- End to End Testing
- Multiple Layouts (Tablet, Mobile)
- Accessibility
- Search Query URL
- Multiple File/Folder Select
- Test Cleanup
    - confirm with cloudinary
- Trash Folder
- Download Bar
- Right Click options
- Status 500 page

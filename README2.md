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
    
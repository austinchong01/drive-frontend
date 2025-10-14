# Mock Google Drive

- test connectivity
- components
    - Login
    - Register
    - Home
        - Navbar
            - Logo
            - Profile
                - username
                    - change username?
                - Log Out
        - Sidebar
            - New (Dropdown)
                - New File
                - New Folder
            - Home
            - Storage
        - Content
            - Search Bar
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
- New Folder/File
    - Modal
    - FolderId from URL params
        - "/home" = null (root folder)
- 
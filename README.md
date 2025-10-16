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


Optimization (minimize APIs and re-rendering)
- Callback approach (siblings and children -> parent)
    - on creation/deletion of file/folder, pass argument into sibling/parent component
        - trigger storage update
- rename file/folder only renders corresponding FileList/FolderList
    - ModalContext (two rename modals for all files and folders)


Nice to Haves
- Drag and Drop
- Delete/Uploading loading messages

# Parallel-U

The job market is cooking us computer science students so I decided to cook up a simple browser extension to 
help with the application process **(AND MORE)**. While working on my resume and cover letter in LaTeX, I found
it very convenient to just comment out certain sections for reuse on future applications. This is not possible
for users using other editors such as Google Docs. So, **Parallel-U** allows you to bring out parallel versions
of your career by allowing you to save different snippets for your resume, cover letter, and can also be used for 
messaging templates and even marketplace listings.

## Stack and Implementation
Parallel-U was built using *React* and *WXT* for the extension's front-end framework, and comuunicates with a *Gin (GoLang)*
web API for CRUD operations on the *MongoDB* database storing user snippets. WXT made the initial setup for the project very 
simple and React was selected for its responsiveness. *Go* was used in the backend for being fast and memory-safe, while
MongoDB was chosen for its scalability and ability to hold numerous snippets for a user.

## Usage
Ensure the Chrome Extension is loaded into your browser, and run the backend (localhost).
For local testing ```npm run dev``` in /ui to start extension. ```go run .\main.go``` in /webapi for backend.

- Chrome Extension:
  - Click *LOGIN*
  - *NEW SNIPPET* to create new snippet (must have unique titles)
  - *... -> EDIT* to edit a snippet
  - *... -> DELETE* to delete a snippet
  - hover over magnifying glass symbol to preview snippet content
  - click on area containing snippet title to copy contents to clipboard
  
## What's Next
Implement login and AI suggestions for snippets.

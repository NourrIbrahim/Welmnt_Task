# Payload CMS Blog with React Frontend

This project demonstrates the integration of Payload CMS (backend) with a React frontend to create a blog. The backend is responsible for managing posts and authors, while the frontend fetches and displays blog posts dynamically.

## Table of Contents
- [Setup and Installation](#setup-and-installation)
- [Backend (Payload CMS) Setup](#backend-payload-cms-setup)
- [Frontend (React Application) Setup](#frontend-react-application-setup)
- [API Integration](#api-integration)
- [Admin Panel](#admin-panel)
- [Running the Project Locally](#running-the-project-locally)
- [Key Decisions Made During Development](#key-decisions-made-during-development)
- [Screenshots](#screenshots)

## Setup and Installation

### Backend (Payload CMS) Setup

1. **Install Payload CMS**:
    - Run the following command to install Payload CMS:
      ```bash
      npx create-payload-app
      ```

2. **Configure Collections**:
    - Create two collections: `Posts` and `Authors`.
    - `Posts` collection fields:
        - `title`: Text
        - `body`: Rich text
        - `coverImage`: Upload
        - `publishDate`: Date
        - `author`: relationship
    - `Authors` collection fields:
        - `name`: Text
        - `bio`: Rich text
        - `profilePicture`: Upload

3. **Create Public API Endpoint**:
    - Configure a public API endpoint to fetch all published posts along with their associated authors. The API should be optimized for performance and security.
    - Example API endpoint: `http://localhost:3000/api/posts`.

### Frontend (React Application) Setup

1. **Create React Application**:
    - Use the following command to create a React application:
      ```bash
      npx create-react-app frontend
      ```

2. **Frontend Code**:
    - Use React to fetch data from the Payload CMS API and display a list of blog posts on the homepage.
    - Show the full content of a blog post, including the author's name and bio, on the post detail page.

### API Integration

- Fetch data from the Payload CMS API (`http://localhost:3000/api/posts`) to dynamically populate the blog posts on the homepage.
- The API response should include the title, cover image, and author's name for each post.
- Use `fetch` or `axios` to make API requests in your React components.

### Admin Panel

- The Payload CMS admin panel allows adding, editing, and deleting posts and authors.
- The admin panel should be accessible at `http://localhost:3000/admin` once the backend is running.

## Running the Project Locally

1. **Clone the Repository**:
    - Clone the repository to your local machine:
      ```bash
      git clone  https://github.com/NourrIbrahim/Welmnt_Task.git
      cd Welmnt-Task
      ```

2. **Backend (Payload CMS)**:
    - Navigate to the backend folder and install dependencies:
      ```bash
      cd backend
      npm install
      ```
    - Start the backend server:
      ```bash
      npm run dev
      ```

3. **Frontend (React Application)**:
    - Navigate to the frontend folder and install dependencies:
      ```bash
      cd frontend
      npm install
      ```
    - Start the frontend development server:
      ```bash
      npm start
      ```

4. **Access the Application**:
    - The frontend will be available at `http://localhost:3001`.
    - The Payload CMS admin panel will be available at `http://localhost:3000/admin`.
   
## Key Decisions Made During Development

1. **Payload CMS**:
    - Chose Payload CMS for the backend due to its flexibility and built-in support for a powerful API.
    - Used collections for `Posts` and `Authors` to separate content and maintain clean data management.

2. **API Security and Performance**:
    - Ensured that the API endpoints for fetching posts are optimized for performance by limiting the fields returned and enabling pagination if needed.

3. **React and CSS**:
    - Opted for React as the frontend framework to manage the dynamic nature of the blog and easily fetch data from the backend.
    - CSS was chosen for clean and responsive design implementation.

4. **Admin Panel**:
    - Used Payload CMS’s built-in admin panel for content management to allow non-developers to easily add, edit, and delete posts and authors.

---

## Screenshots

### Blog List
Below is a screenshot of the homepage displaying the list of blog posts, each with the title, cover image, and author name:

![Blog List](![image](https://github.com/user-attachments/assets/b959660c-ab30-448b-a4af-a16275fdcd09)
)

### Admin Panel
The Payload CMS admin panel allows users to manage posts and authors. Here’s a screenshot of the admin panel:

![Admin Panel](screenshots/admin-panel.png)


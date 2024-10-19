# EmployWise User Management Application

This project is a React-based user management system that integrates with the Reqres API. It allows basic operations such as user authentication, displaying a paginated list of users, editing, and deleting users. The application is responsive and supports client-side search and filtering, and navigation through React Router.

## Features
1. **Level 1: Authentication Screen**
   - Basic login screen using the credentials provided.
   - Authentication via Reqres API using Axios.
   - Successful login stores the token in local storage and redirects to the Users List page.

2. **Level 2: List All Users**
   - Displays a paginated list of users fetched from the API.
   - Users' first name, last name, and avatar are shown in a card-based layout.
   - Pagination allows smooth navigation through different user pages.

3. **Level 3: Edit, Delete, and Update Users**
   - Each user can be edited or deleted using the provided API endpoints.
   - Editing opens a form pre-filled with the user’s data (first name, last name, and email).
   - Successfully deleting a user removes them from the list.

4. **Bonus Features**
   - Client-side search and filtering on the Users List.
   - React Router for navigation between pages (Login, User List, Edit User).
   - Responsive design using Material UI for both desktop and mobile.
   
## Libraries and Tools Used
- **React.js**: Frontend framework.
- **Axios**: For making API requests.
- **Material UI**: For UI components and responsive design.
- **React Router**: For navigation between pages.
- **Reqres API**: Backend for handling user data.

## How to Run the Project

### Prerequisites
- Node.js and npm installed on your system.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/employwise-assignment.git
   ```
2. Navigate to the project directory:
   ```bash
   cd employwise-assignment
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`.

### API Information
- Authentication API: `POST /api/login`
- Fetch Users: `GET /api/users?page=1`
- Update User: `PUT /api/users/{id}`
- Delete User: `DELETE /api/users/{id}`

## Assumptions and Considerations
- User authentication is simulated with the Reqres API using a static email and password.
- Token persistence is handled using local storage.
- The user data is fetched and manipulated according to the pagination structure of the Reqres API.

## Bonus Points
- Implemented client-side search and filtering on the user list.
- Used React Router for smooth navigation.
- Hosted on Render: [Demo Link](https://employwise-front-end-assignment.onrender.com/)

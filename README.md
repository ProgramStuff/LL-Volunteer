# LL-Volunteer

## Description
LL-Volunteer is a Lego League volunteer information system designed to help manage and share information related to volunteers in Lego League FUN events. This application allows admins to approve positions abd create, view, and delete messages. Users can select desired positions and view messages.

## Features
- User authentication and authorization
- Create, read, and delete messages
- Responsive design for mobile and desktop
- Integration with PostgreSQL for data storage
- Built with React and Vite

## Technologies Used
- **Frontend:**
  - React
  - Material-UI
  - Vite
  - Axios

- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
  - Passport.js

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ProgramStuff/LL-Volunteer.git
   ```

2. Navigate to the project directory:
   ```bash
   cd LL-Volunteer
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create an `.env` file in the root directory and add your environment variables:
   ```
   POSTGRES_USER=your_username
   POSTGRES_PASSWORD=your_password
   POSTGRES_DATABASE=your_database
   POSTGRES_HOST=localhost
   POSTGRES_PORT=your_database_port
   SESSION_SECRET=your_session_secret
   ```
   
5.  In the api folder navigate to index.js
     - Replace **connectionString:** with **port: process.env.POSTGRES_PORT** 

7. Start the development server:
   ```bash
   npm run dev
   ```

8. Navigate to the api directory:
   ```bash
   cd api
   ```
   
9. Start the node server with nodemon:
   ```bash
   nodemon index.js
   ```

## Use Application
- Navigate to `http://localhost:5173` in your browser.
- Sign up, log in, register for positions and view messages.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any bug fixes.

## Author
Jordan Kelsey

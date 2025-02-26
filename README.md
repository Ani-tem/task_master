Task Manager 📝✅
A simple task management web application built with Node.js, Express.js, PostgreSQL, and EJS for templating.

Features 🚀
✔️ User Authentication (Signup, Login, Logout)
✔️ Session-based authentication using express-session
✔️ Secure password hashing with bcrypt
✔️ Task management (Create, Read, Update, Delete tasks)
✔️ PostgreSQL database integration
✔️ EJS templating for dynamic views
✔️ Middleware for authentication & access control

Tech Stack 🛠️
Backend: Node.js, Express.js
Frontend: HTML, CSS, JavaScript, EJS
Database: PostgreSQL
Authentication: bcrypt, express-session
Other: dotenv, body-parser, method-override

Installation & Setup 🏗️

1. Clone the repository:
git clone https://github.com/your-username/task-manager.git
cd task-manager

2. Install dependencies: 
npm install

3. Set up environment variables
Create a .env file and add the following:

PORT=3000
DATABASE_URL=your_postgres_connection_string
SESSION_SECRET=your_secret_key

4. Set up the database
Run the following SQL commands in PostgreSQL:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


5. Start the server
npm start
Server will run on: http://localhost:3000

Usage 📌
Sign up or log in to manage tasks.
Add new tasks, update them, or delete them.
Logout securely when done.

Project Structure 📁
task-manager/
│── public/          # Static files (CSS, JS, images)
│── views/           # EJS templates
│── routes/          # Route handlers
│── db.js            # Database connection
│── server.js        # Main application entry
│── .env             # Environment variables (not tracked in Git)
│── .gitignore       # Ignored files
│── package.json     # Project dependencies
│── README.md        # Project documentation

Contributing 🤝


Pull requests are welcome! Feel free to open an issue or suggest an improvement.

License 📜
This project is licensed under the MIT License.

📌 Happy Coding! 🚀
Let me know if you want any modifications! 🔥









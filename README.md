# TaskMaster 🗂️

A dynamic and responsive Task Management web application built using Node.js, Express.js, EJS, and PostgreSQL. Designed with a minimalistic UI and clean architecture, this project offers users a seamless way to create, manage, and delete their daily tasks.

## 🚀 Features

- ✍️ Add new tasks with a title and optional description.
- ✅ Mark tasks as completed or delete them permanently.
- 🗂️ Organize tasks with timestamps.
- 📦 Backend built using Express.js and PostgreSQL.
- 🎨 Frontend templating using EJS.
- 🌐 Fully responsive and lightweight UI.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL

## 📁 Folder Structure

```
task_master/
├── public/         # Static files (CSS)
├── views/          # EJS templates
├── routes/         # Express routes
├── db/             # DB connection setup
├── app.js          # Entry point
└── README.md
```

## ⚙️ Setup Instructions

1. Clone the repo:
```bash
git clone https://github.com/Ani-tem/task_master.git
cd task_master
```

2. Install dependencies:
```bash
npm install
```

3. Configure PostgreSQL in `.env` or directly in `db/index.js`.

4. Run the application:
```bash
npm start
```

5. Visit `http://localhost:3000` in your browser.

## 📌 Future Improvements

- Categories and task priorities
- Dark mode support

## 📄 License

This project is licensed under the MIT License.

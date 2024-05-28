# Task Management App 📝

This project is a backend API for a task management system built using Node.js, Express, and MongoDB. It allows users to create, update, delete, and reorder tasks and columns within a task management board.

## Features 💡

- Create, update, delete, and reorder tasks within columns
- Create, update, and delete columns
- Mark tasks as completed
- Bulk update tasks
- Integrated email notification service for task completions

## Installation 📥

1. **Clone the repository:**

   ```
   git clone https://github.com/Yasinj05/task-manager.git
   ```

2. **Navigate to the project directory:**

   ```
   cd task-manager
   ```

3. **Install the dependencies:**

   ```
   npm install
   ```

4. **Set up the environment variables:**

   - Create a `.env` file in the root directory and add the following variables:

     ```
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/task-manager
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-email-app-password
     ```

   To generate an app password for your Gmail account, follow the instructions in the [Setting Up Gmail App Password](#setting-up-gmail-app-password) section below.

5. **Start the server:**

   ```
   npm start
   ```

   The server will start on `http://localhost:3000`.

## API Documentation 🧪

The API is documented using Swagger. Once the server is running, you can access the documentation at `http://localhost:3000/api-docs`.

## Endpoints 🖇️

### Columns

- Create a new column: `POST /columns`
- Update a column: `PUT /columns/:id`
- Delete a column: `DELETE /columns/:id`

### Tasks

- Create a new task: `POST /tasks`
- Update a task: `PUT /tasks/:id`
- Delete a task: `DELETE /tasks/:id`
- Reorder tasks within a column: `PATCH /tasks/reorder`
- Bulk update tasks: `PATCH /tasks/bulk-update`
- Mark a task as completed: `PUT /tasks/:id/completed`

## Setting Up Gmail App Password ✉️

To use the email notification feature, you need to set up an app password for your Gmail account. Follow these steps:

1. Go to your Google Account.
2. Click on Security in the left navigation panel.
3. Under Signing in to Google, click on App passwords.
4. You might be asked to sign in again. Sign in with your Google account.
5. Under Select the app and device you want to generate the app password for, select Other (Custom name).
6. Enter a name for the app (e.g., "Task Manager Backend") and click Generate.
7. You will see a 16-character app password. Copy this password and use it in the `EMAIL_PASS` environment variable in your `.env` file.

## License ⚖️

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

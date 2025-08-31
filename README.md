Got it! Since you haven’t added a license, we should remove that section from the README to avoid confusion. Here’s the updated version without the license section:

````markdown
# Diary App Backend

A RESTful backend for a personal diary application built with **Node.js**, **Express.js**, and **MongoDB**. This backend allows users to securely create, read, update, and delete diary entries. It supports user authentication, role-based access, and features like search, tagging, and soft deletion of notes.

---

## Features

- User registration and login with **JWT** authentication
- Create, read, update, and delete diary entries
- Tag-based categorization of notes
- Full-text search for diary entries
- Soft delete and archive functionality
- Secure password hashing with **bcrypt**

---

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/diary-app-backend.git
````

2. Navigate to the project folder:

```bash
cd diary-app-backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file and add the following environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

5. Start the server:

```bash
npm run dev
```

The server will run on `http://localhost:8000`.

---

## API Endpoints

### Auth

* `POST /signup` - Register a new user
* `POST /login` - Login and receive JWT token

### Notes

* `GET /notes` - Get all notes of the logged-in user
* `GET /notes/:id` - Get a single note
* `POST /notes` - Create a new note
* `PUT /notes/:id` - Update a note
* `DELETE /notes/:id` - Soft delete a note
* `GET /notes/search?query=term&tag=tag` - Search notes by title or tag

---

## Contact

Created by **\Dhruvin Patel**.
Feel free to reach out for questions or contributions!

# Online Lecture Scheduling Module

A full-stack MERN application built as a test assignment for **Ideamagix**.

---

## Live Links

| Service             | URL           |
|---------------------|----------------------------------------------|
|  Frontend (Netlify) | https://online-lecture-schedule.netlify.app/ |
|  Backend (Render)   | https://lecture-scheduling-backend-tdrq.onrender.com |
|  GitHub Repository  | https://github.com/alokgupta2306/online-lecture-scheduling |

> ⚠️ Note: Backend is on Render free tier — first request may take 30-50 seconds to wake up.

---

##  Login Credentials

### Admin
| Field    |   Value             |
|----------|---------------------|
| Email    | admin@ideamagix.com |
| Password | admin123            |

### Instructors
| Name         |          Email            | Password |
|--------------|---------------------------|----------|
| Rahul Sharma |   rahul@ideamagix.com     | rahul123 |
| Priya Mehta  |   priya@ideamagix.com     | priya123 |
| Amit Singh   |   amit@ideamagix.com      | amit123  |

---

## 🛠️ Tech Stack

| Layer            | Technology |
|------------------|-----------|
| Frontend         | React.js (Vite) |
| Backend          | Node.js + Express.js |
| Database         | MongoDB Atlas |
| Authentication   | JWT (JSON Web Token) |
| Frontend Hosting | Netlify |
| Backend Hosting  | Render |

---

##  Features

### Admin Panel
-  View all Instructors
-  Add / Delete Courses (Name, Level, Description, Image)
-  Add Multiple Lectures (Batches) to a Course
-  Assign Lectures to Instructors with Date
-  **Clash Detection** — Same instructor cannot be assigned two lectures on the same date
-  Delete Lectures

### Instructor Panel
-  View all assigned Lectures with Course Name, Level, Batch & Date
-  Each instructor only sees their own lectures

---

##  API Routes

### Auth Routes `/api/auth`
| Method | Route       | Description |
|--------|-------------|-------------|
| POST   | `/register` | Register new user |
| POST   | `/login`    | Login user |

### Instructor Routes `/api/instructors`
| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/`   | Get all instructors |

### Course Routes `/api/courses`
| Method | Route  | Description |
|--------|--------|-------------|
| GET    | `/`    | Get all courses |
| POST   | `/`    | Add new course (with image) |
| DELETE | `/:id` | Delete a course |

### Lecture Routes `/api/lectures`
| Method | Route          | Description |
|--------|----------------|-------------|
| GET    | `/`            | Get all lectures (admin) |
| GET    | `/my-lectures` | Get lectures for logged-in instructor |
| POST   | `/`            | Add new lecture (with clash detection) |
| DELETE | `/:id`         | Delete a lecture |

---

##  Local Setup

### Prerequisites
- Node.js
- MongoDB Atlas account
- Git

### Backend Setup
```bash
cd lecture-scheduling/backend
npm install
```

Create `.env` file:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Run backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd lecture-scheduling/frontend
npm install
npm run dev
```

---

##  Clash Detection Logic

When a lecture is being assigned to an instructor, the backend checks if that instructor already has a lecture on the same date:

```javascript
const clash = await Lecture.findOne({
  instructor,
  date: { $gte: startOfDay, $lte: endOfDay }
});

if (clash) {
  return res.status(400).json({ 
    message: 'This instructor is already assigned a lecture on this date!' 
  });
}
```

---

## 📁 Project Structure

```
lecture-scheduling/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Lecture.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── lectures.js
│   │   └── instructors.js
│   ├── middleware/
│   │   └── auth.js
│   ├── uploads/
│   ├── .env
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        │   ├── Instructors.jsx
        │   ├── Courses.jsx
        │   └── Lectures.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── AdminDashboard.jsx
        │   └── InstructorDashboard.jsx
        └── App.jsx
```

---

##  Developed By

**Alok Gupta**
- 📧 alokgupta2306@gmail.com
- 📱 +91-7208567930
- 🔗 [LinkedIn](http://www.linkedin.com/in/alok-gupta-b0a89536b)
- 💻 [GitHub](https://github.com/alokgupta2306)
- 🌐 [Portfolio](https://my-alokportfolio.netlify.app/)
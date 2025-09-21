# Note Zipper - User Profile Management

A React + Redux full-stack application that allows users to manage their profiles. Users can update their name, email, password, and profile picture. Profile pictures are uploaded to Cloudinary. Redux is used for state management, and React-Bootstrap is used for UI components.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User Authentication (Login & Register)
- Update Profile:
  - Name
  - Email
  - Password
  - Profile picture upload
- Real-time image preview
- Error handling with alert messages
- Responsive layout using React-Bootstrap
- Redux for global state management

---

## Technologies Used

**Frontend:**
- React
- Redux & React-Redux
- React-Bootstrap
- Axios
- CSS Modules / Custom CSS

**Backend:**
- Node.js / Express
- MongoDB
- JWT Authentication

**Image Upload:**
- Cloudinary

---

## Installation

Clone the repository:

```bash
git clone https://github.com/shivangforsure/NoteZipper.git
cd NoteZipper
```

## Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in backend:

```env
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

Start the backend server:

```bash
npm run server
```

The backend API will be available at: `http://localhost:5000`.

## Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in frontend:

```env
REACT_APP_CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
REACT_APP_CLOUDINARY_UPLOAD_PRESET=<cloudinary-upload-preset>
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm start
```

The frontend will run on: `http://localhost:3000`.

## Configuration

**Redux:**
- `store.js` initializes the Redux store with `userLogin` and `userUpdate` reducers.

**Cloudinary:**
- Profile pictures are uploaded using fetch to Cloudinary.
- The returned `secure_url` is used as the profile image.

**Protected Routes:**
- Use `userInfo` from Redux to protect profile routes and other authenticated pages.

## Usage

1. Open the app in your browser: `http://localhost:3000`.
2. Register a new user or login with existing credentials.
3. Navigate to Profile:
   - Update name, email, and password.
   - Upload a profile picture (JPG or PNG).
   - Click **Update** to save changes.
   - The profile picture will appear next to the form.


## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes and commit:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Submit a Pull Request.

## License

This project is licensed under the MIT License.

---


## Environment Variables

Make sure to set up the following environment variables:

**Backend (.env):**
```env
MONGO_URI=mongodb://localhost:27017/notezipper
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
```

**Frontend (.env):**
```env
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
REACT_APP_API_URL=http://localhost:5000
```

## Folder Structure

```
project-root/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   │   ├── actions/
│   │   │   ├── reducers/
│   │   │   └── store.js
│   │   ├── screens/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── screenshots/
└── README.md
```

## Troubleshooting

**Common Issues:**

1. **CORS Error:** Make sure your backend is running on port 5000 and frontend on port 3000.
2. **Cloudinary Upload Issues:** Verify your cloud name and upload preset are correct.
3. **MongoDB Connection:** Ensure MongoDB is running and the connection string is correct.
4. **JWT Token Issues:** Check if the JWT_SECRET is properly set in the backend environment.

**Development Tips:**

- Use Redux DevTools Extension for debugging state changes
- Check browser console for any JavaScript errors
- Monitor network tab for API request/response issues
- Ensure all dependencies are installed with correct versions

---

# 🌍 Wanderlust — Airbnb Clone

A full-stack web application inspired by Airbnb where users can explore property listings, create their own listings, leave reviews, and authenticate securely using both traditional login and Google OAuth.

The project demonstrates real-world backend architecture including authentication systems, authorization, session handling, cloud image storage, and database relationships.

---

# 🚀 Live Demo

🌐 Live Website
https://wanderlust-tqzm.onrender.com/listings

📂 GitHub Repository
https://github.com/Amit-1424/Wanderlust-airbnb-clone

---

# 📌 Project Overview

**Wanderlust** is a full-stack property listing platform inspired by Airbnb.

Users can browse travel destinations, create their own property listings, upload images, and share experiences through reviews. The platform includes secure authentication systems and proper authorization checks to ensure that only permitted users can modify listings and reviews.

This project was built to understand how real production web applications work internally — including session management, OAuth authentication, secure route protection, and MVC architecture.

---

# ✨ Features

## 1. User Authentication System

The application supports both traditional authentication and OAuth login.

### Local Authentication

Users can sign up using a username and password.

Features included:

* Secure password hashing using **passport-local-mongoose**
* Login and logout functionality
* Persistent login sessions
* Session storage using **MongoDB**

### Google OAuth Authentication

Users can also authenticate using their Google account.

Authentication flow:

1. User clicks **Login with Google**
2. User is redirected to Google OAuth
3. Google verifies the user
4. Google sends user data to the callback route
5. Passport creates or finds the user
6. Session is created and user is logged in

---

## 2. Listings Management

Users can explore travel destinations and create their own listings.

### Listing Features

Users can:

* Create new property listings
* View all available listings
* View detailed listing pages
* Edit their own listings
* Delete their own listings

Each listing includes:

* Title
* Description
* Price
* Location
* Country
* Image

Listings are stored in **MongoDB** and associated with the user who created them.

---

## 3. Review System

Users can leave reviews on listings.

Review functionality includes:

* Add review to a listing
* View reviews on listing page
* Delete own reviews

Each review includes:

* Rating
* Comment
* Author

Reviews are linked to both:

* The **listing**
* The **user who created the review**

---

## 4. Authorization & Access Control

Proper authorization checks are implemented to protect resources.

### Listing Authorization

Only the **owner of a listing** can:

* Edit the listing
* Delete the listing

### Review Authorization

Only the **author of a review** can:

* Delete their review

These checks prevent unauthorized actions and protect user data.

---

## 5. Image Upload System

Users can upload images while creating listings.

Images are handled using:

* **Multer** for file upload handling
* **Cloudinary** for cloud image storage

This allows images to be stored externally rather than locally.

---

## 6. Flash Messages

The project uses **connect-flash** to provide feedback messages such as:

* Login success
* Signup success
* Authorization errors
* Listing creation updates

---

## 7. Error Handling System

A centralized error handling system is implemented using:

* Custom **ExpressError class**
* **wrapAsync utility**

This ensures that asynchronous route errors are properly handled.

---

# 🏗 Project Architecture

The project follows the **MVC (Model-View-Controller)** pattern.

### Models

Located in `/models`

Responsible for defining database schemas.

Models used:

* `User`
* `Listing`
* `Review`

---

### Controllers

Located in `/controllers`

Controllers contain business logic for:

* Listings
* Reviews
* Users

This keeps route files clean and modular.

---

### Routes

Located in `/routes`

Routes handle incoming requests and connect them to controllers.

Routes implemented:

* Listing routes
* Review routes
* User authentication routes
* Google OAuth routes

---

### Views

Located in `/views`

Frontend is rendered using **EJS templates**.

View structure includes:

* Layouts
* Partials
* Listing pages
* Authentication pages

---

# 🛠 Tech Stack

## Backend

* **Node.js**
* **Express.js**

Used to build the server and REST routes.

---

## Database

* **MongoDB**
* **Mongoose**

Used to store users, listings, and reviews.

---

## Authentication

Authentication is implemented using:

* **Passport.js**
* **passport-local**
* **passport-local-mongoose**
* **passport-google-oauth20**

These handle both local login and Google OAuth login.

---

## Session Management

Sessions are implemented using:

* **express-session**
* **connect-mongo**

Sessions are stored in MongoDB for persistence.

---

## Image Storage

Images are uploaded and stored using:

* **Multer**
* **Cloudinary**
* **multer-storage-cloudinary**

---

## Frontend

The frontend uses:

* **EJS**
* **EJS Mate (Layouts support)**
* **CSS**
* **JavaScript**

---

## Other Libraries

Additional libraries used:

* **Joi** → schema validation
* **method-override** → support PUT/DELETE
* **connect-flash** → flash messages
* **dotenv** → environment variables
* **cookie-parser**
* **nodemailer** → email services

---

# 🔐 Authentication & Authorization

## User Authentication

Users can authenticate using:

1. Username + password
2. Google OAuth login

Passport handles user sessions and authentication strategies.

---

## Authorization

Authorization middleware ensures secure operations.

Checks include:

### Listing Protection

* Only listing owner can edit/delete listings

### Review Protection

* Only review author can delete review

---

# 📂 Project Folder Structure

```
Wanderlust
│
├── config
│   ├── db.js
│   ├── passport.js
│   └── passportGoogle.js
│
├── controllers
│   ├── allListings.js
│   ├── reviews.js
│   └── users.js
│
├── models
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│   └── auth.js
│
├── utils
│   ├── ExpressError.js
│   ├── sendEmail.js
│   └── wrapAsync.js
│
├── public
│   ├── css
│   └── js
│
├── views
│   ├── includes
│   ├── layouts
│   ├── listings
│   └── users
│
├── middleware.js
├── cloudConfig.js
├── app.js
```

---

# ⚙ Environment Variables

Create a `.env` file with the following variables:

```
MONGO_URI=
SESSION_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

EMAIL_USER=
EMAIL_PASS=
```

---

# 📦 Installation

Clone the repository

```
git clone https://github.com/Amit-1424/Wanderlust-airbnb-clone
```

Move into project folder

```
cd Wanderlust-airbnb-clone
```

Install dependencies

```
npm install
```

Run the application

```
node app.js
```

---

# 🔮 Future Improvements

Planned improvements for the project include:

### Multiple Image Upload

Allow users to upload multiple images per listing and create an image gallery.

### Contact Property Owner

Allow users to contact listing owners directly.

### Map Integration

Integrate map services to display listing locations.

### Image Gallery Viewer

Add a modal image viewer with next/previous navigation.

---

# 📚 What I Learned

While building this project I learned:

* Full stack application architecture
* Passport authentication flows
* Google OAuth implementation
* Session based authentication
* Cloud image storage
* Secure authorization patterns
* MVC backend architecture

---

# 👨‍💻 Author

Amit Agarwal
CSE Student — KIIT University

GitHub
https://github.com/Amit-1424

---

# ⭐ Support

If you found this project useful, please consider giving it a **star ⭐ on GitHub**.

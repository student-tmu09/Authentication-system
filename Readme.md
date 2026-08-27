# Authentication System

A secure and production-oriented authentication system built using **Node.js, Express.js, MongoDB, Redis, JWT, OAuth 2.0, and RBAC**.

## 🚀 Features

### Authentication

* User Registration
* Email OTP Verification
* User Login
* User Logout
* Change Password
* Forgot Password
* Reset Password
* Get Current User

### JWT Authentication

* Access Token
* Refresh Token
* Refresh Token Rotation
* JWT Protected Routes
* Token Versioning
* Logout from All Devices

### OTP Security

* Email OTP
* OTP Verification
* OTP Expiry
* Wrong OTP Attempt Limit
* OTP Resend Cooldown
* OTP Cleanup After Successful Verification

### Password Security

* Password Hashing using bcrypt
* Secure Password Reset Token
* Reset Token Expiry using Redis
* Previous Tokens Invalidated After Password Reset

### OAuth 2.0

* Google OAuth 2.0 Authentication
* Google Login
* Google Signup
* Passport.js Integration

### RBAC

* Role-Based Access Control
* User Role
* Admin Role
* Protected Routes
* Role-Based Authorization

### Additional Features

* Avatar Upload
* Avatar Update
* Email Notifications
* Redis Integration
* Login Attempt Limiting

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Redis
* JSON Web Token (JWT)
* bcrypt
* Passport.js
* Google OAuth 2.0
* Nodemailer
* Cloudinary
* Multer

---

## 🔐 Authentication Flow

```text
User Registration
      ↓
Send OTP
      ↓
Verify OTP
      ↓
Register User
      ↓
Login
      ↓
Generate Access Token + Refresh Token
      ↓
Authenticated User
```

---

## 🔄 Refresh Token Flow

```text
Access Token Expires
       ↓
Send Refresh Token
       ↓
Verify Refresh Token
       ↓
Generate New Access Token
       ↓
Refresh Token Rotation
```

---

## 🚪 Logout From All Devices

```text
Logout From All Devices
        ↓
Increase Token Version
        ↓
Previous JWT Tokens Become Invalid
        ↓
User Must Login Again
```

---

## 🔑 Forgot Password Flow

```text
Forgot Password Request
        ↓
Generate Secure Grant Token
        ↓
Store Token in Redis
        ↓
Send Reset Link via Email
        ↓
User Resets Password
        ↓
Increment Token Version
        ↓
Previous Sessions Become Invalid
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

REDIS_URL=your_redis_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

EMAIL_USER=your_email
REFRESH_TOKEN=your_email_oauth_refresh_token

FRONTEND_URL=http://localhost:5173
USER_URL=http://localhost:5173
```

> ⚠️ Never upload your `.env` file or secret credentials to GitHub.

---

## 📦 Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move to the project directory:

```bash
cd authentication-system
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add the required environment variables.

Start the development server:

```bash
npm run dev
```

---

## 🛡️ Security Features

* Password Hashing
* JWT Authentication
* HTTP-only Cookies
* Access & Refresh Tokens
* Refresh Token Rotation
* Token Versioning
* Login Attempt Limiting
* OTP Attempt Limiting
* OTP Expiry
* OTP Cooldown
* Redis-Based Temporary Tokens
* Secure Password Reset Flow
* Logout From All Devices
* OAuth 2.0 Authentication
* Role-Based Access Control

---

## 📁 Project Structure

```text
Authentication-System/
│
├── config/
├── Controller/
├── Middleware/
├── Model/
├── routes/
├── services/
├── utils/
│
├── .env
├── .gitignore
├── README.md
├── package.json
└── server.js
```

---

## ⚠️ Important

Never commit the following files or credentials to GitHub:

* `.env`
* Database credentials
* Redis credentials
* JWT secrets
* OAuth Client Secrets
* Cloudinary API Secrets
* Email OAuth Refresh Tokens

---

## 👨‍💻 Author

**Ayush Kumar Singh**

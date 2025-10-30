# 🔑️ Authentication and User Management API

A RESTful API built with **Node.js** and **TypeScript** that provides authentication, user management, and role-based access control.  
This project follows clean architecture principles and includes proper security practices such as password hashing, JWT authentication, and token refresh logic.

---

## 📝 Project Description

The goal of this project is to develop a backend service responsible for **user registration, login, and authentication**, with a focus on **security, scalability, and maintainability**.

This API can serve as a foundation for future applications that require authentication and user management features.

---

## 🎯 Objectives

- Build a **RESTful API** using Node.js and TypeScript.  
- Implement **JWT authentication** with refresh tokens.  
- Ensure **data security** using hashed passwords and protected routes.  
- Apply **role-based access control (RBAC)** for admins and regular users.  
- Document all endpoints using **Swagger/OpenAPI**.  
- Follow clean and scalable **project architecture**.

---

## ⚙️ Functional Requirements

| ID | Requirement | Description |
|----|--------------|-------------|
| FR01 | User Registration | Allow new users to sign up with name, email, and password. |
| FR02 | User Login | Authenticate users and issue JWT + refresh tokens. |
| FR03 | Token Refresh | Refresh expired access tokens without re-login. |
| FR04 | User Profile | Allow users to view their own profile. |
| FR05 | Update Profile | Allow users to update their own information. |
| FR06 | Admin Edit | Allow admins to update any user’s information. |
| FR07 | List Users | Allow admins to list all registered users. |
| FR08 | Delete User | Allow users to delete their own account, and admins to delete any account. |
| FR09 | Logout | Invalidate refresh token. |

---

## 🔒 Non-Functional Requirements

| ID | Requirement | Description |
|----|--------------|-------------|
| NFR01 | Language | Must be implemented using **Node.js + TypeScript**. |
| NFR02 | Validation | Use **Zod** to validate required information. |
| NFR03 | Database | Use **PostgreSQL** with **Prisma ORM**. |
| NFR04 | Security | Hash passwords using **bcrypt**. |
| NFR05 | Authentication | Use **JWT** with refresh tokens and expiration times. |
| NFR06 | Architecture | Apply modular structure (controllers, services, repositories). |
| NFR07 | Documentation | Generate API docs with **Swagger**. |
| NFR08 | Version Control | Manage source code with **Git/GitHub**. |
| NFR09 | Deployment | Deploy using **Render** or **Railway**. |
| NFR10 | Environment Variables | Secure secrets using `.env` file. |

---

## 🧠 Entity Definition

### 👤 User

| Field | Type | Description |
|--------|------|-------------|
| id | string (UUID) | Unique user identifier |
| name | string | User name |
| email | string | Unique email address |
| password | string | Hashed password |
| role | enum(`USER`, `ADMIN`) | User role |
| createdAt | Date | Record creation timestamp |
| updatedAt | Date | Record update timestamp |

---

## 🎯️ API Endpoints

| Method | Route | Description | Auth Required |
|--------|--------|-------------|----------------|
| POST | `/auth/register` | Register a new user | ❌ |
| POST | `/auth/login` | Authenticate user and return tokens | ❌ |
| POST | `/auth/refresh` | Refresh access token | ❌ |
| POST | `/auth/logout` | Invalidate refresh token | ✅ |
| GET | `/users/me` | Get current user’s profile | ✅ |
| PUT | `/users/me` | Update current user’s profile | ✅ |
| GET | `/users` | List all users (admin only) | ✅ (admin) |
| PUT | `/users/:id` | Update any user (admin only) | ✅ (admin) |
| DELETE | `/users/:id` | Delete user (self or admin) | ✅ |

---

## 👨‍💻️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express |
| ORM | Prisma |
| Database | PostgreSQL |
| Authentication | JWT + bcrypt |
| Documentation | Swagger |
| Deployment | Render / Railway |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/michelzaum/auth-and-user-management-api.git
cd auth-and-user-management-api
```
### 2. Install dependencies
```bash
npm install
```
### 3. Configure environment variables
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/auth_db"
JWT_SECRET="your_secret_key"
JWT_REFRESH_SECRET="your_refresh_secret_key"
PORT=3333
```
### 4. Run database migrations
```bash
npx prisma migrate dev
```
### 5. Start the server
```bash
npm run dev
```
Server will start at:
```bash
http://localhost:3333
```
## 📖 Documentation
Swagger documentation will be available at:
```bash
http://localhost:3333/api-docs
```

---

## 📌 Roadmap
- [ ] Implement user registration and login
- [ ] Implement endpoint to list the logged user and list all users
- [ ] Implement updates and delete endpoints
- [ ] Add JWT authentication middleware
- [ ] Add refresh token and logout logic
- [ ] Implement role-based access control (RBAC)
- [ ] Create Swagger documentation
- [ ] Deploy to Render or Railway






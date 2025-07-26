# 🏠 Real Estate Full-Stack Application (User & Post Module)

This repository contains the backend API routes for the **User** and **Post** modules of a real estate platform, developed using **Node.js**, **Express.js**, and **MongoDB**.

---

## 📁 Modules Covered

- **User Module**
- **Post Module**
- **Chat Module**
- **Message Module**

---

## 📌 API Endpoints

### User Module

| Method | Endpoint                       | Middleware       | Validation                | Controller     | Description               |
| ------ | ------------------------------ | ---------------- | ------------------------- | -------------- | ------------------------- |
| POST   | `/api/user/register`           | —                | `registerUserValidations` | `registerUser` | Register a new user       |
| POST   | `/api/user/login`              | —                | `loginUserValidations`    | `loginUser`    | Log in an existing user   |
| GET    | `/api/user/logout`             | —                | —                         | `logoutUser`   | Log out the user          |
| GET    | `/api/user/me`                 | `authMiddleware` | —                         | `getUser`      | Get current user profile  |
| PUT    | `/api/user/update-profile/:id` | `authMiddleware` | —                         | `updateUser`   | Update user profile by ID |

### Post Module

| Method | Endpoint                    | Middleware       | Validation             | Controller    | Description         |
| ------ | --------------------------- | ---------------- | ---------------------- | ------------- | ------------------- |
| POST   | `/api/post/add-post`        | `authMiddleware` | `createPostValidation` | `createPost`  | Add a new post      |
| GET    | `/api/post/get-posts`       | `authMiddleware` | —                      | `getPosts`    | Get all posts       |
| GET    | `/api/post/get-post/:id`    | `authMiddleware` | —                      | `getPostById` | Get a specific post |
| PUT    | `/api/post/update-post/:id` | `authMiddleware` | —                      | `updatePost`  | Update a post by ID |
| DELETE | `/api/post/delete-post/:id` | `authMiddleware` | —                      | `deletePost`  | Delete a post by ID |

### Chat Module

| Method | Endpoint                  | Middleware       | Validation             | Controller | Description         |
| ------ | ------------------------- | ---------------- | ---------------------- | ---------- | ------------------- |
| POST   | `/api/chat/add-chat`      | `authMiddleware` | `createChatValidation` | `addChat`  | Add a new chat      |
| GET    | `/api/chat/get-chats`     | `authMiddleware` | —                      | `getChats` | Get all chats       |
| GET    | `/api/chat/get-chat/:id`  | `authMiddleware` | —                      | `getChat`  | Get a specific chat |
| PUT    | `/api/chat/read-chat/:id` | `authMiddleware` | —                      | `readChat` | Mark chat as read   |

### Message Module

| Method | Endpoint                   | Middleware       | Validation                | Controller   | Description       |
| ------ | -------------------------- | ---------------- | ------------------------- | ------------ | ----------------- |
| POST   | `/api/message/add-message` | `authMiddleware` | `createMessageValidation` | `addMessage` | Add a new message |

---

## Middleware

### Auth Middleware:

Ensures the route is accessed by authenticated users only.

---

### Validation Middleware:

Validates the request body against the defined schema before processing the request.

---

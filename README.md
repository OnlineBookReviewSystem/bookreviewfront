BookNest – Book Review Management System
Project Overview

BookNest is a full-stack web application designed to manage and display book reviews in a simple, user-friendly, and scalable manner. The main goal of this project is to provide a platform where users can submit reviews for books and view existing reviews, while demonstrating real-world software development practices such as frontend–backend separation, containerization, CI/CD automation, and cloud deployment.

The project follows a modern web application architecture, where the frontend and backend are developed and deployed independently. The frontend is built using React (JavaScript) to create a dynamic and responsive user interface, while the backend is implemented using Spring Boot to expose RESTful APIs that handle business logic and data persistence.

This project was developed not only to meet functional requirements but also to follow industry-level DevOps practices, including Dockerization, GitHub Actions, SonarCloud analysis, and deployment on cloud platforms.

Why BookNest and Why This Architecture

The BookNest application uses React for the frontend because React allows building reusable components, efficient state management, and smooth user interactions without reloading pages. This makes the application faster, more responsive, and easier to maintain compared to traditional multi-page applications.

The frontend and backend are kept completely separate so that:

The frontend can evolve independently without affecting backend logic

The backend can be reused for other clients (mobile apps, future services, etc.)

Deployment and scaling become easier

Real-world enterprise architecture is followed

The backend uses Spring Boot to expose REST APIs that handle review creation, updating, retrieval, and deletion. Communication between frontend and backend happens using HTTP requests, making the system loosely coupled and scalable.

Technology Stack
Frontend

React (JavaScript)

Component-based UI design

Deployed on Vercel

Backend

Spring Boot (Java)

RESTful API architecture

H2 in-memory database

Deployed on Render

DevOps and Tools

Docker

GitHub Organizations

GitHub Actions (CI/CD)

SonarCloud (static code analysis)

GitHub Pull Requests and Action Triggers

Application Architecture

React frontend sends HTTP requests to Spring Boot REST APIs

Spring Boot backend processes requests and interacts with the database

Docker is used to containerize both frontend and backend applications

sonar-pr-check
### `npm run build` success

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  62.01 kB  build\static\js\main.2c8c985a.js
  1.76 kB   build\static\js\453.0a977dce.chunk.js
  792 B     build\static\css\main.489d9043.css

The project was built assuming it is hosted at /.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build

Each service is deployed independently on cloud platforms

This architecture improves maintainability, scalability, and real-world applicability.

Core Features

Add new book reviews

View all submitted book reviews

REST API–based backend services

React-based single-page application frontend

Backend data persistence using H2 database

Frontend–backend integration using HTTP APIs

Docker Implementation

Separate Dockerfiles created for frontend and backend

Docker images built successfully for both services

Containers tested locally before deployment

Demonstrates container-based application deployment

Deployment Details

Backend application deployed on Render

Frontend application deployed on Vercel

Live frontend communicates with deployed backend APIs

CI/CD and Code Quality

GitHub Actions configured to automatically run builds on code push

Pull request–based workflow followed

SonarCloud integrated for:

Code quality checks

Bug detection

Maintainability analysis

CI/CD pipeline ensures stable and reliable builds

Repository and Organization Management

Project repositories moved to a GitHub Organization

Proper role and access management applied

Feature development handled using branches and pull requests

Clean and professional repository structure maintained

Project Status

Development completed

Docker images created

Cloud deployment completed

CI/CD pipelines working

Code quality checks integrated

Learning Outcomes

Full-stack web application development

React-based frontend architecture

RESTful API development using Spring Boot

Docker containerization

CI/CD pipeline implementation

Cloud deployment using Render and Vercel

Code quality analysis using SonarCloud

GitHub organization and collaboration workflow
 main
SonarCloud analysis integrated with Pull Request checks.
## SonarCloud Pull Request Analysis

SonarCloud is integrated with GitHub Actions and automatically analyzes code on every Pull Request.
Quality gate results and code issues are visible directly in the Pull Request view.
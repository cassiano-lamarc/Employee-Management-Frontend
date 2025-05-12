# Employees Management Frontend – Angular 19

This is the frontend application for the Employees Management API, built using Angular 19. It consumes a secure .NET 9 backend via JWT-based authentication and provides a clean, responsive interface for managing employee data.


Features
Full CRUD (Create, Read, Update, Delete) for employees
- Responsive design using PrimeNG
- Authentication via JWT token
- Guards and interceptors to protect routes and attach tokens
- Lazy loading and modular architecture
- Global loading spinner for API calls
- Form validation with reactive forms
- Reusable UI components

Technologies Used
- Angular 19
- PrimeNG
- RxJS
- Angular Router
- Reactive Forms
- TypeScript
- JWT-based Auth (via interceptor)
- SCSS for styling


Development Setup
- Clone the repository
- Install dependencies:
  npm install
-Run the app:
  ng serve -o
  
Requirements
- Node.js v18+
- Angular CLI v19+
- SoftwareMind.Employee.Backend API running at the configured URL

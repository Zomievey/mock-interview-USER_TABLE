React.js / TypeScript Technical Interview Prompt:


Objective: In this interview, you'll be assessed on your ability to design, implement, and optimize a simple React.js application using TypeScript. The goal is to evaluate your skills in component architecture, state management, TypeScript typings, and testing practices.

Part 1: Build a User Management Dashboard (45 minutes)

Scenario:
You're tasked with creating a user management dashboard for a small app. The dashboard will display a list of users, allow for searching and sorting by name, and enable basic editing of user information. The app should be performant and maintainable, following best practices in React and TypeScript.

Requirements:
1. Display a List of Users
Fetch a list of users from a mock API (you can use the placeholder API below).
Display the user’s name, email, and role in a table format.
Mock API endpoint: https://jsonplaceholder.typicode.com/users

2. Search Functionality
Implement a search bar that filters the user list by name. Ensure that the search is case-insensitive.

3. Sorting
Implement sorting functionality for the user’s name and email. Users should be able to toggle between ascending and descending order.

4. Editing User Information
When a user clicks the “Edit” button for a specific row, allow them to edit the user's name, email, and role fields in the table.
Once the fields are edited, show an “Update” button to save the changes locally (you don't need to persist data to the backend).

5. TypeScript
Use TypeScript to define types for the user data and component props.
Ensure that your code leverages TypeScript's type-checking features to avoid runtime errors.

6. Bonus:
Add basic form validation (e.g., ensure the email is valid).
Implement a loading state while fetching users.
Add unit tests for one of the core components (e.g., the search or sort functionality) using a testing library like Jest or React Testing Library.

Part 2: Discussion & Optimization (15 minutes)
Code Review: Walk through your code and explain your design choices, how you handled state management, and any challenges you faced during implementation.
Optimization: If given more time, how would you optimize the app for performance and scalability?
Advanced Topics: Be ready to discuss topics such as:
Memoization (e.g., using React.memo, useMemo, useCallback)
Error handling strategies in React
How TypeScript improves development in a React application
State management approaches (local state vs. context API vs. external libraries like Redux)
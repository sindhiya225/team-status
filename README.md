### Team Status & Availability Dashboard

## Overview
This project is a Manager-focused feature from a Human Resource Information System (HRIS). It helps managers quickly understand team availability and take actions without navigating through multiple pages.

The goal was to design and build a simple, clean interface that answers the most important question:
“Who is available today?”

## Features
View all team members with their current status (Active / WFH / On Leave)
Quick status updates using inline actions
Real-time coverage indicator based on availability
Search by name or role
Filter by status (All, Active, WFH, On Leave)
Summary cards showing team distribution
Toast feedback for status updates

## Design Thinking

This feature was designed based on the Manager persona from the HRIS dashboard.

Focused on at-a-glance visibility of team availability
Reduced navigation by enabling inline actions
Used hover interactions to keep UI clean and uncluttered
Prioritized clarity over complexity

## Tech Stack
React (Functional Components)
JavaScript (ES6+)
Inline CSS (for simplicity and speed)

## How to Run
Create a React app:
npx create-react-app team-status-app
cd team-status-app
Add the component:
Place TeamStatus.jsx inside the src folder
Update App.js:
import TeamStatus from "./TeamStatus";

function App() {
  return <TeamStatus />;
}

export default App;
Run the project:
npm start
Open in browser:
http://localhost:3000

## Future Improvements
Connect to a real backend (Node.js + Express)
Persist status updates using APIs
Add leave calendar view for better planning
Handle edge cases (half-day leaves, overlaps)
Add unit tests for filtering and logic

## Notes

This project focuses on user experience and clarity, rather than building a full production system. The aim was to simulate a real-world feature using simple and scalable architecture.
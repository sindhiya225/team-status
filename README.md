## Team Status & Availability Dashboard

### Overview
This project is a Manager-focused feature from a Human Resource Information System (HRIS). It helps managers quickly understand team availability and take actions without navigating through multiple pages.

The goal was to design and build a simple, clean interface that answers the most important question:
“Who is available today?”

--- 
 
### Features
View all team members with their current status (Active / WFH / On Leave)
Quick status updates using inline actions
Real-time coverage indicator based on availability
Search by name or role
Filter by status (All, Active, WFH, On Leave)
Summary cards showing team distribution
Toast feedback for status updates

---

### Design Thinking

This feature was designed based on the Manager persona from the HRIS dashboard.

Focused on at-a-glance visibility of team availability
Reduced navigation by enabling inline actions
Used hover interactions to keep UI clean and uncluttered
Prioritized clarity over complexity

---

### Tech Stack
React (Functional Components)
JavaScript (ES6+)
Inline CSS (for simplicity and speed)

---

### Screenshots

**Dashboard**:

<img width="1890" height="845" alt="Screenshot 2026-04-01 223624" src="https://github.com/user-attachments/assets/627c607c-18d4-42e6-a401-cae56044857a" />

**Updating Status** :

<img width="1792" height="361" alt="Screenshot 2026-04-01 223655" src="https://github.com/user-attachments/assets/6856b92c-7fcc-4c77-a720-0b196b92af61" />

**Filters** :

<img width="1834" height="692" alt="Screenshot 2026-04-01 223710" src="https://github.com/user-attachments/assets/a0a443b9-c060-469f-a8d5-110b3eb77832" />

**Search for Roles and Names** :

<img width="1843" height="432" alt="Screenshot 2026-04-01 223729" src="https://github.com/user-attachments/assets/c6825e43-7070-414b-b948-00cb30475150" />

---

### How to Run

1. Create a React app:

```bash
npx create-react-app team-status-app
cd team-status-app
```

2. Add the component:
Place TeamStatus.jsx inside the src folder

3. Update App.js:

```bash
import TeamStatus from "./TeamStatus";

function App() {
  return <TeamStatus />;
}

export default App;
```

4. Run the project:

```bash
npm start
Open in browser:
http://localhost:3000
```

---

### Future Improvements
Connect to a real backend (Node.js + Express)
Persist status updates using APIs
Add leave calendar view for better planning
Handle edge cases (half-day leaves, overlaps)
Add unit tests for filtering and logic

---

### Notes

This project focuses on user experience and clarity, rather than building a full production system. The aim was to simulate a real-world feature using simple and scalable architecture.

---

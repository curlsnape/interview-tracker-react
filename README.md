# Interview Practice Tracker

A responsive dashboard to track weekly interview preparation (DSA, Git, Technical questions and the machine-coding task). Built with React and Vite. No backend.

## Setup
```bash
npm install
npm run dev      # start dev server
npm run build    # production build in /dist
```

## Features
- Dashboard: total questions, completed DSA, completed interview questions, machine-coding status
- Add questions with category (DSA / Git / Technical), difficulty and status
- Change a question's status or delete it
- Search, plus filters for category, status and difficulty
- Progress bar showing the percentage of completed questions
- Data saved in LocalStorage, so it survives a refresh
- Empty state, no-results state and form validation (min 3 characters, no duplicates)
- Responsive layout for desktop and mobile

## Assumptions
- Progress % = completed questions / total questions.
- "Interview questions completed" counts completed Git and Technical questions.
- Machine-coding status is a single dropdown saved separately from the question list.

## Structure
- `src/App.jsx` - state, LocalStorage, filtering
- `src/components/Dashboard.jsx` - stats and progress bar
- `src/components/AddForm.jsx` - add form and validation
- `src/components/QuestionItem.jsx` - one row in the list
- `src/constants.js` - category, difficulty and status options

## Deploy
Vercel or Netlify: build command `npm run build`, output directory `dist`.

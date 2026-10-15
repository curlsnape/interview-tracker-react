import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard.jsx";
import AddForm from "./components/AddForm.jsx";
import QuestionItem from "./components/QuestionItem.jsx";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "./constants.js";

const STORAGE_KEY = "interviewTracker";
const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

export default function App() {
  const [questions, setQuestions] = useState(saved.questions || []);
  const [machineStatus, setMachineStatus] = useState(
    saved.machineStatus || "Pending",
  );
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    status: "All",
    difficulty: "All",
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ questions, machineStatus }),
    );
  }, [questions, machineStatus]);

  const addQuestion = (question) => setQuestions([question, ...questions]);

  const changeStatus = (id, status) =>
    setQuestions(questions.map((q) => (q.id === id ? { ...q, status } : q)));

  const deleteQuestion = (id) =>
    setQuestions(questions.filter((q) => q.id !== id));

  const updateFilter = (event) =>
    setFilters({ ...filters, [event.target.name]: event.target.value });

  const visible = questions.filter(
    (q) =>
      q.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.category === "All" || q.category === filters.category) &&
      (filters.status === "All" || q.status === filters.status) &&
      (filters.difficulty === "All" || q.difficulty === filters.difficulty),
  );

  let message = "";
  if (questions.length === 0)
    message = "No questions yet. Add your first question above.";
  else if (visible.length === 0)
    message = "No questions match your search or filters.";

  return (
    <main className="mx-auto font-[geist] max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="m-0 text-3xl font-bold text-slate-900">
        Interview Practice Tracker
      </h1>
      <p className="mb-6 mt-1 text-slate-600">
        Track this week's interview preparation in one place.
      </p>

      <Dashboard
        questions={questions}
        machineStatus={machineStatus}
        onMachineChange={setMachineStatus}
      />

      <AddForm questions={questions} onAdd={addQuestion} />

      <section className="mb-3 mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <input
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-700"
          name="search"
          type="search"
          placeholder="Search questions"
          aria-label="Search"
          value={filters.search}
          onChange={updateFilter}
        />
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-700"
          name="category"
          aria-label="Filter by category"
          value={filters.category}
          onChange={updateFilter}
        >
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-700"
          name="status"
          aria-label="Filter by status"
          value={filters.status}
          onChange={updateFilter}
        >
          <option value="All">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-700"
          name="difficulty"
          aria-label="Filter by difficulty"
          value={filters.difficulty}
          onChange={updateFilter}
        >
          <option value="All">All difficulties</option>
          {DIFFICULTIES.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </section>

      <ul className="m-0 grid list-none gap-2 p-0">
        {visible.map((q) => (
          <QuestionItem
            key={q.id}
            question={q}
            onStatusChange={changeStatus}
            onDelete={deleteQuestion}
          />
        ))}
      </ul>
      {message && <p className="py-6 text-center text-slate-600">{message}</p>}
    </main>
  );
}

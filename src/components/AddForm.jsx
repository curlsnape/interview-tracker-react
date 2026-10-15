import { useState } from "react";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "../constants.js";

export default function AddForm({ questions, onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("DSA");
  const [difficulty, setDifficulty] = useState("Easy");
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanTitle = title.trim();

    if (cleanTitle.length < 3) {
      setError("Enter a question title with at least 3 characters.");
      return;
    }
    if (
      questions.some((q) => q.title.toLowerCase() === cleanTitle.toLowerCase())
    ) {
      setError("This question is already in your list.");
      return;
    }

    onAdd({ id: Date.now(), title: cleanTitle, category, difficulty, status });
    setTitle("");
    setError("");
  };

  return (
    <form
      className="grid gap-2.5 rounded-lg border border-slate-200 bg-white p-4"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="mb-0.5 text-lg font-semibold text-slate-900">
        Add a question
      </h2>
      <input
        className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-700"
        type="text"
        placeholder="e.g. Two Sum (LC 1)"
        aria-label="Question title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-700"
          aria-label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-700"
          aria-label="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          {DIFFICULTIES.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-700"
          aria-label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <p className="m-0 min-h-5 text-sm text-red-700" role="alert">
        {error}
      </p>
      <button
        className="w-fit cursor-pointer rounded-lg border border-teal-700 bg-teal-700 px-3 py-2.5 font-medium text-white hover:border-teal-800 hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-700"
        type="submit"
      >
        Add question
      </button>
    </form>
  );
}

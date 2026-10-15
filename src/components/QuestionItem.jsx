import { STATUSES } from "../constants.js";

export default function QuestionItem({ question, onStatusChange, onDelete }) {
  return (
    <li
      className={`flex flex-col items-stretch justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center ${question.status === "Completed" ? "[&_.question-title]:text-slate-500 [&_.question-title]:line-through" : ""}`}
    >
      <div>
        <div className="question-title font-semibold text-slate-900">
          {question.title}
        </div>
        <div className="mt-0.5 text-sm text-slate-600">
          {question.category} &middot; {question.difficulty}
        </div>
      </div>
      <div className="flex gap-2">
        <select
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-700 sm:flex-none"
          value={question.status}
          onChange={(e) => onStatusChange(question.id, e.target.value)}
          aria-label="Change status"
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button
          className="cursor-pointer rounded-lg border border-red-200 bg-white px-3 py-2.5 text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-700"
          onClick={() => onDelete(question.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

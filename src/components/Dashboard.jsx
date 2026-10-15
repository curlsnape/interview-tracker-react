import { STATUSES } from "../constants.js";

export default function Dashboard({
  questions,
  machineStatus,
  onMachineChange,
}) {
  const completed = questions.filter((q) => q.status === "Completed");
  const dsaDone = completed.filter((q) => q.category === "DSA").length;
  const interviewDone = completed.filter((q) => q.category !== "DSA").length;
  const percent = questions.length
    ? Math.round((completed.length / questions.length) * 100)
    : 0;

  return (
    <>
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <strong className="block text-3xl font-bold text-slate-900">
            {questions.length}
          </strong>
          <p className="mt-1 text-sm text-slate-600">Total questions</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <strong className="block text-3xl font-bold text-slate-900">
            {dsaDone}
          </strong>
          <p className="mt-1 text-sm text-slate-600">DSA completed</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <strong className="block text-3xl font-bold text-slate-900">
            {interviewDone}
          </strong>
          <p className="mt-1 text-sm text-slate-600">
            Interview questions completed
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <select
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-700"
            value={machineStatus}
            onChange={(e) => onMachineChange(e.target.value)}
            aria-label="Machine coding status"
          >
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <p className="mt-1 text-sm text-slate-600">Machine coding</p>
        </div>
      </section>

      <section className="my-6">
        <div className="mb-1.5 flex justify-between">
          <span>Overall progress</span>
          <strong>{percent}%</strong>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-teal-700 transition-[width] duration-300"
            style={{ width: percent + "%" }}
          />
        </div>
      </section>
    </>
  );
}

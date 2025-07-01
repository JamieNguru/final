'use client';

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 bg-indigo-50 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Navigation</h2>
      <ul className="space-y-3">
        <li>
          <a href="/jobs" className="text-indigo-600 hover:text-indigo-800">
            Browse Jobs
          </a>
        </li>
        <li>
          <a href="/workers" className="text-indigo-600 hover:text-indigo-800">
            Workers Directory
          </a>
        </li>
        <li>
          <a href="/employers" className="text-indigo-600 hover:text-indigo-800">
            Employers
          </a>
        </li>
      </ul>
    </aside>
  );
}

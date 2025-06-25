// pages/Post.js
'use client';

import { useState } from 'react';

export default function Post() {
  const [hasScreening, setHasScreening] = useState(false);

  return (
    <form className="space-y-8 min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Post a New Job</h1>
        <p className="text-black mb-6">
          Fill out the form below to post your job opening. All fields marked with * are required.
        </p>

        <section className="bg-white p-6 rounded-lg shadow border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Job Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border border-blue-300 p-2 rounded" type="text" placeholder="e.g. Senior Software Engineer" required />
            <input className="border border-blue-300 p-2 rounded" type="text" placeholder="e.g. San Francisco, CA or Remote" required />

            <select className="border border-blue-300 p-2 rounded" required>
              <option value="">Select job type</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Contract</option>
            </select>

            <select className="border border-blue-300 p-2 rounded" required>
              <option value="">Select experience level</option>
              <option>Entry</option>
              <option>Mid</option>
              <option>Senior</option>
            </select>

            <input className="border border-blue-300 p-2 rounded" type="number" placeholder="e.g. 50000" />
            <input className="border border-blue-300 p-2 rounded" type="number" placeholder="e.g. 80000" />
          </div>

          <div className="mt-4">
            <label className="block font-semibold text-blue-800 mb-2">Remote Work Options *</label>
            <div className="flex gap-6 text-blue-700">
              <label><input type="radio" name="remote" required /> On-site only</label>
              <label><input type="radio" name="remote" /> Hybrid</label>
              <label><input type="radio" name="remote" /> Remote only</label>
            </div>
          </div>

          <textarea className="border border-blue-300 p-2 rounded w-full mt-4" rows="4" placeholder="Describe the role, responsibilities, and ideal candidate" required></textarea>
          <textarea className="border border-blue-300 p-2 rounded w-full mt-4" rows="4" placeholder="List the skills, qualifications, and experience required" required></textarea>
        </section>

        <section className="bg-white p-6 rounded-lg shadow border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Application Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border border-blue-300 p-2 rounded" type="email" placeholder="Where applications will be sent" required />
            <input className="border border-blue-300 p-2 rounded" type="url" placeholder="External application form URL (optional)" />
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2 text-blue-700">
              <input
                type="checkbox"
                onChange={(e) => setHasScreening(e.target.checked)}
              />
              Include a screening question for applicants
            </label>

            {hasScreening && (
              <input
                className="border border-blue-300 p-2 rounded w-full mt-2"
                type="text"
                placeholder="e.g. How many years of experience do you have with React?"
              />
            )}
          </div>

          <div className="mt-4 space-y-2 text-blue-700">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Require resume upload
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Require cover letter
            </label>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="font-semibold text-blue-800">Total: <span className="text-black">$199.00</span></p>
            <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
              Save as Draft
            </button>
          </div>
        </section>
      </div>
    </form>
  );
}

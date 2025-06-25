'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from 'src\app\components\layouts\Layout.js';

export default function EmployerProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchEmployer = async () => {
      try {
        const res = await fetch(`/api/employers/${id}`);
        const data = await res.json();
        setEmployer(data);
      } catch (err) {
        console.error('Failed to fetch employer:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployer();
  }, [id]);

  if (loading) {
    return (
      <Layout title="Employer Profile">
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!employer) {
    return (
      <Layout title="Employer Profile">
        <div className="text-center py-20">
          <p className="text-lg text-gray-600">Employer not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Employer: ${employer.name}`}>
      <div className="max-w-4xl mx-auto bg-white shadow p-6 mt-8 rounded">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 h-20 w-20 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
            {employer.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-600">{employer.name}</h1>
            <p className="text-gray-600">{employer.company}</p>
            <p className="text-gray-500 text-sm">{employer.location}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">About</h2>
          <p className="text-gray-700 text-sm">{employer.bio || 'No bio provided.'}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Posted Jobs</h2>
          {employer.jobs?.length ? (
            <ul className="list-disc pl-5 space-y-2">
              {employer.jobs.map((job, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {job.title} - {job.location} ({job.type})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No jobs posted yet.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

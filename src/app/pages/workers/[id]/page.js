'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from 'src\app\components\layouts\Layout.js';

export default function WorkerProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchWorker = async () => {
      try {
        const res = await fetch(`/api/workers/${id}`);
        const data = await res.json();
        setWorker(data);
      } catch (err) {
        console.error('Failed to fetch worker:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();
  }, [id]);

  if (loading) {
    return (
      <Layout title="Worker Profile">
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!worker) {
    return (
      <Layout title="Worker Profile">
        <div className="text-center py-20">
          <p className="text-lg text-gray-600">Worker not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Worker: ${worker.name}`}>
      <div className="max-w-4xl mx-auto bg-white shadow p-6 mt-8 rounded">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 h-20 w-20 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
            {worker.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-600">{worker.name}</h1>
            <p className="text-gray-600">{worker.title || 'Skilled Professional'}</p>
            <p className="text-gray-500 text-sm">{worker.location}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Bio</h2>
          <p className="text-gray-700 text-sm">{worker.bio || 'No bio provided.'}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Skills</h2>
          {worker.skills?.length ? (
            <div className="flex flex-wrap gap-2">
              {worker.skills.map((skill, index) => (
                <span key={index} className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No skills listed.</p>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Certifications</h2>
          {worker.certifications?.length ? (
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {worker.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No certifications listed.</p>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Job History</h2>
          {worker.jobHistory?.length ? (
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              {worker.jobHistory.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No job history available.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

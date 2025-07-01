'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '../../../components/layouts/Layout';

export default function WorkerProfilePage() {
  const router = useRouter();
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!id) return;

    const fetchWorker = async () => {
      try {
        const res = await fetch(`/api/workers/${id}`);
        if (!res.ok) {
          setWorker(null);
        } else {
          const data = await res.json();
          setWorker(data);
        }
      } catch (error) {
        console.error('Error fetching worker:', error);
        setWorker(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();
  }, [id]);

  if (loading) {
    return (
      <Layout title="Worker Profile">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-indigo-600 rounded-full"></div>
        </div>
      </Layout>
    );
  }

  if (!worker) {
    return (
      <Layout title="Worker Profile">
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">
            Worker Not Found
          </h2>
          <button
            onClick={() => router.back()}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${worker.name} | Profile`}>
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-700">
              {worker.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-indigo-800">{worker.name}</h1>
              <p className="text-gray-700">{worker.title || 'Skilled Professional'}</p>
              <p className="text-gray-500 text-sm">{worker.location || 'Location not specified'}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 border-b border-gray-200">
            <nav className="flex space-x-6">
              {['overview', 'skills', 'experience'].map(tab => (
                <button
                  key={tab}
                  className={`py-2 border-b-2 font-medium capitalize ${
                    activeTab === tab
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-lg font-semibold text-indigo-700 mb-2">About {worker.name}</h2>
                <p className="text-gray-700">
                  {worker.bio || <span className="text-gray-400 italic">No bio provided.</span>}
                </p>
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                <h2 className="text-lg font-semibold text-indigo-700 mb-2">Skills</h2>
                {worker.skills?.length ? (
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {worker.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 italic">No skills listed.</p>
                )}
              </div>
            )}

            {activeTab === 'experience' && (
              <div>
                <h2 className="text-lg font-semibold text-indigo-700 mb-2">Experience</h2>
                {worker.experiences?.length ? (
                  worker.experiences.map((exp, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <h3 className="text-indigo-700 font-semibold">{exp.title}</h3>
                      <p className="text-sm text-gray-600">
                        {exp.company} • {exp.location} • {exp.duration}
                      </p>
                      <p className="mt-2 text-gray-700">{exp.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic">No experience listed.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}


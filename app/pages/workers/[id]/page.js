'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Layout from '../../../components/layouts/Layout';

export default function WorkerProfile({ params }) {
  const router = useRouter();
  const id = params.id;
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!id) return;

    const fetchWorker = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/workers/${id}`);
        if (!res.ok) {
          setWorker(null);
        } else {
          const data = await res.json();
          setWorker(data);
        }
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
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  if (!worker) {
    return (
      <Layout title="Worker Profile">
        <div className="text-center py-20">
          <div className="mx-auto w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-indigo-900 mb-2">Worker Not Found</h3>
          <p className="text-indigo-600 max-w-md mx-auto">
            We couldn't find the worker profile you're looking for.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${worker.name} | Professional Profile`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="bg-white/20 backdrop-blur-sm h-24 w-24 rounded-full flex items-center justify-center text-4xl font-bold shrink-0">
                {worker.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold">{worker.name}</h1>
                <p className="text-white/90 text-lg mt-1">
                  {worker.title || 'Skilled Professional'}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center text-white/80">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {worker.location || 'Location not specified'}
                  </div>
                  {worker.experience && (
                    <div className="flex items-center text-white/80">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {worker.experience} years experience
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'skills' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Skills & Certifications
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'experience' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Experience
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {/* KEEP YOUR TAB RENDERING LOGIC AS IS */}
            {/* I'm omitting your large tab code here to keep this example short, but keep all your tab sections exactly as they are in your original code. */}
          </div>

        </div>
      </div>
    </Layout>
  );
}


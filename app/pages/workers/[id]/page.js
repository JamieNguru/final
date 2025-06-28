'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function WorkerProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!id) return;

    const fetchWorker = async () => {
      try {
        setLoading(true);
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
          <p className="text-indigo-600 max-w-md mx-auto">We couldn't find the worker profile you're looking for.</p>
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
                {worker.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold">{worker.name}</h1>
                <p className="text-white/90 text-lg mt-1">{worker.title || 'Skilled Professional'}</p>
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
            {activeTab === 'overview' ? (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-indigo-800 mb-4">Professional Profile</h3>
                <p className="text-gray-700 leading-relaxed">
                  {worker.bio || (
                    <span className="text-gray-400 italic">No professional bio provided.</span>
                  )}
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-indigo-500 uppercase tracking-wider mb-2">Contact Information</h4>
                    <div className="space-y-2">
                      <p className="flex items-center text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {worker.email || 'Not provided'}
                      </p>
                      <p className="flex items-center text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {worker.phone || 'Not provided'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-indigo-500 uppercase tracking-wider mb-2">Professional Details</h4>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Availability:</span> {worker.availability || 'Not specified'}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Preferred Work:</span> {worker.preferredWork || 'Not specified'}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Hourly Rate:</span> {worker.hourlyRate ? `$${worker.hourlyRate}/hr` : 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'skills' ? (
              <div>
                <h3 className="text-xl font-semibold text-indigo-800 mb-6">Skills & Certifications</h3>
                
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Core Skills</h4>
                  {worker.skills?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {worker.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1.5 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
                      <p className="text-gray-500">No skills listed</p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Certifications</h4>
                  {worker.certifications?.length ? (
                    <div className="space-y-3">
                      {worker.certifications.map((cert, index) => (
                        <div key={index} className="flex items-start border-b border-gray-100 pb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="text-gray-800 font-medium">{cert}</p>
                            {worker.certificationDates?.[index] && (
                              <p className="text-sm text-gray-500 mt-1">
                                Earned: {new Date(worker.certificationDates[index]).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
                      <p className="text-gray-500">No certifications listed</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-indigo-800 mb-6">Professional Experience</h3>
                
                {worker.jobHistory?.length ? (
                  <div className="space-y-6">
                    {worker.jobHistory.map((job, index) => (
                      <div key={index} className="border-l-4 border-indigo-200 pl-4 py-1">
                        <h4 className="text-lg font-semibold text-gray-800">{job.title || 'Professional Role'}</h4>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                          {job.company && <span>{job.company}</span>}
                          {job.duration && <span>{job.duration}</span>}
                          {job.location && (
                            <span className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {job.location}
                            </span>
                          )}
                        </div>
                        {job.description && (
                          <p className="mt-2 text-gray-700">{job.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h4 className="mt-4 text-lg font-medium text-gray-700">No experience listed</h4>
                    <p className="mt-1 text-gray-500">This professional hasn't added their work history yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

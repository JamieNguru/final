'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Layout from '../../../components/layouts/Layout';

export default function EmployerProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    if (!id) return;

    const fetchEmployer = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/employers/${id}`);

        if (!res.ok) {
          console.error('API returned error:', res.status, res.statusText);
          const text = await res.text();
          console.error('Response text:', text);
          setEmployer(null);
          return;
        }

        const data = await res.json();
        setEmployer(data);
      } catch (err) {
        console.error('Failed to fetch employer:', err);
        setEmployer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployer();
  }, [id]);

  if (loading) {
    return (
      <Layout title="Employer Profile">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  if (!employer) {
    return (
      <Layout title="Employer Profile">
        <div className="text-center py-20">
          <div className="mx-auto w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-indigo-900 mb-2">Employer Not Found</h3>
          <p className="text-indigo-600 max-w-md mx-auto">We couldn't find the employer you're looking for.</p>
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
    <Layout title={`${employer.name} | ${employer.company}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1 bg-white rounded-xl shadow p-6 h-fit">
            <h3 className="text-lg font-bold text-indigo-700 mb-4">Navigation</h3>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('about')}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'about'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-indigo-50'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'jobs'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-indigo-50'
                }`}
              >
                Posted Jobs ({employer.jobs?.length || 0})
              </button>
              <button
                onClick={() => router.back()}
                className="block w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50"
              >
                Go Back
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3 bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-indigo-700 to-blue-700 p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="bg-white/20 backdrop-blur-sm h-24 w-24 rounded-full flex items-center justify-center text-4xl font-bold shrink-0">
                  {employer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{employer.name}</h1>
                  <p className="text-white/90 text-lg mt-1">{employer.company}</p>
                  <div className="flex items-center mt-2 text-white/80">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {employer.location || 'Location not specified'}
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8">
              {activeTab === 'about' ? (
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-4">About {employer.name}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {employer.bio || (
                      <span className="text-gray-400 italic">No bio information provided.</span>
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
                          {employer.email || 'Not provided'}
                        </p>
                        <p className="flex items-center text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {employer.phone || 'Not provided'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold text-indigo-500 uppercase tracking-wider mb-2">Company Details</h4>
                      <div className="space-y-2">
                        <p className="text-gray-700">
                          <span className="font-medium">Industry:</span> {employer.industry || 'Not specified'}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Company Size:</span> {employer.companySize || 'Not specified'}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Founded:</span> {employer.foundedYear || 'Not specified'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-indigo-800 mb-6">Posted Jobs</h3>
                  {employer.jobs?.length ? (
                    <div className="space-y-4">
                      {employer.jobs.map((job, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-indigo-200 hover:shadow-md transition-all duration-300">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-semibold text-indigo-700">{job.title}</h4>
                              <div className="flex items-center mt-1 text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.location} • {job.type}
                              </div>
                              <p className="mt-2 text-gray-700 text-sm line-clamp-2">{job.description}</p>
                            </div>
                            <button
                              onClick={() => router.push(`/jobs/${job.id}`)}
                              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors duration-300"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                      <h4 className="mt-4 text-lg font-medium text-gray-700">No jobs posted yet</h4>
                      <p className="mt-1 text-gray-500">This employer hasn't posted any job opportunities.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}


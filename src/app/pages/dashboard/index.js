import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Layout from '../../../components/layout/Layout';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Please login to view your dashboard</h3>
          <button
            onClick={() => router.push('/auth/login')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Login
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}</h1>
          <p className="mt-2 text-gray-600">
            Here's your personalized dashboard
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Your Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-indigo-800">Profile Completeness</h3>
                <p className="mt-1 text-2xl font-semibold text-indigo-600">75%</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-800">
                  {user.role === 'worker' ? 'Applications' : 'Job Posts'}
                </h3>
                <p className="mt-1 text-2xl font-semibold text-green-600">
                  {user.role === 'worker' ? '12' : '5'}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800">Messages</h3>
                <p className="mt-1 text-2xl font-semibold text-blue-600">3</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => router.push(user.role === 'worker' ? '/jobs' : '/jobs/post')}
                  className="bg-white border border-indigo-300 text-indigo-700 px-4 py-3 rounded-md text-sm font-medium hover:bg-indigo-50"
                >
                  {user.role === 'worker' ? 'Browse Jobs' : 'Post a Job'}
                </button>
                <button
                  onClick={() => router.push('/dashboard/settings')}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
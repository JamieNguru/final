import Link from 'next/link';

const Navbar = () => {
  const user = null; // Replace with actual user state management logic
  const logout = () => {
    // Implement logout logic here, e.g., clear user session, redirect to login page
    console.log('User logged out');
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">Kazilink</h1>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/pages/jobs/index" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Jobs
              </Link>
              <Link href="/pages/workers/index" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Workers
              </Link>
              <Link href="/pages/employers/index" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Employers
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 text-sm font-medium">
                  Dashboard
                </Link>
                <button onClick={logout} className="text-gray-700 hover:text-indigo-600 text-sm font-medium">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login" className="text-gray-700 hover:text-indigo-600 text-sm font-medium">
                  Login
                </Link>
                <Link href="/pages/role-selection" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
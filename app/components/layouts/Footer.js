import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Kazilink</h3>
            <p className="text-gray-300">
              Connecting talent with opportunity for a better working world.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Workers</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Create your profile and showcase your skills</li>
              <li className="text-gray-300">Apply for jobs that match your expertise</li>
              <li className="text-gray-300">Connect with reliable employers</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Post job opportunities for free</li>
              <li className="text-gray-300">Browse skilled worker profiles</li>
              <li className="text-gray-300">Hire trusted talent from your community</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/pages/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/pages/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link href="/pages/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Kazilink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



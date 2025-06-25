'use client';

import RoleCard from '@/app/pages/Rolecard/page'; // Keeping your original import path
import { Briefcase, Users } from 'lucide-react';

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-8">
          Choose Your Role
        </h1>
        <p className="text-black mb-12 text-lg">
          Select whether you're looking for work or seeking to hire.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RoleCard
            role="Worker"
            description="Find jobs near you and get hired fast."
            icon={Briefcase}
            redirectTo="/pages/WorkerRegistration"
          />
          <RoleCard
            role="Employer"
            description="Post jobs and connect with reliable workers."
            icon={Users}
            redirectTo="/pages/EmployerRegistration"
          />
        </div>
      </div>
    </div>
  );
}



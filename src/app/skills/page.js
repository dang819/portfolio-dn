import SkillsTable from '../../components/SkillsTable';
import Link from 'next/link';
import { HomeIcon } from 'lucide-react';

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Floating Button */}
      <Link href="/?from=internal">
        <button className="fixed top-6 left-6 z-50 px-4 py-2 bg-[#0c6bb8] hover:bg-blue-700 text-white rounded-lg flex items-center cursor-pointer shadow-lg">
          <HomeIcon size={24} className="text-white md:mr-2" />
          <span className='hidden md:block'>Back to Home</span>
        </button>
      </Link>

      <SkillsTable />
    </div>
  );
}

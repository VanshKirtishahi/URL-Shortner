import { useState } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import CreateLinkForm from '../features/links/components/CreateLinkForm';
import LinkList from '../features/links/components/LinkList';
import NeoButton from '../shared/components/NeoButton';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLinkCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] font-satoshi selection:bg-neo-yellow selection:text-black pb-20">
      
      {/* Full-width Header */}
      <header className="bg-neo-yellow border-b-2 border-black px-6 lg:px-12 py-4 flex justify-between items-center sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
          <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
            <Zap className="text-neo-yellow w-6 h-6" fill="currentColor" />
          </div>
          <span className="font-cabinet font-extrabold text-2xl hidden sm:block">ShortLink.</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <p className="font-bold text-sm hidden md:block border-2 border-black bg-white px-3 py-1 rounded-full shadow-[2px_2px_0_0_#000]">
            Logged in as {user?.name || 'Developer'}
          </p>
          <NeoButton onClick={logout} variant="secondary" className="py-2 px-4 text-sm">
            Sign Out
          </NeoButton>
        </div>
      </header>

      {/* Main Content constraints */}
      <main className="max-w-4xl mx-auto mt-12 px-4 sm:px-6 flex flex-col gap-12">
        <section>
          <CreateLinkForm onLinkCreated={handleLinkCreated} />
        </section>

        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="font-cabinet font-extrabold text-4xl">Your Links</h2>
          </div>
          <LinkList refreshTrigger={refreshTrigger} />
        </section>
      </main>

    </div>
  );
}
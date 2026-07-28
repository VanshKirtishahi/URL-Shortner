import { useState, useEffect } from 'react';
import { fetchUserLinks } from '../api/linkApi';
import LinkCard from './LinkCard';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 } 
  }
};

export default function LinkList({ refreshTrigger }) {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLinks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchUserLinks();
        setLinks(response?.data || []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load links.');
      } finally {
        setIsLoading(false);
      }
    };

    loadLinks();
  }, [refreshTrigger]);

  const handleStatusChange = (linkId, newStatus) => {
    setLinks(prevLinks => 
      prevLinks.map(link => 
        link._id === linkId ? { ...link, isActive: newStatus } : link
      )
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white border-2 border-black rounded-xl p-10 text-center shadow-hard animate-pulse">
        <p className="font-cabinet font-extrabold text-2xl">Fetching records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-200 border-2 border-black text-red-900 font-bold p-6 rounded-xl shadow-hard">
        {error}
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="bg-neo-yellow border-2 border-black rounded-xl p-10 text-center shadow-hard-lg">
        <p className="font-cabinet font-extrabold text-3xl mb-3">No active links found.</p>
        <p className="font-medium text-black/70 bg-white border-2 border-black inline-block px-4 py-2 shadow-[2px_2px_0_0_#000]">
          Create your first shortened URL above to start tracking analytics.
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
    >
      {links.map((link) => (
        <LinkCard 
          key={link?._id} 
          link={link} 
          onStatusChange={handleStatusChange} 
        />
      ))}
    </motion.div>
  );
}
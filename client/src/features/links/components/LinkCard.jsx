import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toggleLinkStatus } from '../api/linkApi';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function LinkCard({ link, onStatusChange }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const baseUrl = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:5000';
  const shortUrl = `${baseUrl}/${link?.shortCode}`;

  const handleCopy = async () => {
    if (!link?.shortCode) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleToggleStatus = async () => {
    if (!link?._id) return;
    setIsUpdating(true);
    try {
      const response = await toggleLinkStatus(link._id);
      onStatusChange?.(link._id, response.isActive);
    } catch (error) {
      console.error('Failed to toggle status', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!link) return null;

  const cardStyle = link.isActive 
    ? "bg-white border-2 border-black shadow-hard hover:-translate-y-1 hover:shadow-hard-lg"
    : "bg-gray-200 border-2 border-dashed border-gray-500 opacity-80";

  return (
    <motion.div 
      variants={itemVariants}
      layout 
      className={`p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-300 ${cardStyle}`}
    >
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-3 mb-2">
          <p className="font-cabinet font-extrabold text-2xl truncate">
            {shortUrl}
          </p>
          {!link.isActive && (
            <span className="bg-red-200 text-red-900 border-2 border-black px-2 py-0.5 rounded font-bold text-xs uppercase shadow-[2px_2px_0_0_#000]">
              Paused
            </span>
          )}
        </div>
        <p className="text-gray-600 font-medium text-sm truncate max-w-lg bg-gray-100 p-1 border border-black/20 inline-block rounded">
          {link.originalUrl}
        </p>
        <div className="flex items-center gap-4 mt-4 font-bold text-sm">
          <span className="bg-neo-yellow border-2 border-black px-2 py-1 rounded shadow-[2px_2px_0_0_#000]">
            {link.clickCount || 0} Clicks
          </span>
          <span className="text-gray-500">
            Created {new Date(link.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <button
          onClick={handleCopy}
          className="flex-1 md:flex-none border-2 border-black bg-white hover:bg-gray-100 font-bold px-4 py-2 rounded-lg shadow-[2px_2px_0_0_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
        
        <Link 
          to={`/link/${link._id}`}
          className="flex-1 md:flex-none text-center border-2 border-black bg-neo-sage hover:bg-[#a6b8b3] font-bold px-4 py-2 rounded-lg shadow-[2px_2px_0_0_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
        >
          Stats
        </Link>
        
        <button
          onClick={handleToggleStatus}
          disabled={isUpdating}
          className="flex-none border-2 border-black bg-white hover:bg-gray-100 font-bold px-4 py-2 rounded-lg shadow-[2px_2px_0_0_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all disabled:opacity-50"
        >
          {link.isActive ? 'Pause' : 'Resume'}
        </button>
      </div>
    </motion.div>
  );
}
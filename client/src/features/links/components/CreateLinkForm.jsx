import { useState } from 'react';
import { createShortLink } from '../api/linkApi';
import { motion, AnimatePresence } from 'framer-motion';
import NeoButton from '../../../shared/components/NeoButton';

export default function CreateLinkForm({ onLinkCreated }) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successLink, setSuccessLink] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessLink(null);
    setIsLoading(true);

    try {
      const payload = { originalUrl };
      if (customAlias.trim()) payload.customAlias = customAlias.trim();
      if (expiresAt) payload.expiresAt = new Date(expiresAt).toISOString();

      const response = await createShortLink(payload);
      
      setSuccessLink(response.data);
      setOriginalUrl('');
      setCustomAlias('');
      setExpiresAt('');
      
      onLinkCreated?.(response.data);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Failed to generate short link.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (successLink?.shortCode) {
      const baseUrl = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:5000';
      const fullUrl = `${baseUrl}/${successLink.shortCode}`;
      navigator.clipboard.writeText(fullUrl).catch((err) => console.error(err));
    }
  };

  return (
    <div className="bg-white border-2 border-black rounded-2xl shadow-hard-xl p-6 sm:p-8 relative overflow-hidden">
      {/* Decorative corner accent */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-neo-yellow border-2 border-black rounded-full shadow-hard"></div>

      <h2 className="font-cabinet font-extrabold text-3xl mb-6 relative z-10">Create a shortlink</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
        
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-200 border-2 border-black text-red-900 font-bold p-4 rounded-xl shadow-[4px_4px_0_0_#000] overflow-hidden"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm">Destination URL *</label>
          <input 
            type="url" 
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="bg-white border-2 border-black p-4 rounded-xl font-medium outline-none focus:-translate-y-1 focus:-translate-x-1 focus:shadow-[4px_4px_0_0_#000] transition-all text-lg placeholder-gray-400"
            placeholder="https://long-domain.com/very/long/path"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm">Custom Alias (Optional)</label>
            <input 
              type="text" 
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="bg-white border-2 border-black p-4 rounded-xl font-medium outline-none focus:-translate-y-1 focus:-translate-x-1 focus:shadow-[4px_4px_0_0_#000] transition-all placeholder-gray-400"
              placeholder="my-campaign"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm">Expiration (Optional)</label>
            <input 
              type="datetime-local" 
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="bg-white border-2 border-black p-4 rounded-xl font-medium outline-none focus:-translate-y-1 focus:-translate-x-1 focus:shadow-[4px_4px_0_0_#000] transition-all"
            />
          </div>
        </div>

        <NeoButton type="submit" disabled={isLoading} variant="primary" className="self-start mt-2">
          {isLoading ? 'Encoding...' : 'Generate Link'}
        </NeoButton>
      </form>

      <AnimatePresence>
        {successLink && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 p-6 bg-neo-sage border-2 border-black rounded-xl shadow-hard flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <p className="text-sm font-bold mb-1">Your new link is ready:</p>
              <span className="font-cabinet font-extrabold text-2xl tracking-tight bg-white px-2 py-1 border-2 border-black inline-block">
                {import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:5000'}/{successLink.shortCode}
              </span>
            </div>
            <NeoButton onClick={handleCopy} variant="secondary" className="w-full sm:w-auto">
              Copy to Clipboard
            </NeoButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLinkAnalytics } from '../features/analytics/api/analyticsApi';
import ClicksOverTimeChart from '../features/analytics/components/ClicksOverTimeChart';
import ReferrerBreakdown from '../features/analytics/components/ReferrerBreakdown';
import NeoButton from '../shared/components/NeoButton';

export default function LinkDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAnalytics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchLinkAnalytics(id);
        setAnalyticsData(data);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/dashboard');
        } else {
          setError(err.response?.data?.error || 'Failed to load analytics data.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getAnalytics();
    }
  }, [id, navigate]);

  return (
    <div className="min-h-screen bg-[#f4f4f5] font-satoshi selection:bg-neo-yellow selection:text-black pb-20">
      
      {/* Header */}
      <header className="bg-neo-yellow border-b-2 border-black px-6 lg:px-12 py-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-cabinet font-extrabold text-4xl">Analytics Overview</h1>
            <p className="font-bold text-sm bg-white border-2 border-black inline-block px-3 py-1 mt-2 shadow-[2px_2px_0_0_#000]">
              ID: {id}
            </p>
          </div>
          <NeoButton onClick={() => navigate('/dashboard')} variant="secondary" className="w-max">
            &larr; Back to Dashboard
          </NeoButton>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto mt-12 px-4 sm:px-6">
        {isLoading ? (
          <div className="w-full bg-white border-2 border-black rounded-xl p-12 text-center shadow-hard-lg animate-pulse">
            <p className="font-cabinet font-extrabold text-3xl">Aggregating data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-200 border-2 border-black text-red-900 font-bold p-6 rounded-xl shadow-hard-lg">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            <div className="w-full">
              <ClicksOverTimeChart data={analyticsData?.clicksOverTime} />
            </div>
            <div className="w-full">
              <ReferrerBreakdown data={analyticsData?.referrerBreakdown} />
            </div>
          </div>
        )}
      </main>

    </div>
  );
}
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function ReferrerBreakdown({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-white border-2 border-black rounded-xl shadow-hard">
        <p className="font-bold text-gray-500">No referrer data available.</p>
      </div>
    );
  }

  return (
    <div className="h-80 w-full bg-white p-6 rounded-xl border-2 border-black shadow-hard-lg">
      <h3 className="font-cabinet font-extrabold text-2xl mb-6 border-b-2 border-black pb-2 inline-block">
        Top Referrers
      </h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart 
          data={data} 
          layout="vertical"
          margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="0" stroke="#000000" horizontal={false} />
          <XAxis 
            type="number" 
            stroke="#000000" 
            fontSize={12}
            fontWeight="bold"
            allowDecimals={false}
            axisLine={{ strokeWidth: 2 }}
          />
          <YAxis 
            dataKey="_id" 
            type="category" 
            stroke="#000000" 
            fontSize={12}
            fontWeight="bold"
            width={80}
            axisLine={{ strokeWidth: 2 }}
            tickFormatter={(val) => val === 'direct' ? 'Direct' : val}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '2px solid #000000', 
              boxShadow: '4px 4px 0px 0px #000000',
              fontWeight: 'bold'
            }}
            itemStyle={{ color: '#000000' }}
            labelStyle={{ display: 'none' }}
          />
          <Bar dataKey="count" name="Clicks" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#b7c6c2" stroke="#000000" strokeWidth={2} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
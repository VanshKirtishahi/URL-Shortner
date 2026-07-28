import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function ClicksOverTimeChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-white border-2 border-black rounded-xl shadow-hard">
        <p className="font-bold text-gray-500">No click data available for this period.</p>
      </div>
    );
  }

  const formattedData = data.map(item => {
    const date = new Date(item._id);
    return {
      ...item,
      displayDate: `${date.getMonth() + 1}/${date.getDate()}`
    };
  });

  return (
    <div className="h-80 w-full bg-white p-6 rounded-xl border-2 border-black shadow-hard-lg">
      <h3 className="font-cabinet font-extrabold text-2xl mb-6 border-b-2 border-black pb-2 inline-block">
        Traffic Over Time
      </h3>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={formattedData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="0" stroke="#000000" vertical={false} />
          <XAxis 
            dataKey="displayDate" 
            stroke="#000000" 
            fontSize={12}
            fontWeight="bold"
            tickLine={true}
            axisLine={{ strokeWidth: 2 }}
          />
          <YAxis 
            stroke="#000000" 
            fontSize={12}
            fontWeight="bold"
            tickLine={true}
            axisLine={{ strokeWidth: 2 }}
            allowDecimals={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '2px solid #000000', 
              boxShadow: '4px 4px 0px 0px #000000',
              fontWeight: 'bold'
            }}
            itemStyle={{ color: '#000000' }}
            labelStyle={{ color: '#000000', marginBottom: '4px', fontFamily: 'Cabinet Grotesk' }}
          />
          <Area 
            type="step" 
            dataKey="count" 
            name="Clicks"
            stroke="#000000" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="#ffe17c" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
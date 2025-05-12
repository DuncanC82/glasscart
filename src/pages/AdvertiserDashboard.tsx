import React from 'react';

const AdvertiserDashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Campaign Dashboard</h1>
      <div className="bg-white rounded shadow p-4">
        {/* Campaign stats: scans, conversions, revenue will go here */}
        <p className="text-gray-600">Campaign analytics and stats coming soon...</p>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;

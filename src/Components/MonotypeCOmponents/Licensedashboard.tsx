import React from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_FONT_DASHBOARD_STATS } from '../../apollo/queries';
const fallbackStats = {
  confirmedProductionFonts: { count: 500, limit: 2500 },
  activationsAndMarketIntelligence: 54066,
  uniqueFontStylesExplored: 40034,
};

type FontDashboardStats = {
  fontDashboardStats?: {
    confirmedProductionFonts: { count: number; limit: number };
    activationsAndMarketIntelligence: number;
    uniqueFontStylesExplored: number;
  };
};

const Licensedashboard = () => {
  const { loading, error, data } = useQuery<FontDashboardStats>(
    GET_FONT_DASHBOARD_STATS
  );

  const stats = data?.fontDashboardStats ?? fallbackStats;
  const isError = error || !data;

  const {
    confirmedProductionFonts,
    activationsAndMarketIntelligence,
    uniqueFontStylesExplored,
  } = stats;

  const percentUsed =
    (confirmedProductionFonts.count / confirmedProductionFonts.limit) * 100;

  return (
    <div className="p-6">
      {loading && !data ? (
        <p className="p-4">Loading dashboard...</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-3 gap-6 w-full">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">
              Confirmed production fonts
            </h3>
            <div className="text-3xl font-bold">
              {confirmedProductionFonts.count}
              <span className="text-gray-400 text-xl">
                {' '}
                of {confirmedProductionFonts.limit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${percentUsed}%` }}
              ></div>
            </div>
            <button className="mt-4 text-blue-600 font-medium hover:underline">
              View all confirmed fonts
            </button>
          </div>

          {/* Activations & M.I. Card */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">
              Activations & Market Intelligence (M.I.)
            </h3>
            <div className="text-3xl font-bold">
              {activationsAndMarketIntelligence.toLocaleString()}
              <span className="text-gray-400 text-sm ml-1">
                Activations & M.I.
              </span>
            </div>
            <button className="mt-6 text-blue-600 font-medium hover:underline">
              View fonts for review
            </button>
          </div>

          {/* Font Styles Explored Card */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">
              Unique font styles explored
            </h3>
            <div className="text-3xl font-bold">
              {uniqueFontStylesExplored.toLocaleString()}
              <span className="text-gray-400 text-sm ml-1">Styles</span>
            </div>
            <button className="mt-6 text-blue-600 font-medium hover:underline">
              View fonts for review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Licensedashboard;

import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Award, Activity, MapPin, Calendar } from 'lucide-react';
import api from '../api/api';

const CommunityDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('month');

  useEffect(() => {
    fetchCommunityData();
  }, [timeframe]);

  const fetchCommunityData = async () => {
    try {
      setLoading(true);
      const [statsRes, activityRes, leaderboardRes] = await Promise.all([
        api.get('/community/stats'),
        api.get('/community/recent-activity?limit=10'),
        api.get(`/community/leaderboard?timeframe=${timeframe}`)
      ]);
      
      setStats(statsRes.data);
      setRecentActivity(activityRes.data);
      setLeaderboard(leaderboardRes.data);
    } catch (error) {
      console.error('Failed to fetch community data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatActivityType = (type) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getActivityIcon = (type) => {
    const icons = {
      'beach_cleanup': '🏖️',
      'plastic_reduction': '♻️',
      'sustainable_seafood': '🐟',
      'water_conservation': '💧',
      'wildlife_protection': '🐢',
      'ocean_education': '📚'
    };
    return icons[type] || '🌊';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Community Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Users className="mr-3 text-blue-500" size={28} />
          Community Impact
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Members</p>
                <p className="text-2xl font-bold text-blue-800">{stats?.total_users || 0}</p>
              </div>
              <Users className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Total Actions</p>
                <p className="text-2xl font-bold text-green-800">{stats?.total_checkins || 0}</p>
              </div>
              <Activity className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Impact Score</p>
                <p className="text-2xl font-bold text-purple-800">{stats?.total_impact_score || 0}</p>
              </div>
              <TrendingUp className="text-purple-500" size={24} />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">This Week</p>
                <p className="text-2xl font-bold text-orange-800">{stats?.recent_weekly_checkins || 0}</p>
              </div>
              <Calendar className="text-orange-500" size={24} />
            </div>
          </div>
        </div>

        {/* activities */}
        {stats?.activity_breakdown && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Activity Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(stats.activity_breakdown).map(([type, count]) => (
                <div key={type} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl mr-3">{getActivityIcon(type)}</span>
                  <div>
                    <p className="font-medium text-gray-800">{formatActivityType(type)}</p>
                    <p className="text-sm text-gray-600">{count} actions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* leaderboard */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <Award className="mr-2 text-yellow-500" size={24} />
              Top Contributors
            </h3>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
          
          <div className="space-y-3">
            {leaderboard.slice(0, 5).map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    index === 2 ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    <span className="font-bold">#{user.rank}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.total_checkins} actions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{user.impact_score} pts</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* recent acvitiy */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Activity className="mr-2 text-blue-500" size={24} />
            Recent Activity
          </h3>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentActivity.map((activity, index) => (
              <div key={activity.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl mr-3">{getActivityIcon(activity.activity_type)}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.user_name}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    {new Date(activity.date).toLocaleDateString()}
                    {activity.location && (
                      <>
                        <MapPin size={12} className="ml-2 mr-1" />
                        <span>Location tracked</span>
                      </>
                    )}
                    <span className="ml-auto font-medium text-blue-600">
                      +{activity.impact_score} pts
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDashboard;
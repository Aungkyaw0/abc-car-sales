export const formatDashboardData = (rawData) => {
    return {
        stats: {
            totalRevenue: rawData.total_revenue || 0,
            revenueChange: rawData.revenue_change || 0,
            activeListings: rawData.active_listings || 0,
            listingsChange: rawData.listings_change || 0,
            totalBids: rawData.total_bids || 0,
            bidsChange: rawData.bids_change || 0,
            activeUsers: rawData.active_users || 0,
            usersChange: rawData.users_change || 0
        },
        revenueData: rawData.revenue_data?.map(item => ({
            date: new Date(item.date).toLocaleDateString('en-US', { month: 'short' }),
            revenue: item.amount
        })) || [],
        bidActivity: rawData.bid_activity?.map(item => ({
            date: new Date(item.date).toLocaleDateString('en-US', { month: 'short' }),
            count: item.count
        })) || [],
        recentListings: rawData.recent_listings || [],
        topBidders: rawData.top_bidders || []
    };
}; 
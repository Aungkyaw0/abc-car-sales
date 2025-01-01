export default function BidHistorySkeleton() {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="space-y-2">
                            <div className="h-5 w-24 bg-gray-200 rounded"></div>
                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
} 
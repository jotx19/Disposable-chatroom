const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => {
        const isUserMessage = idx % 2 === 1; // Alternate between left (even) and right (odd)
        return (
          <div
            key={idx}
            className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-center space-x-2">
              {!isUserMessage && (
                <div className="w-10 h-10 rounded-full bg-gray-900 animate-pulse"></div>
              )}
              <div>
                <div className="mb-1 h-4 w-16 bg-gray-900 animate-pulse rounded"></div>
                <div className="h-16 w-[200px] bg-gray-900 animate-pulse rounded-lg"></div>
              </div>
              {isUserMessage && (
                <div className="w-10 h-10 rounded-full bg-gray-900 animate-pulse"></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;

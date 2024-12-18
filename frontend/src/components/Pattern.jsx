const Pattern = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-center bg-base-200 p-4 w-full h-[50vh]">
      <div className="max-w-full text-center w-full h-full">
        <div className="grid grid-cols-3 gap-10 mb-8 w-full h-full">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`w-full h-full aspect-square rounded-lg bg-[#dfdcdc] ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4"></h2>
        <p className="text-base-content/60"></p>
      </div>
    </div>
  );
};

export default Pattern;

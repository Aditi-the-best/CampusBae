export function GalaxyBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base galaxy gradient */}
      <div 
        className="absolute inset-0" 
        style={{
          background: `
            radial-gradient(ellipse at top, rgba(13, 71, 161, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at bottom left, rgba(0, 191, 255, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(13, 71, 161, 0.2) 0%, transparent 50%),
            linear-gradient(180deg, #0A0F1C 0%, #0A0F1C 100%)
          `
        }}
      />
      
      {/* Animated stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <div 
              className="w-1 h-1 bg-cyan-400 rounded-full opacity-70"
              style={{
                boxShadow: '0 0 6px rgba(0, 229, 255, 0.5)'
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Larger glowing spots */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-600 rounded-full opacity-10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-400 rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
}

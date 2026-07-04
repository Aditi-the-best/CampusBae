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

      {/* Additional non-uniform radial gradients */}
      <div 
        className="absolute top-0 right-0 w-80 h-80 opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse 600px 400px at top right, rgba(13, 71, 161, 0.8) 0%, rgba(0, 191, 255, 0.4) 30%, transparent 70%)'
        }}
      />
      
      <div 
        className="absolute top-10 left-0 w-96 h-72 opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse 500px 300px at top left, rgba(0, 191, 255, 0.6) 0%, rgba(13, 71, 161, 0.3) 40%, transparent 70%)'
        }}
      />
      
      <div 
        className="absolute bottom-0 left-1/3 w-[500px] h-64 opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse 700px 350px at bottom center, rgba(13, 71, 161, 0.7) 0%, rgba(0, 191, 255, 0.2) 45%, transparent 80%)'
        }}
      />

      <div 
        className="absolute bottom-20 right-10 w-72 h-72 opacity-18 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse 400px 400px at bottom right, rgba(0, 191, 255, 0.5) 0%, rgba(13, 71, 161, 0.4) 35%, transparent 65%)'
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

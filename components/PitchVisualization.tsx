"use client"

interface PitchVisualizationProps {
  className?: string
}

export function PitchVisualization({ className = "" }: PitchVisualizationProps) {
  return (
    <div
      className={`relative ${className} bg-gradient-to-b from-emerald-900/20 to-emerald-600/20 rounded-lg overflow-hidden border border-white/10`}
    >
      {/* Stadium effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
        {/* Floodlights */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="absolute top-0 w-1 h-12 bg-white/20" style={{ left: `${25 + i * 16.66}%` }}>
            <div className="absolute bottom-0 w-12 h-12 bg-white/10 blur-xl rounded-full transform -translate-x-1/2" />
          </div>
        ))}
      </div>
      {/* Pitch lines */}
      <div className="absolute inset-8 border-2 border-white/20">
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        {/* Center line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/20" />
        {/* Penalty areas */}
        <div className="absolute top-1/4 left-0 right-3/4 bottom-1/4 border-2 border-white/20" />
        <div className="absolute top-1/4 right-0 left-3/4 bottom-1/4 border-2 border-white/20" />
      </div>
    </div>
  )
}


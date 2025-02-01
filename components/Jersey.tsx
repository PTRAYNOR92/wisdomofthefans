interface JerseyProps {
  number: number
}

export function Jersey({ number }: JerseyProps) {
  return (
    <div className="aspect-square relative">
      <div className="absolute inset-0 bg-white/10 rounded-lg flex items-center justify-center">
        <span className="text-2xl font-bold">{number}</span>
      </div>
    </div>
  )
}


export function FloatingFootballs() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {/* Add animated footballs here */}
      <div className="absolute top-10 left-10 w-8 h-8 bg-white rounded-full animate-bounce"></div>
      <div className="absolute top-20 right-20 w-8 h-8 bg-white rounded-full animate-bounce delay-1000"></div>
    </div>
  )
}


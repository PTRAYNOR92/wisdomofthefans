import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  initialRating?: number
  onRatingChange: (rating: number) => void
}

export function StarRating({ initialRating = 0, onRatingChange }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  const handleRating = (value: number) => {
    setRating(value)
    onRatingChange(value)
  }

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-8 h-8 cursor-pointer transition-colors ${
            star <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleRating(star)}
        />
      ))}
    </div>
  )
}


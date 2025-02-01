import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface AttributeSelectorProps {
  selected: string[]
  onSelect: (selected: string[]) => void
  maxSelect: number
  attributes: string[]
  label: string
}

export default function AttributeSelector({
  selected,
  onSelect,
  maxSelect,
  attributes,
  label,
}: AttributeSelectorProps) {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Ensure exactly 3 attributes are always selected, or all if less than 3 are available
    if (selected.length > 3) {
      onSelect(selected.slice(0, 3))
    } else if (selected.length < 3) {
      const additionalAttributes = attributes
        .filter((attr) => !selected.includes(attr))
        .slice(0, Math.min(3 - selected.length, attributes.length - selected.length))
      onSelect([...selected, ...additionalAttributes])
    }
  }, [selected, attributes, onSelect])

  const handleSelect = (attribute: string) => {
    if (selected.includes(attribute)) {
      // If deselecting, replace with a random unselected attribute if available
      const unselectedAttributes = attributes.filter((attr) => !selected.includes(attr))
      if (unselectedAttributes.length > 0) {
        const replacement = unselectedAttributes[Math.floor(Math.random() * unselectedAttributes.length)]
        onSelect(selected.map((attr) => (attr === attribute ? replacement : attr)))
      } else {
        // If no unselected attributes, just remove the selected one
        onSelect(selected.filter((attr) => attr !== attribute))
      }
    } else {
      // If selecting, replace the first selected attribute or add if less than 3
      if (selected.length < 3) {
        onSelect([...selected, attribute])
      } else {
        onSelect([attribute, ...selected.slice(1, 3)])
      }
    }
    setError(null)
  }

  return (
    <div className="bg-white/20 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-white">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {attributes.map((attribute) => (
          <Button
            key={attribute}
            onClick={() => handleSelect(attribute)}
            variant={selected.includes(attribute) ? "default" : "secondary"}
            className={`text-sm ${selected.includes(attribute) ? "bg-blue-500 text-white" : "bg-white/20 text-white hover:bg-white/30"}`}
          >
            {attribute}
          </Button>
        ))}
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  )
}


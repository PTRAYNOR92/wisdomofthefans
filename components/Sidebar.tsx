export function Sidebar() {
  return (
    <div className="bg-gray-800 w-64 h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Navigation</h2>
      <ul>
        <li className="mb-2">
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Home
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Teams
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Players
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Statistics
          </a>
        </li>
      </ul>
    </div>
  )
}


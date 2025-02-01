export function TeamSatisfactionTable() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-4">Team Satisfaction</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Team</th>
            <th className="text-left">Satisfaction Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Team A</td>
            <td>85%</td>
          </tr>
          <tr>
            <td>Team B</td>
            <td>72%</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  )
}


import { Radar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

interface PlayerAttributeChartProps {
  attributes: string[]
  values: number[]
}

export default function PlayerAttributeChart({ attributes, values }: PlayerAttributeChartProps) {
  const data = {
    labels: attributes,
    datasets: [
      {
        label: "Player Attributes",
        data: values,
        backgroundColor: "rgba(59, 130, 246, 0.2)", // blue-500 with opacity
        borderColor: "rgb(59, 130, 246)", // blue-500
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<"radar"> = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 10,
        pointLabels: {
          font: {
            size: 12,
          },
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: "white",
          backdropColor: "transparent",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="w-full h-[300px]">
      <Radar data={data} options={options} />
    </div>
  )
}


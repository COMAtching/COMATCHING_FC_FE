import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ data }) => {
  const chartData = {
    labels: ["열정형", "집중형", "축알못형", "축잘알형", "먹방형", "인싸형"],
    datasets: [
      {
        label: "User Stats",
        data: data,
        backgroundColor: "rgba(204, 0, 0, 1)",
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 0,
        z: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          display: false, // Hide the score labels
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          z: 2,
        },
        angleLines: {
          color: "rgba(0, 0, 0, 0.1)",
          z: 2,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend if not needed
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};

export default RadarChart;

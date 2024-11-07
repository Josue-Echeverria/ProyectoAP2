import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import "./Stats.css";

const Stats = () => {
  return (
    <div className="stats-dashboard">
      <h2>Dashboard de Estadísticas</h2>
      <div className="chart-container">
        <div className="chart-item">
          <LineChart />
        </div>
        <div className="chart-item">
          <BarChart />
        </div>
        <div className="chart-item">
          <DoughnutChart />
        </div>
      </div>
    </div>
  );
};

export default Stats;

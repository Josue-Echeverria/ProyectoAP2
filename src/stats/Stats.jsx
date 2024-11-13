import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import "./Stats.css";
import { getDonationsByMonth, getProjectCounts, getUserCounts } from "../api/api";

const Stats = () => {
  const [cantidadProyectos, setCantidadProyectos] = React.useState(0);
  const [cantidadDonaciones, setCantidadDonaciones] = React.useState(0);
  const [cantidadUsuarios, setCantidadUsuarios] = React.useState(0);
  const [months, setMonths] = React.useState([]);
  const fetchStats = async () => {
    try {
      const response1 = await getDonationsByMonth();
      const response2 = await getProjectCounts();
      const response3 = await getUserCounts();

      const months = []
      const data = []
      const data2 = []
      for (const key in response2) {
        if (response2.hasOwnProperty(key)) {
          data.push(response2[key]);
        }
      }
      for (const key in response1) {
        if (response1.hasOwnProperty(key)) {
          months.push(key);
          data2.push(response1[key]);
        }
      }
      setCantidadProyectos(data);
      setCantidadDonaciones(data2);
      setMonths(months);
      setCantidadUsuarios([response3.inactiveUsers, response3.activeUsers]);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  React.useEffect(() => {
    fetchStats();
  }, []);


  return (
    <div className="stats-dashboard">
      <h1>Dashboard de Estadísticas</h1>
      <div className="chart-container">
        <div className="chart-item">
          {cantidadProyectos ? (<LineChart data={cantidadProyectos} labels={["En revision", "En proceso", "Logrados", "No logrados"]} label={"Cantidad de proyectos"}/>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
        <div className="chart-item">
          {cantidadDonaciones ? (<LineChart data={cantidadDonaciones} labels={months} label={"Cantidad de donaciones"}/>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
        <div className="chart-item">
          {cantidadUsuarios ? (
            <BarChart data={cantidadUsuarios} labels={["Inactivos", "Activos"]} label={"Cantidad de usuarios"}/>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;

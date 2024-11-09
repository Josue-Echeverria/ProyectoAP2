import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import "./Stats.css";

const Stats = () => {
  const [cantidadProyectos, setCantidadProyectos] = React.useState(0);
  const [cantidadDonaciones, setCantidadDonaciones] = React.useState(0);
  const [cantidadUsuarios, setCantidadUsuarios] = React.useState(0);

  const fetchStats = async () => {
    try {
      // const response = await fetch("http://localhost:3001/stats");
      // const data = await response.json();
      //TODO set the state with the actual data
      setCantidadProyectos([50,20,50,30,40,60]);
      setCantidadDonaciones([10,20,30,40,50,60]);
      setCantidadUsuarios([10,20]);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  React.useEffect(() => {
    fetchStats();
  }, []);


  return (
    <div className="stats-dashboard">
      <h2>Dashboard de Estadísticas</h2>
      <div className="chart-container">
        <div className="chart-item">
          {cantidadProyectos ? (<LineChart data={cantidadProyectos} labels={["January", "February", "March", "April", "May", "June"]} label={"Cantidad de proyectos"}/>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
        <div className="chart-item">
          {cantidadDonaciones ? (<LineChart data={cantidadDonaciones} labels={["January", "February", "March", "April", "May", "June"]} label={"Cantidad de donaciones"}/>
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

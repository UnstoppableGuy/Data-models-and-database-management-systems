import { useEffect, useState } from "react";
import agent from "../../api/agent";

export default function CatalogPage() {
  const [weather, setWeather] = useState<any>([]);

  useEffect(() => {
    agent.Weather.list().then((response) => {
      setWeather(response);
    });
  }, []);

  console.log("weather -", weather);
  
  return (
    <div style={{ height: "100vh" }}>
      {weather.map((element: any) => (
        <>
          <div>{element.date}</div>
          <div>{element.summary}</div>
          <div>{element.temperatureC}</div>
          <div>{element.temperatureF}</div>
        </>
      ))}
    </div>
  );
}

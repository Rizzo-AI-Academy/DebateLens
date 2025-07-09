import React, { useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import "./App.css";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function App() {
  const [text, setText] = useState("");
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(false);

  // Semplifica il testo per l'API
  const processText = (input) => {
    let processed = input.replace(/"/g, "<,>");
    processed = processed.replace(/[^A-Za-z0-9<,>\s]/g, "");
    return processed;
  };

  // Invio richiesta
  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    const cleaned = processText(text);
    try {
      const res = await fetch(
        "https://primary-production-fd6f0.up.railway.app/webhook-test/af5d6f27-179f-4c51-9670-4310589e050e",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ testo_articolo: cleaned }),
        }
      );
      const data = await res.json();
      setScores(data.output);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Costruisce il radar chart
  const renderChart = () => {
    if (!scores) return null;

    const metricNames = Object.keys(Object.values(scores)[0]);

    const datasets = Object.entries(scores).map(([name, metrics], idx) => {
      const hue = (idx * 137) % 360;
      return {
        label: name,
        data: Object.values(metrics),
        backgroundColor: `hsla(${hue}, 70%, 60%, 0.25)`,
        borderColor: `hsl(${hue}, 70%, 40%)`,
        borderWidth: 2,
        pointRadius: 4,
      };
    });

    const data = {
      labels: metricNames,
      datasets,
    };

    const options = {
      scales: {
        r: {
          beginAtZero: true,
          max: 5,
          grid: { color: "#e0e5ff" },
          angleLines: { color: "#e0e5ff" },
          ticks: {
            backdropColor: "transparent",
            font: { size: 12 },
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: { boxWidth: 12, padding: 16 },
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    };

    return <Radar data={data} options={options} />;
  };

  return (
    <div className="app-container">
      <div className="card">
        <header className="header">
          <h1 className="title">Debate Lens</h1>
          <p className="subtitle">Valuta la qualità degli interventi in un dibattito.</p>
        </header>

        <textarea
          className="input-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Incolla il testo del dibattito qui..."
          rows={8}
        />

        <button
          className="primary-btn"
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
        >
          {loading ? "Elaboro..." : "Valuta"}
        </button>

        {scores && (
          <div className="chart-wrapper" style={{ height: "600px" }}>
            {renderChart()}
          </div>
        )}
      </div>

      <footer className="footer">© {new Date().getFullYear()} Debate Lens</footer>
    </div>
  );
}

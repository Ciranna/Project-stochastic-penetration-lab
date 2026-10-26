import Chart from 'chart.js/auto';
let instance;
export function renderTrajectories(paths) {
  instance?.destroy();
  const colors = ['#2dd4bf','#60a5fa','#fbbf24','#fb7185','#c084fc'];
  instance = new Chart(document.getElementById('trajectories'), {
    type: 'line', data: { datasets: paths.map((path, i) => ({
      label: `Attacker ${i + 1}`, data: path.map((y,x) => ({x,y})), parsing: false,
      borderColor: colors[i % colors.length], borderWidth: 1.4, pointRadius: 0, tension: 0
    })) },
    options: { responsive: true, maintainAspectRatio: false, animation: false,
      plugins: { legend: { display: false } }, scales: { x: { type: 'linear', title: { display: true, text: 'System / step' } }, y: { title: { display: true, text: 'Cumulative score' } } } }
  });
}

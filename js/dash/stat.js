const gameHistory = [
      { date: '2024-01-01', wpm: 65 },
      { date: '2024-01-02', wpm: 68 },
      { date: '2024-01-03', wpm: 72 },
      { date: '2024-01-04', wpm: 70 },
      { date: '2024-01-05', wpm: 75 },
      { date: '2024-01-06', wpm: 73 },
      { date: '2024-01-07', wpm: 78 },
      { date: '2024-01-08', wpm: 82 },
      { date: '2024-01-09', wpm: 80 },
      { date: '2024-01-10', wpm: 85 }
    ];
    
    function updateStats() {
      const wpmValues = gameHistory.map(game => game.wpm);
      const averageWpm = Math.round(wpmValues.reduce((a, b) => a + b) / wpmValues.length);
      const bestWpm = Math.max(...wpmValues);
      const firstWpm = wpmValues[0];
      const lastWpm = wpmValues[wpmValues.length - 1];
      const progressionPercentage = Math.round(((lastWpm - firstWpm) / firstWpm) * 100);
    
      document.getElementById('averageWpm').textContent = averageWpm;
      document.getElementById('bestWpm').textContent = bestWpm;
      document.getElementById('totalGames').textContent = gameHistory.length;
      document.getElementById('progression').textContent = `+${progressionPercentage}%`;
    }
    
    function createChart() {
      const ctx = document.querySelector('#progressChart').getContext('2d');
      
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: gameHistory.map(game => game.date),
          datasets: [{
            label: 'Mots par Minute',
            data: gameHistory.map(game => game.wpm),
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Évolution de la Vitesse de Frappe'
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: 'Mots par Minute (MPM)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            }
          }
        }
      });
    }
     // Initialisation
     updateStats();
     createChart();
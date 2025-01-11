 const players = [
      { name: "Alex Martin", wpm: 85 },
      { name: "Sophie Dubois", wpm: 120 },
      { name: "Thomas Bernard", wpm: 95 },
      { name: "Marie Lambert", wpm: 110 },
      { name: "Lucas Petit", wpm: 75 },
      { name: "Emma Roux", wpm: 105 },
      { name: "Paul Durand", wpm: 92 },
      { name: "Julie Lefebvre", wpm: 88 },
      { name: "Hugo Moreau", wpm: 115 },
      { name: "Léa Simon", wpm: 98 }
    ];
    
    function renderPlayers(playersArray) {
      const playersList = document.getElementById('playersList');
      playersList.innerHTML = '';
      
      // Trier les joueurs par WPM décroissant
      const sortedPlayers = [...playersArray].sort((a, b) => b.wpm - a.wpm);
      
      sortedPlayers.forEach((player, index) => {
        const row = document.createElement('div');
        row.className = 'player-row';
        
        let medalSvg = '';
        if (index === 0) {
          medalSvg = `<svg class="medal" viewBox="0 0 24 24" fill="#FFD700"><circle cx="12" cy="12" r="10"/><text x="12" y="16" text-anchor="middle" fill="white" font-size="12">1</text></svg>`;
        } else if (index === 1) {
          medalSvg = `<svg class="medal" viewBox="0 0 24 24" fill="#C0C0C0"><circle cx="12" cy="12" r="10"/><text x="12" y="16" text-anchor="middle" fill="white" font-size="12">2</text></svg>`;
        } else if (index === 2) {
          medalSvg = `<svg class="medal" viewBox="0 0 24 24" fill="#CD7F32"><circle cx="12" cy="12" r="10"/><text x="12" y="16" text-anchor="middle" fill="white" font-size="12">3</text></svg>`;
        }
        
        row.innerHTML = `
          <div class="rank">${medalSvg || (index + 1)}</div>
          <div>${player.name}</div>
          <div class="wpm">${player.wpm} MPM</div>
        `;
        
        playersList.appendChild(row);
      });
    }
    
    document.getElementById('searchInput').addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredPlayers = players.filter(player => 
        player.name.toLowerCase().includes(searchTerm)
      );
      renderPlayers(filteredPlayers);
    });
    
    // Affichage initial
    renderPlayers(players);
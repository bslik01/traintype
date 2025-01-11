class AuthUI {
    constructor() {
      this.isLogin = true;
      this.init();
    }
  
    init() {
      this.render();
      this.attachEvents();
    }
  
    render() {
      const authForm = document.getElementById('authForm');
      authForm.innerHTML = `
        <h2 class="text-center mb-4">${this.isLogin ? 'Connexion' : 'Inscription'}</h2>
        <form id="form">
          ${!this.isLogin ? `
            <div class="mb-3">
              <label class="form-label">Nom</label>
              <input type="text" class="form-control" name="name" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Prénom</label>
              <input type="text" class="form-control" name="firstname" required>
            </div>
          ` : ''}
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" name="email" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Mot de passe</label>
            <input type="password" class="form-control" name="password" required>
          </div>
          <button type="submit" class="btn btn-dark w-100 mb-3">
            ${this.isLogin ? 'Se connecter' : 'S\'inscrire'}
          </button>
          <button class="btn btn-light w-100" id="switchBtn">
            ${this.isLogin ? 'Créer un compte' : 'Déjà un compte ?'}
          </button>
        </form>
      `;
    }
  
    attachEvents() {
      document.getElementById('switchBtn').addEventListener('click', () => {
        this.isLogin = !this.isLogin;
        this.render();
        this.attachEvents();
      });
  
      document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Simulation d'une requête API
        console.log('Données envoyées:', data);
        alert(`${this.isLogin ? 'Connexion' : 'Inscription'} réussie !`);
      });
    }
  }
  
  // Initialisation
  document.addEventListener('DOMContentLoaded', () => {
    new AuthUI();
  });
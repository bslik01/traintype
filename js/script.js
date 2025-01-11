document.addEventListener('DOMContentLoaded', () => {
    // Ouverture de la base de données
    let db;
    const request = indexedDB.open('userDB', 1);

    request.onerror = (event) => {
        console.error('Erreur lors de l\'ouverture de IndexedDB', event);
    };

    request.onsuccess = (event) => {
        db = event.target.result;
    };

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        const objectStore = db.createObjectStore('users', { keyPath: 'email' });
        objectStore.createIndex('username', 'username', { unique: true });
    };

    const addUser = (user) => {
        const transaction = db.transaction(['users'], 'readwrite');
        const objectStore = transaction.objectStore('users');
        objectStore.add(user);
    };

    const getUser = (email, callback) => {
        const transaction = db.transaction(['users'], 'readonly');
        const objectStore = transaction.objectStore('users');
        const request = objectStore.get(email);

        request.onsuccess = (event) => {
            callback(event.target.result);
        };
    };

    document.getElementById('signUpForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const user = {
            username: document.getElementById('username').value,
            firstname: document.getElementById('firstname').value,
            email: document.getElementById('emailSignUp').value,
            password: document.getElementById('passwordSignUp').value
        };
        addUser(user);
        alert('Inscription réussie !');
        document.getElementById('signUpForm').reset();
    });

    document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('emailLogin').value;
        const password = document.getElementById('passwordLogin').value;

        getUser(email, (user) => {
            if (user && user.password === password) {
                alert('Connexion réussie !');
            } else {
                alert('Email ou mot de passe incorrect.');
            }
        });
    });

    document.getElementById('showSignUp').addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('.signUpCard').style.display = 'block';
        document.querySelector('.loginCard').style.display = 'none';
    });

    document.getElementById('showLogin').addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('.signUpCard').style.display = 'none';
        document.querySelector('.loginCard').style.display = 'block';
    });
});

document.addEventListener("DOMContentLoaded", async () => {
    // Initialiser la base de données
    await openDB();

    // Vérifier si l'utilisateur est connecté
    if (localStorage.getItem('loggedInUser')) {
        // isUserLoggedIn()
        loadDashboard();
    } else {
        loadLoginPage();
    }
});

/**
 * Charger la page de connexion
 */
const loadLoginPage = () => {
    document.getElementById("loginForm").addEventListener("submit", handleLogin);
    document.getElementById("signUpForm").addEventListener("submit", handleRegister);
};

/**
 * Gérer l'inscription d'un nouvel utilisateur
 */
const handleRegister = async (event) => {
    event.preventDefault();

    const nom = document.getElementById("registerNom").value;
    const prenom = document.getElementById("registerPrenom").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPass").value;
    const hashedPassword = hashPassword(password);
    const statut = 'user';

    const users = await getAllFromDB("users");
    const userExists = users.some((u) => u.email === email);

    if (userExists) {
        alert("Nom d'utilisateur déjà utilisé.");
        return;
    }

    const newUser = {
        email,
        nom,
        prenom,
        password: hashedPassword,
        statut,
        createdAt: new Date().toISOString()
    };

    await addToDB("users", newUser);
    alert("Inscription réussie. Vous pouvez maintenant vous connecter.");
    // Recharge la page actuelle
    location.reload();

};

/**
 * Gérer la connexion utilisateur
 */
const handleLogin = async (event) => {
    event.preventDefault();

    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    const users = await getAllFromDB("users");
    const user = users.find((u) => u.email === email && u.password === hashPassword(password));

    if (user) {
        alert(`Bienvenue, ${user.prenom} ${user.nom}!`);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        // Redirect to the dashboard
        if (user.statut === 'user')
            location.href = "../pages/user/dashboard.html";
        else
            location.href = "../pages/admin/admin.html";

    } else {
        alert("Email ou mot de passe incorrect.");
    }
};

/**
 * Charger le tableau de bord de l'utilisateur
 */
const loadDashboard = async () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    let p = concatenateFirstLetterUppercase(user.prenom, user.nom);
    // console.log(document.getElementById("p-logo"));
    // console.log(document.getElementById("p-nom"));
    document.getElementById("p-logo").innerHTML = `${p}`;
    wel = document.querySelector("#contenu1 h1");
    wel.innerHTML = `Welcome, ${user.prenom}!!`;
    wel.
    document.getElementById("p-nom").innerHTML = `
    ${user.prenom} ${user.nom}
    `;
        // <h2>Bienvenue, ${user.username}</h2>
        // <button id="logout">Se déconnecter</button>
        // <h3>Exercices disponibles</h3>
        // <div id="exerciseList"></div>
        // <h3>Historique des performances</h3>
        // <div id="performanceHistory"></div>

    document.getElementById("logout").addEventListener("click", handleLogout);

    const exercises = await getAllFromDB("exercises");
    displayExercises(exercises);

    const performances = await getAllFromDB("performance");
    displayPerformanceHistory(user.id, performances);
};

/**
 * Déconnexion utilisateur
 */
const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    loadLoginPage();
};

/**
 * Afficher la liste des exercices
 */
const displayExercises = (exercises) => {
    const container = document.getElementById("exerciseList");
    container.innerHTML = "";

    exercises.forEach((exercise) => {
        const div = document.createElement("div");
        div.textContent = `[${exercise.level}] ${exercise.content}`;
        div.style.cursor = "pointer";
        div.style.margin = "10px 0";
        div.addEventListener("click", () => startExercise(exercise));
        container.appendChild(div);
    });
};

/**
 * Démarrer un exercice
 */
const startExercise = (exercise) => {
    document.getElementById("app").innerHTML = `
        <h2>Exercice : ${exercise.content}</h2>
        <p id="exerciseText">${exercise.content}</p>
        <textarea id="typingArea" placeholder="Tapez ici..."></textarea>
        <button id="submitExercise">Terminer</button>
    `;

    const startTime = Date.now();

    document.getElementById("submitExercise").addEventListener("click", async () => {
        const typedText = document.getElementById("typingArea").value;
        const endTime = Date.now();

        const totalTime = Math.round((endTime - startTime) / 1000); // Temps en secondes
        const totalCharacters = exercise.content.length;
        const errors = calculateErrors(exercise.content, typedText);

        const wpm = calculateWPM(totalCharacters, totalTime);
        const accuracy = calculateAccuracy(totalCharacters, errors);

        const user = JSON.parse(localStorage.getItem("loggedInUser"));

        // Enregistrer la performance
        await addToDB("performance", {
            user_id: user.id,
            exercise_id: exercise.id,
            wpm,
            accuracy,
            errors,
            completion_time: totalTime,
            created_at: getCurrentTimestamp(),
        });

        alert(`Exercice terminé !\nWPM : ${wpm}\nPrécision : ${accuracy}%\nErreurs : ${errors}`);
        loadDashboard();
    });
};

/**
 * Calculer le nombre d'erreurs entre le texte original et le texte tapé
 */
const calculateErrors = (originalText, typedText) => {
    let errors = 0;
    const originalWords = originalText.split("");
    const typedWords = typedText.split("");

    originalWords.forEach((char, index) => {
        if (char !== typedWords[index]) {
            errors++;
        }
    });

    return errors + Math.max(0, typedWords.length - originalWords.length);
};

/**
 * Afficher l'historique des performances
 */
const displayPerformanceHistory = (userId, performances) => {
    const userPerformances = performances.filter((p) => p.user_id === userId);
    const container = document.getElementById("performanceHistory");

    if (userPerformances.length === 0) {
        container.textContent = "Aucune performance enregistrée.";
        return;
    }

    userPerformances.forEach((performance) => {
        const div = document.createElement("div");
        div.textContent = `Exercice ID: ${performance.exercise_id} - WPM: ${performance.wpm} - Précision: ${performance.accuracy}% - Erreurs: ${performance.errors}`;
        container.appendChild(div);
    });
};

/**
 * Charger la section des défis dans le tableau de bord
 */
const loadChallengesSection = async () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const challenges = await getAllFromDB("challenges");

    const container = document.createElement("div");
    container.id = "challengeSection";
    container.innerHTML = `
        <h3>Défis</h3>
        <button id="createChallenge">Lancer un défi</button>
        <div id="challengeList"></div>
    `;

    document.getElementById("app").appendChild(container);

    document.getElementById("createChallenge").addEventListener("click", () => createChallenge(user.id));

    displayChallenges(user.id, challenges);
};

/**
 * Lancer un défi
 */
const createChallenge = async (userId) => {
    const exercises = await getAllFromDB("exercises");
    const exercise = exercises[Math.floor(Math.random() * exercises.length)]; // Choisir un exercice aléatoire

    const challenge = {
        creator_id: userId,
        opponent_id: null,
        exercise_id: exercise.id,
        status: "pending",
        created_at: getCurrentTimestamp(),
    };

    await addToDB("challenges", challenge);
    alert("Défi créé ! Attendez qu'un autre utilisateur le rejoigne.");
};

/**
 * Afficher la liste des défis
 */
const displayChallenges = async (userId, challenges) => {
    const container = document.getElementById("challengeList");
    container.innerHTML = "";

    challenges.forEach((challenge) => {
        const isCreator = challenge.creator_id === userId;
        const isOpponent = challenge.opponent_id === userId;

        if (challenge.status === "pending" && !isCreator) {
            const joinButton = `<button onclick="joinChallenge(${challenge.id}, ${userId})">Rejoindre</button>`;
            container.innerHTML += `<div>Défi ID: ${challenge.id} - Créé par l'utilisateur ${challenge.creator_id} ${joinButton}</div>`;
        } else if (challenge.status === "completed" && (isCreator || isOpponent)) {
            container.innerHTML += `<div>Défi terminé - Exercice ID: ${challenge.exercise_id} - Gagnant: Utilisateur ${challenge.winner_id}</div>`;
        }
    });
};

/**
 * Rejoindre un défi
 */
const joinChallenge = async (challengeId, userId) => {
    const challenges = await getAllFromDB("challenges");
    const challenge = challenges.find((c) => c.id === challengeId);

    if (challenge && challenge.status === "pending") {
        challenge.opponent_id = userId;
        challenge.status = "in_progress";

        await updateDB("challenges", challenge);
        alert("Défi accepté ! Exercice démarré.");
        startChallenge(challenge);
    }
};

/**
 * Démarrer un défi
 */
const startChallenge = async (challenge) => {
    const exercise = (await getAllFromDB("exercises")).find((e) => e.id === challenge.exercise_id);

    document.getElementById("app").innerHTML = `
        <h2>Défi : ${exercise.content}</h2>
        <p id="exerciseText">${exercise.content}</p>
        <textarea id="typingArea" placeholder="Tapez ici..."></textarea>
        <button id="submitChallenge">Terminer</button>
    `;

    const startTime = Date.now();

    document.getElementById("submitChallenge").addEventListener("click", async () => {
        const typedText = document.getElementById("typingArea").value;
        const endTime = Date.now();

        const totalTime = Math.round((endTime - startTime) / 1000); // Temps en secondes
        const totalCharacters = exercise.content.length;
        const errors = calculateErrors(exercise.content, typedText);

        const wpm = calculateWPM(totalCharacters, totalTime);
        const accuracy = calculateAccuracy(totalCharacters, errors);

        const user = JSON.parse(localStorage.getItem("loggedInUser"));

        // Déterminer le gagnant
        challenge.winner_id = user.id;
        challenge.status = "completed";

        await updateDB("challenges", challenge);
        alert(`Défi terminé !\nWPM : ${wpm}\nPrécision : ${accuracy}%\nErreurs : ${errors}`);
        loadDashboard();
    });
};

/**
 * Charger la section du classement global
 */
const loadLeaderboard = async () => {
    const performances = await getAllFromDB("performance");

    // Calculer la moyenne de WPM et de précision pour chaque utilisateur
    const leaderboard = {};
    performances.forEach((perf) => {
        if (!leaderboard[perf.user_id]) {
            leaderboard[perf.user_id] = { totalWPM: 0, totalAccuracy: 0, count: 0 };
        }
        leaderboard[perf.user_id].totalWPM += perf.wpm;
        leaderboard[perf.user_id].totalAccuracy += perf.accuracy;
        leaderboard[perf.user_id].count++;
    });

    // Construire un tableau trié par WPM moyen
    const leaderboardArray = Object.keys(leaderboard).map((userId) => {
        const userStats = leaderboard[userId];
        return {
            userId,
            avgWPM: Math.round(userStats.totalWPM / userStats.count),
            avgAccuracy: Math.round(userStats.totalAccuracy / userStats.count),
        };
    });

    leaderboardArray.sort((a, b) => b.avgWPM - a.avgWPM);

    // Afficher le classement
    const container = document.createElement("div");
    container.id = "leaderboardSection";
    container.innerHTML = "<h3>Classement global</h3>";

    leaderboardArray.forEach((entry, index) => {
        container.innerHTML += `<div>${index + 1}. Utilisateur ${entry.userId} - WPM: ${entry.avgWPM} - Précision: ${entry.avgAccuracy}%</div>`;
    });

    document.getElementById("app").appendChild(container);
};

// Utility function to hash passwords
function hashPassword(password) {
    return btoa(password).split('').reverse().join(''); // Simple reversible encoding, replace with secure hashing in real-world projects
}

function concatenateFirstLetterUppercase(str1, str2) {
    return str1.charAt(0).toUpperCase() + str2.charAt(0).toUpperCase();
}

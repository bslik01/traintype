/**
 * Calculer les mots par minute (WPM)
 * @param {number} totalCharacters - Nombre total de caractères tapés
 * @param {number} timeInSeconds - Temps écoulé en secondes
 * @returns {number} - WPM calculé
 */
const calculateWPM = (totalCharacters, timeInSeconds) => {
    const words = totalCharacters / 5; // En moyenne, un mot contient 5 caractères
    const minutes = timeInSeconds / 60;
    return Math.round(words / minutes);
};

/**
 * Calculer le taux de précision
 * @param {number} totalCharacters - Nombre total de caractères tapés
 * @param {number} errors - Nombre d'erreurs
 * @returns {number} - Pourcentage de précision
 */
const calculateAccuracy = (totalCharacters, errors) => {
    const correctCharacters = totalCharacters - errors;
    return Math.round((correctCharacters / totalCharacters) * 100);
};

/**
 * Obtenir la date et l'heure actuelles formatées
 */
const getCurrentTimestamp = () => {
    return new Date().toISOString();
};

/**
 * Vérifier si un utilisateur est connecté
 */
const isUserLoggedIn = () => {
    return localStorage.getItem("loggedInUser") !== null;
};

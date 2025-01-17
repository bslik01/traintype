// Nom et version de la base de données
const DB_NAME = "TrainTypeDB";
const DB_VERSION = 1;
let db; // Variable pour la base de données

/**
 * Ouvrir ou initialiser la base de données IndexedDB
 */
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            db = event.target.result;

            // Création des collections si elles n'existent pas
            if (!db.objectStoreNames.contains("users")) {
                db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("exercises")) {
                db.createObjectStore("exercises", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("performance")) {
                db.createObjectStore("performance", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("challenges")) {
                db.createObjectStore("challenges", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

/**
 * Ajouter un élément à une collection
 */
const addToDB = (storeName, data) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.add(data);

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
};

/**
 * Récupérer tous les éléments d'une collection
 */
const getAllFromDB = (storeName) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
};

/**
 * Mettre à jour un élément dans une collection
 */
const updateDB = (storeName, data) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.put(data);

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
};

/**
 * Supprimer un élément d'une collection
 */
const deleteFromDB = (storeName, id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(event.target.error);
    });
};

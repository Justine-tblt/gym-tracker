import { db } from "./firebase.js"
import { collection, doc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"

// Nom de la collection Firestore
const WORKOUTS_COLLECTION = "workouts"

// Sauvegarder une séance
export async function saveData(appData) {
  try {
    // Parcours toutes les séances et les stocke dans Firestore
    for (let i = 0; i < appData.workouts.length; i++) {
      const workout = appData.workouts[i]
      const docRef = doc(db, WORKOUTS_COLLECTION, workout.date) // id = date ISO
      await setDoc(docRef, workout)
    }

    // Sauvegarde la séance en cours (optionnel)
    if (appData.currentWorkout) {
      const docRef = doc(db, WORKOUTS_COLLECTION, appData.currentWorkout.date)
      await setDoc(docRef, appData.currentWorkout)
    }

    console.log("Données sauvegardées sur Firebase ✅")
  } catch (error) {
    console.error("Erreur lors de la sauvegarde sur Firebase :", error)
  }
}

// Charger toutes les séances depuis Firestore
export async function loadData() {
  try {
    const snapshot = await getDocs(collection(db, WORKOUTS_COLLECTION))
    const workouts = []

    snapshot.forEach(docSnap => {
      workouts.push(docSnap.data())
    })

    // On ne récupère pas de séance en cours spécifique ici
    const appData = {
      currentWorkout: null,
      workouts: workouts.sort((a, b) => new Date(a.date) - new Date(b.date))
    }

    console.log("Données chargées depuis Firebase ✅")
    return appData
  } catch (error) {
    console.error("Erreur lors du chargement depuis Firebase :", error)
    return {
      currentWorkout: null,
      workouts: []
    }
  }
}
export async function loadData() {
  try {
    const snapshot = await getDocs(collection(db, WORKOUTS_COLLECTION))

    const workouts = []

    snapshot.forEach(docSnap => {
      workouts.push(docSnap.data())
    })

    return {
      currentWorkout: null,
      workouts: workouts // ✅ TOUJOURS un tableau
    }

  } catch (error) {
    console.error("Erreur Firebase :", error)
    return {
      currentWorkout: null,
      workouts: [] // ✅ fallback sûr
    }
  }
}

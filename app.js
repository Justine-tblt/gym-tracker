import { templates, startWorkout } from "./workout.js"
import { loadData, saveData } from "./storage.js"
import { renderWorkout } from "./ui.js"

// Chargement des données depuis localStorage ou initialisation
let appData = loadData() || {
  currentWorkout: null,
  workouts: []
}

// Récupération des boutons
const startBtn = document.getElementById("start-workout")

// Fonction pour ajouter une série à un exercice
function onAddSet(exIndex, reps, weight) {
  if (!appData.currentWorkout) return
  appData.currentWorkout.exercises[exIndex].sets.push({ reps, weight })
  saveData(appData)
  renderWorkout(appData.currentWorkout, onAddSet)
  attachFinishListener()
}

// Démarrer une nouvelle séance
startBtn.addEventListener("click", () => {
  appData.currentWorkout = startWorkout(templates[0])
  saveData(appData)
  renderWorkout(appData.currentWorkout, onAddSet)
  attachFinishListener()
})

// Restaurer la séance en cours au chargement
if (appData.currentWorkout) {
  renderWorkout(appData.currentWorkout, onAddSet)
  attachFinishListener()
}

// Fonction pour attacher le listener du bouton "Terminer la séance"
function attachFinishListener() {
  const finishBtn = document.getElementById("finish-workout")
  if (!finishBtn) return
  finishBtn.onclick = () => {
    if (!appData.currentWorkout) return
    appData.workouts.push(appData.currentWorkout)
    appData.currentWorkout = null
    saveData(appData)
    renderWorkout(appData.currentWorkout, onAddSet, appData.workouts)
    attachFinishListener() // ré-attacher après render
  }
}

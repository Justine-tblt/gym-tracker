import { templates, startWorkout } from "./workout.js"
import { loadData, saveData } from "./storage.js"
import { renderWorkout } from "./ui.js"

// Chargement ou initialisation des données
let appData = loadData() || {
  currentWorkout: null,
  workouts: []
}

// Récupération des boutons et select
const startBtn = document.getElementById("start-workout")
const finishBtn = document.getElementById("finish-workout")
const selectWorkout = document.getElementById("select-workout")

// Fonction pour ajouter une série
function onAddSet(exIndex, reps, weight) {
  if (!appData.currentWorkout) return
  appData.currentWorkout.exercises[exIndex].sets.push({ reps, weight })
  saveData(appData)
  renderWorkout(appData.currentWorkout, onAddSet, appData.workouts)
}

// Démarrer une nouvelle séance
startBtn.addEventListener("click", () => {
  const templateIndex = Number(selectWorkout.value)
  appData.currentWorkout = startWorkout(templates[templateIndex])
  saveData(appData)
  renderWorkout(appData.currentWorkout, onAddSet, appData.workouts)
})

// Terminer la séance
finishBtn.addEventListener("click", () => {
  if (!appData.currentWorkout) return
  appData.workouts.push(appData.currentWorkout)
  appData.currentWorkout = null
  saveData(appData)
  renderWorkout(null, onAddSet, appData.workouts)
})

// Restaurer la séance en cours au chargement
if (appData.currentWorkout) {
  renderWorkout(appData.currentWorkout, onAddSet, appData.workouts)
}

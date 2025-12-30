import { templates, startWorkout } from "./workout.js"
import { loadData, saveData } from "./storage.js"
import { renderWorkout } from "./ui.js"

let appData = loadData() || {
  currentWorkout: null,
  workouts: []
}

const startBtn = document.getElementById("start-workout")
const finishBtn = document.getElementById("finish-workout") // bouton à ajouter

startBtn.addEventListener("click", () => {
  appData.currentWorkout = startWorkout(templates[0])
  saveData(appData)
  renderWorkout(appData.currentWorkout, onAddSet)
})

function onAddSet(exIndex, reps, weight) {
  appData.currentWorkout.exercises[exIndex].sets.push({ reps, weight })
  saveData(appData)
  renderWorkout(appData.currentWorkout, onAddSet)
}

// Finir la séance → stocker dans l’historique
finishBtn.addEventListener("click", () => {
  if (!appData.currentWorkout) return
  appData.workouts.push(appData.currentWorkout)
  appData.currentWorkout = null
  saveData(appData)
  renderWorkout(null, onAddSet) // reset UI
})

// restauration au chargement
if (appData.currentWorkout) {
  renderWorkout(appData.currentWorkout, onAddSet)
}

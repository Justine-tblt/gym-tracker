import { templates, startWorkout } from "./workout.js"
import { loadData, saveData } from "./storage.js"
import { renderWorkout } from "./ui.js"

let appData = loadData() || {
  currentWorkout: null,
  workouts: []
}

const startBtn = document.getElementById("start-workout")

startBtn.addEventListener("click", () => {
  appData.currentWorkout = startWorkout(templates[0])
  saveData(appData)
  renderWorkout(appData.currentWorkout, onAddSet)
})

// callback quand on ajoute une série
function onAddSet(exIndex, reps, weight) {
  appData.currentWorkout.exercises[exIndex].sets.push({
    reps,
    weight
  })
  saveData(appData)
  renderWorkout(appData.currentWorkout, onAddSet)
}

// restauration au chargement
if (appData.currentWorkout) {
  renderWorkout(appData.currentWorkout, onAddSet)
}

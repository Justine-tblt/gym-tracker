import { templates, startWorkout } from "./workout.js"
import { loadData, saveData } from "./storage.js"
import { renderWorkout } from "./ui.js"

let appData = {
  currentWorkout: null,
  workouts: []
}

const startBtn = document.getElementById("start-workout")
const finishBtn = document.getElementById("finish-workout")
const selectWorkout = document.getElementById("select-workout")

// 🔹 INIT
async function init() {
  const data = await loadData()
  if (data) appData = data

  renderWorkout(appData.currentWorkout, onAddSet, onSelectHistory)
}

init()

// 🔹 NOUVELLE SÉANCE ✅
startBtn.addEventListener("click", async () => {
  const templateIndex = Number(selectWorkout.value)
  const template = templates[templateIndex]

  if (!template) {
    console.error("Template introuvable", templateIndex)
    return
  }

  appData.currentWorkout = startWorkout(template)

  await saveData(appData)
  renderWorkout(appData.currentWorkout, onAddSet, onSelectHistory)
})

// 🔹 Ajouter une série
async function onAddSet(exIndex, reps, weight) {
  appData.currentWorkout.exercises[exIndex].sets.push({ reps, weight })

  await saveData(appData)
  renderWorkout(appData.currentWorkout, onAddSet, onSelectHistory)
}

// 🔹 Terminer séance
finishBtn.addEventListener("click", async () => {
  if (!appData.currentWorkout) return

  appData.workouts.push(appData.currentWorkout)
  appData.currentWorkout = null

  await saveData(appData)
  renderWorkout(null, onAddSet, onSelectHistory)
})

// 🔹 Historique
function onSelectHistory(workout) {
  renderWorkout(workout, onAddSet, onSelectHistory, true)
}

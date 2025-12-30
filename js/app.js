import { startWorkout } from "./workout.js"

const startBtn = document.getElementById("start-workout")
const workoutDiv = document.getElementById("workout")

startBtn.addEventListener("click", () => {
  const workout = startWorkout()
  workoutDiv.innerHTML = `<pre>${JSON.stringify(workout, null, 2)}</pre>`
})

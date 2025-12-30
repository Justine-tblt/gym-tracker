// ui.js
export function renderWorkout(currentWorkout, onAddSet, workouts = []) {
  const workoutDiv = document.getElementById("workout")
  workoutDiv.innerHTML = ""

  if (!currentWorkout) {
    workoutDiv.innerHTML = "<p>Aucune séance en cours</p>"
  } else {
    currentWorkout.exercises.forEach((exercise, index) => {
      const exDiv = document.createElement("div")
      exDiv.innerHTML = `
        <h2>${exercise.name}</h2>
        <ul>
          ${exercise.sets.map(s => `<li>${s.reps} reps @ ${s.weight} kg</li>`).join("")}
        </ul>
        <input type="number" placeholder="Reps" class="reps">
        <input type="number" placeholder="Poids (kg)" class="weight">
        <button class="add">➕ Ajouter série</button>
        <hr>
      `
      workoutDiv.appendChild(exDiv)

      exDiv.querySelector(".add").addEventListener("click", () => {
        const reps = Number(exDiv.querySelector(".reps").value)
        const weight = Number(exDiv.querySelector(".weight").value)
        if (!reps) return
        onAddSet(index, reps, weight)
        exDiv.querySelector(".reps").value = ""
        exDiv.querySelector(".weight").value = ""
      })
    })
  }

  // Afficher l'historique
  if (workouts.length > 0) {
    const historyDiv = document.createElement("div")
    historyDiv.innerHTML = "<h2>Historique des séances</h2>" +
      workouts.map(w => `<div>${w.date} - ${w.exercises.length} exos</div>`).join("")
    workoutDiv.appendChild(historyDiv)
  }
}

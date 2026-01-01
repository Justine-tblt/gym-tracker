// Fonction pour formater la date ISO en dd/mm/yyyy
function formatDate(isoString) {
  const d = new Date(isoString)
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export function renderWorkout(currentWorkout, onAddSet, workouts = []) {
  const workoutDiv = document.getElementById("workout")
  workoutDiv.innerHTML = ""

  // Séance en cours
  if (!currentWorkout) {
    workoutDiv.innerHTML = "<p>Aucune séance en cours</p>"
  } else {
    currentWorkout.exercises.forEach((exercise, index) => {
      const exDiv = document.createElement("div")
      exDiv.innerHTML = `
        <h3>${exercise.name}</h3>
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

  // Historique cliquable
  if (workouts.length > 0) {
    const historyDiv = document.createElement("div")
    historyDiv.innerHTML = "<h2>Historique des séances</h2>"

    workouts.forEach((w, index) => {
      const item = document.createElement("div")
      item.className = "history-item"
      item.textContent = `Séance ${w.templateId} - ${formatDate(w.date)}`

      item.addEventListener("click", () => {
        // Afficher les détails complets
        workoutDiv.innerHTML = `<h2>Détails de la séance</h2>` +
          w.exercises.map(ex => `
            <h3>${ex.name}</h3>
            <ul>
              ${ex.sets.map(s => `<li>${s.reps} reps @ ${s.weight} kg</li>`).join("")}
            </ul>
          `).join("") +
          `<button id="back-home">⬅ Retour</button>`

        // Bouton retour
        document.getElementById("back-home").addEventListener("click", () => {
          renderWorkout(currentWorkout, onAddSet, workouts)
        })
      })

      historyDiv.appendChild(item)
    })

    workoutDiv.appendChild(historyDiv)
  }
}
if (!Array.isArray(workouts)) {
  console.error("workouts n'est pas un tableau", workouts)
  return
}

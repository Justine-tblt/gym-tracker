const workoutDiv = document.getElementById("workout")

export function renderWorkout(workout, onAddSet) {
  workoutDiv.innerHTML = ""

  workout.exercises.forEach((exercise, index) => {
    const exDiv = document.createElement("div")

    exDiv.innerHTML = `
      <h2>${exercise.name}</h2>

      <ul>
        ${exercise.sets
          .map(
            s => `<li>${s.reps} reps @ ${s.weight} kg</li>`
          )
          .join("")}
      </ul>

      <input type="number" placeholder="Reps" id="reps-${index}">
      <input type="number" placeholder="Charge (kg)" id="weight-${index}">
      <button id="add-${index}">➕ Ajouter série</button>
      <hr>
    `

    workoutDiv.appendChild(exDiv)

    exDiv.querySelector(`#add-${index}`).addEventListener("click", () => {
      const reps = Number(
        exDiv.querySelector(`#reps-${index}`).value
      )
      const weight = Number(
        exDiv.querySelector(`#weight-${index}`).value
      )

      if (!reps) return

      onAddSet(index, reps, weight)

      exDiv.querySelector(`#reps-${index}`).value = ""
      exDiv.querySelector(`#weight-${index}`).value = ""
    })
  })
}

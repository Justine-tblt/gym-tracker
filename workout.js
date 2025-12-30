// templates des séances
export const templates = [
  {
    id: "A",
    name: "Séance A",
    exercises: ["Bench Press", "OHP", "Dips"]
  },
  {
    id: "B",
    name: "Séance B",
    exercises: ["Rowing", "Tractions", "Curl"]
  }
]

// fonction pour démarrer une séance
export function startWorkout(template) {
  return {
    templateId: template.id,
    date: new Date().toISOString(),
    exercises: template.exercises.map(ex => ({
      name: ex,
      sets: []
    }))
  }
}

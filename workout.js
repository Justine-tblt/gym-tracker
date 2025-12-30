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
  },
  {
    id: "C",
    name: "Séance C",
    exercises: ["Squat", "Fentes", "Leg Curl"]
  },
  {
    id: "D",
    name: "Séance D",
    exercises: ["Pompes", "Abdos", "Gainage"]
  }
]

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

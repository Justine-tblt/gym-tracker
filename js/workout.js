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

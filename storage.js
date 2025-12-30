export function saveData(data) {
  localStorage.setItem("gym-tracker-data", JSON.stringify(data))
}

export function loadData() {
  const raw = localStorage.getItem("gym-tracker-data")
  return raw ? JSON.parse(raw) : null
}

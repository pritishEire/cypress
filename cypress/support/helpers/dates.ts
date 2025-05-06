export function getFutureDate(daysFromToday: number): {
  day: number
  month: string
  year: number
} {
  const today = new Date()
  const futureDate = new Date(today)
  futureDate.setDate(today.getDate() + daysFromToday)

  const day = futureDate.getDate()
  const month = futureDate.toLocaleString('default', { month: 'long' }) // e.g., "May"
  const year = futureDate.getFullYear()
  return { day, month, year }
}

export function formatDate(day: number, month: string, year: number): string {
  const date = new Date(`${month} ${day}, ${year}`)
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const dd = String(date.getDate()).padStart(2, '0')

  return `${yyyy}-${mm}-${dd}`
}

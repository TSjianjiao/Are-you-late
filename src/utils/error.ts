
export const ErrorNames = {
  custom: 'custom'
}
export function thorwCustomError(message: string): Error {
  const error = new Error(message)
  error.name = 'custom'
  throw error
}

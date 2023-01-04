// Interfejsy danych z api

export interface User {
  email: string,
  username: string,
  password: string,
  name: string,
  surname: string,
  level: number,
  isTeacher: boolean
}

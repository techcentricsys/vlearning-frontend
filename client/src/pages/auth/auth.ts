const KEY = "vlearning_user"

export type AuthUser = {
  name: string
  email: string
  role: string
}

export function login(user: AuthUser) {
  localStorage.setItem(KEY, JSON.stringify(user))
}

export function logout() {
  localStorage.removeItem(KEY)
}

export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function isLoggedIn() {
  return getUser() !== null
}
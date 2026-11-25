export type AuthUser = {
  name: string;
  school: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
};

const USERS_KEY = 'vlearnings_auth_users_v1';
const SESSION_KEY = 'vlearnings_auth_session_v1';
export const DEFAULT_ADMIN = {
  name: 'System Administrator',
  school: 'VLearnings Demo School',
  email: 'admin@vlearning.com',
  password: 'admin123',
  role: 'System Administrator',
};

export const DEFAULT_GUARDIAN = {
  name: 'Default Guardian',
  school: 'VLearnings Demo School',
  email: 'guardian@vlearning.com',
  password: 'guardian123',
  role: 'Guardian',
};

function readUsers(): AuthUser[] {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    const users: AuthUser[] = stored ? JSON.parse(stored) : [];
    let changed = false;
    if (!users.some(user => user.email.toLowerCase() === DEFAULT_ADMIN.email)) {
      users.unshift(DEFAULT_ADMIN);
      changed = true;
    }
    if (!users.some(user => user.email.toLowerCase() === DEFAULT_GUARDIAN.email)) {
      users.push(DEFAULT_GUARDIAN);
      changed = true;
    }
    // Add roles to accounts created by earlier versions of this demo.
    users.forEach(user => {
      if (!user.role) {
        user.role = user.email.toLowerCase() === DEFAULT_ADMIN.email ? 'System Administrator' : 'School Administrator';
        changed = true;
      }
    });
    if (changed) localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return users;
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_ADMIN, DEFAULT_GUARDIAN]));
    return [DEFAULT_ADMIN, DEFAULT_GUARDIAN];
  }
}

export function ensureDefaultAdmin() { readUsers(); }
export function authenticate(email: string, password: string, remember = true): AuthUser | null {
  const user = readUsers().find(item => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password);
  if (!user) return null;
  const safeUser = { name: user.name, school: user.school, email: user.email, phone: user.phone, role: user.role || 'School Administrator' };
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(safeUser));
  return user;
}
export function registerUser(user: AuthUser): { ok: boolean; message?: string } {
  const users = readUsers();
  if (users.some(item => item.email.toLowerCase() === user.email.trim().toLowerCase())) {
    return { ok: false, message: 'An account with this email already exists.' };
  }
  users.push({ ...user, email: user.email.trim().toLowerCase(), role: user.role || 'School Administrator' });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  const safeUser = { name: user.name, school: user.school, email: user.email, phone: user.phone, role: user.role || 'School Administrator' };
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
  return { ok: true };
}
export function getSession(): Omit<AuthUser, 'password'> | null {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
}
export function logout() { localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY); }

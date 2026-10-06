export const MIN_PASSWORD_LENGTH = 8;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(email: string): string | null {
  const v = email.trim();
  if (!v) return "Email is required.";
  if (!EMAIL_RE.test(v)) return "Enter a valid email address (e.g. you@example.com).";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required.";
  if (password.length < MIN_PASSWORD_LENGTH)
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  return null;
}

export function validateName(name: string): string | null {
  const v = name.trim();
  if (!v) return "Name is required.";
  if (v.length < 2) return "Name must be at least 2 characters.";
  return null;
}

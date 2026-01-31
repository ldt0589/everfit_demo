export const LoginSelectors = {
  usernameInput: 'input[placeholder="Your Email Address"]',
  passwordInput: 'input[type="password"][placeholder="Password"]',
  loginButton: {
    role: 'button',
    name: 'Login',
  },
} as const;
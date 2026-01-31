type EnvConfig = {
  baseURL: string;
  apiBaseURL: string;
  clientId: string;
};

const configs: Record<'dev' | 'staging' | 'production', EnvConfig> = {
  dev: {
    baseURL: 'https://dev.everfit.io',
    apiBaseURL: 'https://api-dev3.everfit.io',
    clientId: '6569b27da3479a001ee751ad',
  },
  staging: {
    baseURL: 'https://staging.everfit.io',
    apiBaseURL: 'https://api-dev3.everfit.io',
    clientId: '6569b27da3479a001ee751ad',
  },
  production: {
    baseURL: 'https://www.everfit.io',
    apiBaseURL: 'https://api-dev3.everfit.io',
    clientId: '6569b27da3479a001ee751ad',
  }
};

export function getEnvConfig(): EnvConfig {
  const env = (process.env.ENV || 'dev') as keyof typeof configs;

  if (!configs[env]) {
    throw new Error(`Invalid ENV value: ${env}`);
  }

  return configs[env];
}
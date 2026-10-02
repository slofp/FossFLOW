export interface Env {
  ASSETS: Fetcher;
  DIAGRAMS_BUCKET?: R2Bucket;

  // Values may be strings ("true") or JSON booleans depending on how they are set in wrangler.jsonc
  ENABLE_SERVER_STORAGE?: string | boolean;
  HTTP_AUTH_ENABLE?: string | boolean;
  HTTP_AUTH_USER?: string;
  HTTP_AUTH_PASSWORD?: string;
  CF_ACCESS_TEAM_DOMAIN?: string;
  CF_ACCESS_AUD?: string;
}

export function isEnabled(value: string | boolean | undefined): boolean {
  return String(value ?? '').trim().toLowerCase() === 'true';
}

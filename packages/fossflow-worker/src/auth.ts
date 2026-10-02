import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from 'jose';
import { type Env, isEnabled } from './env';

/**
 * Returns null when the request may proceed, otherwise the response to send back.
 *
 * HTTP_AUTH_ENABLE=true  -> HTTP Basic Auth with HTTP_AUTH_USER / HTTP_AUTH_PASSWORD
 * HTTP_AUTH_ENABLE=false -> the request must carry a valid Cloudflare Access JWT
 *
 * Both modes fail closed when their settings are missing.
 */
export async function authenticate(
  request: Request,
  env: Env
): Promise<Response | null> {
  if (isEnabled(env.HTTP_AUTH_ENABLE)) {
    return checkBasicAuth(request, env);
  }
  return checkCloudflareAccess(request, env);
}

// HTTP Basic Auth

async function checkBasicAuth(
  request: Request,
  env: Env
): Promise<Response | null> {
  const expectedUser = env.HTTP_AUTH_USER ?? '';
  const expectedPassword = env.HTTP_AUTH_PASSWORD ?? '';
  if (!expectedUser || !expectedPassword) {
    console.error(
      'HTTP_AUTH_ENABLE is true but HTTP_AUTH_USER or HTTP_AUTH_PASSWORD is not set'
    );
    return new Response('Authentication is not configured', { status: 500 });
  }

  const credentials = parseBasicAuth(request.headers.get('Authorization'));
  if (credentials) {
    // Always compare both values so timing does not reveal which one was wrong
    const userMatches = await timingSafeEqualStrings(
      credentials.user,
      expectedUser
    );
    const passwordMatches = await timingSafeEqualStrings(
      credentials.password,
      expectedPassword
    );
    if (userMatches && passwordMatches) return null;
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Restricted", charset="UTF-8"'
    }
  });
}

function parseBasicAuth(
  header: string | null
): { user: string; password: string } | null {
  const match = header?.match(/^Basic\s+(\S+)\s*$/i);
  if (!match) return null;

  let decoded: string;
  try {
    const bytes = Uint8Array.from(atob(match[1]), (c) => c.charCodeAt(0));
    decoded = new TextDecoder().decode(bytes);
  } catch {
    return null;
  }

  const separator = decoded.indexOf(':');
  if (separator < 0) return null;
  return {
    user: decoded.slice(0, separator),
    password: decoded.slice(separator + 1)
  };
}

async function timingSafeEqualStrings(a: string, b: string): Promise<boolean> {
  // Hash first so both buffers have the same length, as timingSafeEqual requires
  const encoder = new TextEncoder();
  const [hashA, hashB] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(a)),
    crypto.subtle.digest('SHA-256', encoder.encode(b))
  ]);
  return crypto.subtle.timingSafeEqual(hashA, hashB);
}

// Cloudflare Access

let cachedJwks: { url: string; getKey: JWTVerifyGetKey } | null = null;

function getAccessJwks(certsUrl: string): JWTVerifyGetKey {
  // Keep the key set per isolate so the certs endpoint is not fetched on every request
  if (cachedJwks?.url !== certsUrl) {
    cachedJwks = {
      url: certsUrl,
      getKey: createRemoteJWKSet(new URL(certsUrl))
    };
  }
  return cachedJwks.getKey;
}

function normalizeTeamDomain(value: string | undefined): string | null {
  const trimmed = value?.trim().replace(/\/+$/, '');
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

async function checkCloudflareAccess(
  request: Request,
  env: Env
): Promise<Response | null> {
  const teamDomain = normalizeTeamDomain(env.CF_ACCESS_TEAM_DOMAIN);
  const audience = env.CF_ACCESS_AUD?.trim();
  if (!teamDomain || !audience) {
    console.error(
      'HTTP_AUTH_ENABLE is false, so CF_ACCESS_TEAM_DOMAIN and CF_ACCESS_AUD must be set to verify Cloudflare Access'
    );
    return new Response('Authentication is not configured', { status: 500 });
  }

  const token = request.headers.get('Cf-Access-Jwt-Assertion');
  if (!token) {
    return new Response('Forbidden: missing Cloudflare Access token', {
      status: 403
    });
  }

  try {
    await jwtVerify(
      token,
      getAccessJwks(`${teamDomain}/cdn-cgi/access/certs`),
      {
        issuer: teamDomain,
        audience,
        algorithms: ['RS256']
      }
    );
    return null;
  } catch (error) {
    console.warn(
      'Cloudflare Access token verification failed:',
      error instanceof Error ? error.message : error
    );
    return new Response('Forbidden: invalid Cloudflare Access token', {
      status: 403
    });
  }
}

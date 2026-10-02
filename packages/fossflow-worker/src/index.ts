import { handleApi } from './api';
import { authenticate } from './auth';
import type { Env } from './env';

export default {
  async fetch(request, env): Promise<Response> {
    // Static assets are routed through here too (assets.run_worker_first),
    // so authentication covers the whole app, not only the API
    const denied = await authenticate(request, env);
    if (denied) return denied;

    const url = new URL(request.url);
    if (url.pathname === '/api' || url.pathname.startsWith('/api/')) {
      return handleApi(request, env, url);
    }

    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<Env>;

import { type Env, isEnabled } from './env';

// Mirrors packages/fossflow-backend/server.js, with R2 in place of STORAGE_PATH.
// Diagrams are stored as `<id>.json` at the bucket root, the same layout as the
// backend's storage directory, so existing files can be copied over as-is.

const SAFE_ID = /^[a-zA-Z0-9._-]+$/;
const MAX_BODY_BYTES = 10 * 1024 * 1024;
// Diagram names are kept in custom metadata so listing does not need to read every object
const NAME_METADATA_KEY = 'name';
const MAX_NAME_METADATA_LENGTH = 1024;

type DiagramData = Record<string, unknown>;

export async function handleApi(
  request: Request,
  env: Env,
  url: URL
): Promise<Response> {
  const bucket = getBucket(env);

  if (url.pathname === '/api/storage/status') {
    if (request.method !== 'GET') return methodNotAllowed();
    return json({ enabled: bucket !== null, gitBackup: false, version: '1.0.0' });
  }

  const match = url.pathname.match(/^\/api\/diagrams(?:\/([^/]+))?\/?$/);
  if (!match) return json({ error: 'Not found' }, 404);
  if (!bucket) return json({ error: 'Server storage is disabled' }, 503);

  try {
    if (match[1] === undefined) {
      switch (request.method) {
        case 'GET':
          return await listDiagrams(bucket);
        case 'POST':
          return await createDiagram(bucket, request);
        default:
          return methodNotAllowed();
      }
    }

    const id = decodeId(match[1]);
    if (!id) return json({ error: 'Invalid diagram ID' }, 400);

    switch (request.method) {
      case 'GET':
        return await getDiagram(bucket, id);
      case 'PUT':
        return await saveDiagram(bucket, request, id);
      case 'DELETE':
        return await deleteDiagram(bucket, id);
      default:
        return methodNotAllowed();
    }
  } catch (error) {
    console.error(
      'Storage request failed:',
      error instanceof Error ? error.message : error
    );
    return json({ error: 'Storage request failed' }, 500);
  }
}

function getBucket(env: Env): R2Bucket | null {
  if (!isEnabled(env.ENABLE_SERVER_STORAGE)) return null;
  if (!env.DIAGRAMS_BUCKET) {
    console.error(
      'ENABLE_SERVER_STORAGE is true but the DIAGRAMS_BUCKET R2 binding is missing'
    );
    return null;
  }
  return env.DIAGRAMS_BUCKET;
}

async function listDiagrams(bucket: R2Bucket): Promise<Response> {
  const diagrams = [];
  let cursor: string | undefined;

  do {
    const page = await bucket.list({ cursor, include: ['customMetadata'] });
    for (const object of page.objects) {
      const id = idFromKey(object.key);
      if (!id) continue;

      const name =
        readNameMetadata(object.customMetadata) ??
        (await readNameFromObject(bucket, object.key));
      if (name === null) continue;

      diagrams.push({
        id,
        name,
        lastModified: object.uploaded.toISOString(),
        size: object.size
      });
    }
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);

  return json(diagrams);
}

async function getDiagram(bucket: R2Bucket, id: string): Promise<Response> {
  const object = await bucket.get(keyFromId(id));
  if (!object) return json({ error: 'Diagram not found' }, 404);
  return new Response(object.body, { headers: jsonHeaders() });
}

async function saveDiagram(
  bucket: R2Bucket,
  request: Request,
  id: string
): Promise<Response> {
  const body = await readJsonBody(request);
  if (body instanceof Response) return body;

  await putDiagram(bucket, id, {
    ...body,
    id,
    lastModified: new Date().toISOString()
  });
  return json({ success: true, id });
}

async function deleteDiagram(bucket: R2Bucket, id: string): Promise<Response> {
  const key = keyFromId(id);
  if (!(await bucket.head(key))) {
    return json({ error: 'Diagram not found' }, 404);
  }
  await bucket.delete(key);
  return json({ success: true });
}

async function createDiagram(
  bucket: R2Bucket,
  request: Request
): Promise<Response> {
  const body = await readJsonBody(request);
  if (body instanceof Response) return body;

  const id = body.id ? String(body.id) : `diagram_${Date.now()}`;
  if (!SAFE_ID.test(id)) return json({ error: 'Invalid diagram ID' }, 400);

  if (await bucket.head(keyFromId(id))) {
    return json({ error: 'Diagram already exists' }, 409);
  }

  const now = new Date().toISOString();
  await putDiagram(bucket, id, {
    ...body,
    id,
    created: now,
    lastModified: now
  });
  return json({ success: true, id }, 201);
}

async function putDiagram(
  bucket: R2Bucket,
  id: string,
  data: DiagramData
): Promise<void> {
  const name = encodeURIComponent(diagramName(data));
  await bucket.put(keyFromId(id), JSON.stringify(data, null, 2), {
    httpMetadata: { contentType: 'application/json' },
    customMetadata:
      name.length <= MAX_NAME_METADATA_LENGTH
        ? { [NAME_METADATA_KEY]: name }
        : undefined
  });
}

async function readJsonBody(request: Request): Promise<DiagramData | Response> {
  const declaredLength = Number(request.headers.get('Content-Length'));
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ error: 'Request body too large' }, 413);
  }

  const buffer = await request.arrayBuffer();
  if (buffer.byteLength > MAX_BODY_BYTES) {
    return json({ error: 'Request body too large' }, 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(new TextDecoder().decode(buffer));
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return json({ error: 'Request body must be a JSON object' }, 400);
  }
  return parsed as DiagramData;
}

function diagramName(data: DiagramData): string {
  const name = data.name || data.title;
  return name ? String(name) : 'Untitled Diagram';
}

function readNameMetadata(
  metadata: Record<string, string> | undefined
): string | undefined {
  const encoded = metadata?.[NAME_METADATA_KEY];
  if (encoded === undefined) return undefined;
  try {
    return decodeURIComponent(encoded);
  } catch {
    return undefined;
  }
}

// Fallback for objects uploaded without metadata, e.g. files migrated from STORAGE_PATH
async function readNameFromObject(
  bucket: R2Bucket,
  key: string
): Promise<string | null> {
  const object = await bucket.get(key);
  if (!object) return null;
  try {
    return diagramName(await object.json<DiagramData>());
  } catch {
    return null;
  }
}

function decodeId(segment: string): string | null {
  let id: string;
  try {
    id = decodeURIComponent(segment);
  } catch {
    return null;
  }
  return SAFE_ID.test(id) ? id : null;
}

function keyFromId(id: string): string {
  return `${id}.json`;
}

function idFromKey(key: string): string | null {
  if (!key.endsWith('.json') || key === 'metadata.json') return null;
  const id = key.slice(0, -'.json'.length);
  return SAFE_ID.test(id) ? id : null;
}

function jsonHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  };
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders() });
}

function methodNotAllowed(): Response {
  return json({ error: 'Method not allowed' }, 405);
}

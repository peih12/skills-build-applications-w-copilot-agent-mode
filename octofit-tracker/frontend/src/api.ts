const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const DEFAULT_API_HOST = "https://bug-free-goggles-77vv9pjvgj3r676-8000.app.github.dev";

export const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : DEFAULT_API_HOST;

export const buildApiUrl = (path: string) => `${apiHost}/api/${path}`;

export async function fetchApi<T>(path: string) {
  const response = await fetch(buildApiUrl(path));
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.statusText}`);
  }
  return (await response.json()) as T;
}

export function normalizeArrayResponse<T>(payload: any, key: string): T[] {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload && Array.isArray(payload[key])) {
    return payload[key] as T[];
  }
  return [];
}

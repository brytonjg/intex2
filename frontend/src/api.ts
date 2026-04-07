const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

export function getApiUrl() {
  return API_URL;
}

export async function apiFetch<T>(path: string): Promise<T> {
  const url = `${API_URL}${path}`;
  console.log(`[API] Fetching: ${url}`);
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`[API] ${res.status} ${res.statusText} from ${url}`);
    throw new Error(`API error: ${res.status} ${res.statusText} — ${url}`);
  }
  return res.json();
}

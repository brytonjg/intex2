import { useState, useEffect } from 'react';
import { apiFetch } from '../api';

export function useApiFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) { setLoading(false); return; }
    let cancelled = false;
    setLoading(true);
    setError(null);
    apiFetch<T>(url)
      .then(d => { if (!cancelled) setData(d); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

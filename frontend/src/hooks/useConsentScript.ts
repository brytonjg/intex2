import { useEffect } from 'react';
import { useConsentGate } from './useConsentGate';
import { deleteAnalyticsCookies } from '../utils/cookies';

interface ConsentScriptOptions {
  category: 'analytics' | 'functional';
  src: string;
  id: string;
  onLoad?: () => void;
}

export function useConsentScript({ category, src, id, onLoad }: ConsentScriptOptions): void {
  const allowed = useConsentGate(category);

  useEffect(() => {
    if (allowed) {
      if (!document.getElementById(id)) {
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.async = true;
        if (onLoad) script.onload = onLoad;
        document.head.appendChild(script);
      }
    } else {
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
      if (category === 'analytics') {
        deleteAnalyticsCookies();
      }
    }
  }, [allowed, id, src, category, onLoad]);
}

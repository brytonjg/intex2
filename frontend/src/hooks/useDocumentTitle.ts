import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} | Beacon of Hope` : 'Beacon of Hope';
  }, [title]);
}

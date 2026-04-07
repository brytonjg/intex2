import { useConsentScript } from '../hooks/useConsentScript';

export default function AnalyticsLoader() {
  useConsentScript({
    category: 'analytics',
    src: 'https://www.googletagmanager.com/gtag/js?id=G-PLACEHOLDER',
    id: 'ga-script',
    onLoad: () => {
      // Initialize GA4 after script loads
      const w = window as unknown as Record<string, unknown>;
      w.dataLayer = w.dataLayer || [];
      function gtag(...args: unknown[]) {
        (w.dataLayer as unknown[]).push(args);
      }
      gtag('js', new Date());
      gtag('config', 'G-PLACEHOLDER');
    },
  });

  return null;
}

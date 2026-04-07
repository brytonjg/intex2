import { useCookieConsent } from '../contexts/CookieConsentContext';

export function useConsentGate(category: 'analytics' | 'functional'): boolean {
  const { categories, consentGiven } = useCookieConsent();
  return consentGiven && categories[category];
}

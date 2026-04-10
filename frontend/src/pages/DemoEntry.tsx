import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiFetch } from '../api';

/**
 * Demo entry point for presentation QR codes.
 * URL: /demo?c=BASE64(email:password)
 *
 * Flow: logs out any existing session, stores credentials
 * in sessionStorage, then redirects to the landing page.
 * When the user navigates to /login, credentials are auto-filled.
 */
export default function DemoEntry() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function setup() {
      // Decode credentials from URL
      const encoded = searchParams.get('c');
      if (encoded) {
        try {
          const decoded = atob(encoded);
          const separatorIndex = decoded.indexOf(':');
          if (separatorIndex > 0) {
            const email = decoded.substring(0, separatorIndex);
            const password = decoded.substring(separatorIndex + 1);
            sessionStorage.setItem('demo_email', email);
            sessionStorage.setItem('demo_password', password);
          }
        } catch {
          // Invalid base64 — ignore
        }
      }

      // Log out any existing session (ignore errors)
      try {
        await apiFetch('/api/auth/logout', { method: 'POST' });
      } catch {
        // Not logged in — fine
      }
      sessionStorage.removeItem('auth_user');

      // Redirect to landing page
      navigate('/', { replace: true });
    }

    setup();
  }, [searchParams, navigate]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#666', fontFamily: 'sans-serif' }}>
      Setting up demo...
    </div>
  );
}

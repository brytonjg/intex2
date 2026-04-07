import { useState, useEffect, useRef } from 'react';
import { useCookieConsent } from '../contexts/CookieConsentContext';
import styles from './CookiePreferencesModal.module.css';

export default function CookiePreferencesModal() {
  const { showPreferences, categories, updateConsent, closePreferencesModal } = useCookieConsent();
  const [analytics, setAnalytics] = useState(categories.analytics);
  const [functional, setFunctional] = useState(categories.functional);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showPreferences) {
      setAnalytics(categories.analytics);
      setFunctional(categories.functional);
    }
  }, [showPreferences, categories]);

  useEffect(() => {
    if (!showPreferences) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePreferencesModal();
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [tabindex]:not([tabindex="-1"]), input'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showPreferences, closePreferencesModal]);

  useEffect(() => {
    if (showPreferences && modalRef.current) {
      const firstButton = modalRef.current.querySelector<HTMLElement>('button');
      firstButton?.focus();
    }
  }, [showPreferences]);

  if (!showPreferences) return null;

  function handleSave() {
    updateConsent({ analytics, functional });
  }

  function handleAcceptAll() {
    updateConsent({ analytics: true, functional: true });
  }

  return (
    <div className={styles.overlay} onClick={closePreferencesModal}>
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-label="Cookie preferences"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
      >
        <h2 className={styles.title}>Cookie Preferences</h2>
        <p className={styles.description}>
          Choose which cookies you would like to allow. You can change these settings at any time.
        </p>

        <div className={styles.categories}>
          <div className={styles.category}>
            <div className={styles.categoryHeader}>
              <div>
                <h3 className={styles.categoryName}>Necessary</h3>
                <p className={styles.categoryDesc}>
                  Session management, security, and consent record. Always enabled.
                </p>
              </div>
              <label className={`${styles.toggle} ${styles.toggleDisabled}`}>
                <input type="checkbox" checked disabled />
                <span className={styles.toggleSlider} />
              </label>
            </div>
          </div>

          <div className={styles.category}>
            <div className={styles.categoryHeader}>
              <div>
                <h3 className={styles.categoryName}>Analytics</h3>
                <p className={styles.categoryDesc}>
                  Anonymized usage statistics to help us improve the site experience.
                </p>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={e => setAnalytics(e.target.checked)}
                />
                <span className={styles.toggleSlider} />
              </label>
            </div>
          </div>

          <div className={styles.category}>
            <div className={styles.categoryHeader}>
              <div>
                <h3 className={styles.categoryName}>Functional</h3>
                <p className={styles.categoryDesc}>
                  UI preferences such as theme selection and display settings.
                </p>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={functional}
                  onChange={e => setFunctional(e.target.checked)}
                />
                <span className={styles.toggleSlider} />
              </label>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={handleSave} className={styles.saveBtn}>
            Save Preferences
          </button>
          <button onClick={handleAcceptAll} className={styles.acceptAllBtn}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

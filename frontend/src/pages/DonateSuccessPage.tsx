import { Link, useSearchParams } from 'react-router-dom';
import { Heart, CheckCircle } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import styles from './DonateSuccessPage.module.css';

export default function DonateSuccessPage() {
  useDocumentTitle('Donation Successful');
  const [params] = useSearchParams();
  const amount = parseFloat(params.get('amount') ?? '0');
  const isRecurring = params.get('recurring') === 'true';
  const email = params.get('email');

  if (!amount) {
    return (
      <main className={styles.page}>
        <div className={styles.card}>
          <p className={styles.error}>No donation information found.</p>
          <Link to="/donate" className={styles.link}>Make a donation</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <CheckCircle size={48} className={styles.icon} />
        <h1 className={styles.title}>Thank You!</h1>
        <p className={styles.amount}>
          ${amount.toLocaleString()}
          {isRecurring && <span className={styles.freq}> recurring</span>}
        </p>
        <p className={styles.message}>
          Your generous donation will help provide safe shelter, education, and counseling
          for survivors of abuse and trafficking.
        </p>
        {email && (
          <p className={styles.receipt}>A receipt will be sent to <strong>{email}</strong>.</p>
        )}
        <div className={styles.actions}>
          <Link to="/" className={styles.btnPrimary}>
            <Heart size={16} /> Back to Home
          </Link>
          <Link to="/impact" className={styles.btnSecondary}>
            See Our Impact
          </Link>
        </div>
      </div>
    </main>
  );
}

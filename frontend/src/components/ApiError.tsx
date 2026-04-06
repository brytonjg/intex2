import { AlertTriangle } from 'lucide-react';
import styles from './ApiError.module.css';

export function ApiError({ message = 'Unable to reach the server. Please try again later.' }: { message?: string }) {
  return (
    <div className={styles.banner} role="alert">
      <AlertTriangle size={18} />
      <p>{message}</p>
    </div>
  );
}

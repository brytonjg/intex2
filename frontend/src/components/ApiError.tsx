import { AlertTriangle } from 'lucide-react';
import { getApiUrl } from '../api';
import styles from './ApiError.module.css';

export function ApiError({ message }: { message?: string }) {
  const apiUrl = getApiUrl();
  return (
    <div className={styles.banner} role="alert">
      <AlertTriangle size={18} />
      <div>
        <p>{message ?? 'Unable to reach the server. Please try again later.'}</p>
        <p className={styles.detail}>API target: {apiUrl}</p>
      </div>
    </div>
  );
}

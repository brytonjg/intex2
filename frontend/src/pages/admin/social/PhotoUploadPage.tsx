import { useState, useRef } from 'react';
import { Camera, Upload, Check, AlertCircle } from 'lucide-react';
import { apiFetch } from '../../../api';
import styles from './PhotoUploadPage.module.css';

const ACTIVITY_TYPES = [
  { value: 'art_therapy', label: 'Art Therapy' },
  { value: 'sports', label: 'Sports' },
  { value: 'meal', label: 'Meal' },
  { value: 'outing', label: 'Outing' },
  { value: 'celebration', label: 'Celebration' },
  { value: 'daily_life', label: 'Daily Life' },
  { value: 'facility', label: 'Facility' },
  { value: 'other', label: 'Other' },
];

export default function PhotoUploadPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [activityType, setActivityType] = useState('daily_life');
  const [consent, setConsent] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError('Photo must be under 10MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    setError(null);
    setSuccess(false);
  }

  async function handleSubmit() {
    if (!consent) {
      setError('You must confirm consent before uploading.');
      return;
    }
    if (!preview) {
      setError('Please select a photo first.');
      return;
    }

    setUploading(true);
    setError(null);
    try {
      // For MVP, store the file path as a placeholder. Real implementation would upload to blob storage.
      const filePath = `/media/library/upload_${Date.now()}.jpg`;
      await apiFetch('/api/social/media/upload', {
        method: 'POST',
        body: JSON.stringify({
          filePath,
          thumbnailPath: filePath,
          caption: caption || null,
          activityType,
          consentConfirmed: true,
        }),
      });
      setSuccess(true);
      setPreview(null);
      setCaption('');
      setConsent(false);
      if (fileRef.current) fileRef.current.value = '';
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function reset() {
    setSuccess(false);
    setPreview(null);
    setCaption('');
    setConsent(false);
    setError(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.successCard}>
          <Check size={48} className={styles.successIcon} />
          <h2>Photo uploaded!</h2>
          <p>It's now in the media library and available for post generation.</p>
          <button className={styles.primaryBtn} onClick={reset}>Upload Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Upload Photo</h1>
      <p className={styles.subtitle}>Capture a moment at the safehouse. The AI will turn it into social media content.</p>

      <div className={styles.uploadArea} onClick={() => fileRef.current?.click()}>
        {preview ? (
          <img src={preview} alt="Preview" className={styles.preview} />
        ) : (
          <div className={styles.placeholder}>
            <Camera size={48} />
            <p>Tap to take a photo or select one</p>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
      </div>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="Caption (optional — even 'art therapy' is enough)"
          value={caption}
          onChange={e => setCaption(e.target.value)}
          className={styles.captionInput}
        />

        <select value={activityType} onChange={e => setActivityType(e.target.value)} className={styles.select}>
          {ACTIVITY_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        <label className={styles.consentLabel}>
          <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
          Everyone pictured has given consent for this photo to be shared publicly
        </label>

        {error && (
          <div className={styles.error}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={uploading || !preview || !consent}
        >
          {uploading ? 'Uploading...' : <><Upload size={16} /> Upload Photo</>}
        </button>
      </div>
    </div>
  );
}

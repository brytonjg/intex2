import { useState, useEffect } from 'react';
import { Loader2, Save } from 'lucide-react';
import { apiFetch } from '../../../api';
import styles from './SocialSettingsPage.module.css';

interface Settings {
  postsPerWeek: number;
  platformsActive: string;
  timezone: string;
  recyclingEnabled: boolean;
  dailyGenerationTime: string;
  notificationMethod: string;
  notificationEmail: string;
  pillarRatioSafehouseLife: number;
  pillarRatioTheProblem: number;
  pillarRatioTheSolution: number;
  pillarRatioDonorImpact: number;
  pillarRatioCallToAction: number;
}

export default function SocialSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Settings>('/api/admin/social/settings')
      .then(s => setSettings(s))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    setSaved(false);
    try {
      await apiFetch('/api/admin/social/settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  function update(field: keyof Settings, value: string | number | boolean) {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
    setSaved(false);
  }

  if (loading) return <div className={styles.loading}><Loader2 className={styles.spin} size={24} /> Loading settings...</div>;
  if (!settings) return <div className={styles.error}>Failed to load settings</div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Social Media Settings</h1>
        <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className={styles.spin} size={16} /> : saved ? <><Save size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      {error && <div className={styles.errorMsg}>{error}</div>}

      <section className={styles.section}>
        <h2>Output Volume</h2>
        <div className={styles.field}>
          <label>Posts per week</label>
          <input type="number" min={1} max={50} value={settings.postsPerWeek} onChange={e => update('postsPerWeek', parseInt(e.target.value) || 10)} />
        </div>
        <div className={styles.field}>
          <label>Active platforms</label>
          <div className={styles.checkboxGroup}>
            {['instagram', 'facebook', 'twitter'].map(p => {
              const active = (settings.platformsActive || '').includes(p);
              return (
                <label key={p} className={styles.checkbox}>
                  <input type="checkbox" checked={active} onChange={() => {
                    let current: string[] = [];
                    try { current = JSON.parse(settings.platformsActive || '[]'); } catch {}
                    const next = active ? current.filter(x => x !== p) : [...current, p];
                    update('platformsActive', JSON.stringify(next));
                  }} />
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </label>
              );
            })}
          </div>
        </div>
        <div className={styles.field}>
          <label>Timezone</label>
          <input type="text" value={settings.timezone || ''} onChange={e => update('timezone', e.target.value)} placeholder="Asia/Manila" />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Notifications</h2>
        <div className={styles.field}>
          <label>Method</label>
          <select value={settings.notificationMethod || 'in_app'} onChange={e => update('notificationMethod', e.target.value)}>
            <option value="in_app">In-app only</option>
            <option value="email">Email only</option>
            <option value="both">Both</option>
          </select>
        </div>
        {(settings.notificationMethod === 'email' || settings.notificationMethod === 'both') && (
          <div className={styles.field}>
            <label>Email address</label>
            <input type="email" value={settings.notificationEmail || ''} onChange={e => update('notificationEmail', e.target.value)} />
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2>Content Recycling</h2>
        <label className={styles.toggle}>
          <input type="checkbox" checked={settings.recyclingEnabled} onChange={e => update('recyclingEnabled', e.target.checked)} />
          Enable content recycling (high-performing posts are rephrased and reused)
        </label>
      </section>

      <section className={styles.section}>
        <h2>Pillar Distribution <span className={styles.aiTag}>AI-managed</span></h2>
        <p className={styles.hint}>The AI adjusts these over time based on engagement data. Override here if needed.</p>
        {([
          ['pillarRatioSafehouseLife', 'Safehouse Life'],
          ['pillarRatioTheProblem', 'The Problem'],
          ['pillarRatioTheSolution', 'The Solution'],
          ['pillarRatioDonorImpact', 'Donor Impact'],
          ['pillarRatioCallToAction', 'Call to Action'],
        ] as [keyof Settings, string][]).map(([key, label]) => (
          <div key={key} className={styles.ratioField}>
            <label>{label}</label>
            <input type="number" min={0} max={100} value={settings[key] as number} onChange={e => update(key, parseInt(e.target.value) || 0)} />
            <span>%</span>
          </div>
        ))}
      </section>
    </div>
  );
}

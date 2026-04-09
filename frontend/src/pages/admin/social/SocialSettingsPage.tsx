import { useState, useEffect } from 'react';
import { Loader2, Save, HelpCircle } from 'lucide-react';
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
          <select value={settings.timezone || ''} onChange={e => update('timezone', e.target.value)}>
            <option value="">Select timezone...</option>
            <option value="Pacific/Honolulu">Hawaii (UTC-10)</option>
            <option value="America/Anchorage">Alaska (UTC-9)</option>
            <option value="America/Los_Angeles">Pacific (UTC-8)</option>
            <option value="America/Denver">Mountain (UTC-7)</option>
            <option value="America/Chicago">Central (UTC-6)</option>
            <option value="America/New_York">Eastern (UTC-5)</option>
            <option value="America/Sao_Paulo">Brasilia (UTC-3)</option>
            <option value="Europe/London">London (UTC+0)</option>
            <option value="Europe/Paris">Central Europe (UTC+1)</option>
            <option value="Europe/Helsinki">Eastern Europe (UTC+2)</option>
            <option value="Asia/Dubai">Dubai (UTC+4)</option>
            <option value="Asia/Kolkata">India (UTC+5:30)</option>
            <option value="Asia/Bangkok">Bangkok (UTC+7)</option>
            <option value="Asia/Manila">Manila (UTC+8)</option>
            <option value="Asia/Shanghai">China (UTC+8)</option>
            <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
            <option value="Australia/Sydney">Sydney (UTC+11)</option>
            <option value="Pacific/Auckland">Auckland (UTC+12)</option>
          </select>
        </div>
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
          ['pillarRatioSafehouseLife', 'Safehouse Life', 'Photos and stories from daily life at the safehouses — art therapy, meals, celebrations. The warm, human content that builds emotional connection with followers.'],
          ['pillarRatioTheProblem', 'The Problem', 'Educational content about trafficking, abuse statistics, and the conditions these girls face. Raises awareness and motivates new donors to care.'],
          ['pillarRatioTheSolution', 'The Solution', 'What the organization does differently — the safehouse model, counseling, education, health services. Builds credibility and shows competence.'],
          ['pillarRatioDonorImpact', 'Donor Impact', 'Shows supporters what their money does — safehouses funded, meals served, programs running. Retains existing donors by connecting dollars to operations.'],
          ['pillarRatioCallToAction', 'Call to Action', 'Direct fundraising asks, volunteer recruitment, event promotions. Kept low so followers don\'t feel sold to, but essential for conversion.'],
        ] as [keyof Settings, string, string][]).map(([key, label, tooltip]) => (
          <div key={key} className={styles.ratioField}>
            <label>{label}</label>
            <span className={styles.tooltipWrap}>
              <HelpCircle size={14} className={styles.helpIcon} />
              <span className={styles.tooltip}>{tooltip}</span>
            </span>
            <input type="number" min={0} max={100} value={settings[key] as number} onChange={e => update(key, parseInt(e.target.value) || 0)} />
            <span>%</span>
          </div>
        ))}
      </section>
    </div>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Users, Plus, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { apiFetch } from '../../api';
import { APP_TODAY, APP_TODAY_STR } from '../../constants';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import Pagination from '../../components/admin/Pagination';
import Dropdown from '../../components/admin/Dropdown';
import styles from './CaseConferencesPage.module.css';

interface ConferenceItem {
  planId: number;
  residentId: number;
  residentCode: string | null;
  planCategory: string | null;
  planDescription: string | null;
  status: string | null;
  caseConferenceDate: string | null;
  targetDate: string | null;
  targetValue: number | null;
  servicesProvided: string | null;
}

interface ResidentOption {
  residentId: number;
  internalCode: string;
}

/* ── Helpers ─────────────────────────────────────── */

function fmtDate(d: Date): string { return d.toISOString().split('T')[0]; }

const CATEGORIES = ['Rehabilitation', 'Education', 'Health', 'Reintegration', 'Protection'];

const STATUS_COLORS: Record<string, string> = {
  Open: '#3498db', 'In Progress': '#f39c12', Achieved: '#27ae60', Closed: '#95a5a6',
};

/* ── Component ───────────────────────────────────── */

export default function CaseConferencesPage() {
  useDocumentTitle('Case Conferences');
  const navigate = useNavigate();
  const [plans, setPlans] = useState<ConferenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [residents, setResidents] = useState<ResidentOption[]>([]);
  const [formResidentId, setFormResidentId] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formDate, setFormDate] = useState(APP_TODAY_STR);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch<ConferenceItem[]>('/api/admin/intervention-plans');
      setPlans(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPlans(); }, [fetchPlans]);

  useEffect(() => {
    if (showModal && residents.length === 0) {
      apiFetch<ResidentOption[]>('/api/admin/residents-list').then(setResidents).catch(() => {});
    }
  }, [showModal, residents.length]);

  function openModal() {
    setFormResidentId('');
    setFormCategory('');
    setFormDescription('');
    setFormDate(APP_TODAY_STR);
    setFormError(null);
    setShowModal(true);
  }

  async function handleSubmit() {
    if (!formResidentId || !formDate) {
      setFormError('Resident and conference date are required.');
      return;
    }
    setFormSubmitting(true);
    setFormError(null);
    try {
      await apiFetch('/api/admin/intervention-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          residentId: Number(formResidentId),
          planCategory: formCategory || null,
          planDescription: formDescription || null,
          caseConferenceDate: formDate,
          status: 'Open',
        }),
      });
      setShowModal(false);
      fetchPlans();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to schedule');
    } finally {
      setFormSubmitting(false);
    }
  }

  const upcoming = plans.filter(p => p.caseConferenceDate && new Date(p.caseConferenceDate) >= APP_TODAY);
  const allPast = plans.filter(p => !p.caseConferenceDate || new Date(p.caseConferenceDate) < APP_TODAY);
  const past = allPast.slice((page - 1) * pageSize, page * pageSize);

  /* ── Mini calendar helpers ──────────────────────── */
  const selDate = new Date(formDate + 'T00:00:00');
  const calMonth = new Date(selDate.getFullYear(), selDate.getMonth(), 1);
  const calMonthEnd = new Date(selDate.getFullYear(), selDate.getMonth() + 1, 0);
  const startDay = (calMonth.getDay() + 6) % 7;
  const daysInMonth = calMonthEnd.getDate();
  const calDays: (number | null)[] = Array(startDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) calDays.push(d);

  function shiftMonth(delta: number) {
    const d = new Date(selDate);
    d.setMonth(d.getMonth() + delta);
    d.setDate(1);
    setFormDate(fmtDate(d));
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Case Conferences</h1>
          <p className={styles.subtitle}>Intervention plans and case conference scheduling</p>
        </div>
        <button className={styles.addBtn} onClick={openModal}>
          <Plus size={16} /> Schedule Conference
        </button>
      </header>

      {loading ? (
        <div className={styles.loading}><Loader2 size={24} className={styles.spinner} /> Loading...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <>
          {upcoming.length > 0 && (
            <div>
              <h2 className={styles.sectionTitle}>
                <Users size={18} /> Upcoming Conferences ({upcoming.length})
              </h2>
              <div className={styles.cardGrid}>
                {upcoming.map(p => {
                  const color = STATUS_COLORS[p.status || ''] || '#95a5a6';
                  return (
                    <div key={p.planId} className={styles.card} onClick={() => navigate(`/admin/caseload/${p.residentId}`)}>
                      <div className={styles.cardHeader}>
                        <span className={styles.cardResident}>{p.residentCode || `Resident #${p.residentId}`}</span>
                        <span className={styles.statusBadge} style={{ background: `${color}18`, color }}>{p.status}</span>
                      </div>
                      <div className={styles.cardMeta}>
                        {p.planCategory} {p.caseConferenceDate && `— ${p.caseConferenceDate}`}
                      </div>
                      <div className={styles.cardDesc}>
                        {p.planDescription ? (p.planDescription.length > 100 ? p.planDescription.slice(0, 100) + '...' : p.planDescription) : 'No description'}
                      </div>
                      {p.targetValue != null && (
                        <div className={styles.cardTarget}>Target: {p.targetValue} {p.targetDate && `by ${p.targetDate}`}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <h2 className={styles.sectionTitle}>All Intervention Plans ({allPast.length})</h2>
            {allPast.length === 0 ? (
              <div className={styles.empty}>No intervention plans found.</div>
            ) : (
              <>
                <div className={styles.tableCard}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Resident</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Target</th>
                        <th>Conference Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {past.map(p => {
                        const color = STATUS_COLORS[p.status || ''] || '#95a5a6';
                        return (
                          <tr key={p.planId} onClick={() => navigate(`/admin/caseload/${p.residentId}`)}>
                            <td style={{ fontWeight: 600, color: 'var(--color-sage)' }}>{p.residentCode || '-'}</td>
                            <td>{p.planCategory || '-'}</td>
                            <td>{p.planDescription ? (p.planDescription.length > 60 ? p.planDescription.slice(0, 60) + '...' : p.planDescription) : '-'}</td>
                            <td>
                              <span className={styles.statusBadge} style={{ background: `${color}18`, color }}>
                                {p.status || '-'}
                              </span>
                            </td>
                            <td>{p.targetValue != null ? p.targetValue : '-'}</td>
                            <td>{p.caseConferenceDate || '-'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination page={page} pageSize={pageSize} totalCount={allPast.length} onPageChange={setPage} />
              </>
            )}
          </div>
        </>
      )}

      {/* Schedule conference modal */}
      {showModal && (
        <div className={styles.overlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Schedule Conference</h3>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}><X size={16} /></button>
            </div>

            <div className={styles.modalBody}>
              {/* Resident dropdown */}
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Resident</span>
                <Dropdown
                  value={formResidentId}
                  placeholder="Select resident..."
                  options={residents.map(r => ({ value: String(r.residentId), label: r.internalCode }))}
                  onChange={setFormResidentId}
                />
              </div>

              {/* Category dropdown */}
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Category</span>
                <Dropdown
                  value={formCategory}
                  placeholder="Select category..."
                  options={CATEGORIES.map(c => ({ value: c, label: c }))}
                  onChange={setFormCategory}
                />
              </div>

              {/* Mini calendar */}
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Conference Date</span>
                <div className={styles.miniCal}>
                  <div className={styles.miniCalNav}>
                    <button className={styles.navBtn} onClick={() => shiftMonth(-1)}><ChevronLeft size={14} /></button>
                    <span className={styles.miniCalMonth}>
                      {calMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button className={styles.navBtn} onClick={() => shiftMonth(1)}><ChevronRight size={14} /></button>
                  </div>
                  <div className={styles.miniCalGrid}>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <div key={i} className={styles.miniCalDayLabel}>{d}</div>
                    ))}
                    {calDays.map((day, i) => {
                      if (day === null) return <div key={`e-${i}`} />;
                      const dateStr = fmtDate(new Date(calMonth.getFullYear(), calMonth.getMonth(), day));
                      const isSelected = dateStr === formDate;
                      const isToday = dateStr === APP_TODAY_STR;
                      return (
                        <button
                          key={day}
                          type="button"
                          className={`${styles.miniCalDay} ${isSelected ? styles.miniCalDaySelected : ''} ${isToday && !isSelected ? styles.miniCalDayToday : ''}`}
                          onClick={() => setFormDate(dateStr)}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Description (optional)</span>
                <textarea
                  className={styles.textarea}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  rows={2}
                  placeholder="Add notes about this conference..."
                />
              </div>

              {formError && <p className={styles.formError}>{formError}</p>}
            </div>

            <div className={styles.modalFooter}>
              <p className={styles.footerSummary}>
                <Calendar size={14} />
                {selDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
              <div className={styles.footerActions}>
                <button className={styles.btn} onClick={() => setShowModal(false)}>Cancel</button>
                <button className={styles.btnPrimary} onClick={handleSubmit} disabled={formSubmitting}>
                  {formSubmitting ? 'Scheduling...' : 'Schedule'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

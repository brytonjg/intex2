import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, UserPlus, LogOut, ArrowRight, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Header.module.css';

function NewsletterBar() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.newsletterBar}>
        <div className={styles.newsletterInner}>
          <span className={styles.newsletterThanks}>Thanks for subscribing!</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.newsletterBar}>
      <div className={styles.newsletterInner}>
        <div className={styles.newsletterLabel}>
          <Mail size={14} />
          <span>Get monthly impact updates</span>
        </div>
        <form className={styles.newsletterForm} onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.newsletterBtn} aria-label="Subscribe">
            <ArrowRight size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <>
    <NewsletterBar />
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>&#9670;</span>
          <span className={styles.logoText}>Beacon of Hope</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <Link to="/" className={styles.navLink} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <a href="/#mission" className={styles.navLink} onClick={() => setMenuOpen(false)}>
            Our Mission
          </a>
          <Link to="/impact" className={styles.navLink} onClick={() => setMenuOpen(false)}>
            Impact
          </Link>
          <a href="/#involved" className={styles.navLink} onClick={() => setMenuOpen(false)}>
            Get Involved
          </a>
        </nav>

        <div className={styles.actions}>
          {isAuthenticated && user ? (
            <>
              <Link to={user.roles?.includes('Admin') || user.roles?.includes('Staff') ? '/admin' : '/donor'} className={styles.loginBtn}>
                <User size={16} />
                <span>{user.roles?.includes('Admin') || user.roles?.includes('Staff') ? 'Admin Dashboard' : user.firstName}</span>
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className={styles.signupBtn}>
                <UserPlus size={16} />
                <span>Become a Donor</span>
              </Link>
              <Link to="/login" className={styles.loginBtn}>
                <User size={16} />
                <span>Login</span>
              </Link>
            </>
          )}
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
    </>
  );
}

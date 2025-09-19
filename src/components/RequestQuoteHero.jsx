import React, { useState, useEffect, useRef } from 'react';
import "../styles/RequestQuoteHero.css";
// leftImage still comes from local import (kept as you had it)
import leftImage from '../images/quote.jpg';

export default function RequestQuoteHero({
  // heroImageProp not used for background anymore, but kept as prop if you want it elsewhere
  heroImageProp = '',
  leftImageProp = leftImage,
  onSubmit = async (payload) => {
    return new Promise((res) => setTimeout(() => res({ ok: true, id: 'Q-12345' }), 900));
  }
}) {
  const [showModal, setShowModal] = useState(false);
  const [inline, setInline] = useState({ email: '', company: '', product: '' });
  const [modalData, setModalData] = useState({
    name: '', email: '', phone: '', company: '', product: '', qty: '', notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // theme detection (listens to body.dark-mode)
  const [darkMode, setDarkMode] = useState(
    () => (typeof document !== 'undefined') && (document.body.classList.contains('dark-mode') || localStorage.getItem('darkMode') === 'true')
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const mo = new MutationObserver(() => {
      setDarkMode(document.body.classList.contains('dark-mode'));
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  // intersection observer for animation trigger
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ----- WhatsApp helper (open or copy) -----
  const WHATSAPP_NUMBER = "919552633490"; // target number (international format, no '+')
  const [waStatus, setWaStatus] = useState('');

  const buildWhatsAppMessageFromInline = () => {
    const now = new Date().toLocaleString();
    let msg = `Hello,\nI would like a quick quote.\n\n`;
    msg += `Email: ${inline.email || '-'}\n`;
    msg += `Company: ${inline.company || '-'}\n`;
    msg += `Product of interest: ${inline.product || '-'}\n\n`;

    try {
      const brochureUrl = `${window.location.origin}/brochure.pdf`;
      msg += `Brochure: ${brochureUrl}\n`;
    } catch (err) {
      // ignore if window not available
    }

    msg += `Sent at: ${now}\n\nThanks!`;
    return msg;
  };

  const buildWhatsAppMessageFromModal = () => {
    const now = new Date().toLocaleString();
    let msg = `Hello,\nI am submitting a full quote request.\n\n`;
    msg += `Name: ${modalData.name || '-'}\n`;
    msg += `Company: ${modalData.company || '-'}\n`;
    msg += `Email: ${modalData.email || '-'}\n`;
    msg += `Phone: ${modalData.phone || '-'}\n`;
    msg += `Product / SKU: ${modalData.product || '-'}\n`;
    msg += `Qty: ${modalData.qty || '-'}\n`;
    msg += `Notes: ${modalData.notes || '-'}\n\n`;

    try {
      const brochureUrl = `${window.location.origin}/brochure.pdf`;
      msg += `Brochure: ${brochureUrl}\n`;
    } catch (err) {}

    msg += `Sent at: ${now}\n\nThanks!`;
    return msg;
  };

  const openWhatsAppOrCopy = async ({ mode = 'quick' } = {}) => {
    const msg = mode === 'quick' ? buildWhatsAppMessageFromInline() : buildWhatsAppMessageFromModal();
    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

    setWaStatus('Opening WhatsApp...');

    // Try to open WhatsApp
    try {
      const newWin = window.open(waUrl, '_blank', 'noopener,noreferrer');
      if (newWin) {
        setWaStatus('WhatsApp opened — remember to press Send.');
        setTimeout(() => setWaStatus(''), 4000);
        return;
      }
    } catch (err) {
      // swallow and fallback
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(msg);
      setWaStatus('Message copied to clipboard — open WhatsApp and paste (Ctrl+V / ⌘V).');
      setTimeout(() => setWaStatus(''), 6000);
    } catch (err) {
      // final fallback: show prompt/alert with message
      // eslint-disable-next-line no-alert
      alert(`Please send this message to +91 9552633490:\n\n${msg}`);
      setWaStatus('');
    }
  };

  // ----- Modified handlers -----
  // Quick Quote: open WhatsApp (no onSubmit)
  const handleInlineQuickQuote = (e) => {
    e.preventDefault();
    // basic validation
    if (!inline.email || !inline.company) {
      setWaStatus('Please enter email and company before sending.');
      setTimeout(() => setWaStatus(''), 3000);
      return;
    }
    openWhatsAppOrCopy({ mode: 'quick' });
  };

  // Modal submit: call onSubmit then open WhatsApp with modal data after success
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const resp = await onSubmit({ type: 'full', ...modalData });
      setSuccessMsg(`Request submitted. Quote ID: ${resp.id || 'N/A'}`);
      // after saving, open WhatsApp with modal details
      openWhatsAppOrCopy({ mode: 'full' });
      // clear modal fields & close
      setModalData({ name: '', email: '', phone: '', company: '', product: '', qty: '', notes: '' });
      setShowModal(false);
      setTimeout(() => setSuccessMsg(''), 7000);
    } catch (err) {
      setErrorMsg('Failed to submit — please try again later.');
    } finally {
      setLoading(false);
    }
  };

  /* SVG icons - unchanged (kept inline) */
  const EmailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CompanyIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 8H7V12H9V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 8H15V12H17V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 16H7V18H9V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 16H15V18H17V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ProductIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 7H4C2.9 7 2 7.9 2 9V15C2 16.1 2.9 17 4 17H20C21.1 17 22 16.1 22 15V9C22 7.9 21.1 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 21V19C16 17.9 15.1 17 14 17H10C8.9 17 8 17.9 8 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21V19C20 17.139 18.66 15.574 16.92 15.199C16.58 15.12 16.24 15.06 15.9 15.02" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.5 21C15.5 18.2386 12.8142 16 9.5 16C6.18578 16 3.5 18.2386 3.5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16.92V19.92C22 20.52 21.46 21 20.82 21C10.26 21 2 12.74 2 2.18C2 1.54 2.48 1 3.08 1H6.08C6.68 1 7.16 1.48 7.16 2.08C7.24 3.76 7.58 5.38 8.16 6.9C8.3 7.3 8.16 7.74 7.84 8.02L5.78 10.08C7.58 13.62 10.38 16.42 13.92 18.22L15.98 16.16C16.26 15.84 16.7 15.7 17.1 15.84C18.62 16.42 20.24 16.76 21.92 16.84C22.52 16.92 22 17.4 22 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const QuantityIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 7H20V21H4V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const FileIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const NotesIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 6H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 7H20V21H4V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const LoadingSpinner = () => (
    <svg className="rq-spinner" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" fill="currentColor" opacity="0.25"/>
      <path d="M12,1a11,11,0,1,0,11,11A11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" fill="currentColor" opacity="0.75">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.75s" repeatCount="indefinite"/>
      </path>
    </svg>
  );

  return (
    <section
      ref={rootRef}
      className={`rq-hero ${visible ? 'is-visible' : ''} ${darkMode ? 'theme-dark' : 'theme-light'}`}
      aria-label="Hero - Request Quote"
    >
      <header className="rq-navbar">
        <div className="rq-brand"></div>
        <div className="rq-actions">
          <a className="rq-link" href="/products">Products</a>
          <button className="rq-btn rq-primary rq-btn-icon" onClick={() => setShowModal(true)}>
            Request Quote
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </header>

      <div className="rq-hero-inner">
        <div className="rq-left-image" aria-hidden>
          <div className="rq-left-card">
            <img src={leftImageProp} alt="Home decor showing the product in use" onError={(e) => {
              e.currentTarget.style.display = 'none';
            }} />
            <div className="rq-floating-tag">
              <span>Custom Made</span>
            </div>
          </div>
        </div>

        <div className="rq-content">
          <h1 className="rq-h1">
           <span className="rq-title-line">Got a Project?</span>
<span className="rq-title-line">We’ll Quote It.</span>
<span className="rq-title-line">You Approve — We Build.</span>

          </h1>
          <p className="rq-sub">Beautifully designed hardware that makes every home unique.</p>

          <div className="rq-ctas">
            <button className="rq-btn rq-primary rq-btn-icon" onClick={() => setShowModal(true)}>
              Request Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a
  href="/brochure.pdf"
  className="rq-btn rq-secondary rq-btn-icon"
  target="_blank"
  rel="noopener noreferrer"
>
              Download Brochure
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/shop" className="rq-link small rq-link-icon">
              Explore Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <form className="rq-inline-form" onSubmit={handleInlineQuickQuote}>
            <div className="rq-input-with-icon">
              <EmailIcon />
              <input
                type="email"
                placeholder="Enter your work email"
                value={inline.email}
                onChange={(e) => setInline(s => ({ ...s, email: e.target.value }))}
                required
              />
            </div>
            <div className="rq-input-with-icon">
              <CompanyIcon />
              <input
                type="text"
                placeholder="Company name"
                value={inline.company}
                onChange={(e) => setInline(s => ({ ...s, company: e.target.value }))}
                required
              />
            </div>
            <div className="rq-input-with-icon">
              <ProductIcon />
              <select
                value={inline.product}
                onChange={(e) => setInline(s => ({ ...s, product: e.target.value }))}
                aria-label="Product of interest"
              >
                <option value="">Product of interest</option>
                <option value="enclosure">Enclosures</option>
                <option value="connector">Connectors</option>
                <option value="assembly">Assemblies</option>
              </select>
            </div>
            <button className="rq-btn rq-inline rq-btn-icon" type="submit" disabled={loading}>
              {loading ? <LoadingSpinner /> : 'Quick Quote (WhatsApp)'}
              {!loading && <CheckIcon />}
            </button>
          </form>

          {successMsg && (
            <div className="rq-success rq-message-with-icon" role="status">
              <CheckIcon />
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="rq-error rq-message-with-icon" role="alert">
              <CloseIcon />
              {errorMsg}
            </div>
          )}

          {waStatus && (
            <div className="rq-wa-status" role="status" aria-live="polite">
              {waStatus}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="rq-modal-backdrop" onClick={() => !loading && setShowModal(false)}>
          <div className="rq-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button
              className="rq-modal-close"
              onClick={() => setShowModal(false)}
              disabled={loading}
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>
            <h3>Request a Quote</h3>
            <p className="muted">Please provide details and we will get back within 2 business days.</p>
            <form onSubmit={handleModalSubmit} className="rq-modal-form">
              <div className="row">
                <label className="rq-input-with-icon">
                  <UserIcon />
                  <input
                    placeholder="Name"
                    value={modalData.name}
                    onChange={(e) => setModalData(s => ({ ...s, name: e.target.value }))}
                    required
                  />
                </label>
                <label className="rq-input-with-icon">
                  <CompanyIcon />
                  <input
                    placeholder="Company"
                    value={modalData.company}
                    onChange={(e) => setModalData(s => ({ ...s, company: e.target.value }))}
                    required
                  />
                </label>
              </div>
              <div className="row">
                <label className="rq-input-with-icon">
                  <EmailIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    value={modalData.email}
                    onChange={(e) => setModalData(s => ({ ...s, email: e.target.value }))}
                    required
                  />
                </label>
                <label className="rq-input-with-icon">
                  <PhoneIcon />
                  <input
                    placeholder="Phone"
                    value={modalData.phone}
                    onChange={(e) => setModalData(s => ({ ...s, phone: e.target.value }))}
                  />
                </label>
              </div>
              <label className="rq-input-with-icon">
                <ProductIcon />
                <input
                  placeholder="Product / SKU"
                  value={modalData.product}
                  onChange={(e) => setModalData(s => ({ ...s, product: e.target.value }))}
                />
              </label>
              <div className="row">
                <label className="rq-input-with-icon">
                  <QuantityIcon />
                  <input
                    placeholder="Quantity (est.)"
                    value={modalData.qty}
                    onChange={(e) => setModalData(s => ({ ...s, qty: e.target.value }))}
                  />
                </label>
                <label className="rq-input-with-icon">
                  <FileIcon />
                  <input
                    type="file"
                    accept=".pdf,.zip,.dwg"
                    className="rq-file-input"
                  />
                </label>
              </div>
              <label className="rq-input-with-icon">
                <NotesIcon />
                <textarea
                  placeholder="Notes"
                  value={modalData.notes}
                  onChange={(e) => setModalData(s => ({ ...s, notes: e.target.value }))}
                  rows={3}
                />
              </label>
              <div className="modal-actions">
                <button
                  type="button"
                  className="rq-btn rq-outline"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rq-btn rq-primary rq-btn-icon"
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : 'Submit Request (Save & WhatsApp)'}
                  {!loading && <CheckIcon />}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

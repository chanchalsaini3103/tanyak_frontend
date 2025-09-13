import React, { useState, useEffect, useRef } from 'react';
import '../styles/RequestQuoteHero.css';

export default function RequestQuoteHero({
  heroImage = '/images/hero-product-1920x1280.jpg',
  onSubmit = async (payload) => {
    // Replace with your backend API call
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
    () => document.body.classList.contains('dark-mode') || localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
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
    if (!el) return;
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

  const handleInlineSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const resp = await onSubmit({ type: 'quick', ...inline });
      setSuccessMsg(`Thanks! We will contact you soon. Ref: ${resp.id || 'N/A'}`);
      setInline({ email: '', company: '', product: '' });
      setTimeout(() => setSuccessMsg(''), 6000);
    } catch {
      setErrorMsg('Something went wrong — try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const resp = await onSubmit({ type: 'full', ...modalData });
      setSuccessMsg(`Request submitted. Quote ID: ${resp.id || 'N/A'}`);
      setModalData({ name: '', email: '', phone: '', company: '', product: '', qty: '', notes: '' });
      setShowModal(false);
      setTimeout(() => setSuccessMsg(''), 8000);
    } catch {
      setErrorMsg('Failed to submit — please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={rootRef}
      className={`rq-hero ${visible ? 'is-visible' : ''} ${darkMode ? 'theme-dark' : 'theme-light'}`}
      style={{ backgroundImage: `url(${heroImage})` }}
      aria-label="Hero - Request Quote"
    >
      <div className="rq-topstrip">Made in India • ISO 9001 • ISO 14001</div>

      <header className="rq-navbar">
        <div className="rq-brand"></div>
        <div className="rq-actions">
          <a className="rq-link" href="/products">Products</a>
          <button className="rq-btn rq-primary" onClick={() => setShowModal(true)}>Request Quote</button>
        </div>
      </header>

      <div className="rq-hero-inner">
        <div className="rq-left-image" aria-hidden>
          <div className="rq-left-card">
            <img src="/images/home-decor-left.jpg" alt="Home decor showing the product in use" />
          </div>
        </div>

        <div className="rq-content">
          <h1 className="rq-h1">Handcrafted. Laser-Cut. Uniquely Made.</h1>
          <p className="rq-sub">Beautifully designed hardware that makes every home unique.</p>

          <div className="rq-ctas">
            <button className="rq-btn rq-primary" onClick={() => setShowModal(true)}>Request Quote</button>
            <a href="/brochure" className="rq-btn rq-secondary">Download Brochure</a>
            <a href="/products" className="rq-link small">Explore Products →</a>
          </div>

          <form className="rq-inline-form" onSubmit={handleInlineSubmit}>
            <input
              type="email"
              placeholder="Enter your work email"
              value={inline.email}
              onChange={(e) => setInline(s => ({ ...s, email: e.target.value }))}
              required
            />
            <input
              type="text"
              placeholder="Company name"
              value={inline.company}
              onChange={(e) => setInline(s => ({ ...s, company: e.target.value }))}
              required
            />
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
            <button className="rq-btn rq-inline" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Quick Quote'}
            </button>
          </form>

          {successMsg && <div className="rq-success" role="status">{successMsg}</div>}
          {errorMsg && <div className="rq-error" role="alert">{errorMsg}</div>}
        </div>
      </div>

      {showModal && (
        <div className="rq-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="rq-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <h3>Request a Quote</h3>
            <p className="muted">Please provide details and we will get back within 2 business days.</p>
            <form onSubmit={handleModalSubmit} className="rq-modal-form">
              <div className="row">
                <label>
                  Name
                  <input value={modalData.name} onChange={(e) => setModalData(s => ({ ...s, name: e.target.value }))} required />
                </label>
                <label>
                  Company
                  <input value={modalData.company} onChange={(e) => setModalData(s => ({ ...s, company: e.target.value }))} required />
                </label>
              </div>
              <div className="row">
                <label>
                  Email
                  <input type="email" value={modalData.email} onChange={(e) => setModalData(s => ({ ...s, email: e.target.value }))} required />
                </label>
                <label>
                  Phone
                  <input value={modalData.phone} onChange={(e) => setModalData(s => ({ ...s, phone: e.target.value }))} />
                </label>
              </div>
              <label>
                Product / SKU
                <input value={modalData.product} onChange={(e) => setModalData(s => ({ ...s, product: e.target.value }))} />
              </label>
              <div className="row">
                <label>
                  Quantity (est.)
                  <input value={modalData.qty} onChange={(e) => setModalData(s => ({ ...s, qty: e.target.value }))} />
                </label>
                <label>
                  Upload RFQ
                  <input type="file" accept=".pdf,.zip,.dwg" />
                </label>
              </div>
              <label>
                Notes
                <textarea value={modalData.notes} onChange={(e) => setModalData(s => ({ ...s, notes: e.target.value }))} rows={3} />
              </label>
              <div className="modal-actions">
                <button type="button" className="rq-btn rq-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="rq-btn rq-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
import React, { useEffect, useState } from "react";
import "../styles/OffersPage.css";
import Footer from "./Footer";
import { Container, Row, Col, Card, Button, Badge, ListGroup } from "react-bootstrap";

const OFFER = {
  id: "thai-design-premium-2025",
  title: "Shop ₹40,00,000+ — Win an Exclusive Thailand Design Trip",
  subtitle: "A luxury curation for our top clients: craft tours, workshops & a luxury hotel experience.",
  description:
    "Spend ₹40,00,000 or more on our premium collections to qualify. Winners (selected monthly) receive an all-inclusive curated trip to Thailand — Bangkok • Chiang Mai • Phuket — including luxury hotel stays, two private design workshops with local artisans and guided craft market tours.",
  highlights: [
    "Qualification threshold: ₹40,00,000 (single order or cumulative within campaign period)",
    "All-inclusive trip (flights not always included — check brochure)",
    "Private design workshops + artisan studio visits",
    "Luxury hotel stays (3–5★ depending on package)",
    "Limited seats — winners announced monthly"
  ],
  dateRange: "Campaign running now — enquire for eligibility & T&C",
  heroImage:
    "https://t3.ftcdn.net/jpg/05/77/59/10/360_F_577591022_ghBvlMtxm7nyXLo3xqd8XnPq9py3IoWB.jpg"
};

export default function OffersPage() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // theme detection: follow body.dark-mode and html[data-theme]
  const [darkMode, setDarkMode] = useState(() => {
    try {
      if (typeof document === "undefined") return false;
      const bodyDark = document.body.classList.contains("dark-mode");
      const saved = localStorage.getItem("darkMode");
      const htmlTheme = document.documentElement.getAttribute("data-theme");
      return bodyDark || saved === "true" || (htmlTheme && htmlTheme.toLowerCase() === "dark");
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);

    // observe body class & html data-theme for live toggles from navbar
    const mo = new MutationObserver(() => {
      try {
        const b = document.body.classList.contains("dark-mode");
        const htmlTheme = document.documentElement.getAttribute("data-theme");
        const newMode = b || (htmlTheme && htmlTheme.toLowerCase() === "dark");
        setDarkMode(newMode);
      } catch {
        // ignore
      }
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // storage event (cross-tab)
    const onStorage = (e) => {
      if (e.key === "darkMode") {
        setDarkMode(e.newValue === "true");
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      clearTimeout(t);
      mo.disconnect();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <>
      <main
        className={`offers-premium ${visible ? "is-visible" : ""} ${darkMode ? "theme-dark" : "theme-light"}`}
        aria-labelledby="premium-offer-title"
      >
        <section
          className="op-hero"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(8,6,10,0.35), rgba(10,8,12,0.55)), url(${OFFER.heroImage})`
          }}
        >
          <Container>
            <Row className="justify-content-between align-items-center">
              <Col lg={7} className="mb-5 mb-lg-0">
                <div className="op-hero-left">
                  <Badge bg="warning" text="dark" className="op-badge mb-3">Exclusive</Badge>
                  <h1 id="premium-offer-title" className="op-title display-4 fw-bold mb-3">{OFFER.title}</h1>
                  <p className="op-sub lead mb-4">{OFFER.subtitle}</p>

                  <div className="op-key-line d-flex align-items-center mb-4">
                    <span className="op-key-label me-3">Qualify with</span>
                    <span className="op-amount fw-bold">₹ 40,00,000+</span>
                  </div>

                  <div className="op-ctas">
                    <Button
                      variant="warning"
                      size="lg"
                      className="op-btn-primary me-3 mb-2"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      Enquire Now
                      <i className="fas fa-arrow-right ms-2" aria-hidden />
                    </Button>
                    <Button variant="outline-light" size="lg" className="op-btn-outline me-3 mb-2">
                      View Terms
                    </Button>
                    <Button variant="success" size="lg" className="op-btn-ghost mb-2">
                      <i className="fab fa-whatsapp me-2" aria-hidden /> Chat
                    </Button>
                  </div>

                  <div className="op-secondary-actions mt-3">
                   
                   
                  </div>
                </div>
              </Col>

              <Col lg={5}>
                <Card className="op-card border-0 shadow-lg">
                  <Card.Header className="bg-dark text-light border-0">
                    <h3 className="h5 mb-1">What's Included</h3>
                    <div className="op-subtle small">Select monthly winners • Terms apply</div>
                  </Card.Header>
                  <Card.Body className="bg-dark text-light">
                    <ListGroup variant="flush" className="op-include-list">
                      {OFFER.highlights.map((h, i) => (
                        <ListGroup.Item key={i} className="bg-dark text-light border-secondary d-flex align-items-start">
                          <span className="dot me-2 mt-2" aria-hidden></span>
                          <span>{h}</span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer className="bg-dark text-muted border-secondary">
                    <div className="small">Campaign:</div>
                    <div>{OFFER.dateRange}</div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section id="details" className="op-details py-5" aria-label="Offer details">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10}>
                <h2 className="display-5 fw-bold text-center mb-4">Offer Overview</h2>
                <p className="op-desc text-center lead mb-5">{OFFER.description}</p>

                <Row className="mb-5">
                  <Col md={6}>
                    <div className="mb-4">
                      <h3 className="h4 mb-3">Highlights</h3>
                      <ul className="list-unstyled">
                        {OFFER.highlights.map((h, i) => (
                          <li key={i} className="mb-3 d-flex align-items-start">
                            <Badge bg="warning" className="me-3 mt-1">✓</Badge>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                  <Col md={6}>
                    <Card className="h-100 border-0 shadow-sm">
                      <Card.Body className="p-4">
                        <h3 className="h4 mb-4">How to Participate</h3>
                        <ol className="ps-3">
                          <li className="mb-3">Shop for premium home decor products worth ₹40,00,000+</li>
                          <li className="mb-3">Register your purchase with our concierge team</li>
                          <li className="mb-3">Automatic entry into the monthly draw</li>
                          <li>Winners announced on the 1st of each month</li>
                        </ol>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <h3 className="h4 text-center mb-4">Experience Highlights</h3>
                <Row className="op-grid">
                  <Col md={4} className="mb-4">
                    <Card className="op-feature h-100 border-0 shadow-sm hvr-grow">
                      <Card.Body className="text-center p-4">
                        <div className="icon display-4 mb-3">🏨</div>
                        <h4 className="h5">Luxury Hotels</h4>
                        <p className="mb-0">Handpicked boutique & luxury hotels with curated amenities.</p>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4} className="mb-4">
                    <Card className="op-feature h-100 border-0 shadow-sm hvr-grow">
                      <Card.Body className="text-center p-4">
                        <div className="icon display-4 mb-3">🎨</div>
                        <h4 className="h5">Design Workshops</h4>
                        <p className="mb-0">Private sessions with Thai artisans and studio visits.</p>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4} className="mb-4">
                    <Card className="op-feature h-100 border-0 shadow-sm hvr-grow">
                      <Card.Body className="text-center p-4">
                        <div className="icon display-4 mb-3">🧭</div>
                        <h4 className="h5">Local Tours</h4>
                        <p className="mb-0">Guided craft-market tours and curated shopping experiences.</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

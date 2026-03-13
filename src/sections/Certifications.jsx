import React, { useState, useRef, useEffect } from "react";
import Section from "../components/Section";

const certifications = [
  {
    id: "cert-se-forage",
    title: "Software Engineering Virtual Experience",
    issuer: "Forage · JPMorgan Chase & Co.",
    year: "2025",
    badge: "🖥️",
    accentColor: "#c5a059",
    pdfUrl: "/assets/SE_Forage.pdf",
    linkedin:
      "https://www.linkedin.com/posts/thakur-asutosh-dash-a6965922a_certificate-activity-7417437933009522689-UCf7?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE714k0BfF9RK_eF23ppMpTmln-2e7unXjk",
    shortDesc:
      "Practical backend development simulating real industry problem-solving.",
    fullDesc: [
      "Learned practical backend development concepts including Kafka integration and REST API design.",
      "Worked on practical tasks including Kafka integration, H2 database integration, and REST API development, simulating real industry problem-solving.",
    ],
    tags: ["Kafka", "REST API", "H2 Database", "Backend Dev"],
  },
  {
    id: "cert-ibm-ai",
    title: "AI Fundamentals",
    issuer: "IBM · SkillsBuild",
    year: "2025",
    badge: "🤖",
    accentColor: "#4f8ef7",
    pdfUrl: "/assets/IBM.pdf",
    linkedin:
      "https://www.linkedin.com/posts/thakur-asutosh-dash-a6965922a_certification-activity-7402406356131176448-MAnM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE714k0BfF9RK_eF23ppMpTmln-2e7unXjk",
    shortDesc:
      "Core AI & machine learning concepts with real-world application focus.",
    fullDesc: [
      "Learned the fundamentals of Artificial Intelligence, including core concepts and real-world applications.",
      "Gained understanding of AI problem-solving approaches and basic machine learning ideas.",
      "Built foundational knowledge of how AI systems are used to analyze data and support intelligent decision-making.",
    ],
    tags: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Analysis",
      "IBM",
    ],
  },
  {
    id: "cert-data-labelling",
    title: "Data Labelling & Annotation",
    issuer: "Forage · AI/ML Program",
    year: "2026",
    badge: "🏷️",
    accentColor: "#c026d3",
    pdfUrl: "/assets/DATA Labelling.pdf",
    linkedin:
      "https://www.linkedin.com/posts/thakur-asutosh-dash-a6965922a_certificate-activity-7391797216870428672-m9cF?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE714k0BfF9RK_eF23ppMpTmln-2e7unXjk",
    shortDesc:
      "Data labeling, PII awareness, and quality control for AI training data.",
    fullDesc: [
      "Learned data labeling techniques including batch labeling and annotation workflows.",
      "Gained understanding of PII awareness, data quality review, and validation processes in datasets.",
      "Developed skills in quality control and iterative improvement for training data used in AI models.",
    ],
    tags: ["Data Labelling", "Annotation", "PII Awareness", "AI Training Data"],
  },
];

const CertCard = ({ cert, isActive }) => {
  return (
    <div
      className="glass cert-card cert-card-layout"
      style={{
        padding: "2.5rem",
        borderRadius: "16px",
        border: `1px solid ${cert.accentColor}33`,
        boxShadow: isActive
          ? `0 0 40px ${cert.accentColor}22, 0 20px 50px rgba(0,0,0,0.4)`
          : "0 8px 30px rgba(0,0,0,0.3)",
        transition:
          "transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 40%)`;
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 18px 40px rgba(0,0,0,0.45), 0 0 40px ${cert.accentColor}44`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = isActive
          ? `0 0 40px ${cert.accentColor}22, 0 20px 50px rgba(0,0,0,0.4)`
          : "0 8px 30px rgba(0,0,0,0.3)";
        e.currentTarget.style.background = "none";
      }}
    >
      {/* Glow corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "150px",
          height: "150px",
          background: `radial-gradient(circle at top left, ${cert.accentColor}2a, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Left Column: Text Information */}
      <div
        className="cert-text-col"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          zIndex: 1,
          position: "relative",
        }}
      >
        {/* Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                fontSize: "1.15rem",
                fontFamily: "var(--font-heading)",
                color: cert.accentColor,
                marginBottom: "0.3rem",
                lineHeight: 1.3,
                textShadow: `0 0 20px ${cert.accentColor}44`,
              }}
            >
              {cert.title}
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.8rem",
                letterSpacing: "0.04em",
              }}
            >
              {cert.issuer}
            </p>
          </div>

          {/* Year badge */}
          <span
            style={{
              flexShrink: 0,
              padding: "0.2rem 0.6rem",
              borderRadius: "999px",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              fontWeight: 600,
              color: cert.accentColor,
              border: `1px solid ${cert.accentColor}44`,
              background: `${cert.accentColor}11`,
              whiteSpace: "nowrap",
            }}
          >
            {cert.year}
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: `linear-gradient(90deg, ${cert.accentColor}44, transparent)`,
          }}
        />

        {/* Short description (always visible) */}
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.92rem",
            lineHeight: "1.65",
          }}
        >
          {cert.shortDesc}
        </p>

        {/* Expanded description (always visible now) */}
        <div>
          <ul
            style={{
              padding: "0.2rem 0 0.5rem 0",
              margin: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {cert.fullDesc.map((point, i) => (
              <li
                key={i}
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.88rem",
                  lineHeight: "1.6",
                  display: "flex",
                  gap: "0.6rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    color: cert.accentColor,
                    fontSize: "0.7rem",
                    marginTop: "0.35rem",
                    flexShrink: 0,
                  }}
                >
                  ◆
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
            marginTop: "auto",
          }}
        >
          {cert.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.7rem",
                padding: "0.2rem 0.55rem",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--text-muted)",
                letterSpacing: "0.03em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons row */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          {cert.linkedin && (
            <span
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                cursor: "pointer",
                transition: "color 0.3s ease, transform 0.3s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-color)";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(cert.linkedin, "_blank");
              }}
            >
              View on LinkedIn →
            </span>
          )}
        </div>
      </div>

      {/* Right Column: Certificate PDF (Embedded) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "1.25rem",
          boxSizing: "border-box",
        }}
      >
        {/* Certificate Container Wrapper (Scales on hover) */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1.294", // Match US Letter bounds perfectly
            zIndex: 4,
            borderRadius: "10px",
            overflow: "hidden",
            background: "#fff",
            boxShadow: `0 6px 20px rgba(0,0,0,0.35)`,
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {/* Render PDF directly using an object tag scaled appropriately */}
          <object
            data={`${cert.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            type="application/pdf"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
              pointerEvents: "none",
            }}
            className="cert-img"
          >
            <p>
              Unable to display PDF. <a href={cert.pdfUrl}>Download instead</a>
            </p>
          </object>

          {/* Overlay that acts as the clickable trigger to open PDF in new tab */}
          <a
            href={cert.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 3,
            }}
            aria-label={`View ${cert.title} Certificate`}
          />
        </div>
      </div>
    </div>
  );
};

const Certifications = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const trackRef = useRef(null);
  const total = certifications.length;

  const goTo = (index, dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 350);
  };

  const prev = () => {
    const newIndex = (currentIndex - 1 + total) % total;
    goTo(newIndex, "left");
  };

  const next = () => {
    const newIndex = (currentIndex + 1) % total;
    goTo(newIndex, "right");
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentIndex, isAnimating]);

  return (
    <Section id="certifications">
      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2
          className="logo-shine"
          style={{
            fontSize: "2.5rem",
            display: "inline-block",
            position: "relative",
            margin: "0",
            padding: "0 0.5rem",
          }}
        >
          Certifications
        </h2>
      </div>
      <p
        style={{
          color: "var(--text-muted)",
          marginBottom: "3.5rem",
          textAlign: "center",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: "0.95rem",
          lineHeight: 1.7,
        }}
      >
        Industry credentials and virtual programs that shaped my practical
        engineering skillset.
      </p>

      {/* Carousel Wrapper */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1350px", // Full width
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {/* Left Arrow (Desktop) */}
        <button
          className="glass-arrow-btn desktop-arrow"
          onClick={prev}
          aria-label="Previous certificate"
          style={{ flexShrink: 0 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Card Viewport */}
          <div
            style={{
              overflow: "hidden",
              borderRadius: "16px",
              minHeight: "400px",
            }}
          >
            <div
              ref={trackRef}
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating
                  ? `translateX(${direction === "right" ? "30px" : "-30px"})`
                  : "translateX(0)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
                height: "100%",
                padding: "8px", // padding to see the box-shadow cleanly
              }}
            >
              <CertCard
                cert={certifications[currentIndex]}
                isActive={true}
                key={certifications[currentIndex].id}
              />
            </div>
          </div>

          {/* Controls Below Card */}
          <div style={{ marginTop: "1.5rem" }}>
            {/* Dots */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              {certifications.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > currentIndex ? "right" : "left")}
                  aria-label={`Go to certificate ${i + 1}`}
                  style={{
                    width: i === currentIndex ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background:
                      i === currentIndex
                        ? certifications[currentIndex].accentColor
                        : "rgba(255,255,255,0.2)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.35s ease",
                    boxShadow:
                      i === currentIndex
                        ? `0 0 10px ${certifications[currentIndex].accentColor}88`
                        : "none",
                  }}
                />
              ))}
            </div>

            {/* Mobile Arrows */}
            <div
              className="mobile-arrows"
              style={{ display: "none", justifyContent: "center", gap: "1rem" }}
            >
              <button
                className="glass-arrow-btn"
                onClick={prev}
                style={{ position: "static", transform: "none" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="glass-arrow-btn"
                onClick={next}
                style={{ position: "static", transform: "none" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Arrow (Desktop) */}
        <button
          className="glass-arrow-btn desktop-arrow"
          onClick={next}
          aria-label="Next certificate"
          style={{ flexShrink: 0 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Hint text */}
      <p
        style={{
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "0.75rem",
          marginTop: "1rem",
          letterSpacing: "0.06em",
          opacity: 0.6,
        }}
      >
        Use arrows or keyboard ← → to navigate
      </p>

      {/* Pulse animation for dots and Image Hover Effects */}
      <style>{`
                .cert-card-layout {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                    align-items: center;
                }
                @media (min-width: 850px) {
                    .cert-card-layout {
                        grid-template-columns: 1fr 1.35fr;
                    }
                }
                @keyframes certDotPulse {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }
                .cert-img-link:hover .cert-img {
                    transform: scale(1.03);
                }
                .cert-img-link:hover .cert-img {
                    transform: scale(1.02);
                }
                @media (max-width: 850px) {
                    .desktop-arrow { display: none !important; }
                    .mobile-arrows { display: flex !important; }
                }
            `}</style>
    </Section>
  );
};

export default Certifications;

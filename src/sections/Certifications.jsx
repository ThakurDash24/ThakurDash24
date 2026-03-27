import React, { useState, useRef, useEffect, useCallback } from "react";
import Section from "../components/Section";

const certifications = [
  {
    id: "cert-hf-agentic-ai",
    title: "Agentic Ai certificate",
    issuer: "Hugging Face",
    year: "2026",
    latest: true,
    //badge: "🤖",
    accentColor: "#f2d45e",
    pdfUrl: "/assets/HF_AGENTIC_COURSE.pdf",
    aspectRatio: "1.414",
    shortDesc:
      "Mastering autonomous systems through reasoning, tool orchestration, and control.",
    fullDesc: [
      "Transitioned from simple prompting to engineering reasoning-based agentic systems using smolagents, LlamaHub, and LlamaIndex.",
      "Successfully passed and maintained a leaderboard position on GAIA benchmarks by optimizing agent loops and tool intent.",
      "Engineered a system capable of structured reasoning and precise tool usage without relying on paid LLM providers.",
    ],
    tags: [
      "Agentic AI",
      "smolagents",
      "LlamaIndex",
      "Hugging Face",
      "GAIA Benchmark",
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
    aspectRatio: "1.414",
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
  {
    id: "cert-ibm-ai",
    title: "AI Fundamentals",
    issuer: "IBM · SkillsBuild",
    year: "2025",
    badge: "🤖",
    accentColor: "#4f8ef7",
    pdfUrl: "/assets/IBM.pdf",
    aspectRatio: "1.294",
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
    id: "cert-aws-ml",
    title: "AWS Machine Learning Basics",
    issuer: "Amazon Web Services (AWS)",
    year: "2025",
    badge: "☁️",
    accentColor: "#fb923c",
    pdfUrl: "/assets/AWS_ML.pdf",
    aspectRatio: "1.414",
    linkedin:
      "https://www.linkedin.com/posts/thakur-asutosh-dash-a6965922a_completion-certificate-activity-7382872360942563329-RGc8?utm_source=share&utm_medium=member_desktop&rcm=ACoAADlnv7EB1aS-uldKnhxP0Eh1BxXc2iFQEr8",
    shortDesc:
      "A friendly, jargon-free introduction to how machines process data to make smart decisions.",
    fullDesc: [
      "Explored the core ideas behind machine learning: training computers to spot hidden patterns without being explicitly programmed.",
      "Looked at real-world, everyday examples of AI in action to understand how models learn from historical data.",
      "Discovered how cloud platforms like AWS make it incredibly easy for anyone to build and deploy intelligent solutions.",
    ],
    tags: ["AWS", "Machine Learning Beginners", "Cloud", "AI Fundamentals"],
  },
  {
    id: "cert-se-forage",
    title: "Software Engineering Virtual Experience",
    issuer: "Forage · JPMorgan Chase & Co.",
    year: "2025",
    badge: "🖥️",
    accentColor: "#c5a059",
    pdfUrl: "/assets/SE_Forage.pdf",
    aspectRatio: "1.414",
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
];

/* ──────────────────────────────────────────────────────────────
   PDF → Canvas renderer using pdf.js (CDN)
   Works on ALL devices including mobile & low-end phones.
   Falls back to a styled placeholder if pdf.js fails to load.
   Uses IntersectionObserver for lazy rendering.
   ────────────────────────────────────────────────────────────── */

// Global pdf.js loader — loads the CDN script once
let pdfJsLoadPromise = null;
const PDFJS_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

function loadPdfJs() {
  if (pdfJsLoadPromise) return pdfJsLoadPromise;
  pdfJsLoadPromise = new Promise((resolve, reject) => {
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
      resolve(window.pdfjsLib);
      return;
    }
    const script = document.createElement("script");
    script.src = PDFJS_CDN;
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
        resolve(window.pdfjsLib);
      } else {
        reject(new Error("pdf.js loaded but pdfjsLib not found"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load pdf.js CDN"));
    document.head.appendChild(script);
  });
  return pdfJsLoadPromise;
}

// In-memory cache so we don't re-render same PDF when navigating carousel
const renderedImages = {};

const CertPreview = ({ pdfUrl, aspectRatio, accentColor, title }) => {
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [imageSrc, setImageSrc] = useState(null);
  const containerRef = useRef(null);
  const hasStarted = useRef(false);

  const renderPdf = useCallback(async () => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    // Check cache first
    if (renderedImages[pdfUrl]) {
      setImageSrc(renderedImages[pdfUrl]);
      setStatus("done");
      return;
    }

    setStatus("loading");
    try {
      const pdfjsLib = await loadPdfJs();
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      // Use a moderate scale for good quality without killing low-end devices
      const isMobile = window.innerWidth < 768;
      const scale = isMobile ? 1.5 : 2;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");

      await page.render({ canvasContext: ctx, viewport }).promise;

      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      renderedImages[pdfUrl] = dataUrl;
      setImageSrc(dataUrl);
      setStatus("done");

      // Cleanup
      pdf.destroy();
    } catch {
      setStatus("error");
    }
  }, [pdfUrl]);

  // Lazy load — only render when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          renderPdf();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [renderPdf]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspectRatio || "1.294",
        borderRadius: "10px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
        transition: "transform 0.4s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {/* Rendered image */}
      {status === "done" && imageSrc && (
        <img
          src={imageSrc}
          alt={`${title} Certificate`}
          loading="lazy"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}

      {/* Loading skeleton */}
      {(status === "idle" || status === "loading") && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            background: `linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)`,
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              border: `3px solid ${accentColor}33`,
              borderTop: `3px solid ${accentColor}`,
              borderRadius: "50%",
              animation: "certSpin 0.8s linear infinite",
            }}
          />
          <span
            style={{
              fontSize: "0.75rem",
              color: "#888",
              letterSpacing: "0.05em",
            }}
          >
            Loading preview…
          </span>
        </div>
      )}

      {/* Error fallback — styled card with view button */}
      {status === "error" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.8rem",
            background: `linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)`,
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2.5rem", opacity: 0.5 }}>📜</div>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#666",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {title}
          </p>
          <span
            style={{
              display: "inline-block",
              padding: "0.45rem 1.2rem",
              borderRadius: "8px",
              background: accentColor,
              color: "#fff",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              cursor: "pointer",
              boxShadow: `0 4px 14px ${accentColor}55`,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(pdfUrl, "_blank");
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 6px 20px ${accentColor}66`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 4px 14px ${accentColor}55`;
            }}
          >
            View Certificate ↗
          </span>
        </div>
      )}

      {/* Clickable overlay to open PDF */}
      <a
        href={pdfUrl}
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
        aria-label={`View ${title} Certificate`}
      />
    </div>
  );
};

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
                display: "flex",
                alignItems: "center",
                gap: "0.80rem",
              }}
            >
              {cert.title}
              {cert.latest && (
                <span
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.06em",
                    padding: "0.15rem 0.45rem",
                    borderRadius: "999px",
                    color: "#fff",
                    background: "rgba(255,255,255,0.15)",
                    animation: "focusPulse 1.6s ease-in-out infinite",
                    whiteSpace: "nowrap",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  LATEST
                </span>
              )}
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

      {/* Right Column: Certificate Preview (Rendered via pdf.js) */}
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
        <CertPreview
          pdfUrl={cert.pdfUrl}
          aspectRatio={cert.aspectRatio}
          accentColor={cert.accentColor}
          title={cert.title}
        />
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
                @keyframes focusPulse {
                    0% { opacity: 0.35; }
                    50% { opacity: 1; }
                    100% { opacity: 0.35; }
                }
                @keyframes certSpin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
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

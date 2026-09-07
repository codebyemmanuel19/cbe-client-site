import React, { useState, useEffect } from "react";
import "./Projects.css";

/* ---------- helpers ---------- */

// No external fallback URL — if there's no photo, CSS draws a neutral tile
function getImages(item) {
  if (item.media_urls && item.media_urls.length > 0) return item.media_urls;
  if (item.media_url) return [item.media_url];
  return [];
}

// Works for any client currency, not just naira (NGN, USD, GBP, KES, AED...)
function formatPrice(price, currency) {
  if (price === null || price === undefined || price === "") return null;
  const amount = Number(price);
  if (Number.isNaN(amount)) return null;

  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency || "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return amount.toLocaleString();
  }
}

// Per-product WhatsApp message so the buyer never has to describe the item
function buildOrderLink(item, whatsappNumber, businessName) {
  const phone = String(whatsappNumber || "").replace(/\D/g, "");
  if (!phone) return null;

  const message = `Hi ${businessName || "there"}, I'd like to order: ${
    item.title || "an item from your website"
  }`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/* ---------- image slider (shared by card and lightbox) ---------- */

function Slider({ images, title, current, setCurrent, onImageClick, showDots }) {
  // e.stopPropagation() isolates button clicks from opening the lightbox
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrent((current + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrent((current - 1 + images.length) % images.length);
  };

  const clickable = typeof onImageClick === "function";

  return (
    <div
      className="image-slider"
      onClick={clickable ? onImageClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? `View ${title}` : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onImageClick(e);
              }
            }
          : undefined
      }
    >
      {images.length > 0 ? (
        <img src={images[current]} alt={title} loading="lazy" />
      ) : (
        <div className="image-placeholder" aria-hidden="true" />
      )}

      {images.length > 1 && (
        <>
          <button className="arrow left" onClick={prevImage} aria-label="Previous image">
            ‹
          </button>
          <button className="arrow right" onClick={nextImage} aria-label="Next image">
            ›
          </button>

          {showDots && (
            <div className="dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`dot ${index === current ? "active" : ""}`}
                  aria-label={`Photo ${index + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(index);
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ---------- product card ---------- */

function ProjectCard({ item, currency, whatsappNumber, businessName, onImageClick }) {
  const images = getImages(item);
  const [current, setCurrent] = useState(0);

  const title = item.title || "Untitled Item";
  const price = formatPrice(item.price, currency);
  const orderLink = buildOrderLink(item, whatsappNumber, businessName);

  return (
    <article className="project-card">
      <Slider
        images={images}
        title={title}
        current={current}
        setCurrent={setCurrent}
        onImageClick={() => onImageClick(item, current)}
        showDots
      />

      <div className="project-card-body">
        <h3>{title}</h3>
        {price && <p className="price">{price}</p>}
        {item.description && <p className="project-card-desc">{item.description}</p>}

        {orderLink && (
          <a
            className="order-btn"
            href={orderLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Order on WhatsApp
          </a>
        )}
      </div>
    </article>
  );
}

/* ---------- lightbox ---------- */

function Lightbox({ item, startIndex, currency, whatsappNumber, businessName, onClose }) {
  const images = getImages(item);
  const [current, setCurrent] = useState(startIndex);

  const title = item.title || "Untitled Item";
  const price = formatPrice(item.price, currency);
  const orderLink = buildOrderLink(item, whatsappNumber, businessName);

  // Close on Escape, and stop the page behind from scrolling
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="lightbox-image-wrapper">
          <Slider
            images={images}
            title={title}
            current={current}
            setCurrent={setCurrent}
            showDots
          />
        </div>

        <div className="lightbox-info">
          <h3>{title}</h3>
          {price && <p className="price">{price}</p>}
          {item.description && <p>{item.description}</p>}

          {orderLink && (
            <a className="order-btn order-btn--solid" href={orderLink} target="_blank" rel="noreferrer">
              Order on WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- section ---------- */

function Projects({
  listings,
  sectionTitle,
  currency = "NGN",
  whatsappNumber,
  businessName,
}) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);

  const handleImageClick = (item, index) => {
    setLightboxItem(item);
    setLightboxStartIndex(index);
  };

  const closeLightbox = () => setLightboxItem(null);

  const visibleListings = listings ? listings.slice(0, visibleCount) : [];
  const remaining = listings ? listings.length - visibleCount : 0;

  return (
    <section id="projects" className="projects">
      <h2>{sectionTitle || "Products"}</h2>

      <div className="projects-grid">
        {listings && listings.length > 0 ? (
          visibleListings.map((item) => (
            <ProjectCard
              key={item.id}
              item={item}
              currency={currency}
              whatsappNumber={whatsappNumber}
              businessName={businessName}
              onImageClick={handleImageClick}
            />
          ))
        ) : (
          <p className="no-listings">Nothing listed yet. Check back soon.</p>
        )}
      </div>

      {remaining > 0 && (
        <div className="see-more-wrapper">
          <button className="see-more-btn" onClick={() => setVisibleCount(visibleCount + 6)}>
            Show {Math.min(remaining, 6)} more
          </button>
        </div>
      )}

      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          startIndex={lightboxStartIndex}
          currency={currency}
          whatsappNumber={whatsappNumber}
          businessName={businessName}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}

export default Projects;
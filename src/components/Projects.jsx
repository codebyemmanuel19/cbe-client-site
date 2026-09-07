import React, { useState } from "react";
import "./Projects.css";

function ProjectCard({ item, onImageClick }) {
  // Gracefully switches between multi-image arrays or a single media fallback string
  const images = item.media_urls && item.media_urls.length > 0
    ? item.media_urls
    : [item.media_url || "https://unsplash.com"];

  const [current, setCurrent] = useState(0);

  // e.stopPropagation() isolates button clicks from causing unintended parent component loops
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrent((current + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <div className="project-card">
      <div className="image-slider" onClick={() => onImageClick(item, current)}>
        <img src={images[current]} alt={item.title || "Product Image"} />
        {images.length > 1 && (
          <>
            <button className="arrow left" onClick={prevImage} aria-label="Previous image">‹</button>
            <button className="arrow right" onClick={nextImage} aria-label="Next image">›</button>
            <div className="dots">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === current ? "active" : ""}`}
                ></span>
              ))}
            </div>
          </>
        )}
      </div>
      <h3>{item.title || "Untitled Item"}</h3>
      <p>{item.description || "No description provided."}</p>

      {/* Formats loose input numbers like 10000 into clean readable currency values like ₦10,000 */}
      {item.price && (
        <p className="price">
          ₦{Number(item.price).toLocaleString("en-NG")}
        </p>
      )}
    </div>
  );
}

function Lightbox({ item, startIndex, onClose }) {
  const images = item.media_urls && item.media_urls.length > 0
    ? item.media_urls
    : [item.media_url || "https://unsplash.com"];

  const [current, setCurrent] = useState(startIndex);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrent((current + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="lightbox-image-wrapper">
          <img src={images[current]} alt={item.title || "Product Image"} />
          {images.length > 1 && (
            <>
              <button className="arrow left" onClick={prevImage} aria-label="Previous image">‹</button>
              <button className="arrow right" onClick={nextImage} aria-label="Next image">›</button>
            </>
          )}
        </div>

        <div className="lightbox-info">
          <h3>{item.title || "Untitled Item"}</h3>
          <p>{item.description || "No description provided."}</p>
          {item.price && (
            <p className="price">₦{Number(item.price).toLocaleString("en-NG")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects({ listings }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);

  const handleImageClick = (item, index) => {
    setLightboxItem(item);
    setLightboxStartIndex(index);
  };

  const closeLightbox = () => setLightboxItem(null);

  const visibleListings = listings ? listings.slice(0, visibleCount) : [];
  const hasMore = listings && listings.length > visibleCount;

  return (
    <section id="projects" className="projects">
      <h2>Our Products & Services</h2>
      <div className="projects-grid">
        {listings && listings.length > 0 ? (
          visibleListings.map((item) => (
            <ProjectCard item={item} key={item.id} onImageClick={handleImageClick} />
          ))
        ) : (
          <p className="no-listings">No items or services available at the moment.</p>
        )}
      </div>

      {hasMore && (
        <div className="see-more-wrapper">
          <button className="see-more-btn" onClick={() => setVisibleCount(visibleCount + 6)}>
            See More Products
          </button>
        </div>
      )}

      {lightboxItem && (
        <Lightbox item={lightboxItem} startIndex={lightboxStartIndex} onClose={closeLightbox} />
      )}
    </section>
  );
}

export default Projects;
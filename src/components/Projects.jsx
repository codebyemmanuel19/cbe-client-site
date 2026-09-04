import React, { useState } from "react";
import "./Projects.css";

function ProjectCard({ item }) {
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
      <div className="image-slider">
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

function Projects({ listings }) {
  return (
    <section id="projects" className="projects">
      <h2>Our Products & Services</h2>
      <div className="projects-grid">
        {listings && listings.length > 0 ? (
          listings.map((item) => <ProjectCard item={item} key={item.id} />)
        ) : (
          <p className="no-listings">No items or services available at the moment.</p>
        )}
      </div>
    </section>
  );
}

export default Projects;
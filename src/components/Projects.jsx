import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice, getImages } from "../utils/format";
import "./Projects.css";

/* ---------- product card ---------- */

function ProjectCard({ item, currency }) {
  const images = getImages(item);

  const title = item.title || "Untitled Item";
  const price = formatPrice(item.price, currency);

  // stock is optional — no value means no limit and no badge
  const stock =
    item.stock === null || item.stock === undefined || item.stock === ""
      ? null
      : Number(item.stock);
  const soldOut = stock === 0;

  return (
    <article className="project-card">
      {/* The whole card opens the product page */}
      <Link className="project-card-link" to={`/product/${item.id}`}>
        <div className="image-slider">
          {images.length > 0 ? (
            <img src={images[0]} alt={title} loading="lazy" />
          ) : (
            <div className="image-placeholder" aria-hidden="true" />
          )}

          {images.length > 1 && (
            <span className="image-count">{images.length} photos</span>
          )}

          {soldOut && <span className="image-soldout">Out of stock</span>}
        </div>

        <div className="project-card-body">
          <h3>{title}</h3>
          {price && <p className="price">{price}</p>}
          {item.description && (
            <p className="project-card-desc">{item.description}</p>
          )}

          <span className="view-btn">View more</span>
        </div>
      </Link>
    </article>
  );
}

/* ---------- section ---------- */

function Projects({ listings, sectionTitle, currency = "NGN" }) {
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleListings = listings ? listings.slice(0, visibleCount) : [];
  const remaining = listings ? listings.length - visibleCount : 0;

  return (
    <section id="projects" className="projects">
      <h2>{sectionTitle || "Products"}</h2>

      <div className="projects-grid">
        {listings && listings.length > 0 ? (
          visibleListings.map((item) => (
            <ProjectCard key={item.id} item={item} currency={currency} />
          ))
        ) : (
          <p className="no-listings">Nothing listed yet. Check back soon.</p>
        )}
      </div>

      {remaining > 0 && (
        <div className="see-more-wrapper">
          <button
            className="see-more-btn"
            onClick={() => setVisibleCount(visibleCount + 6)}
          >
            Show {Math.min(remaining, 6)} more
          </button>
        </div>
      )}
    </section>
  );
}

export default Projects;
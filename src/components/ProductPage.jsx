import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice, buildWhatsAppLink, getImages } from "../utils/format";
import "./Projects.css";

/* ---------- product card ---------- */

function ProjectCard({ item, currency, whatsappNumber, businessName }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const images = getImages(item);
  const title = item.title || "Untitled Item";
  const price = formatPrice(item.price, currency);

  const stock =
    item.stock === null || item.stock === undefined || item.stock === ""
      ? null
      : Number(item.stock);
  const soldOut = stock === 0;

  const orderLink = buildWhatsAppLink(
    whatsappNumber,
    `Hi ${businessName || "there"}, I'd like to order: ${title}`
  );

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(item, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="project-card">
      {/* Whole image + title area opens the product page */}
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

        <div className="project-card-head">
          <h3>{title}</h3>
          {price && <p className="price">{price}</p>}
          {item.description && <p className="project-card-desc">{item.description}</p>}
        </div>
      </Link>

      <div className="project-card-actions">
        {!soldOut && (
          <button type="button" className="add-btn" onClick={handleAdd}>
            {added ? "Added ✓" : "Add to cart"}
          </button>
        )}

        {orderLink && !soldOut && (
          <a
            className="order-btn"
            href={orderLink}
            target="_blank"
            rel="noreferrer"
          >
            Order on WhatsApp
          </a>
        )}
      </div>
    </article>
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
            />
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
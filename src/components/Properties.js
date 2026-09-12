import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { formatPrice, getImages } from "../utils/format";
import "./Properties.css";

// Rent shows a period, sale doesn't
function priceLabel(item, currency) {
  const details = item.details || {};
  const price = formatPrice(item.price, currency);
  if (!price) return null;

  if (details.listing_type === "rent") {
    const period = details.period === "month" ? "month" : "year";
    return `${price}/${period}`;
  }
  return price;
}

function PropertyCard({ item, currency }) {
  const images = getImages(item);
  const details = item.details || {};
  const title = item.title || "Untitled Property";

  return (
    <article className="property-card">
      <Link className="property-card-link" to={`/property/${item.id}`}>
        <div className="property-image">
          {images.length > 0 ? (
            <img src={images[0]} alt={title} loading="lazy" />
          ) : (
            <div className="property-image-empty" aria-hidden="true" />
          )}

          {details.listing_type && (
            <span className="property-tag">
              {details.listing_type === "rent" ? "For rent" : "For sale"}
            </span>
          )}

          {images.length > 1 && (
            <span className="property-photos">{images.length} photos</span>
          )}
        </div>

        <div className="property-body">
          <p className="property-price">{priceLabel(item, currency)}</p>
          <h3>{title}</h3>
          {details.location && <p className="property-location">{details.location}</p>}

          <ul className="property-specs">
            {details.bedrooms && <li>{details.bedrooms} bed</li>}
            {details.bathrooms && <li>{details.bathrooms} bath</li>}
            {details.size && <li>{details.size}</li>}
          </ul>

          <span className="property-btn">View details</span>
        </div>
      </Link>
    </article>
  );
}

function Properties({ listings, sectionTitle, currency = "NGN" }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [type, setType] = useState("all");       // all | sale | rent
  const [location, setLocation] = useState("all");

  // useMemo so the filters below don't rebuild on every render
  const all = useMemo(() => listings || [], [listings]);

  // Build the location dropdown from whatever the agent actually listed
  const locations = useMemo(() => {
    const found = all
      .map((item) => (item.details || {}).location)
      .filter(Boolean)
      .map((value) => value.trim());
    return Array.from(new Set(found)).sort();
  }, [all]);

  const filtered = useMemo(() => {
    return all.filter((item) => {
      const details = item.details || {};

      if (type !== "all" && details.listing_type !== type) return false;
      if (location !== "all" && (details.location || "").trim() !== location) return false;

      return true;
    });
  }, [all, type, location]);

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visibleCount;

  const resetCount = () => setVisibleCount(6);

  const hasFilters = all.length > 0 && (locations.length > 1 || all.some((i) => (i.details || {}).listing_type));

  return (
    <section id="projects" className="properties">
      <h2>{sectionTitle || "Available Properties"}</h2>

      {hasFilters && (
        <div className="property-filters">
          <div className="property-tabs">
            {[
              ["all", "All"],
              ["sale", "For sale"],
              ["rent", "For rent"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`property-tab ${type === value ? "active" : ""}`}
                onClick={() => {
                  setType(value);
                  resetCount();
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {locations.length > 1 && (
            <select
              className="property-select"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                resetCount();
              }}
              aria-label="Filter by location"
            >
              <option value="all">All locations</option>
              {locations.map((place) => (
                <option key={place} value={place}>
                  {place}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {filtered.length > 0 && (
        <p className="property-count">
          {filtered.length} {filtered.length === 1 ? "property" : "properties"}
        </p>
      )}

      <div className="properties-grid">
        {all.length === 0 ? (
          <p className="no-listings">No properties listed yet. Check back soon.</p>
        ) : filtered.length === 0 ? (
          <p className="no-listings">Nothing matches that search. Try another filter.</p>
        ) : (
          visible.map((item) => (
            <PropertyCard key={item.id} item={item} currency={currency} />
          ))
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

export default Properties;
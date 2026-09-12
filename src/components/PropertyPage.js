import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatPrice, buildWhatsAppLink, getImages } from "../utils/format";
import "./PropertyPage.css";

function PropertyPage({ listings, client }) {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  const item = (listings || []).find((l) => String(l.id) === String(id));

  if (!item) {
    return (
      <div className="property-missing">
        <h2>Property not found</h2>
        <p>This listing may have been taken down.</p>
        <Link className="property-back-link" to="/">Back to listings</Link>
      </div>
    );
  }

  const images = getImages(item);
  const details = item.details || {};
  const title = item.title || "Untitled Property";

  const basePrice = formatPrice(item.price, client?.currency);
  const price =
    basePrice && details.listing_type === "rent"
      ? `${basePrice}/${details.period === "month" ? "month" : "year"}`
      : basePrice;

  const enquireLink = buildWhatsAppLink(
    client?.social_whatsapp || client?.phone,
    `Hi ${client?.business_name || "there"}, I'm interested in this property:\n${title}${
      details.location ? ` — ${details.location}` : ""
    }${price ? `\n${price}` : ""}`
  );

  const specs = [
    ["Type", details.property_type],
    ["Bedrooms", details.bedrooms],
    ["Bathrooms", details.bathrooms],
    ["Size", details.size],
    ["Furnishing", details.furnishing],
    ["Status", details.status],
  ].filter(([, value]) => value);

  return (
    <div className="property-page">
      <Link className="property-back" to="/">← Back to listings</Link>

      <div className="property-layout">
        <div className="property-gallery">
          <div className="property-main-image">
            {images.length > 0 ? (
              <img src={images[activeImage]} alt={title} />
            ) : (
              <div className="property-image-placeholder" aria-hidden="true" />
            )}
          </div>

          {images.length > 1 && (
            <div className="property-thumbs">
              {images.map((url, index) => (
                <button
                  key={index}
                  type="button"
                  className={`property-thumb ${index === activeImage ? "active" : ""}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View ${index + 1}`}
                >
                  <img src={url} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="property-details">
          {details.listing_type && (
            <span className="property-page-tag">
              {details.listing_type === "rent" ? "For rent" : "For sale"}
            </span>
          )}

          <h1>{title}</h1>
          {details.location && <p className="property-page-location">{details.location}</p>}
          {price && <p className="property-page-price">{price}</p>}

          {specs.length > 0 && (
            <dl className="property-spec-grid">
              {specs.map(([label, value]) => (
                <div className="property-spec" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {item.description && (
            <p className="property-description">{item.description}</p>
          )}

          {enquireLink && (
            <a
              className="property-enquire"
              href={enquireLink}
              target="_blank"
              rel="noreferrer"
            >
              Enquire on WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyPage;
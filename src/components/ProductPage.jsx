import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice, buildWhatsAppLink, getImages } from "../utils/format";
import "./ProductPage.css";

function ProductPage({ listings, client }) {
  const { id } = useParams();
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  const item = (listings || []).find((l) => String(l.id) === String(id));

  if (!item) {
    return (
      <div className="product-missing">
        <h2>Product not found</h2>
        <p>This item may have been removed.</p>
        <Link className="product-back-link" to="/">Back to shop</Link>
      </div>
    );
  }

  const images = getImages(item);
  const price = formatPrice(item.price, client?.currency);

  // stock is optional — no stock value means no limit shown
  const stock = item.stock === null || item.stock === undefined || item.stock === "" 
    ? null 
    : Number(item.stock);
  const maxQty = stock && stock > 0 ? stock : 20;
  const soldOut = stock === 0;

  const orderLink = buildWhatsAppLink(
    client?.social_whatsapp || client?.phone,
    `Hi ${client?.business_name || "there"}, I'd like to order:\n${quantity}x ${item.title}${price ? ` — ${price}` : ""}`
  );

  const handleAdd = () => {
    const status = addItem(item, quantity);
    setAdded(status === "full" ? "Cart is full (20 items max)" : "Added to cart");
    setTimeout(() => setAdded(""), 2500);
  };

  return (
    <div className="product-page">
      <Link className="product-back" to="/">← Back to shop</Link>

      <div className="product-layout">
        <div className="product-gallery">
          <div className="product-main-image">
            {images.length > 0 ? (
              <img src={images[activeImage]} alt={item.title} />
            ) : (
              <div className="product-image-placeholder" aria-hidden="true" />
            )}
          </div>

          {images.length > 1 && (
            <div className="product-thumbs">
              {images.map((url, index) => (
                <button
                  key={index}
                  type="button"
                  className={`product-thumb ${index === activeImage ? "active" : ""}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Photo ${index + 1}`}
                >
                  <img src={url} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-details">
          <h1>{item.title}</h1>
          {price && <p className="product-price">{price}</p>}
          {item.description && <p className="product-description">{item.description}</p>}

          {stock !== null && stock > 0 && stock <= 5 && (
            <p className="product-stock">Only {stock} left</p>
          )}

          {soldOut ? (
            <p className="product-soldout">Out of stock</p>
          ) : (
            <>
              <div className="product-qty">
                <span className="product-qty-label">Quantity</span>
                <div className="product-qty-controls">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Reduce quantity"
                  >
                    −
                  </button>
                  <span className="product-qty-value">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button type="button" className="product-btn product-btn--dark" onClick={handleAdd}>
                Add to cart
              </button>

              {orderLink && (
                <a
                  className="product-btn product-btn--wa"
                  href={orderLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Order this now on WhatsApp
                </a>
              )}

              {added && <p className="product-added">{added}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
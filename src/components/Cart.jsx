import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice, buildWhatsAppLink } from "../utils/format";
import "./Cart.css";

function Cart({ client }) {
  const { items, removeItem, setQuantity, totalPrice, totalItems } = useCart();
  const currency = client?.currency;

  // Builds the single message the seller receives
  const buildOrderMessage = () => {
    const lines = items.map((i) => {
      const linePrice = formatPrice(Number(i.price || 0) * i.quantity, currency);
      return `${i.quantity}x ${i.title}${linePrice ? ` — ${linePrice}` : ""}`;
    });

    return [
      `New order from ${client?.business_name || "your shop"}`,
      "",
      ...lines,
      "",
      `Total: ${formatPrice(totalPrice, currency)}`,
      "",
      window.location.host,
    ].join("\n");
  };

  const orderLink = buildWhatsAppLink(
    client?.social_whatsapp || client?.phone,
    buildOrderMessage()
  );

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add something you like and it will show up here.</p>
        <Link className="cart-btn cart-btn--dark" to="/">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Link className="cart-back" to="/">← Keep shopping</Link>
      <h1>Your cart</h1>

      <ul className="cart-list">
        {items.map((item) => (
          <li className="cart-row" key={item.id}>
            <div className="cart-thumb">
              {item.image ? <img src={item.image} alt={item.title} /> : <div className="cart-thumb-empty" />}
            </div>

            <div className="cart-row-body">
              <Link className="cart-row-title" to={`/product/${item.id}`}>
                {item.title}
              </Link>
              <p className="cart-row-price">
                {formatPrice(Number(item.price || 0) * item.quantity, currency)}
              </p>

              <div className="cart-row-actions">
                <div className="cart-qty">
                  <button
                    type="button"
                    onClick={() => setQuantity(item.id, item.quantity - 1)}
                    aria-label="Reduce quantity"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="cart-remove"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Total ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
          <strong>{formatPrice(totalPrice, currency)}</strong>
        </div>

        {orderLink ? (
          <a className="cart-btn cart-btn--wa" href={orderLink} target="_blank" rel="noreferrer">
            Send order on WhatsApp
          </a>
        ) : (
          <p className="cart-no-number">
            This shop has not added a WhatsApp number yet.
          </p>
        )}

        <p className="cart-note">
          Your order opens in WhatsApp so you can confirm it with the seller.
        </p>
      </div>
    </div>
  );
}

export default Cart;
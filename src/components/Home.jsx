import React from "react";
import "./Home.css";

// Same props as before + one optional new one (whatsappNumber)
function Home({ businessName, description, heroImageUrl, whatsappNumber }) {
  // No external fallback image — if there's no banner, CSS paints a clean gradient
  const hasBanner = Boolean(heroImageUrl);

  const phone = String(whatsappNumber || "").replace(/\D/g, "");
  const waLink = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(
        `Hi ${businessName || "there"}, I saw your website and I'd like to order.`
      )}`
    : null;

  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className={`home ${hasBanner ? "" : "home--no-image"}`}
      style={hasBanner ? { backgroundImage: `url(${heroImageUrl})` } : undefined}
    >
      <div className="home-overlay">
        {/* If the database is loading, it safely falls back to clean placeholder text */}
        <h1>{businessName || "Welcome to Our Business"}</h1>
        <p>
          {description ||
            "Browse our latest products and order directly from us."}
        </p>

        <div className="home-actions">
          <button className="home-cta" onClick={scrollToProjects}>
            Explore Our Products
          </button>

          {waLink && (
            <a
              className="home-cta home-cta--ghost"
              href={waLink}
              target="_blank"
              rel="noreferrer"
            >
              Message on WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
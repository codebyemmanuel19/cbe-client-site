import React from "react";
import "./Home.css";

function Home({ businessName, description, heroImageUrl, isRealEstate }) {
  // No external fallback image — if there's no banner, CSS paints a clean gradient
  const hasBanner = Boolean(heroImageUrl);

  const scrollToListings = () => {
    const section = document.getElementById("projects");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const defaultText = isRealEstate
    ? "Browse our available properties for sale and rent."
    : "Browse our latest products and order directly from us.";

  const buttonText = isRealEstate ? "View Properties" : "Explore Our Products";

  return (
    <section
      id="home"
      className={`home ${hasBanner ? "" : "home--no-image"} ${isRealEstate ? "home--property" : ""}`}
      style={hasBanner ? { backgroundImage: `url(${heroImageUrl})` } : undefined}
    >
      <div className="home-overlay">
        {/* If the database is loading, it safely falls back to clean placeholder text */}
        <h1>{businessName || "Welcome to Our Business"}</h1>
        <p>{description || defaultText}</p>

        <div className="home-actions">
          <button className="home-cta" onClick={scrollToListings}>
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
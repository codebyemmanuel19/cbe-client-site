import React from "react";
import "./Home.css";

// We pass these 3 parameters as props so the database can change them dynamically
function Home({ businessName, description, heroImageUrl }) {
  
  // High-end fallback cover image if a client hasn't uploaded a banner yet
  const defaultBanner = "https://unsplash.com";
  const finalBannerUrl = heroImageUrl || defaultBanner;

  return (
    <section 
      id="home" 
      className="home" 
      style={{ backgroundImage: `url(${finalBannerUrl})` }}
    >
      <div className="home-overlay">
        {/* If the database is loading, it safely falls back to clean placeholder text */}
        <h1>{businessName || "Welcome to Our Business"}</h1>
        <p>{description || "We provide high-quality products and professional services tailored to your daily needs."}</p>
      </div>
    </section>
  );
}

export default Home;
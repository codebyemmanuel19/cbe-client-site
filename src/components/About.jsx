import React from "react";
import "./About.css";

function About({ businessName, aboutText }) {
  return (
    <section id="about" className="about">
      <h2>About {businessName || "Us"}</h2>
      {/* Renders the dynamic client text or falls back to your helpful placeholder prompt */}
      <p className="about-text">
        {aboutText || "Tell your customers what makes your business special. Share your story, your mission, and what makes your products or services the absolute best choice in town."}
      </p>
    </section>
  );
}

export default About;
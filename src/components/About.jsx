import React from "react";
import "./About.css";

function About({ businessName, aboutText, aboutImageUrl, highlights }) {
  const text = (aboutText || "").trim();

  if (!text && !aboutImageUrl) return null;

  const paragraphs = text ? text.split(/\n\s*\n/).filter(Boolean) : [];
  const points = Array.isArray(highlights) ? highlights.filter(Boolean) : [];

  return (
    <section id="about" className="about">
      <div className="about-inner">
        {aboutImageUrl && (
          <div className="about-media">
            <img
              src={aboutImageUrl}
              alt={businessName ? `Inside ${businessName}` : "About us"}
              loading="lazy"
            />
          </div>
        )}

        <div className="about-body">
          <span className="about-eyebrow">Our Story</span>
          <h2>About {businessName || "Us"}</h2>

          {paragraphs.map((para, index) => (
            <p className="about-text" key={index}>
              {para}
            </p>
          ))}

          {points.length > 0 && (
            <ul className="about-points">
              {points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;
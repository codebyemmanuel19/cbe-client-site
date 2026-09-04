import React from "react";
import "./Contact.css";

function Contact({ businessName, phone, email, address, socialLinks }) {
  // If a user passes a flat number to the whatsapp social field, automatically convert it to an API link
  const getWhatsAppUrl = (waInput) => {
    if (!waInput) return "";
    if (waInput.startsWith("http")) return waInput;
    // Cleans out common extra characters from loose number entries
    const cleanNum = waInput.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanNum}?text=Hello%20${encodeURIComponent(businessName || "Business")}%2C%20I%20am%20interested%20in%20your%20services.`;
  };

  return (
    <section id="contact" className="contact">
      <h2>Contact Us</h2>

      <div className="contact-info">
        {phone && (
          <div className="contact-item">
            <span className="icon">📞</span>
            <a href={`tel:${phone}`}>{phone}</a>
          </div>
        )}
        {email && (
          <div className="contact-item">
            <span className="icon">✉️</span>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        )}
      </div>

      {address && (
        <div className="contact-address">
          <h3>Address</h3>
          <p>{address}</p>
        </div>
      )}

      {socialLinks && (socialLinks.facebook || socialLinks.instagram || socialLinks.whatsapp) && (
        <div className="contact-social">
          <h3>Social Media</h3>
          <div className="social-icons">
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            )}
            {socialLinks.whatsapp && (
              <a href={getWhatsAppUrl(socialLinks.whatsapp)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            )}
          </div>
        </div>
      )}

      <footer className="contact-footer">
        <p>&copy; {new Date().getFullYear()} {businessName || "Our Business"}. All rights reserved.</p>
      </footer>
    </section>
  );
}

export default Contact;
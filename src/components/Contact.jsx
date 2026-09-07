import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
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
            <FaPhoneAlt className="contact-icon" />
            <a href={`tel:${phone}`}>{phone}</a>
          </div>
        )}
        {email && (
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
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

      {socialLinks && (socialLinks.facebook || socialLinks.instagram || socialLinks.whatsapp || socialLinks.tiktok) && (
        <div className="contact-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-icon-link facebook" aria-label="Facebook">
                <FaFacebook />
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon-link instagram" aria-label="Instagram">
                <FaInstagram />
              </a>
            )}
            {socialLinks.tiktok && (
              <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="social-icon-link tiktok" aria-label="TikTok">
                <FaTiktok />
              </a>
            )}
            {socialLinks.whatsapp && (
              <a href={getWhatsAppUrl(socialLinks.whatsapp)} target="_blank" rel="noopener noreferrer" className="social-icon-link whatsapp" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
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
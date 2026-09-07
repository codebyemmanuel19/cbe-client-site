import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import "./Contact.css";

function ContactRow({ icon, children }) {
  return (
    <div className="contact-item">
      <span className="contact-icon">{icon}</span>
      <div className="contact-item-value">{children}</div>
    </div>
  );
}

function Contact({
  businessName,
  phone,
  email,
  address,
  hours,
  socialLinks,
}) {
  const links = socialLinks || {};

  // If a flat number is passed to the whatsapp field, convert it to an API link
  const getWhatsAppUrl = (waInput) => {
    if (!waInput) return "";
    if (String(waInput).startsWith("http")) return waInput;

    const cleanNum = String(waInput).replace(/\D/g, "");
    if (!cleanNum) return "";

    const message = `Hello ${businessName || "there"}, I saw your website and I'm interested in your products.`;
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`;
  };

  const waUrl = getWhatsAppUrl(links.whatsapp);
  const hasDetails = Boolean(phone || email || address || hours);
  const hasSocial = Boolean(
    links.facebook || links.instagram || links.tiktok || links.whatsapp
  );

  return (
    <section id="contact" className="contact">
      <h2>Contact {businessName || "Us"}</h2>

      {/* The action most visitors actually want, not a small icon at the bottom */}
      {waUrl && (
        <a
          className="contact-cta"
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp aria-hidden="true" />
          Chat on WhatsApp
        </a>
      )}

      {hasDetails && (
        <div className="contact-info">
          {phone && (
            <ContactRow icon={<FaPhoneAlt aria-hidden="true" />}>
              <a href={`tel:${String(phone).replace(/[^\d+]/g, "")}`}>{phone}</a>
            </ContactRow>
          )}

          {email && (
            <ContactRow icon={<FaEnvelope aria-hidden="true" />}>
              <a href={`mailto:${email}`}>{email}</a>
            </ContactRow>
          )}

          {address && (
            <ContactRow icon={<FaMapMarkerAlt aria-hidden="true" />}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {address}
              </a>
            </ContactRow>
          )}

          {hours && (
            <ContactRow icon={<FaClock aria-hidden="true" />}>
              <span className="contact-plain">{hours}</span>
            </ContactRow>
          )}
        </div>
      )}

      {hasSocial && (
        <div className="contact-social">
          <div className="social-icons">
            {links.facebook && (
              <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="social-icon-link facebook" aria-label="Facebook">
                <FaFacebook />
              </a>
            )}
            {links.instagram && (
              <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="social-icon-link instagram" aria-label="Instagram">
                <FaInstagram />
              </a>
            )}
            {links.tiktok && (
              <a href={links.tiktok} target="_blank" rel="noopener noreferrer" className="social-icon-link tiktok" aria-label="TikTok">
                <FaTiktok />
              </a>
            )}
            {waUrl && (
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="social-icon-link whatsapp" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            )}
          </div>
        </div>
      )}

      <footer className="contact-footer">
        <p>
          &copy; {new Date().getFullYear()} {businessName || "Our Business"}. All rights reserved.
        </p>
      </footer>
    </section>
  );
}

export default Contact;
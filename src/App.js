import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  const [client, setClient] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE_URL = "https://cbe-quicksite-backend.onrender.com";

    const hostname = window.location.hostname;
    const parts = hostname.split(".");
    let slug = "joesbarber";

    if (parts.length > 2 && hostname.endsWith("cbequicksite.com")) {
      slug = parts[0];
    }

    fetch(`${API_BASE_URL}/clients/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Client profile database fetch failed");
        return res.json();
      })
      .then((data) => {
        if (data.success && data.client) {
          setClient(data.client);
          return fetch(`${API_BASE_URL}/listings/client/${data.client.id}`);
        } else {
          throw new Error("Client record absent in query");
        }
      })
      .then((res) => {
        if (!res.ok) throw new Error("Inventory profile database fetch failed");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setListings(data.listings || []);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error executing dynamic onboarding data chain:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ background: "#1A1A1A", color: "#F5F3EF", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif" }}>
        <p style={{ letterSpacing: "1px", fontWeight: "600" }}>Loading website profile...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div style={{ background: "#1A1A1A", color: "#F5F3EF", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif", padding: "20px", textAlign: "center" }}>
        <h2 style={{ color: "#C9A15A" }}>Website Not Found</h2>
        <p style={{ color: "#CFCBC2", maxWidth: "400px", margin: "8px 0 20px 0" }}>This sub-domain path does not match any active subscription layout profile in our system.</p>
      </div>
    );
  }

  const contactData = {
    phone: client.phone || "08012345678",
    email: client.email || "hello@joesbarbershop.com",
    address: client.address || "12 Allen Avenue, Ikeja, Lagos",
    socialLinks: {
      facebook: client.social_facebook,
      instagram: client.social_instagram,
      whatsapp: client.social_whatsapp || client.phone,
      tiktok: client.social_tiktok,
    },
  };

  return (
    <div className="App">
      <Navbar businessName={client.business_name} logoUrl={client.logo_url} />
      
      <Home
        businessName={client.business_name}
        description={client.about_text}
        heroImageUrl={client.hero_url}
      />
      
      <Projects listings={listings} />
      
      <About 
        businessName={client.business_name} 
        aboutText={client.about_text} 
      />
      
      <Contact 
        businessName={client.business_name} 
        {...contactData} 
      />
    </div>
  );
}

export default App;
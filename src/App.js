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
    // 1. Check if we are testing locally or if the app is live in production
    const hostname = window.location.hostname;
    const isLocalhost = hostname.includes("localhost") || hostname.includes("127.0.0.1");

    // 2. Set the root API address dynamically based on the environment
    
      const API_BASE_URL = "https://cbe-quicksite-backend.onrender.com";

    // 3. Dynamically extract the customer prefix name out of the browser address bar
    const parts = hostname.split(".");
    let slug = "joesbarber"; // Default safe fallback profile for testing

    if (parts.length > 2 && !isLocalhost) {
      slug = parts[0]; // Captures "joesbarber" from "://cbequicksite.com"
    }

    // 4. Fire the sequential database request tree
    fetch(`${API_BASE_URL}/clients/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Client profile database fetch failed");
        return res.json();
      })
      .then((data) => {
        if (data.success && data.client) {
          setClient(data.client);
          // Return the subsequent relative inventory lookup array loop
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

  // Professional minimal dark state loader matching your quick site dashboard look
  if (loading) {
    return (
      <div style={{ background: "#1A1A1A", color: "#F5F3EF", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif" }}>
        <p style={{ letterSpacing: "1px", fontWeight: "600" }}>Loading website profile...</p>
      </div>
    );
  }

  // Graceful fallback display block if no profile record answers the database query loop
  if (!client) {
    return (
      <div style={{ background: "#1A1A1A", color: "#F5F3EF", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif", padding: "20px", textAlign: "center" }}>
        <h2 style={{ color: "#C9A15A" }}>Website Not Found</h2>
        <p style={{ color: "#CFCBC2", maxWidth: "400px", margin: "8px 0 20px 0" }}>This sub-domain path does not match any active subscription layout profile in our system.</p>
      </div>
    );
  }

  // Map out contact coordinates safely combining core backend values with default structural paths
  const contactData = {
    phone: client.phone || "08012345678",
    email: client.email || "hello@joesbarbershop.com",
    address: client.address || "12 Allen Avenue, Ikeja, Lagos",
    socialLinks: {
      facebook: client.social_facebook,
      instagram: client.social_instagram,
      whatsapp: client.social_whatsapp || client.phone, // Gracefully uses primary phone if whatsapp field is blank
    },
  };

  return (
    <div className="App">
      <Navbar businessName={client.business_name} logoUrl={client.logo_url} />
      
      <Home
        businessName={client.business_name}
        description={client.home_text}
        heroImageUrl={client.background_image_url}
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
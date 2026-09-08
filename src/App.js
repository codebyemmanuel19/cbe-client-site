import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";
import "./App.css";

// Jump to the top whenever the route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Floating cart button — hidden when the cart is empty or already on the cart page
function CartButton() {
  const { totalItems } = useCart();
  const { pathname } = useLocation();

  if (totalItems === 0 || pathname === "/cart") return null;

  return (
    <Link className="cart-fab" to="/cart">
      Cart <span className="cart-fab-count">{totalItems}</span>
    </Link>
  );
}

function ShopHome({ client, listings, contactData }) {
  return (
    <>
      <Home
        businessName={client.business_name}
        description={client.home_text}
        heroImageUrl={client.hero_url}
        whatsappNumber={contactData.socialLinks.whatsapp}
      />

      <Projects
        listings={listings}
        currency={client.currency}
        businessName={client.business_name}
        whatsappNumber={contactData.socialLinks.whatsapp}
      />

      <About
        businessName={client.business_name}
        aboutText={client.about_text}
      />

      <Contact
        businessName={client.business_name}
        {...contactData}
      />
    </>
  );
}

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
      slug = parts[0].toLowerCase();
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

  // Only this client's own details — no fallbacks to another business
  const contactData = {
    phone: client.phone,
    email: client.email,
    address: client.address,
    hours: client.hours,
    socialLinks: {
      facebook: client.social_facebook,
      instagram: client.social_instagram,
      whatsapp: client.social_whatsapp || client.phone,
      tiktok: client.social_tiktok,
    },
  };

  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="App">
          <Navbar businessName={client.business_name} logoUrl={client.logo_url} />

          <Routes>
            <Route
              path="/"
              element={<ShopHome client={client} listings={listings} contactData={contactData} />}
            />
            <Route
              path="/product/:id"
              element={<ProductPage listings={listings} client={client} />}
            />
            <Route
              path="/cart"
              element={<Cart client={client} />}
            />
            <Route
              path="*"
              element={<ShopHome client={client} listings={listings} contactData={contactData} />}
            />
          </Routes>

          <CartButton />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
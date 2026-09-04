import React, { useState } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  // Roles can be: 'admin' (You) or 'client' (Joe/Salon owners)
  const [userRole, setUserRole] = useState('admin'); 
  const [activeTab, setActiveTab] = useState(userRole === 'admin' ? 'super-admin' : 'profile');

  // Input states for generating a new customer (Your View)
  const [newClient, setNewClient] = useState({ businessName: '', email: '', password: '', slug: '' });

  // Input states for managing custom client details (Joe's View)
  const [profile, setProfile] = useState({
    businessName: "Joe's Barber Shop",
    phone: "08012345678",
    address: "12 Allen Avenue, Ikeja, Lagos",
    aboutText: "We offer elite quality haircuts and master beard trims tailored to keep you fresh every day."
  });

  const handleBusinessNameChange = (e) => {
    const name = e.target.value;
    // Cleans spaces into a flat URL string handle automatically
    const generatedSlug = name.toLowerCase().replace(/ /g, '');
    setNewClient({ ...newClient, businessName: name, slug: generatedSlug });
  };

  const handleCreateClientSubmit = (e) => {
    e.preventDefault();
    alert(`Success! Generated fresh SaaS architecture for: ${newClient.businessName}\nWebsite Slug: /${newClient.slug}`);
    setNewClient({ businessName: '', email: '', password: '', slug: '' });
  };

  return (
    <div className="dashboard-container">
      
      {/* 🧭 1. DYNAMIC NAVIGATION SIDEBAR */}
      <div className="dashboard-sidebar">
        <div>
          <h2 className="sidebar-brand">CBE Quicksite</h2>
          <span className="sidebar-badge">{userRole.toUpperCase()} INTERFACE</span>
        </div>

        <p className="sidebar-section-title">Workspace Panels</p>
        <ul className="sidebar-menu">
          
          {/* Super Admin Panel Tab: Only renders visible if your role handle is set as admin */}
          {userRole === 'admin' && (
            <li 
              onClick={() => setActiveTab('super-admin')}
              className={`sidebar-item ${activeTab === 'super-admin' ? 'active' : ''}`}
            >
              🚀 Spawn New Client Site
            </li>
          )}

          <li 
            onClick={() => setActiveTab('profile')}
            className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
          >
            ⚙️ Business Identity Details
          </li>
          
          <li 
            onClick={() => setActiveTab('listings')}
            className={`sidebar-item ${activeTab === 'listings' ? 'active' : ''}`}
          >
            📦 Image Slider Catalog
          </li>
        </ul>

        {/* 🛠️ TESTING WIDGET: Lets you flip back and forth to see exactly what you vs your clients see */}
        <div className="simulator-widget">
          <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 8px 0' }}>Simulate View As:</p>
          <button 
            onClick={() => { setUserRole('admin'); setActiveTab('super-admin'); }}
            className={`simulator-btn ${userRole === 'admin' ? 'active' : ''}`}
          >
            Admin (You)
          </button>
          <button 
            onClick={() => { setUserRole('client'); setActiveTab('profile'); }}
            className={`simulator-btn ${userRole === 'client' ? 'active' : ''}`}
          >
            Client (Joe)
          </button>
        </div>
      </div>

      {/* 💻 2. ACTIVE VIEWPORT MAIN PANEL */}
      <div className="dashboard-workspace">
        
        {/* VIEW A: YOUR SPAWNER FACTORY FORM (Admin Only) */}
        {activeTab === 'super-admin' && userRole === 'admin' && (
          <div>
            <div className="workspace-header">
              <h1 className="workspace-title">SaaS Client Spawner Factory</h1>
              <p className="workspace-subtitle">Register a brand new paying company. The platform spawns their layout instantly.</p>
            </div>

            <form onSubmit={handleCreateClientSubmit} className="dashboard-card">
              <div className="dashboard-form-group">
                <label className="dashboard-label">Business Name</label>
                <input 
                  type="text" 
                  className="dashboard-input"
                  placeholder="e.g. Star Car Wash"
                  value={newClient.businessName}
                  onChange={handleBusinessNameChange}
                  required
                />
              </div>

              <div className="dashboard-form-group">
                <label className="dashboard-label">Generated Live URL Address Handle</label>
                <input 
                  type="text" 
                  className="dashboard-input"
                  value={newClient.slug ? `/${newClient.slug}` : '/(Auto-generated)'}
                  disabled
                />
              </div>

              <div className="dashboard-form-group">
                <label className="dashboard-label">Owner Login Email Address</label>
                <input 
                  type="email" 
                  className="dashboard-input"
                  placeholder="owner@company.com"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  required
                />
              </div>

              <div className="dashboard-form-group">
                <label className="dashboard-label">Secure Client Temporary Password</label>
                <input 
                  type="password" 
                  className="dashboard-input"
                  placeholder="••••••••••••"
                  value={newClient.password}
                  onChange={(e) => setNewClient({...newClient, password: e.target.value})}
                  required
                />
              </div>

              <button type="submit" className="dashboard-button">
                ⚡ Inject Live Client Architecture & Website
              </button>
            </form>
          </div>
        )}

        {/* VIEW B: BUSINESS IDENTITY FORM (Joe's View) */}
        {activeTab === 'profile' && (
          <div>
            <div className="workspace-header">
              <h1 className="workspace-title">Profile Settings Control</h1>
              <p className="workspace-subtitle">Modify public brand records. Saving refreshes your front template dynamically.</p>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-form-group">
                <label className="dashboard-label">Display Brand Title</label>
                <input 
                  type="text" 
                  className="dashboard-input" 
                  value={profile.businessName} 
                  onChange={(e) => setProfile({...profile, businessName: e.target.value})} 
                />
              </div>
              <div className="dashboard-form-group">
                <label className="dashboard-label">Customer Care Support Hot-line</label>
                <input 
                  type="text" 
                  className="dashboard-input" 
                  value={profile.phone} 
                  onChange={(e) => setProfile({...profile, phone: e.target.value})} 
                />
              </div>
              <div className="dashboard-form-group">
                <label className="dashboard-label">Operations Address Location Block</label>
                <input 
                  type="text" 
                  className="dashboard-input" 
                  value={profile.address} 
                  onChange={(e) => setProfile({...profile, address: e.target.value})} 
                />
              </div>
              <div className="dashboard-form-group">
                <label className="dashboard-label">About Slogan Paragraph Overview</label>
                <textarea 
                  className="dashboard-textarea" 
                  rows="4" 
                  value={profile.aboutText} 
                  onChange={(e) => setProfile({...profile, aboutText: e.target.value})} 
                />
              </div>
              <button onClick={() => alert('Profile Sync Dispatched to Render Cloud Instance!')} className="dashboard-button">
                💾 Save Live Interface Modifications
              </button>
            </div>
          </div>
        )}

        {/* VIEW C: SLIDER CATALOG LISTING (Joe's Products) */}
        {activeTab === 'listings' && (
          <div>
            <div className="workspace-header">
              <h1 className="workspace-title">Catalog Product Inventory Slider</h1>
              <p className="workspace-subtitle">Add or adjust specific pricing tiers displayed on the front gallery slider cards.</p>
            </div>

            <div className="dashboard-card" style={{ maxWidth: '700px' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#fff' }}>Active Offerings Matrix</h3>
              
              <div className="catalog-item-row">
                <div className="catalog-item-meta">
                  <div 
                    className="catalog-img-preview" 
                    style={{ backgroundImage: "url('https://unsplash.com')" }}
                  ></div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#fff' }}>Classic High Fade</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>Precision scissor blend gradient with signature hot towel finish</p>
                  </div>
                </div>
                <span className="catalog-item-price">₦5,000.00</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
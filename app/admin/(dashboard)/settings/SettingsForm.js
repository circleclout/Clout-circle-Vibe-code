"use client";

import { useState } from "react";

export default function SettingsForm({ initialSettings }) {
  const [formData, setFormData] = useState({
    siteName: initialSettings?.siteName || "",
    contactEmail: initialSettings?.contactEmail || "",
    contactPhone: initialSettings?.contactPhone || "",
    contactAddress: initialSettings?.contactAddress || "",
    twitterUrl: initialSettings?.twitterUrl || "",
    linkedInUrl: initialSettings?.linkedInUrl || "",
    instagramUrl: initialSettings?.instagramUrl || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to save settings");
      }

      setMessage("Settings saved successfully!");
    } catch (error) {
      setMessage("Error saving settings.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', marginBottom: '15px' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold' };

  return (
    <div style={{ marginTop: '20px', padding: '20px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
      {message && (
        <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '6px', backgroundColor: message.includes('Error') ? '#ff4d4f' : '#52c41a', color: 'white' }}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
        
        <div>
          <label style={labelStyle}>Site Name</label>
          <input type="text" name="siteName" value={formData.siteName} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Contact Email</label>
          <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Contact Phone</label>
          <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Contact Address</label>
          <textarea name="contactAddress" value={formData.contactAddress} onChange={handleChange} style={{...inputStyle, minHeight: '80px'}} />
        </div>

        <div>
          <label style={labelStyle}>Twitter URL</label>
          <input type="url" name="twitterUrl" value={formData.twitterUrl} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>LinkedIn URL</label>
          <input type="url" name="linkedInUrl" value={formData.linkedInUrl} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Instagram URL</label>
          <input type="url" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} style={inputStyle} />
        </div>

        <button disabled={loading} type="submit" style={{ marginTop: '10px', padding: '12px', background: 'var(--gold, #d4af37)', color: 'var(--text-inverse, #fff)', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}

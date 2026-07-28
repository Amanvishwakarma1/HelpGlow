import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, CheckCircle2, Clock, XCircle, Search, 
  ExternalLink, FileText, Image as ImageIcon, MessageSquare, 
  RefreshCw, Filter, UserCheck, DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api/donations';

const AdminDashboard = () => {
  const { user, token, isLoggedIn } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null); // For image modal preview

  const isAdmin = isLoggedIn && (user?.role === 'admin' || user?.email === 'admin@helpglow.org');

  const fetchDonations = async () => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_BASE_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch donations');
      setDonations(data.donations || []);
    } catch (err) {
      console.error('Failed to load donations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchDonations();
    }
  }, [isAdmin, token]);

  // Handle status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');

      // Update local state
      setDonations(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  if (!isLoggedIn || !isAdmin) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#16203A', color: '#FFFFFF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ backgroundColor: '#10182E', borderRadius: '24px', padding: '40px', maxWidth: '440px', width: '100%', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
          <ShieldAlert size={56} color="#EF4444" style={{ margin: '0 auto 16px auto' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>Access Denied</h2>
          <p style={{ color: '#9CA3AF', fontSize: '15px', lineHeight: 1.5, marginBottom: '24px' }}>
            Only authenticated Admin accounts can view the Donation History section.
          </p>
          <a
            href="/login"
            style={{
              backgroundColor: '#0A90B5',
              color: '#FFFFFF',
              textDecoration: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '15px',
              display: 'inline-block'
            }}
          >
            Sign In as Admin
          </a>
        </div>
      </div>
    );
  }

  // Calculate Summary Stats
  const totalFunds = donations.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
  const pendingCount = donations.filter(d => d.status === 'Pending').length;
  const approvedCount = donations.filter(d => d.status === 'Approved' || d.status === 'Completed').length;

  // Filter donations
  const filteredDonations = donations.filter(d => {
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      (d.donor_name && d.donor_name.toLowerCase().includes(q)) ||
      (d.whatsapp && d.whatsapp.includes(q)) ||
      (d.email && d.email.toLowerCase().includes(q)) ||
      (d.print_name && d.print_name.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#16203A', color: '#FFFFFF', minHeight: '100vh', padding: '120px 24px 60px 24px' }}>
      <div style={{ maxWidth: '1350px', margin: '0 auto' }}>
        
        {/* Header Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '32px', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
              Admin Donation History & Verifications
            </h1>
            <p style={{ color: '#9CA3AF', fontSize: '15px', margin: '6px 0 0 0' }}>
              Logged in as <strong style={{ color: '#0A90B5' }}>{user.email}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={fetchDonations}
            style={{
              backgroundColor: '#10182E',
              color: '#FFFFFF',
              border: '1px solid rgba(10, 144, 181, 0.4)',
              padding: '10px 18px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <RefreshCw size={16} />
            Refresh Data
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#10182E', padding: '20px', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ color: '#9CA3AF', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Total Donations</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF' }}>{donations.length}</div>
          </div>
          <div style={{ backgroundColor: '#10182E', padding: '20px', borderRadius: '18px', border: '1px solid rgba(10, 144, 181, 0.3)' }}>
            <div style={{ color: '#0A90B5', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Total Funds Raised</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0A90B5' }}>₹{totalFunds.toLocaleString()}</div>
          </div>
          <div style={{ backgroundColor: '#10182E', padding: '20px', borderRadius: '18px', border: '1px solid rgba(234, 179, 8, 0.3)' }}>
            <div style={{ color: '#EAB308', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Pending Verification</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#EAB308' }}>{pendingCount}</div>
          </div>
          <div style={{ backgroundColor: '#10182E', padding: '20px', borderRadius: '18px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
            <div style={{ color: '#22C55E', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Approved & Verified</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#22C55E' }}>{approvedCount}</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ backgroundColor: '#10182E', borderRadius: '18px', padding: '20px', marginBottom: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search donor name, WhatsApp, email, or video print name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#16203A',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '12px 16px 12px 46px',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Status Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['All', 'Pending', 'Approved', 'Completed', 'Rejected'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                style={{
                  backgroundColor: statusFilter === status ? '#0A90B5' : '#16203A',
                  color: statusFilter === status ? '#FFFFFF' : '#9CA3AF',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table View */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9CA3AF' }}>
            Loading donation records...
          </div>
        ) : filteredDonations.length === 0 ? (
          <div style={{ backgroundColor: '#10182E', borderRadius: '18px', padding: '60px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <p style={{ color: '#9CA3AF', fontSize: '16px', margin: 0 }}>No donation records found matching your filters.</p>
          </div>
        ) : (
          <div style={{ backgroundColor: '#10182E', borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#16203A', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#9CA3AF', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.8px' }}>
                    <th style={{ padding: '16px 20px' }}>Date</th>
                    <th style={{ padding: '16px 20px' }}>Donor Details</th>
                    <th style={{ padding: '16px 20px' }}>Wish / Video Details</th>
                    <th style={{ padding: '16px 20px' }}>Amount</th>
                    <th style={{ padding: '16px 20px' }}>Donor Photo</th>
                    <th style={{ padding: '16px 20px' }}>Payment Receipt</th>
                    <th style={{ padding: '16px 20px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonations.map((item) => {
                    const parsedItems = Array.isArray(item.items) ? item.items : (typeof item.items === 'string' ? JSON.parse(item.items || '[]') : []);

                    return (
                      <tr key={item.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <td style={{ padding: '16px 20px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                          {new Date(item.created_at).toLocaleDateString()}<br />
                          <small style={{ fontSize: '11px' }}>{new Date(item.created_at).toLocaleTimeString()}</small>
                        </td>

                        <td style={{ padding: '16px 20px' }}>
                          <strong style={{ color: '#FFFFFF', fontSize: '15px' }}>{item.donor_name}</strong>
                          <div style={{ fontSize: '13px', color: '#22C55E', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>WhatsApp:</span>
                            <a
                              href={`https://wa.me/91${item.whatsapp}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{ color: '#22C55E', fontWeight: 700, textDecoration: 'none' }}
                            >
                              +91 {item.whatsapp} ↗
                            </a>
                          </div>
                          {item.email && <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{item.email}</div>}
                        </td>

                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 700, color: '#0A90B5' }}>Video Name: {item.print_name}</div>
                          <div style={{ fontSize: '12px', color: '#D1D5DB', marginTop: '2px' }}>Date: {item.video_date}</div>
                          {item.wishing_details && (
                            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px', fontStyle: 'italic' }}>
                              "{item.wishing_details}"
                            </div>
                          )}
                        </td>

                        <td style={{ padding: '16px 20px', fontWeight: 800, color: '#FFFFFF', fontSize: '16px' }}>
                          ₹{parseFloat(item.amount).toLocaleString()}
                          {parsedItems.length > 0 && (
                            <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 400, marginTop: '2px' }}>
                              {parsedItems.length} sponsored items
                            </div>
                          )}
                        </td>

                        <td style={{ padding: '16px 20px' }}>
                          {item.photo_url ? (
                            <button
                              type="button"
                              onClick={() => setSelectedImage({ url: item.photo_url, title: `Donor Photo - ${item.donor_name}` })}
                              style={{
                                backgroundColor: '#23232A',
                                border: '1px solid rgba(10, 144, 181, 0.4)',
                                color: '#0A90B5',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <ImageIcon size={14} /> View Photo
                            </button>
                          ) : (
                            <span style={{ fontSize: '12px', color: '#6B7280' }}>None</span>
                          )}
                        </td>

                        <td style={{ padding: '16px 20px' }}>
                          <button
                            type="button"
                            onClick={() => setSelectedImage({ url: item.payment_screenshot_url, title: `Payment Receipt - ${item.donor_name} (₹${item.amount})` })}
                            style={{
                              backgroundColor: 'rgba(34, 197, 94, 0.15)',
                              border: '1px solid rgba(34, 197, 94, 0.4)',
                              color: '#22C55E',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <FileText size={14} /> View Receipt ↗
                          </button>
                        </td>

                        <td style={{ padding: '16px 20px' }}>
                          <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            style={{
                              backgroundColor: 
                                item.status === 'Approved' ? 'rgba(34, 197, 94, 0.2)' :
                                item.status === 'Completed' ? 'rgba(59, 130, 246, 0.2)' :
                                item.status === 'Rejected' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                              color: 
                                item.status === 'Approved' ? '#22C55E' :
                                item.status === 'Completed' ? '#3B82F6' :
                                item.status === 'Rejected' ? '#EF4444' : '#EAB308',
                              border: '1px solid currentColor',
                              borderRadius: '8px',
                              padding: '6px 10px',
                              fontSize: '13px',
                              fontWeight: 700,
                              outline: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="Pending" style={{ backgroundColor: '#10182E', color: '#EAB308' }}>Pending</option>
                            <option value="Approved" style={{ backgroundColor: '#10182E', color: '#22C55E' }}>Approved</option>
                            <option value="Completed" style={{ backgroundColor: '#10182E', color: '#3B82F6' }}>Completed</option>
                            <option value="Rejected" style={{ backgroundColor: '#10182E', color: '#EF4444' }}>Rejected</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: '24px'
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                backgroundColor: '#10182E',
                borderRadius: '20px',
                padding: '24px',
                maxWidth: '650px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                border: '1px solid rgba(10, 144, 181, 0.4)',
                textAlign: 'center'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>{selectedImage.title}</h3>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  style={{ backgroundColor: 'transparent', border: 'none', color: '#9CA3AF', fontSize: '20px', fontWeight: 800, cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <img
                src={selectedImage.url}
                alt="Receipt / Photo Preview"
                style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '12px', display: 'block', margin: '0 auto', border: '1px solid rgba(255,255,255,0.1)' }}
              />

              <div style={{ marginTop: '16px' }}>
                <a
                  href={selectedImage.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: '#0A90B5',
                    color: '#FFFFFF',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  Open Full Resolution Original Image ↗
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;

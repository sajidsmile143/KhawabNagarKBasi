'use client';

import React, { useState, useEffect } from 'react';
import { 
  PlusSquare, 
  Library, 
  BarChart3, 
  Settings, 
  LogOut, 
  Home, 
  Send, 
  Trash2, 
  Search,
  PenTool,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  Upload,
  X,
  Edit2
} from 'lucide-react';
import { createPoem, deletePoem, updatePoem } from '@/lib/actions';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminDashboard({ initialPoems }) {
  const [activeModule, setActiveModule] = useState('stats');
  const [poems, setPoems] = useState(initialPoems);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('ghazals');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(null); // null means checking
  const [isCustomDropdownOpen, setIsCustomDropdownOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [editingPoem, setEditingPoem] = useState(null);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    setIsAuthorized(auth === 'true');
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'khawab123') {
      setIsAuthorized(true);
      sessionStorage.setItem('admin_auth', 'true');
      showNotification("Sangat welcome back!", "success");
    } else {
      showNotification("Ghalat password!", "error");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthorized(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (poem) => {
    setEditingPoem(poem);
    setTitle(poem.title);
    setContent(poem.content);
    setCategory(poem.category || 'ghazals');
    setImagePreview(poem.image);
    setImageFile(null); // Reset file if any
    setActiveModule('write');
  };

  const handleCancelEdit = () => {
    setEditingPoem(null);
    setTitle('');
    setContent('');
    setCategory('ghazals');
    setImagePreview(null);
    setImageFile(null);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !content) return showNotification("Please add both title and content!", "error");
    
    setIsPublishing(true);
    let imageUrl = null;

    try {
      // 1. Upload Image to Supabase if exists
      if (imageFile) {
        console.log("Starting image upload for:", imageFile.name);
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `poem-${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
        const filePath = fileName;

        const { data, error: uploadError } = await supabase.storage
          .from('POETRY-IMAGES')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: imageFile.type
          });

        if (uploadError) {
          console.error("Upload Error Details:", uploadError);
          throw uploadError;
        }
        
        console.log("Upload successful, data:", data);

        const { data: { publicUrl } } = supabase.storage
          .from('POETRY-IMAGES')
          .getPublicUrl(filePath);
        
        imageUrl = publicUrl;
        console.log("Generated Public URL:", imageUrl);
      }

      // 2. Create Poem with Image URL
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      if (imageUrl) formData.append('imageUrl', imageUrl);
      
      let savedPoem;
      if (editingPoem) {
        savedPoem = await updatePoem(editingPoem.id, formData);
        setPoems(poems.map(p => p.id === savedPoem.id ? savedPoem : p));
        showNotification("Shayari update ho gayi!", "success");
      } else {
        savedPoem = await createPoem(formData);
        setPoems([savedPoem, ...poems]);
        showNotification("Shayari publish ho gayi!", "success");
      }
      
      if (savedPoem && savedPoem.id) {
        setTitle('');
        setContent('');
        setImageFile(null);
        setImagePreview(null);
        setEditingPoem(null);
        
        setTimeout(() => {
          setActiveModule('manage');
        }, 1000);
      } else {
        throw new Error("Data not saved correctly.");
      }
      
    } catch (error) {
      showNotification("Error: " + error.message, "error");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Kya aap waqai ye shayari delete karna chahte hain?")) return;
    try {
      await deletePoem(id);
      setPoems(poems.filter(p => p.id !== id));
      showNotification("Shayari delete ho gayi!");
    } catch (error) {
      showNotification("Error deleting poem.", "error");
    }
  };

  if (isAuthorized === null) return null;

  if (!isAuthorized) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5' }}>
        <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>Admin Login</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>Enter your secret key to access workspace.</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '1.5rem', outline: 'none', textAlign: 'center', fontSize: '1.2rem' }}
            />
            <button className="btn-premium" style={{ width: '100%' }} type="submit">Unlock Workspace</button>
          </form>
        </div>
        {notification.show && <Toast notification={notification} />}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7fafc' }} suppressHydrationWarning>
      {notification.show && <Toast notification={notification} />}

      <aside style={{ width: '280px', backgroundColor: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh' }} suppressHydrationWarning>
        <div style={{ padding: '2rem', borderBottom: '1px solid #edf2f7' }}>
          <h2 className="serif" style={{ color: 'var(--accent)', fontSize: '1.4rem' }}>Workspace</h2>
          <p style={{ fontSize: '0.75rem', color: '#a0aec0', letterSpacing: '1px' }}>KHAWAB NAGAR KI BASI</p>
        </div>

        <nav style={{ padding: '2rem 0', flex: 1 }}>
          <SidebarItem id="stats" icon={BarChart3} label="Dashboard" activeModule={activeModule} setActiveModule={setActiveModule} />
          <SidebarItem id="write" icon={PlusSquare} label="Write New" activeModule={activeModule} setActiveModule={setActiveModule} />
          <SidebarItem id="manage" icon={Library} label="Manage All" activeModule={activeModule} setActiveModule={setActiveModule} />
          <SidebarItem id="settings" icon={Settings} label="Settings" activeModule={activeModule} setActiveModule={setActiveModule} />
        </nav>

        <div style={{ padding: '2rem', borderTop: '1px solid #edf2f7' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#718096', fontSize: '0.9rem' }}>
            <Home size={18} /> View Site
          </Link>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: '#e53e3e', padding: '1rem 0', cursor: 'pointer', fontSize: '0.9rem' }}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: '280px', flex: 1, padding: '3rem' }}>
        <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="serif" style={{ fontSize: '2.5rem', color: '#1a202c' }}>
              {activeModule === 'write' && (editingPoem ? 'Edit Masterpiece' : 'New Masterpiece')}
              {activeModule === 'manage' && 'Collections'}
              {activeModule === 'stats' && 'Insights'}
              {activeModule === 'settings' && 'Settings'}
            </h1>
            <p style={{ color: '#718096' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <div style={{ padding: '0.8rem 1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PenTool size={16} color="var(--accent)" />
                <span style={{ fontWeight: 'bold' }}>{poems.length}</span> <span style={{ color: '#718096', fontSize: '0.9rem' }}>Published</span>
             </div>
          </div>
        </header>

        <div style={{ maxWidth: '1000px' }}>
          {activeModule === 'write' && (
            <div className="fade-in" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '3rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #edf2f7' }}>
              <form onSubmit={handlePublish}>
                {/* Image Upload Area */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#a0aec0', marginBottom: '1rem' }}>FEATURED IMAGE</label>
                  
                  {imagePreview ? (
                    <div style={{ position: 'relative', width: '100%', height: '250px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                      <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button 
                        onClick={() => { setImageFile(null); setImagePreview(null); }}
                        style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer', display: 'flex' }}
                      >
                        <X size={18} color="#e53e3e" />
                      </button>
                    </div>
                  ) : (
                    <label style={{ 
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                      width: '100%', height: '150px', border: '2px dashed #e2e8f0', borderRadius: '12px', 
                      cursor: 'pointer', transition: '0.2s', backgroundColor: '#fcfcfc'
                    }} onMouseEnter={(e) => e.target.style.borderColor = 'var(--accent)'} onMouseLeave={(e) => e.target.style.borderColor = '#e2e8f0'}>
                      <Upload size={32} color="#a0aec0" style={{ marginBottom: '0.5rem' }} />
                      <span style={{ color: '#718096', fontSize: '0.9rem' }}>Click to upload featured image</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    </label>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem' }}>
                   <div style={{ flex: 1, position: 'relative' }}>
                     <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#a0aec0', marginBottom: '0.5rem' }}>CATEGORY</label>
                     <div 
                        onClick={() => setIsCustomDropdownOpen(!isCustomDropdownOpen)}
                        style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <span style={{ textTransform: 'capitalize' }}>{category}</span>
                        <ChevronRight size={16} style={{ transform: isCustomDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.2s' }} />
                      </div>
                      
                      {isCustomDropdownOpen && (
                        <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', marginTop: '2px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 10 }}>
                          {['ghazals', 'nazms', 'rubai', 'sher'].map((cat) => (
                            <div key={cat} onClick={() => { setCategory(cat); setIsCustomDropdownOpen(false); }} style={{ padding: '1rem', cursor: 'pointer', borderBottom: '1px solid #f7fafc', backgroundColor: category === cat ? 'rgba(197, 160, 89, 0.05)' : 'transparent', color: category === cat ? 'var(--accent)' : '#4a5568', fontWeight: category === cat ? 'bold' : 'normal' }}>
                              {cat === 'ghazals' && 'Ghazals'}
                              {cat === 'nazms' && 'Nazms'}
                              {cat === 'rubai' && 'Rubaiyat'}
                              {cat === 'sher' && 'Ashaar'}
                            </div>
                          ))}
                        </div>
                      )}
                   </div>
                   <div style={{ flex: 2 }}>
                     <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#a0aec0', marginBottom: '0.5rem' }}>UNWAN (TITLE)</label>
                     <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Yahan unwan likhen..." className="urdu" style={{ width: '100%', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none', fontSize: '1.8rem', textAlign: 'right' }} />
                   </div>
                </div>

                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#a0aec0', marginBottom: '0.5rem' }}>CONTENT (SHAYARI)</label>
                <textarea placeholder="Apni shayari yahan likhen..." className="urdu" value={content} onChange={(e) => setContent(e.target.value)} style={{ width: '100%', height: '400px', padding: '2rem', fontSize: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none', resize: 'none', textAlign: 'right', lineHeight: '2.5', marginBottom: '2.5rem' }} />

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  {editingPoem && (
                    <button type="button" onClick={handleCancelEdit} className="btn-secondary" style={{ padding: '1rem 2rem', borderRadius: '8px', border: '1px solid #e2e8f0', cursor: 'pointer', backgroundColor: 'transparent' }}>
                      Cancel
                    </button>
                  )}
                  <button type="submit" disabled={isPublishing} className="btn-premium" style={{ padding: '1rem 3rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Send size={18} /> {isPublishing ? (editingPoem ? 'Updating...' : 'Publishing...') : (editingPoem ? 'Update Masterpiece' : 'Publish Masterpiece')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeModule === 'manage' && (
            <div className="fade-in" style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #edf2f7', overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #edf2f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
                    <input type="text" placeholder="Search poems..." style={{ padding: '0.6rem 1rem 0.6rem 3rem', borderRadius: '20px', border: '1px solid #e2e8f0', outline: 'none', width: '300px' }} />
                 </div>
              </div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f7fafc', textAlign: 'left' }}>
                    <th style={{ padding: '1.2rem 2rem', color: '#718096', fontSize: '0.8rem', textTransform: 'uppercase' }}>Image</th>
                    <th style={{ padding: '1.2rem 2rem', color: '#718096', fontSize: '0.8rem', textTransform: 'uppercase' }}>Title</th>
                    <th style={{ padding: '1.2rem 2rem', color: '#718096', fontSize: '0.8rem', textTransform: 'uppercase' }}>Category</th>
                    <th style={{ padding: '1.2rem 2rem', color: '#718096', fontSize: '0.8rem', textTransform: 'uppercase' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {poems.map((poem, index) => (
                    <tr key={poem?.id || index} style={{ borderBottom: '1px solid #edf2f7' }}>
                      <td style={{ padding: '1rem 2rem' }}>
                        {poem?.image ? (
                          <img src={poem.image} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        ) : (
                          <div style={{ width: '60px', height: '40px', backgroundColor: '#f7fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                            <ImageIcon size={16} color="#cbd5e0" />
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '1.5rem 2rem' }}>
                        <h4 className="urdu" style={{ fontSize: '1.4rem' }}>{poem?.title || 'No Title'}</h4>
                      </td>
                      <td style={{ padding: '1.5rem 2rem' }}>
                        <span style={{ padding: '0.4rem 0.8rem', backgroundColor: '#fffaf0', color: '#b7791f', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>{poem?.category || 'General'}</span>
                      </td>
                      <td style={{ padding: '1.5rem 2rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => handleEdit(poem)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: '0.5rem' }}>
                            <Edit2 size={20} />
                          </button>
                          <button onClick={() => poem?.id && handleDelete(poem.id)} style={{ background: 'none', border: 'none', color: '#f56565', cursor: 'pointer', padding: '0.5rem' }}>
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeModule === 'stats' && (
            <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #edf2f7' }}>
                <p style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '1rem' }}>Total Works</p>
                <h2 style={{ fontSize: '3rem' }}>{poems.length}</h2>
              </div>
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #edf2f7' }}>
                <p style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '1rem' }}>Total Categories</p>
                <h2 style={{ fontSize: '3rem' }}>4</h2>
              </div>
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #edf2f7' }}>
                <p style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '1rem' }}>Global Reach</p>
                <h2 style={{ fontSize: '3rem' }}>∞</h2>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ id, icon: Icon, label, activeModule, setActiveModule }) {
  return (
    <button onClick={() => setActiveModule(id)} style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', padding: '1rem 1.5rem', background: activeModule === id ? 'rgba(197, 160, 89, 0.1)' : 'transparent', border: 'none', borderLeft: activeModule === id ? '4px solid var(--accent)' : '4px solid transparent', color: activeModule === id ? 'var(--accent)' : '#4a5568', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.95rem', fontWeight: activeModule === id ? '700' : '500' }}>
      <Icon size={20} />
      {label}
    </button>
  );
}

function Toast({ notification }) {
  return (
    <div style={{ position: 'fixed', top: '2rem', right: '2rem', backgroundColor: notification.type === 'error' ? '#fff5f5' : '#f0fff4', border: `1px solid ${notification.type === 'error' ? '#feb2b2' : '#9ae6b4'}`, color: notification.type === 'error' ? '#c53030' : '#276749', padding: '1rem 2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 1000, animation: 'slideIn 0.3s ease-out' }}>
      {notification.type === 'error' ? <XCircle size={20} /> : <CheckCircle2 size={20} />}
      <span style={{ fontWeight: '600' }}>{notification.message}</span>
    </div>
  );
}

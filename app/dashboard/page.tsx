'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Post from './components/Post'
import Schedule from './components/Schedule'
import Analytics from './components/Analytics'
import Accounts from './components/Accounts'
import Settings from './components/Settings'

const menuItems = [
  { id:'home', label:'Dashboard', svg:<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { id:'post', label:'Posting', svg:<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
  { id:'schedule', label:'Jadwal', svg:<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { id:'analytics', label:'Analitik', svg:<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg> },
  { id:'accounts', label:'Akun', svg:<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
  { id:'settings', label:'Setelan', svg:<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg> },
]

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [activeMenu, setActiveMenu] = useState('home')
  const [activeCount, setActiveCount] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push('/'); return }
      setUser(data.user)
      const { count } = await supabase
        .from('social_accounts')
        .select('*', { count:'exact', head:true })
        .eq('user_id', data.user.id)
        .eq('status', 'active')
      setActiveCount(count || 0)
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const menuTitles: Record<string, string> = {
    home:'Dashboard', post:'Buat Posting', schedule:'Jadwal',
    analytics:'Analitik', accounts:'Manajemen Akun', settings:'Pengaturan',
  }

  return (
    <div style={{
      display: isMobile ? 'block' : 'grid',
      gridTemplateColumns: isMobile ? 'none' : '240px 1fr',
      minHeight:'100vh', fontFamily:'system-ui,sans-serif',
      background:'#0a0a1a',
      backgroundImage:'radial-gradient(ellipse at 20% 20%, #1a1040 0%, #0a0a1a 60%), radial-gradient(ellipse at 80% 80%, #0d1f3c 0%, transparent 60%)',
      color:'white'
    }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.2); border-radius:2px; }
        input, select, textarea { outline:none; }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator { filter:invert(1); }
      `}</style>

      {/* Sidebar — desktop only */}
      {!isMobile && (
        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {/* Mobile sidebar overlay */}
      {isMobile && showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          style={{
            position:'fixed', inset:0, background:'rgba(0,0,0,0.6)',
            zIndex:40, backdropFilter:'blur(4px)'
          }}
        />
      )}

      {/* Mobile sidebar drawer */}
      {isMobile && (
        <div style={{
          position:'fixed', top:0, left:0, bottom:0, width:'260px',
          background:'#0f0c29', zIndex:50,
          transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)',
          transition:'transform 0.3s ease',
          borderRight:'1px solid rgba(255,255,255,0.1)',
          padding:'1.5rem 1rem', display:'flex', flexDirection:'column', gap:'4px'
        }}>
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <div style={{
                width:'36px', height:'36px', borderRadius:'10px',
                background:'linear-gradient(135deg,#667eea,#764ba2)',
                display:'flex', alignItems:'center', justifyContent:'center'
              }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 2H3v16h5v4l4-4h5l4-4V2z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize:'15px', fontWeight:'600', color:'white' }}>SocialDash</div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)' }}>Pro Plan</div>
              </div>
            </div>
            <button onClick={() => setShowSidebar(false)} style={{
              background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.5)', fontSize:'20px'
            }}>✕</button>
          </div>

          {/* Nav */}
          {menuItems.map(m => (
            <div key={m.id} onClick={() => { setActiveMenu(m.id); setShowSidebar(false) }} style={{
              display:'flex', alignItems:'center', gap:'10px',
              padding:'10px 12px', borderRadius:'12px', cursor:'pointer',
              background: activeMenu === m.id ? 'rgba(102,126,234,0.3)' : 'transparent',
              border: activeMenu === m.id ? '1px solid rgba(102,126,234,0.4)' : '1px solid transparent',
              fontSize:'14px', color: activeMenu === m.id ? 'white' : 'rgba(255,255,255,0.6)',
            }}>
              {m.svg}<span>{m.label}</span>
            </div>
          ))}

          {/* User */}
          <div style={{
            marginTop:'auto', display:'flex', alignItems:'center', gap:'10px',
            padding:'10px', background:'rgba(255,255,255,0.05)',
            border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px'
          }}>
            <div style={{
              width:'32px', height:'32px', borderRadius:'50%',
              background:'linear-gradient(135deg,#667eea,#764ba2)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'13px', fontWeight:'600', color:'white', flexShrink:0
            }}>{user?.email?.charAt(0).toUpperCase()}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'12px', color:'white', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.email}</div>
              <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.4)' }}>Admin</div>
            </div>
            <button onClick={handleLogout} style={{
              background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.4)'
            }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ padding: isMobile ? '12px 12px 80px' : '16px', overflowY:'auto' }}>

        {/* Mobile topbar */}
        {isMobile && (
          <div style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            marginBottom:'16px', padding:'10px 0'
          }}>
            <button onClick={() => setShowSidebar(true)} style={{
              background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)',
              borderRadius:'10px', padding:'8px', cursor:'pointer', color:'white',
              display:'flex', alignItems:'center', justifyContent:'center'
            }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <div style={{ fontSize:'16px', fontWeight:'600' }}>{menuTitles[activeMenu]}</div>
            <div style={{
              background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
              padding:'5px 10px', borderRadius:'99px', fontSize:'11px',
              color: activeCount > 0 ? '#4ade80' : 'rgba(255,255,255,0.4)'
            }}>● {activeCount} aktif</div>
          </div>
        )}

        {/* Desktop topbar */}
        {!isMobile && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
            <div>
              <h1 style={{ fontSize:'22px', fontWeight:'600' }}>{menuTitles[activeMenu]}</h1>
              <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginTop:'2px' }}>
                Selamat datang, {user?.email}
              </p>
            </div>
            <div style={{
              background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
              padding:'6px 14px', borderRadius:'99px', fontSize:'12px',
              color: activeCount > 0 ? '#4ade80' : 'rgba(255,255,255,0.4)'
            }}>● {activeCount} akun aktif</div>
          </div>
        )}

        {/* Konten */}
        {activeMenu === 'home'      && <Home />}
        {activeMenu === 'post'      && <Post />}
        {activeMenu === 'schedule'  && <Schedule />}
        {activeMenu === 'analytics' && <Analytics />}
        {activeMenu === 'accounts'  && <Accounts />}
        {activeMenu === 'settings'  && <Settings />}
      </div>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <div style={{
          position:'fixed', bottom:0, left:0, right:0,
          background:'rgba(10,10,26,0.95)', backdropFilter:'blur(20px)',
          borderTop:'1px solid rgba(255,255,255,0.1)',
          display:'flex', zIndex:30, padding:'6px 0'
        }}>
          {menuItems.map(m => (
            <div key={m.id} onClick={() => setActiveMenu(m.id)} style={{
              flex:1, display:'flex', flexDirection:'column', alignItems:'center',
              gap:'3px', padding:'6px 4px', cursor:'pointer',
              color: activeMenu === m.id ? '#a78bfa' : 'rgba(255,255,255,0.4)',
              transition:'all 0.15s'
            }}>
              <div style={{ transform: activeMenu === m.id ? 'scale(1.1)' : 'scale(1)', transition:'all 0.15s' }}>
                {m.svg}
              </div>
              <span style={{ fontSize:'9px', fontWeight: activeMenu === m.id ? '600' : '400' }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
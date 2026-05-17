'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

const menuItems = [
  { id:'home', label:'Dashboard', svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { id:'post', label:'Buat Posting', svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
  { id:'schedule', label:'Jadwal', svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { id:'analytics', label:'Analitik', svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg> },
  { id:'accounts', label:'Akun', svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
  { id:'settings', label:'Pengaturan', svg:<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg> },
]

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
}

const platformColors: Record<string, string> = {
  x:'#fff', ig:'#c0307a', li:'#0a66c2', fb:'#1877f2', yt:'#c00', tk:'#555',
}

const platformLabels: Record<string, string> = {
  x:'X / Twitter', ig:'Instagram', li:'LinkedIn', fb:'Facebook', yt:'YouTube', tk:'TikTok',
}

const platformSvgs: Record<string, React.ReactElement> = {
  x: <svg viewBox="0 0 24 24" width="12" height="12" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  ig: <svg viewBox="0 0 24 24" width="12" height="12" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  fb: <svg viewBox="0 0 24 24" width="12" height="12" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  li: <svg viewBox="0 0 24 24" width="12" height="12" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  yt: <svg viewBox="0 0 24 24" width="12" height="12" fill="white"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  tk: <svg viewBox="0 0 24 24" width="12" height="12" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>,
}

interface SidebarProps {
  activeMenu: string
  setActiveMenu: (menu: string) => void
  user: any
  onLogout: () => void
}

interface ConnectedAccount {
  id: string
  platform: string
  username: string
  status: string
}

export default function Sidebar({ activeMenu, setActiveMenu, user, onLogout }: SidebarProps) {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([])
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const loadData = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (currentUser) {
        setUserName(currentUser.user_metadata?.name || currentUser.email || '')
        const { data, error } = await supabase
          .from('social_accounts')
          .select('*')
          .eq('user_id', currentUser.id)
          .eq('status', 'active')
          .limit(5)
        if (!error && data) setAccounts(data)
      }
    }
    loadData()
  }, [])

  return (
    <div style={{
      ...glass, margin:'16px 0 16px 16px', padding:'1.5rem 1rem',
      display:'flex', flexDirection:'column', gap:'4px',
      borderRadius:'20px', position:'sticky', top:'16px',
      height:'calc(100vh - 32px)', overflowY:'auto'
    }}>

      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0 8px', marginBottom:'1.5rem' }}>
        <div style={{
          width:'36px', height:'36px', borderRadius:'10px',
          background:'linear-gradient(135deg,#667eea,#764ba2)',
          display:'flex', alignItems:'center', justifyContent:'center'
        }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2H3v16h5v4l4-4h5l4-4V2z"/>
            <line x1="9" y1="9" x2="15" y2="9"/>
            <line x1="9" y1="13" x2="13" y2="13"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize:'15px', fontWeight:'600', color:'white' }}>SocialDash</div>
          <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)' }}>Pro Plan</div>
        </div>
      </div>

      {/* Nav */}
      {menuItems.map(m => (
        <div key={m.id} onClick={() => setActiveMenu(m.id)} style={{
          display:'flex', alignItems:'center', gap:'10px',
          padding:'10px 12px', borderRadius:'12px', cursor:'pointer',
          background: activeMenu === m.id ? 'rgba(102,126,234,0.3)' : 'transparent',
          border: activeMenu === m.id ? '1px solid rgba(102,126,234,0.4)' : '1px solid transparent',
          fontSize:'14px', color: activeMenu === m.id ? 'white' : 'rgba(255,255,255,0.6)',
          transition:'all 0.15s'
        }}>
          <span style={{ opacity: activeMenu === m.id ? 1 : 0.7 }}>{m.svg}</span>
          <span>{m.label}</span>
        </div>
      ))}

      {/* Akun terhubung */}
      <div style={{ marginTop:'auto', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginBottom:'8px', paddingLeft:'4px', letterSpacing:'0.05em' }}>
          AKUN TERHUBUNG {accounts.length > 0 && `(${accounts.length})`}
        </div>

        {accounts.length === 0 ? (
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.25)', padding:'6px 4px', textAlign:'center' }}>
            Belum ada akun terhubung
          </div>
        ) : (
          accounts.map(acc => (
            <div key={acc.id} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'5px 4px' }}>
              <div style={{
                width:'20px', height:'20px', borderRadius:'6px',
                background: platformColors[acc.platform] === '#fff' ? '#111' : platformColors[acc.platform] || '#333',
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0
              }}>{platformSvgs[acc.platform]}</div>
              <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {acc.username || platformLabels[acc.platform]}
              </span>
              <div style={{
                width:'6px', height:'6px', borderRadius:'50%', flexShrink:0,
                background: acc.status === 'active' ? '#4ade80' : '#f87171',
                boxShadow: `0 0 4px ${acc.status === 'active' ? '#4ade80' : '#f87171'}`
              }}></div>
            </div>
          ))
        )}
      </div>

      {/* User */}
      <div style={{
        display:'flex', alignItems:'center', gap:'10px',
        padding:'10px', marginTop:'12px', ...glass, borderRadius:'12px'
      }}>
        <div style={{
          width:'32px', height:'32px', borderRadius:'50%',
          background:'linear-gradient(135deg,#667eea,#764ba2)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'13px', fontWeight:'600', color:'white', flexShrink:0
        }}>
          {(userName || user?.email || '?').charAt(0).toUpperCase()}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:'12px', fontWeight:'500', color:'white', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {userName || user?.email}
          </div>
          <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.4)' }}>Admin</div>
        </div>
        <button onClick={onLogout} title="Keluar" style={{
          background:'none', border:'none', cursor:'pointer',
          color:'rgba(255,255,255,0.4)', padding:'4px',
          display:'flex', alignItems:'center', justifyContent:'center'
        }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
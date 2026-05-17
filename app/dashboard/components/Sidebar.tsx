'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

const menuItems = [
  { id:'home', icon:'📊', label:'Dashboard' },
  { id:'post', icon:'✏️', label:'Buat Posting' },
  { id:'schedule', icon:'📅', label:'Jadwal' },
  { id:'analytics', icon:'📈', label:'Analitik' },
  { id:'accounts', icon:'👤', label:'Akun' },
  { id:'settings', icon:'⚙️', label:'Pengaturan' },
]

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
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

const platformColors: Record<string, string> = {
  x: '#fff',
  ig: '#c0307a',
  li: '#0a66c2',
  fb: '#1877f2',
  yt: '#c00',
  tk: '#010101',
}

const platformLabels: Record<string, string> = {
  x: 'X / Twitter',
  ig: 'Instagram',
  li: 'LinkedIn',
  fb: 'Facebook',
  yt: 'YouTube',
  tk: 'TikTok',
}

export default function Sidebar({ activeMenu, setActiveMenu, user, onLogout }: SidebarProps) {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([])
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const loadData = async () => {
      // Ambil nama dari user_metadata
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (currentUser) {
        setUserName(currentUser.user_metadata?.name || currentUser.email || '')
      }

      // Ambil akun terhubung dari tabel social_accounts
      const { data, error } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', currentUser?.id)
        .eq('status', 'active')
        .limit(5)

      if (!error && data) {
        setAccounts(data)
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
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px'
        }}>📱</div>
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
          fontSize:'14px', color:'white', transition:'all 0.15s'
        }}>
          <span>{m.icon}</span>
          <span>{m.label}</span>
        </div>
      ))}

      {/* Akun terhubung dari Supabase */}
      <div style={{ marginTop:'auto', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginBottom:'8px', paddingLeft:'4px' }}>
          AKUN TERHUBUNG {accounts.length > 0 && `(${accounts.length})`}
        </div>

        {accounts.length === 0 ? (
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.3)', padding:'4px', textAlign:'center' }}>
            Belum ada akun terhubung
          </div>
        ) : (
          accounts.map(acc => (
            <div key={acc.id} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'5px 4px' }}>
              <div style={{
                width:'8px', height:'8px', borderRadius:'50%',
                background: platformColors[acc.platform] || '#fff',
                boxShadow:`0 0 6px ${platformColors[acc.platform] || '#fff'}`
              }}></div>
              <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {acc.username || platformLabels[acc.platform]}
              </span>
              <span style={{
                fontSize:'10px',
                color: acc.status === 'active' ? '#4ade80' : '#f87171'
              }}>●</span>
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
          fontSize:'13px', fontWeight:'600', color:'white'
        }}>
          {(userName || user?.email || '?').charAt(0).toUpperCase()}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:'12px', fontWeight:'500', color:'white', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {userName || user?.email}
          </div>
          <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.4)' }}>Admin</div>
        </div>
        <button onClick={onLogout} style={{
          background:'none', border:'none', cursor:'pointer',
          color:'rgba(255,255,255,0.4)', fontSize:'16px', padding:'4px'
        }}>🚪</button>
      </div>
    </div>
  )
}
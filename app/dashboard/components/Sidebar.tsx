'use client'

const platforms = [
  { id:'x', label:'X / Twitter', color:'#fff' },
  { id:'ig', label:'Instagram', color:'#c0307a' },
  { id:'li', label:'LinkedIn', color:'#0a66c2' },
  { id:'fb', label:'Facebook', color:'#1877f2' },
]

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

export default function Sidebar({ activeMenu, setActiveMenu, user, onLogout }: SidebarProps) {
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

      {/* Akun terhubung */}
      <div style={{ marginTop:'auto', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginBottom:'8px', paddingLeft:'4px' }}>AKUN TERHUBUNG</div>
        {platforms.map(p => (
          <div key={p.id} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'5px 4px' }}>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:p.color, boxShadow:`0 0 6px ${p.color}` }}></div>
            <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)', flex:1 }}>{p.label}</span>
            <span style={{ fontSize:'11px', color:'#4ade80' }}>●</span>
          </div>
        ))}
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
          {user?.email?.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:'12px', fontWeight:'500', color:'white', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.email}</div>
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
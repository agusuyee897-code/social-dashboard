'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [postText, setPostText] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState(['x', 'ig', 'li'])
  const [posts, setPosts] = useState([
    { id:1, platform:'x', text:'Produk baru kami sudah tersedia!', time:'5 menit lalu', status:'sent' },
    { id:2, platform:'ig', text:'Behind the scenes tim kami ✨', time:'2 jam lalu', status:'sent' },
    { id:3, platform:'li', text:'Kami membuka lowongan posisi...', time:'Besok 09.00', status:'scheduled' },
    { id:4, platform:'fb', text:'Flash sale hari ini diskon 50%!', time:'Kemarin', status:'failed' },
  ])
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/'); return }
      setUser(data.user)
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    )
  }

  const handlePost = () => {
    if (!postText.trim() || selectedPlatforms.length === 0) return
    const newPosts = selectedPlatforms.map((p, i) => ({
      id: Date.now() + i,
      platform: p,
      text: postText.substring(0, 60),
      time: 'Baru saja',
      status: 'sent'
    }))
    setPosts(prev => [...newPosts, ...prev])
    setPostText('')
  }

  const platforms = [
    { id:'x', label:'X / Twitter', color:'#000', short:'X' },
    { id:'ig', label:'Instagram', color:'#c0307a', short:'IG' },
    { id:'li', label:'LinkedIn', color:'#0a66c2', short:'in' },
    { id:'fb', label:'Facebook', color:'#1877f2', short:'f' },
    { id:'yt', label:'YouTube', color:'#c00', short:'YT' },
  ]

  const menuItems = [
    { id:'dashboard', icon:'📊', label:'Dashboard' },
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
    borderRadius: '16px',
  }

  return (
    <div style={{
      display:'grid', gridTemplateColumns:'240px 1fr',
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
        textarea:focus, input:focus { outline:none; }
        .nav-item:hover { background:rgba(255,255,255,0.1) !important; }
        .platform-chip:hover { opacity:0.85; }
        .post-btn:hover { transform:translateY(-1px); opacity:0.9; }
        .stat-card:hover { border-color:rgba(255,255,255,0.2) !important; transform:translateY(-2px); }
        .stat-card { transition: all 0.2s; }
      `}</style>

      {/* SIDEBAR */}
      <div style={{
        ...glass, margin:'16px 0 16px 16px', padding:'1.5rem 1rem',
        display:'flex', flexDirection:'column', gap:'4px',
        borderRadius:'20px', position:'sticky', top:'16px', height:'calc(100vh - 32px)'
      }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0 8px', marginBottom:'1.5rem' }}>
          <div style={{
            width:'36px', height:'36px', borderRadius:'10px',
            background:'linear-gradient(135deg,#667eea,#764ba2)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px'
          }}>📱</div>
          <div>
            <div style={{ fontSize:'15px', fontWeight:'600' }}>SocialDash</div>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)' }}>Pro Plan</div>
          </div>
        </div>

        {/* Nav */}
        {menuItems.map(m => (
          <div key={m.id} className="nav-item" onClick={() => setActiveMenu(m.id)} style={{
            display:'flex', alignItems:'center', gap:'10px',
            padding:'10px 12px', borderRadius:'12px', cursor:'pointer',
            background: activeMenu === m.id ? 'rgba(102,126,234,0.3)' : 'transparent',
            border: activeMenu === m.id ? '1px solid rgba(102,126,234,0.4)' : '1px solid transparent',
            fontSize:'14px', transition:'all 0.15s'
          }}>
            <span>{m.icon}</span>
            <span>{m.label}</span>
          </div>
        ))}

        {/* Akun terhubung */}
        <div style={{ marginTop:'auto', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginBottom:'8px', paddingLeft:'4px' }}>AKUN TERHUBUNG</div>
          {platforms.slice(0,4).map(p => (
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
            fontSize:'13px', fontWeight:'600'
          }}>
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:'12px', fontWeight:'500', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.email}</div>
            <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.4)' }}>Admin</div>
          </div>
          <button onClick={handleLogout} style={{
            background:'none', border:'none', cursor:'pointer',
            color:'rgba(255,255,255,0.4)', fontSize:'16px', padding:'4px'
          }}>🚪</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ padding:'16px', display:'flex', flexDirection:'column', gap:'16px', overflowY:'auto' }}>

        {/* Topbar */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <h1 style={{ fontSize:'22px', fontWeight:'600' }}>Selamat datang 👋</h1>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginTop:'2px' }}>Kelola semua sosial media kamu dari sini</p>
          </div>
          <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
            <div style={{ ...glass, padding:'6px 14px', borderRadius:'99px', fontSize:'12px', color:'#4ade80' }}>● 4 akun aktif</div>
            <div style={{ ...glass, padding:'6px 14px', borderRadius:'99px', fontSize:'12px' }}>🔔</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px' }}>
          {[
            { label:'Total Posting', value:'124', sub:'+12 minggu ini', icon:'📝', color:'#667eea' },
            { label:'Total Reach', value:'48.2K', sub:'+23% bulan ini', icon:'👁️', color:'#06b6d4' },
            { label:'Engagement', value:'3.8K', sub:'+8% minggu ini', icon:'❤️', color:'#f43f5e' },
            { label:'Terjadwal', value:'9', sub:'postingan pending', icon:'⏰', color:'#f59e0b' },
          ].map((s, i) => (
            <div key={i} className="stat-card" style={{
              ...glass, padding:'1.25rem',
              borderRadius:'16px', cursor:'default'
            }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px' }}>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.05em' }}>{s.label}</div>
                <div style={{ fontSize:'20px' }}>{s.icon}</div>
              </div>
              <div style={{ fontSize:'26px', fontWeight:'700', color:s.color }}>{s.value}</div>
              <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginTop:'4px' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Compose + Recent Posts */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>

          {/* Compose */}
          <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
            <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem' }}>✏️ Buat Postingan</h3>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'12px' }}>
              {platforms.map(p => (
                <div key={p.id} className="platform-chip" onClick={() => togglePlatform(p.id)} style={{
                  display:'flex', alignItems:'center', gap:'6px',
                  padding:'5px 12px', borderRadius:'99px', cursor:'pointer',
                  fontSize:'12px', fontWeight:'500', transition:'all 0.15s',
                  background: selectedPlatforms.includes(p.id) ? p.color : 'rgba(255,255,255,0.08)',
                  border: `1px solid ${selectedPlatforms.includes(p.id) ? p.color : 'rgba(255,255,255,0.1)'}`,
                }}>
                  <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'white' }}></div>
                  {p.short}
                </div>
              ))}
            </div>
            <textarea value={postText} onChange={e => setPostText(e.target.value)}
              placeholder="Tulis konten postingan kamu di sini..."
              style={{
                width:'100%', height:'100px', padding:'12px',
                background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'12px', color:'white', fontSize:'14px',
                resize:'none', lineHeight:'1.6', fontFamily:'inherit'
              }}
            />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'12px' }}>
              <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.3)' }}>{postText.length} / 280</span>
              <div style={{ display:'flex', gap:'8px' }}>
                <button style={{
                  padding:'8px 14px', borderRadius:'10px', fontSize:'13px',
                  background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)',
                  color:'white', cursor:'pointer'
                }}>📅 Jadwal</button>
                <button className="post-btn" onClick={handlePost} style={{
                  padding:'8px 16px', borderRadius:'10px', fontSize:'13px', fontWeight:'600',
                  background:'linear-gradient(135deg,#667eea,#764ba2)',
                  border:'none', color:'white', cursor:'pointer', transition:'all 0.15s'
                }}>🚀 Posting</button>
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
            <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem' }}>📋 Riwayat Posting</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'10px', maxHeight:'260px', overflowY:'auto' }}>
              {posts.map(p => {
                const plat = platforms.find(pl => pl.id === p.platform)
                return (
                  <div key={p.id} style={{
                    display:'flex', alignItems:'flex-start', gap:'10px',
                    padding:'10px', borderRadius:'12px',
                    background:'rgba(255,255,255,0.04)',
                    border:'1px solid rgba(255,255,255,0.06)'
                  }}>
                    <div style={{
                      width:'28px', height:'28px', borderRadius:'8px',
                      background: plat?.color || '#333',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'11px', fontWeight:'700', flexShrink:0
                    }}>{plat?.short}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.8)', lineHeight:'1.4' }}>{p.text}</div>
                      <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginTop:'3px' }}>{p.time}</div>
                    </div>
                    <span style={{
                      fontSize:'11px', padding:'3px 8px', borderRadius:'99px', fontWeight:'500', whiteSpace:'nowrap',
                      background: p.status==='sent' ? 'rgba(74,222,128,0.15)' : p.status==='scheduled' ? 'rgba(251,191,36,0.15)' : 'rgba(248,113,113,0.15)',
                      color: p.status==='sent' ? '#4ade80' : p.status==='scheduled' ? '#fbbf24' : '#f87171',
                    }}>
                      {p.status==='sent' ? '✓ Terkirim' : p.status==='scheduled' ? '⏰ Terjadwal' : '✗ Gagal'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div style={{ ...glass, padding:'1.5rem', borderRadius:'16px' }}>
          <h3 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'1rem' }}>📊 Performa Per Platform</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px' }}>
            {[
              { name:'X / Twitter', color:'#fff', posts:42, reach:'18.2K', eng:'1.2K' },
              { name:'Instagram', color:'#c0307a', posts:38, reach:'15.4K', eng:'2.1K' },
              { name:'LinkedIn', color:'#0a66c2', posts:28, reach:'9.8K', eng:'432' },
              { name:'Facebook', color:'#1877f2', posts:16, reach:'4.8K', eng:'198' },
            ].map((p, i) => (
              <div key={i} style={{
                padding:'1rem', borderRadius:'12px',
                background:'rgba(255,255,255,0.04)',
                border:`1px solid ${p.color}30`
              }}>
                <div style={{ fontSize:'13px', fontWeight:'600', color:p.color, marginBottom:'10px' }}>{p.name}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                  {[['Posting',p.posts],['Reach',p.reach],['Engagement',p.eng]].map(([k,v]) => (
                    <div key={k as string} style={{ display:'flex', justifyContent:'space-between', fontSize:'12px' }}>
                      <span style={{ color:'rgba(255,255,255,0.4)' }}>{k}</span>
                      <span style={{ fontWeight:'500' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}